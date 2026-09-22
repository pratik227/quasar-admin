/*
 * Generates the theme layer:
 *   src/css/tokens/_color.css   M3 colour roles for every theme, light + dark
 *   src/config/themes.js        the same list as data, for the theme picker
 *
 * Run: npm run tokens:generate
 *
 * WHY GENERATE AT BUILD TIME RATHER THAN IN THE APP
 * M3 colour is defined in HCT, so the roles can only be computed, not written
 * down. Doing that in the browser would mean shipping
 * @material/material-color-utilities (~40 KB) and running the solver before
 * first paint, on an app that has already gone to some lengths to cut its
 * critical path (see quasar.config.js). Themes only change when this file
 * changes, so switching one at runtime costs a single attribute flip.
 *
 * WHY IT REACHES PAST THE PACKAGE'S ENTRY POINT
 * @material/material-color-utilities@0.4.0 ships broken ESM: ten modules under
 * scheme/ and dynamiccolor/ import siblings without a file extension, so
 * importing the package index throws ERR_MODULE_NOT_FOUND on Node. Its exports
 * map also blocks subpath imports. Both are sidestepped by importing the two
 * modules we need (hct, tonal_palette) by absolute file URL.
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const OUT_CSS = resolve('src/css/tokens/_color.css')
const OUT_LIST = resolve('src/config/themes.js')
const PKG = pathToFileURL(resolve('node_modules/@material/material-color-utilities') + '/')

const { Hct } = await import(new URL('hct/hct.js', PKG))
const { TonalPalette } = await import(new URL('palettes/tonal_palette.js', PKG))

/* ------------------------------------------------------------------ colour */

/*
 * OKLCH -> sRGB hex.
 *
 * Needed because the Stone theme is transcribed from a shadcn palette, which
 * is authored in OKLCH. Converting here rather than emitting oklch() keeps
 * every theme in one colour notation, so color-mix() (used for state layers
 * and tonal chips throughout) behaves identically whichever theme is active.
 *
 * OKLCH -> OKLab -> LMS -> linear sRGB -> gamma-encoded sRGB, per the Oklab
 * specification. Verified against the anchors: oklch(1 0 0) is #ffffff and
 * oklch(0 0 0) is #000000 exactly.
 */
function oklch (L, C, Hdeg, alpha) {
  const h = Hdeg * Math.PI / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3

  const channels = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  ].map(v => {
    const encoded = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055
    return Math.max(0, Math.min(255, Math.round(encoded * 255)))
  })

  return alpha === undefined
    ? '#' + channels.map(v => v.toString(16).padStart(2, '0')).join('')
    : `rgba(${channels[ 0 ]}, ${channels[ 1 ]}, ${channels[ 2 ]}, ${alpha})`
}

/* ------------------------------------------------------------------ themes */

/*
 * Each theme is generated from a seed, then optionally corrected with explicit
 * values. The hybrid matters for Stone: it is transcribed from a real shadcn
 * palette, so the roles shadcn defines use its exact colours, while the roles
 * it has no equivalent for (the container family, inverse surfaces, scrim) are
 * derived from the same seed rather than invented.
 */
