/*
 * The five M3 breakpoints.
 *
 * https://m3.material.io/foundations/layout/breakpoints/overview
 *
 *   compact      <600    1 pane           navigation bar / modal expanded rail
 *   medium     600-839   1 (2 if sparse)  rail (1-pane) / nav bar (2-pane)
 *   expanded   840-1199  2                rail, collapsed or expanded
 *   large     1200-1599  2                rail, collapsed or expanded
 *   extra-large  1600+   2 (up to 3)      expanded rail
 *
 * RELATIONSHIP TO $q.screen
 * Quasar ships 600/1024/1440/1920, which disagrees with Material on three of
 * four boundaries. Rather than run two competing systems, quasar.variables.scss
 * realigns Quasar's to Material's, so $q.screen.lt.md and this composable now
 * describe the same window -- and `col-md-*` breaks where the scaffold does.
 *
 * This composable still exists on top of that because $q.screen only answers
 * "how wide". The layout decisions Material actually specifies -- which
 * navigation component belongs at this size, how many panes are recommended --
 * live here, named as the spec names them, so call sites read as intent rather
 * than as a pixel comparison.
 *
 * Three files encode these boundaries and must change together:
 * _breakpoints.css, quasar.variables.scss, and this one.
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'

export const BREAKPOINTS = {
  medium: 600,
  expanded: 840,
  large: 1200,
  extraLarge: 1600
}

function classify (width) {
  if (width >= BREAKPOINTS.extraLarge) return 'extra-large'
  if (width >= BREAKPOINTS.large) return 'large'
  if (width >= BREAKPOINTS.expanded) return 'expanded'
  if (width >= BREAKPOINTS.medium) return 'medium'
  return 'compact'
}

export function useBreakpoint () {
  /*
   * Starts at 'compact' rather than reading innerWidth at setup time so the
   * value is identical on server and client -- this app can be built for SSR
   * (see quasar.config.js), where touching window during setup throws. The
   * real width lands on mount.
   */
  const name = ref('compact')

  /*
   * One listener per breakpoint rather than a resize handler: matchMedia fires
   * only when a boundary is actually crossed, so dragging a window edge does
   * not run this on every frame.
   */
  let queries = []

  function sync () {
    name.value = classify(window.innerWidth)
  }

  onMounted(() => {
    sync()
    queries = Object.values(BREAKPOINTS).map(px => {
      const q = window.matchMedia(`(min-width: ${px}px)`)
      q.addEventListener('change', sync)
      return q
    })
  })

  onUnmounted(() => {
    queries.forEach(q => q.removeEventListener('change', sync))
    queries = []
  })

  return {
    breakpoint: name,

    isCompact: computed(() => name.value === 'compact'),
    isMedium: computed(() => name.value === 'medium'),

    /* At or above a boundary -- the common shape for layout decisions. */
    atLeastMedium: computed(() => name.value !== 'compact'),
    atLeastExpanded: computed(() => [ 'expanded', 'large', 'extra-large' ].includes(name.value)),
    atLeastLarge: computed(() => [ 'large', 'extra-large' ].includes(name.value)),

    /*
     * Material's navigation recommendation per breakpoint: bar on compact,
     * collapsed rail through expanded/large, expanded rail at extra-large.
     */
    navigationMode: computed(() => {
      if (name.value === 'compact') return 'bar'
      if (name.value === 'extra-large') return 'rail-expanded'
      return 'rail-collapsed'
    }),

    /* Recommended pane count. Medium allows 2 but only for sparse content. */
    recommendedPanes: computed(() => (
      name.value === 'compact' || name.value === 'medium' ? 1 : 2
    ))
  }
}
