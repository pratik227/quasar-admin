#!/usr/bin/env python3
"""Subset the Font Awesome webfonts down to the icons this app actually renders.

    python3 tools/subset_fontawesome.py           # regenerate
    python3 tools/subset_fontawesome.py --check    # verify, exit 1 if stale

Font Awesome Free ships ~2,700 icons across four woff2 files (~251 KB). This app
renders around twenty of them. This rewrites the four fonts with only the glyphs
that appear in src/, cutting them to a few KB, and records what it did in
src/assets/fonts/fa-subset.json.

Two other files depend on the output and will fail the build without it:

  quasar.config.js    repoints Font Awesome's @font-face rules at the -subset
                      files, and errors if one is missing.
  postcss.config.js   drops the glyph rules for unused icons, then asserts the
                      manifest covers every icon it kept -- so an icon added to
                      a template without re-running this script fails the
                      production build with
                      "Font Awesome subset does not contain: <name>".

That is the loop to remember: ADD AN ICON -> RE-RUN THIS -> COMMIT BOTH the
fonts and the manifest.

Requires fonttools and brotli (`pip install fonttools brotli`).
"""

import json
import os
import re
import sys
from pathlib import Path

# Make the output byte-reproducible.
#
# fontTools stamps head.modified with the current time on save, so without this
# every run rewrites all four woff2 files with different bytes -- meaning
# `npm run fonts:subset` always dirties four binary blobs in git, even when the
# icon set has not changed, and no one can tell a real change from a re-run.
# fontTools honours SOURCE_DATE_EPOCH for exactly this; it must be set before
# the font modules are imported.
os.environ.setdefault("SOURCE_DATE_EPOCH", "0")

try:
    from fontTools.subset import Subsetter, Options
    from fontTools.ttLib import TTFont
except ImportError:
    sys.exit("fonttools is required -- pip install fonttools brotli")

ROOT = Path(__file__).resolve().parent.parent
FA_DIR = ROOT / "node_modules/@quasar/extras/exports/fontawesome-v7"
OUT_DIR = ROOT / "src/assets/fonts"
MANIFEST = OUT_DIR / "fa-subset.json"

FONTS = [
    "fa-brands-400",
    "fa-regular-400",
    "fa-solid-900",
    "fa-v4compatibility",
]

# Must stay identical to usedFontAwesomeIcons() in postcss.config.js -- if the
# two scans disagree, the build asserts on an icon this script never subset.
SCAN_EXT = {".vue", ".js", ".ts", ".html", ".css", ".scss", ".sass"}
ICON_RE = re.compile(r"fa-([a-z0-9]+(?:-[a-z0-9]+)*)")

# Icons built at runtime ('fa fa-' + row.kind) are invisible to a static scan.
# Add those names here, exactly as postcss.config.js does with KEEP_ICONS.
KEEP_ICONS = set()


CSS_ESCAPE_RE = re.compile(r"\\(?:([0-9a-fA-F]{1,6})[ \t\n]?|(.))", re.DOTALL)


def decode_css_string(raw):
    """Resolve one CSS string literal to a single codepoint.

    Font Awesome writes the glyph three different ways and all three appear in
    the same stylesheet:

        --fa: "\\f004";   hex escape            (most icons)
        --fa: "\\$";      escaped literal        (dollar-sign, and other punctuation)
        --fa: "a";        bare literal           (the a-z / 0-9 icons)

    Matching only the hex form silently loses the other two -- which is exactly
    how `dollar-sign` goes missing, and then fails the build later in
    postcss.config.js rather than here.
    """
    match = CSS_ESCAPE_RE.match(raw)
    if match is not None:
        hex_digits, literal = match.groups()
        return int(hex_digits, 16) if hex_digits is not None else ord(literal)

    return ord(raw[0]) if raw else None


def glyph_map():
    """Map every Font Awesome icon name to its codepoint.

    The stylesheet declares each icon as `.fa-<name> { --fa: <string>; }`, and
    that is the only place the mapping exists -- icons.json next to it is keyed
    differently -- so it is parsed straight out of the CSS.
    """
    css = (FA_DIR / "fontawesome-v7.css").read_text(encoding="utf-8")
    pattern = re.compile(r"\.fa-([a-z0-9-]+)\s*\{\s*--fa:\s*\"((?:[^\"\\]|\\.)*)\"")

    glyphs = {}
    for name, raw in pattern.findall(css):
        codepoint = decode_css_string(raw)
        if codepoint is not None:
            glyphs[name] = codepoint

    return glyphs


