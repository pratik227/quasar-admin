// https://github.com/michael-ciniawsky/postcss-load-config

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

export default {
  plugins: [
    fontDisplaySwap,

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