const STONE_LIGHT = {
  'background': oklch(1, 0, 0),
  'surface': oklch(1, 0, 0),
  'on-background': oklch(0.153, 0.006, 107.1),
  'on-surface': oklch(0.153, 0.006, 107.1),
  'surface-container-lowest': oklch(1, 0, 0),
  'surface-container-low': oklch(0.988, 0.003, 106.5),
  'surface-container': oklch(0.966, 0.005, 106.5),
  'surface-container-high': oklch(0.945, 0.006, 106.5),
  'surface-container-highest': oklch(0.93, 0.007, 106.5),
  'surface-bright': oklch(1, 0, 0),
  'surface-dim': oklch(0.9, 0.007, 106.5),
  'primary': oklch(0.228, 0.013, 107.4),
  'on-primary': oklch(0.988, 0.003, 106.5),
  'secondary-container': oklch(0.966, 0.005, 106.5),
  'on-secondary-container': oklch(0.228, 0.013, 107.4),
  'tertiary-container': oklch(0.988, 0.003, 106.5),
  'on-tertiary-container': oklch(0.394, 0.023, 107.4),
  'on-surface-variant': oklch(0.58, 0.031, 107.3),
  'surface-variant': oklch(0.93, 0.007, 106.5),
  'outline-variant': oklch(0.93, 0.007, 106.5),
  'outline': oklch(0.737, 0.021, 106.9),
  'error': oklch(0.577, 0.245, 27.325),

  /*
   * Containers step in LIGHTNESS, not hue.
   *
   * Without these, the container roles fall through to the generator, which
   * derives them from the seed's hue -- and this seed sits at 107 degrees, so
   * primary-container came out a saturated yellow-green on an otherwise
   * monochrome page. shadcn's stone palette has no coloured containers; its own
   * chart ramp (chart-1..5) is five warm greys at descending lightness, which
   * is the same idea applied to data.
   */
  'primary-container': oklch(0.93, 0.007, 106.5),
  'on-primary-container': oklch(0.286, 0.016, 107.4),

  /*
   * primary / secondary / tertiary are the first three chart series
   * (_series.css), so they are spaced down shadcn's ramp rather than all set to
   * the same near-black -- three identical series would make the dashboard
   * charts indistinguishable.
   */
  'secondary': oklch(0.466, 0.025, 107.3),
  'on-secondary': oklch(0.988, 0.003, 106.5),
  'tertiary': oklch(0.58, 0.031, 107.3),
  'on-tertiary': oklch(0.988, 0.003, 106.5)
}

const STONE_DARK = {
  'background': oklch(0.153, 0.006, 107.1),
  'surface': oklch(0.153, 0.006, 107.1),
  'on-background': oklch(0.988, 0.003, 106.5),
  'on-surface': oklch(0.988, 0.003, 106.5),
  'surface-container-lowest': oklch(0.12, 0.005, 107.1),
  'surface-container-low': oklch(0.19, 0.009, 107.2),
  'surface-container': oklch(0.228, 0.013, 107.4),
  'surface-container-high': oklch(0.262, 0.015, 107.4),
  'surface-container-highest': oklch(0.286, 0.016, 107.4),
  'surface-bright': oklch(0.32, 0.017, 107.4),
  'surface-dim': oklch(0.153, 0.006, 107.1),
  'primary': oklch(0.93, 0.007, 106.5),
  'on-primary': oklch(0.228, 0.013, 107.4),
  'secondary-container': oklch(0.286, 0.016, 107.4),
  'on-secondary-container': oklch(0.988, 0.003, 106.5),
  'tertiary-container': oklch(0.19, 0.009, 107.2),
  'on-tertiary-container': oklch(0.88, 0.011, 106.6),
  'on-surface-variant': oklch(0.737, 0.021, 106.9),
  'surface-variant': oklch(0.286, 0.016, 107.4),
  'outline-variant': oklch(1, 0, 0, 0.12),
  'outline': oklch(0.66, 0.026, 107.1),
  'error': oklch(0.704, 0.191, 22.216),

  /* See the light set above. */
  'primary-container': oklch(0.286, 0.016, 107.4),
  'on-primary-container': oklch(0.82, 0.014, 106.7),
  'secondary': oklch(0.737, 0.021, 106.9),
  'on-secondary': oklch(0.228, 0.013, 107.4),
  'tertiary': oklch(0.58, 0.031, 107.3),
  'on-tertiary': oklch(0.988, 0.003, 106.5)
}