def scanned_names():
    """Every `fa-*` token appearing in the source tree."""
    names = set(KEEP_ICONS)

    for path in ROOT.joinpath("src").rglob("*"):
        if path.is_file() and path.suffix in SCAN_EXT:
            names.update(ICON_RE.findall(path.read_text(encoding="utf-8", errors="ignore")))

    names.update(ICON_RE.findall((ROOT / "index.html").read_text(encoding="utf-8")))
    return names


def used_icons():
    """The scanned names that are real icons.

    A bare scan also catches utilities and animation classes -- fa-2x, fa-beat,
    fa-solid, fa-subset -- which have no glyph. Intersecting with the stylesheet
    filters them out, and mirrors how postcss.config.js only asserts on rules
    that are glyph-only.
    """
    glyphs = glyph_map()
    return {name: glyphs[name] for name in sorted(scanned_names()) if name in glyphs}


def subset_font(stem, codepoints):
    """Write one subset, keeping only the codepoints that font actually has.

    Which icons live in which file (solid vs regular vs brands) is not recorded
    anywhere convenient, so rather than track it, each font is intersected with
    its own cmap. A brand icon simply contributes nothing to fa-solid-900.
    """
    source = FA_DIR / f"{stem}.woff2"
    target = OUT_DIR / f"{stem}-subset.woff2"

    font = TTFont(source)
    available = set()
    for table in font["cmap"].tables:
        available.update(table.cmap.keys())

    wanted = sorted(codepoints & available)

    options = Options()
    options.flavor = "woff2"

    # Icon fonts render single codepoints, never shaped text, so the layout
    # tables are dead weight -- except v4compatibility, which is entirely
    # ligature-driven and would subset down to nothing without them.
    options.layout_features = ["*"] if stem == "fa-v4compatibility" else []

    # Everything below is size, and it is worth about 900 bytes across the four
    # files -- meaningful when the whole point is a 5 KB payload:
    #   desubroutinize   inlines CFF subroutines, which compress better once the
    #                    glyph set is this small
    #   notdef_outline   .notdef is never rendered here; its outline is waste
    #   hinting          irrelevant at icon sizes on modern rasterisers
    #   name_IDs         family/style/copyright strings nothing reads at runtime
    #   FFTM             FontForge's timestamp table
    options.desubroutinize = True
    options.notdef_outline = False
    options.hinting = False
    options.name_IDs = []
    options.drop_tables = list(options.drop_tables) + ["FFTM"]

    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=wanted)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(target)
    font.close()

    return target, len(wanted), target.stat().st_size


def main():
    check = "--check" in sys.argv

    if not FA_DIR.exists():
        sys.exit(f"Font Awesome source not found at {FA_DIR} -- run npm install")

    icons = used_icons()
    if not icons:
        sys.exit("no Font Awesome icons found in src/ -- refusing to write empty subsets")

    codepoints = set(icons.values())

    manifest = {
        "generatedBy": "tools/subset_fontawesome.py",
        "icons": sorted(icons),
        "codepoints": sorted(f"U+{cp:04X}" for cp in codepoints),
    }

    if check:
        if not MANIFEST.exists():
            sys.exit(f"{MANIFEST} is missing -- run: python3 tools/subset_fontawesome.py")

        current = json.loads(MANIFEST.read_text())
        missing = sorted(set(manifest["icons"]) - set(current.get("icons", [])))
        if missing:
            sys.exit(
                "Font Awesome subset is stale, missing: "
                + ", ".join(missing)
                + "\n  run: python3 tools/subset_fontawesome.py"
            )

        for stem in FONTS:
            if not (OUT_DIR / f"{stem}-subset.woff2").exists():
                sys.exit(f"missing {stem}-subset.woff2 -- run: python3 tools/subset_fontawesome.py")

        print(f"Font Awesome subset is up to date ({len(manifest['icons'])} icons)")
        return

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    total = 0
    for stem in FONTS:
        path, kept, size = subset_font(stem, codepoints)
        total += size
        print(f"  {path.name:<34} {kept:>3} glyphs  {size:>6,} bytes")

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"\n{len(manifest['icons'])} icons, {total:,} bytes total -> {MANIFEST.name}")


if __name__ == "__main__":
    main()
