import { defineBoot } from '#q-app'
import * as VuePlugin from 'quasar-ui-qhierarchy/src/vue-plugin'

/*
 * QHierarchy used to be installed through the "quasar-app-extension-qhierarchy"
 * app extension. That extension is not compatible with @quasar/app-vite v3
 * (it declares compatibility up to v2 and relies on the removed `api.hasVite`),
 * so the UI package is now registered directly from this boot file instead.
 */

export default defineBoot(({ app }) => {
  app.use(VuePlugin)
})
