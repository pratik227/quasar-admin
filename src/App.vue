<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

import { restoreColorScheme } from '@/composables/useDarkMode.js'
import { restoreTheme } from '@/composables/useTheme.js'

export default defineComponent({
  name: 'App',

  setup () {
    /*
     * quasar.config.js already put the app in 'auto', so the OS preference is
     * applied before this runs. This only re-applies an explicit choice the
     * user made on a previous visit.
     */
    restoreColorScheme()

    /*
     * Palette and light/dark are independent: this picks WHICH set of roles is
     * in play, restoreColorScheme picks which half of it applies. Both run
     * before mount so a returning visitor never sees the defaults flash.
     */
    restoreTheme()
  }
})
</script>
