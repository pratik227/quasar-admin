// Configuration for your app
// https://quasar.dev/quasar-cli-vite/quasar-config-file

import { existsSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'

import { defineConfig } from '#q-app'

/*
 * Slims down the two webfont stylesheets @quasar/extras contributes, by patching
 * their source before Vite's CSS pipeline turns the url()s into asset handles --
 * which is why this cannot live in postcss.config.js: by the time PostCSS sees a
 * `src:` declaration, the path is already an internal placeholder.
 *
 * Font Awesome: repoint the four @font-face files at the subsets in
 *   src/assets/fonts (251 KB -> 5 KB, glyph-for-glyph identical). Generated and
 *   verified by tools/subset_fontawesome.py -- re-run it after adding an icon;
 *   the PostCSS purge fails the build if the subset is missing one.
 *
 * Roboto: drop the weights nothing needs enough to justify a 26 KB download.
 *   Quasar's .text-h1-.text-h4 ask for 300 and text-weight-bolder for 900; those
 *   now fall back to 400 and to synthesis from 700, saving ~53 KB. Dropping the
 *   @font-face here rather than in PostCSS also keeps the unused .woff files out
 *   of dist entirely.
 */
const ROBOTO_WEIGHTS_TO_KEEP = new Set([ '400', '500', '700' ])
const FA_SUBSET_DIR = resolve('src/assets/fonts')

const slimQuasarExtrasFonts = {
  name: 'slim-quasar-extras-fonts',
  enforce: 'pre',

  transform (code, id) {
    const file = id.split('?')[ 0 ]
    if (file.endsWith('.css') === false) return null

    if (file.includes('fontawesome-v7') === true) {
      return code.replace(
        /url\((["']?)\.\/(fa-[a-z0-9-]+)\.woff2\1\)/g,
        (match, quote, name) => {
          const target = join(FA_SUBSET_DIR, `${name}-subset.woff2`)
          if (existsSync(target) === false) {
            this.error(`missing ${target} -- run: python3 tools/subset_fontawesome.py`)
          }

          const rel = relative(dirname(file), target).split(sep).join('/')
          return `url(${quote}${rel.startsWith('.') ? rel : `./${rel}`}${quote})`
        }
      )
    }

    if (file.includes('roboto-font') === true) {
      return code.replace(/@font-face\s*\{[^}]*\}/g, rule => {
        const weight = /font-weight:\s*([0-9]+)/.exec(rule)
        return weight !== null && ROBOTO_WEIGHTS_TO_KEEP.has(weight[ 1 ]) === false
          ? ''
          : rule
      })
    }

    return null
  }
}

export default defineConfig((ctx) => {
  return {
    // https://quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli-vite/boot-files
    /*
     * The scaffolded 'i18n' and 'axios' boot files were removed: nothing in the
     * app ever called $t()/useI18n() or $axios/$api, yet they pulled vue-i18n
     * (54 KB) and axios (45 KB) into the boot graph of every page — which is
     * what Lighthouse's "Reduce unused JavaScript" was reporting.
     */
    boot: [
      'qhierarchy'
    ],

    // https://quasar.dev/quasar-cli-vite/quasar-config-file#css
    css: [
      'app.css'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v7',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'fontawesome-v7',
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli-vite/quasar-config-file#build
    build: {
      target: {
        // browser: 'baseline-widely-available',
        // node: 'node22'
      },

      // https://quasar.dev/quasar-cli-vite/page-routing-with-vue-router#filename-based-routing
      // filenameBasedRouting: true,

      vueRouterMode: 'history', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,

      // This app is written with the Vue Options API, so it must stay enabled.
      // (@quasar/app-vite v3 defaults it to false)
      vueOptionsAPI: true,

      // Ship source maps for the production bundle. They are only fetched when
      // devtools are open, so there is no cost for visitors, and it clears
      // Lighthouse's "Missing source maps for large first-party JavaScript".
      sourcemap: true,

      // publicPath: '/',
      // define: {},
      // defineEnv: {}
      // ignorePublicFolder: true,
      // minify: false,
      // distDir

      extendViteConf (viteConf) {
        /*
         * Never inline webfonts. The Font Awesome subsets are only a couple of KB
         * each, so Vite would base64 them straight into the render-blocking
         * stylesheet -- and because Font Awesome declares the same file across
         * several @font-face rules (v7, v5 and legacy family names), every copy
         * gets embedded again: ~18 KB of CSS in front of first paint to save four
         * requests for 5 KB of fonts.
         */
        viteConf.build = viteConf.build || {}
        viteConf.build.assetsInlineLimit = filePath => (
          /\.(?:woff2?|ttf|otf|eot)$/i.test(filePath) === true ? false : void 0
        )
      },

      // viteVuePluginOptions: {},

      // (The @intlify/unplugin-vue-i18n plugin went away with the i18n boot file.)
      vitePlugins: [
        slimQuasarExtrasFonts
      ]
    },

    // https://quasar.dev/quasar-cli-vite/quasar-config-file#devserver
    devServer: {
      // https: true,
      open: true // opens browser window automatically
    },

    // https://quasar.dev/quasar-cli-vite/quasar-config-file#framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'AppFullscreen'
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli-vite/quasar-config-file#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/stores/index',
    //   pwaRegisterServiceWorker: 'src-pwa/register-sw',
    //   pwaServiceWorker: 'src-pwa/sw/custom-sw',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    //   bexManifestFile: 'src-bex/manifest.json
    // },

    // https://quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      /**
       * The default port that the production server should use
       * (gets superseded if process.env.PORT is specified at runtime)
       */
      prodPort: 3000,
      middlewares: [
        'render' // keep this as last one
      ],

      // clientSideRenderingRoutes: [],
      // noPreloadTagRoutes: [],
      // manualStoreSerialization: true,
      // manualStoreSsrContextInjection: true,
      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,
      // prodScriptNamedExport: false,

      // extendSSRPackageJson (pkgJson) {},
      // extendSSRManifestJson (json) {},
      // extendSSRWebserverConf (rolldownConf) {},

      // pwa: true,
      // pwaOfflineHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // extendSSRGenerateSWOptions (cfg) {},
      // extendSSRInjectManifestOptions (cfg) {},
    },

    // https://quasar.dev/quasar-cli-vite/developing-ssg/configuring-ssg
    ssg: {
      // onSsgRendererError: 'abort',
      // ssgRendererConcurrency: 1,
      // ssgRendererRetryCount: 0,
      // ssgRendererRetryDelay: 1000,
      // ssgRendererDirectoryIndexes: true,
      // error404HtmlFilename: '404.html',
      // clientSideRenderingHtmlFilename: 'csr.html',
      // clientSideRenderingRoutes: [],
      // noPreloadTagRoutes: []

      // extendSSGRendererConf (rolldownConf) {},
      // extendSSGManifestJson (json) {},

      // manualStoreSerialization: true,
      // manualStoreSsrContextInjection: true,
      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      // pwa: true,
      // pwaOfflineHtmlFilename: 'offline.html',
      // extendSSGGenerateSWOptions (cfg) {},
      // extendSSGInjectManifestOptions (cfg) {},
    },

    // https://quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      injectPWAMetaTags: true,
      // extendPWAManifestJson (json) {},
      // extendPWACustomSWConf (rolldownConf) {},
      // extendPWAGenerateSWOptions (cfg) {},
      // extendPWAInjectManifestOptions (cfg) {},
      // extendPWASwTsConfig (tsConfig) {}
    },

    // https://quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {},

    // https://quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // https://quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (rolldownConf) {},
      // extendElectronPreloadConf (rolldownConf) {},
      // extendElectronPackageJson (pkgJson) {},

      // Electron preload scripts (if any) from /src-electron, WITHOUT file extension
      preloadScripts: [ 'electron-preload' ],

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration

        appId: 'quasar-admin2'
      }
    },

    // https://quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      // extendBexScriptsConf (rolldownConf) {},
      // extendBexManifestJson (json) {},

      /**
       * The list of extra scripts (js/ts) not in your bex manifest that you want to
       * compile and use in your browser extension. Maybe dynamic use them?
       *
       * Each entry in the list should be a relative filename to /src-bex/
       *
       * @example [ 'my-script.ts', 'sub-folder/my-other-script.js' ]
       */
      extraScripts: []
    }
  }
})
