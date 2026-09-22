/*
 * Dark mode: follow the OS by default, remember an explicit choice forever.
 *
 * The 'auto' default is set in quasar.config.js (framework.config.dark), not
 * here, so Quasar applies it during its own boot -- before the app mounts and
 * therefore before first paint. Doing it in a composable instead would flash
 * the light theme on every load for dark-mode users.
 *
 * This module only handles the part Quasar has no opinion about: persisting an
 * explicit override across sessions, and letting the user get back to 'auto'.
 */

import { computed } from 'vue'
import { Dark } from 'quasar'

const KEY = 'qa-color-scheme' // 'light' | 'dark' | 'auto'

/*
 * Storage can throw outright in a locked-down browser (Safari private mode
 * historically, or a blocked-cookies profile), and it is never worth taking the
 * whole app down over a theme preference -- so both directions swallow.
 */
function read () {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' || v === 'auto' ? v : null
  } catch { return null }
}

function write (value) {
  try { localStorage.setItem(KEY, value) } catch { /* not fatal */ }
}

/*
 * Call once, from App.vue. Re-applies a stored override on top of the 'auto'
 * that quasar.config.js already established.
 */
export function restoreColorScheme () {
  const stored = read()
  if (stored !== null && stored !== 'auto') {
    Dark.set(stored === 'dark')
  }
}

export function useDarkMode () {
  const isDark = computed(() => Dark.isActive)

  function toggle () {
    const next = Dark.isActive === false
    Dark.set(next)
    write(next === true ? 'dark' : 'light')
  }

  /* Hands control back to the OS, and stops overriding it on future loads. */
  function useSystem () {
    Dark.set('auto')
    write('auto')
  }

  return { isDark, toggle, useSystem }
}