const THEMES = [
  {
    id: 'material',
    label: 'Material',
    seed: 0xFF6750A4,
    swatch: '#6750A4'
  },
  {
    /* Transcribed from a shadcn "stone" palette (ui.shadcn.com/create). */
    id: 'stone',
    label: 'Stone',
    seed: 0xFF1D1D16,
    swatch: '#1d1d16',
    light: STONE_LIGHT,
    dark: STONE_DARK
  },
  { id: 'indigo', label: 'Indigo', seed: 0xFF3F51B5, swatch: '#3F51B5' },
  { id: 'emerald', label: 'Emerald', seed: 0xFF10B981, swatch: '#10B981' },
  { id: 'rose', label: 'Rose', seed: 0xFFE11D48, swatch: '#E11D48' }
]

const DEFAULT_THEME = THEMES[ 0 ].id

/* ------------------------------------------------------------------- roles */

/*
 * Role -> [palette, lightTone, darkTone].
 *
 * Light and dark are not a simple inversion: containers move from tone 90 to
 * tone 30 while their `on-` pair moves 10 -> 90, and the surface-container
 * ramp compresses into the 4-22 range so that dark elevation still reads as
 * distinct steps. This table is the M3 spec mapping.
 */
const ROLES = {
  'primary': [ 'p', 40, 80 ],
  'on-primary': [ 'p', 100, 20 ],
  'primary-container': [ 'p', 90, 30 ],
  'on-primary-container': [ 'p', 10, 90 ],
  'inverse-primary': [ 'p', 80, 40 ],

  'secondary': [ 's', 40, 80 ],
  'on-secondary': [ 's', 100, 20 ],
  'secondary-container': [ 's', 90, 30 ],
  'on-secondary-container': [ 's', 10, 90 ],

  'tertiary': [ 't', 40, 80 ],
  'on-tertiary': [ 't', 100, 20 ],
  'tertiary-container': [ 't', 90, 30 ],
  'on-tertiary-container': [ 't', 10, 90 ],

  'error': [ 'e', 40, 80 ],
  'on-error': [ 'e', 100, 20 ],
  'error-container': [ 'e', 90, 30 ],
  'on-error-container': [ 'e', 10, 90 ],

  'background': [ 'n', 98, 6 ],
  'on-background': [ 'n', 10, 90 ],
  'surface': [ 'n', 98, 6 ],
  'on-surface': [ 'n', 10, 90 ],
  'surface-variant': [ 'nv', 90, 30 ],
  'on-surface-variant': [ 'nv', 30, 80 ],

  /* The elevation ramp. M3 expresses depth as surface tone, not shadow. */
  'surface-dim': [ 'n', 87, 6 ],
  'surface-bright': [ 'n', 98, 24 ],
  'surface-container-lowest': [ 'n', 100, 4 ],
  'surface-container-low': [ 'n', 96, 10 ],
  'surface-container': [ 'n', 94, 12 ],
  'surface-container-high': [ 'n', 92, 17 ],
  'surface-container-highest': [ 'n', 90, 22 ],

  'outline': [ 'nv', 50, 60 ],
  'outline-variant': [ 'nv', 80, 30 ],

  'inverse-surface': [ 'n', 20, 90 ],
  'inverse-on-surface': [ 'n', 95, 20 ],

  'shadow': [ 'n', 0, 0 ],
  'scrim': [ 'n', 0, 0 ]
}

/*
 * The TonalSpot scheme -- what M3 calls the default. Each palette keeps the
 * seed's hue and pins chroma to a fixed value, which is what keeps a theme
 * coherent no matter how saturated the seed was. Tertiary rotates 60 degrees
 * for a complementary accent; error is a fixed red, never derived, so failure
 * always reads as failure.
 */
