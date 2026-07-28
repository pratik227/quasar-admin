// https://github.com/michael-ciniawsky/postcss-load-config

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, extname, resolve } from 'node:path'

import autoprefixer from 'autoprefixer'
// import rtlcss from 'postcss-rtlcss'
// import { Mode } from 'postcss-rtlcss/options'

/**
 * @quasar/extras ships the Roboto @font-face rules without a `font-display`,
 * so the browser defaults to `auto` (= block) and holds back all text for up to
 * 3s while the woff downloads -- Lighthouse's "Font display" insight.
 *
 * This adds `font-display: swap` to any @font-face that does not declare one, so
 * text paints immediately in the fallback face. Rules that already set a value
 * are left alone on purpose: the icon fonts (Material Icons, Font Awesome)
 * deliberately use `block`, because with `swap` the fallback face renders the
 * ligature name ("menu", "search") as literal text before the font arrives.
 */
const fontDisplaySwap = {
  postcssPlugin: 'font-display-swap',
  AtRule: {
    'font-face': rule => {
      let has = false
      rule.walkDecls('font-display', () => { has = true })
      if (has === false) {
        rule.append({ prop: 'font-display', value: 'swap' })
      }
    }
  }
}

/**
 * Font Awesome Free ships every icon in one stylesheet: ~2,700 rules of the shape
 *
 *     .fa-heart { --fa: "\f004"; }
 *
 * which is 129 KB of render-blocking CSS for the ~30 icons this app actually
 * renders (Lighthouse: "Reduce unused CSS"). This drops the declarations for the
 * icons no template mentions.
 *
 * A rule is only touched when *every* selector is a bare `.fa-<name>` class and
 * *every* declaration sets `--fa` / `--fa--fa` (the glyph codepoints) -- that is
 * exactly and only the per-icon definitions. Matching on the exact property names
 * matters: the base rules (`.fa`, `.fas`, `.fab`, ...) and the utilities sharing
 * the prefix stay put, including the ones that are themselves custom properties
 * (`.fa-fw` sets `--fa-width`, `.fa-solid` sets `--fa-style`).
 *
 * Only runs for production builds, so `quasar dev` always has the full set
 * available while you are trying icons out. If you ever build an icon class name
 * at runtime (`'fa fa-' + row.kind`), the scan below cannot see it -- add the
 * name to KEEP_ICONS.
 */
const KEEP_ICONS = []

function usedFontAwesomeIcons () {
  const SCAN_EXT = new Set([ '.vue', '.js', '.ts', '.html', '.css', '.scss', '.sass' ])
  const names = new Set(KEEP_ICONS)

  const walk = dir => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name)
      if (entry.isDirectory() === true) {
        if (entry.name !== 'node_modules') walk(full)
      }
      else if (SCAN_EXT.has(extname(entry.name)) === true) {
        for (const m of readFileSync(full, 'utf8').matchAll(/fa-([a-z0-9]+(?:-[a-z0-9]+)*)/g)) {
          names.add(m[1])
        }
      }
    }
  }

  walk('src')
  for (const m of readFileSync('index.html', 'utf8').matchAll(/fa-([a-z0-9]+(?:-[a-z0-9]+)*)/g)) {
    names.add(m[1])
  }

  return names
}

const purgeFontAwesomeIcons = () => {
  const used = usedFontAwesomeIcons()
  const kept = new Set()
  let removed = 0

  return {
    postcssPlugin: 'purge-fontawesome-icons',

    Rule (rule) {
      const selectors = rule.selectors
      if (selectors.every(sel => /^\.fa-[a-z0-9-]+$/.test(sel)) === false) return

      let onlyGlyphDecls = true
      rule.each(node => {
        if (node.type !== 'decl' || (node.prop !== '--fa' && node.prop !== '--fa--fa')) {
          onlyGlyphDecls = false
        }
      })
      if (onlyGlyphDecls === false || rule.nodes.length === 0) return

      const names = selectors.map(sel => sel.slice(4)).filter(name => used.has(name))
      if (names.length !== 0) {
        names.forEach(name => kept.add(name))
        return
      }

      rule.remove()
      removed++
    },

    OnceExit () {
      if (kept.size !== 0) {
        assertFontAwesomeSubsetCovers(kept)
        console.log(`  purge-fontawesome-icons: kept ${kept.size} icons, dropped ${removed} unused rules`)
        kept.clear()
        removed = 0
      }
    }
  }
}

/*
 * quasar.config.js repoints Font Awesome's @font-face rules at these subset fonts;
 * tools/subset_fontawesome.py generates them along with the manifest below.
 */
const FA_SUBSET_DIR = resolve('src/assets/fonts')
const FA_MANIFEST = join(FA_SUBSET_DIR, 'fa-subset.json')
const FA_REGENERATE = 'run: python3 tools/subset_fontawesome.py'

/**
 * `renderedIcons` are the glyph rules the purge kept -- i.e. exactly the icons
 * the templates render, already filtered down to names Font Awesome defines. Every
 * one of them has to exist in the subset fonts, or it would ship as a blank box.
 */
function assertFontAwesomeSubsetCovers (renderedIcons) {
  if (existsSync(FA_MANIFEST) === false) {
    throw new Error(`Font Awesome subset is missing (${FA_MANIFEST}) -- ${FA_REGENERATE}`)
  }

  const covered = new Set(JSON.parse(readFileSync(FA_MANIFEST, 'utf8')).icons)
  const missing = [ ...renderedIcons ].filter(name => covered.has(name) === false)

  if (missing.length !== 0) {
    throw new Error(
      `Font Awesome subset does not contain: ${missing.sort().join(', ')} -- ${FA_REGENERATE}`
    )
  }
}

export default {
  plugins: [
    fontDisplaySwap,

    ...(process.env.NODE_ENV === 'production' ? [ purgeFontAwesomeIcons() ] : []),

    // https://github.com/postcss/autoprefixer
    autoprefixer({
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions'
      ]
    }),

    // https://github.com/elchininet/postcss-rtlcss
    // If you want to support RTL css, then
    // 1. yarn/pnpm/bun/npm install postcss-rtlcss
    // 2. optionally set quasar.config.js > framework > lang to an RTL language
    // 3. uncomment the following line (and its import statement above):
    // rtlcss({ mode: Mode.Override })
  ]
}
