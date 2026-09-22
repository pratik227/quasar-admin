/*
 * Theme selection.
 *
 * A theme is a full set of M3 colour roles, generated into
 * src/css/tokens/_color.css under `[data-theme="..."]`. Switching one is
 * therefore a single attribute on <html> -- no stylesheet swap, no re-render,
 * and no colour solver in the bundle. Everything downstream already reads the
 * roles through var(), so nothing else needs to know a theme changed.
 *
 * Orthogonal to dark mode: `data-theme` picks the palette, Quasar's
 * `.body--dark` picks which half of it applies. See useDarkMode.js.
 */

import { ref, readonly } from 'vue'

import { THEMES, DEFAULT_THEME } from '@/config/themes.js'

const KEY = 'qa-theme'

const current = ref(DEFAULT_THEME)

const isKnown = id => THEMES.some(theme => theme.id === id)

/*
 * Storage can throw outright in a locked-down browser, and a colour preference
 * is never worth taking the app down for -- both directions swallow.
 */
function read () {
  try {
    const stored = localStorage.getItem(KEY)
    return isKnown(stored) === true ? stored : null
  } catch { return null }
}

function write (id) {
  try { localStorage.setItem(KEY, id) } catch { /* not fatal */ }
}

function apply (id) {
  current.value = id
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = id
  }
}

/*
 * Call once, from App.vue. Runs before first paint, so a returning visitor
 * never sees the default palette flash before theirs is restored.
 */
export function restoreTheme () {
  apply(read() || DEFAULT_THEME)
}

export function useTheme () {
  return {
    themes: THEMES,
    current: readonly(current),

    setTheme (id) {
      if (isKnown(id) === false) return
      apply(id)
      write(id)
    }
  }
}