function schemeFor (theme, index) {
  const seed = Hct.fromInt(theme.seed)
  const palettes = {
    p: TonalPalette.fromHueAndChroma(seed.hue, 36),
    s: TonalPalette.fromHueAndChroma(seed.hue, 16),
    t: TonalPalette.fromHueAndChroma(seed.hue + 60, 24),
    n: TonalPalette.fromHueAndChroma(seed.hue, 6),
    nv: TonalPalette.fromHueAndChroma(seed.hue, 8),
    e: TonalPalette.fromHueAndChroma(25, 84)
  }

  const explicit = index === 1 ? theme.light : theme.dark
  const out = {}

  for (const [ role, spec ] of Object.entries(ROLES)) {
    if (explicit !== undefined && explicit[ role ] !== undefined) {
      out[ role ] = explicit[ role ]
      continue
    }
    const value = palettes[ spec[ 0 ] ].tone(spec[ index ])
    out[ role ] = '#' + ((value >>> 0) & 0xFFFFFF).toString(16).padStart(6, '0')
  }

  return out
}

const block = roles => Object.entries(roles)
  .map(([ role, value ]) => `  --md-sys-color-${role}: ${value};`)
  .join('\n')

/* ------------------------------------------------------------------- emit */

const sections = []

for (const theme of THEMES) {
  const light = schemeFor(theme, 1)
  const dark = schemeFor(theme, 2)

  /*
   * The default theme is emitted twice: once unqualified, so the app is themed
   * before any JavaScript sets data-theme (no flash of unstyled colour), and
   * once under its own attribute so selecting it explicitly behaves like every
   * other theme.
   *
   * Light values sit on <html> and dark values on <body>, because that is
   * where Quasar puts its .body--dark class. Any custom property that bridges
   * to these -- --q-*, --md-series-* -- must be declared on BOTH elements too,
   * or it resolves once against the light set and freezes. See
   * _quasar-bridge.css for the full explanation.
   */
  const lightSelectors = theme.id === DEFAULT_THEME
    ? `:root,\n:root[data-theme="${theme.id}"]`
    : `:root[data-theme="${theme.id}"]`

  const darkSelectors = theme.id === DEFAULT_THEME
    ? `.body--dark,\n[data-theme="${theme.id}"] .body--dark`
    : `[data-theme="${theme.id}"] .body--dark`

  sections.push(`/* ${theme.label} */\n${lightSelectors} {\n${block(light)}\n}\n\n${darkSelectors} {\n${block(dark)}\n}`)
}

const css = `/*
 * GENERATED FILE -- do not edit by hand.
 * Regenerate with: npm run tokens:generate   (see tools/generate_m3_tokens.mjs)
 *
 * ${THEMES.length} themes x ${Object.keys(ROLES).length} roles x light/dark.
 * Switching themes is a data-theme attribute on <html>; every consumer reads
 * these through var(), so nothing else has to know a theme changed.
 */
${sections.join('\n\n')}
`

const list = `/*
 * GENERATED FILE -- do not edit by hand.
 * Regenerate with: npm run tokens:generate
 *
 * Kept in step with src/css/tokens/_color.css so the picker can never offer a
 * theme the stylesheet does not define.
 */
export const DEFAULT_THEME = '${DEFAULT_THEME}'

export const THEMES = ${JSON.stringify(
    THEMES.map(t => ({ id: t.id, label: t.label, swatch: t.swatch })),
    null,
    2
  ).replace(/"([a-z]+)":/g, '$1:').replace(/"/g, "'")}
`

if (process.argv.includes('--check') === true) {
  const currentCss = existsSync(OUT_CSS) === true ? readFileSync(OUT_CSS, 'utf8') : ''
  const currentList = existsSync(OUT_LIST) === true ? readFileSync(OUT_LIST, 'utf8') : ''
  if (currentCss !== css || currentList !== list) {
    console.error('theme output is stale -- run: npm run tokens:generate')
    process.exit(1)
  }
  console.log(`themes are up to date (${THEMES.length})`)
} else {
  writeFileSync(OUT_CSS, css)
  writeFileSync(OUT_LIST, list)
  console.log(`wrote ${THEMES.length} themes x ${Object.keys(ROLES).length} roles -> _color.css + themes.js`)
}
