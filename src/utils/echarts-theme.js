/*
 * ECharts theme built from the M3 colour roles.
 *
 * ECharts paints to a canvas, so nothing in src/css/tokens/ reaches it -- a
 * canvas fill has to be a resolved colour string, not a var(). The roles are
 * therefore read off the live document instead of imported, which is also the
 * only way to get them: light and dark are two different rule blocks and only
 * one of them is ever in scope.
 *
 *
 * WHY A MUTATION OBSERVER RATHER THAN A WATCHER
 *
 * Quasar's Dark plugin flips `.body--dark` on <body> and that class IS the
 * signal -- it emits no event, and under `Dark.set('auto')` the flip can come
 * from the OS with no app code running at all. Observing the class is observing
 * the exact thing that swaps the token values, so the header toggle, an OS
 * change and a preference restored on boot all land in one place instead of
 * every chart importing the Dark plugin and duplicating the reaction.
 * `refreshChartTheme()` is exported as well, for anything that has to force it.
 *
 *
 * USAGE
 *
 *   import { chartTheme } from '@/utils/echarts-theme.js'
 *   <ECharts :theme="chartTheme" :option="options" />
 *
 * `chartTheme` alternates between two registered theme names, so vue-echarts
 * sees the prop change and calls setTheme() on the live instance -- no re-init,
 * no flash. Colour that has to live INSIDE the option (gradients, a per-card
 * ink) cannot be re-themed that way, so build those in a computed that reads
 * `chartTheme`: the alternating name doubles as the rebuild signal.
 */

import { ref, readonly } from 'vue'
import { registerTheme } from 'echarts/core'
import { graphic } from '@/utils/echarts.js'

const LIGHT = 'md-sys-light'
const DARK = 'md-sys-dark'

const active = ref(LIGHT)
const registered = new Set()

export const chartTheme = readonly(active)

/* This module is imported for its top-level registration, and an SSR build (see
 * quasar.config.js) evaluates it with no document at all. */
function ready () {
  return typeof document !== 'undefined' && document.body !== null
}

/*
 * Reads through document.body, not documentElement: the dark roles are declared
 * on `.body--dark`, so <html> only ever resolves to the light scheme.
 */
function cssVar (name) {
  if (ready() === false) return ''
  return getComputedStyle(document.body).getPropertyValue(name).trim()
}

export function colorRole (name) {
  return cssVar(`--md-sys-color-${name}`)
}

/*
 * The M3 roles are opaque hex; state layers and area fills need the same colour
 * at an opacity (design-system rule 6). Anything that isn't hex is passed
 * through so a bad role name degrades to a visible wrong colour rather than
 * an exception inside ECharts' colour parser.
 */
export function withAlpha (color, alpha) {
  const hex = color.replace('#', '')
  if (/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex) === false) return color

  const full = hex.length === 3 ? hex.replace(/./g, ch => ch + ch) : hex
  const n = parseInt(full, 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

/*
 * The categorical palette.
 *
 * A TonalSpot scheme has exactly three decorative hue families -- primary,
 * tertiary and secondary. Error is the fourth and carries meaning, so it is not
 * in the rotation. Six series therefore cannot come from hue alone; the rest of
 * the separation has to come from tone, and which tone is available differs by
 * scheme: `X` sits at tone 40 in light and 80 in dark, `on-X-container` at 10
 * and 90. Both of those stay well clear of the background in BOTH schemes,
 * which the `-container` roles do not -- tone 90 on a white card and tone 30 on
 * a dark one fall to roughly 2:1 against it and vanish as a line.
 *
 * The order is not arbitrary. Adjacent series are the ones a reader has to tell
 * apart in a stack or a legend, so it was chosen to maximise the smallest
 * adjacent CIE76 distance across both schemes at once: no neighbouring pair is
 * closer than dE 17 in either. `primary` is pinned to the front because a
 * single-series chart takes slot 0 and should read as the brand colour.
 *
 * `fade` is the second stop for area gradients -- the other tone of the SAME
 * family, so a band shades within its own hue rather than washing out into the
 * surface, whichever scheme is active.
 */
/* COUPLED TO src/css/tokens/_series.css -- same roles, same order. The DOM side
 * (category chips, stat tiles) reads them as CSS custom properties, since it
 * cannot import this array. Change both together. */
const SERIES = [
  { color: 'primary', fade: 'on-primary-container' },
  { color: 'secondary', fade: 'on-secondary-container' },
  { color: 'tertiary', fade: 'on-tertiary-container' },
  { color: 'on-primary-container', fade: 'primary' },
  { color: 'outline', fade: 'on-surface-variant' },
  { color: 'on-tertiary-container', fade: 'tertiary' }
]

export function seriesGradient (index) {
  const entry = SERIES[index % SERIES.length]
  return new graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: colorRole(entry.color) },
    { offset: 1, color: colorRole(entry.fade) }
  ])
}

function buildTheme () {
  const onSurface = colorRole('on-surface')
  const onSurfaceVariant = colorRole('on-surface-variant')
  const outline = colorRole('outline')
  const outlineVariant = colorRole('outline-variant')
  const primary = colorRole('primary')

  /*
   * Axis chrome is boundary, not content: outline-variant for the rules,
   * on-surface-variant for the text. Same split every Quasar separator uses.
   */
  /* A factory, not one shared object: ECharts merges the theme into each axis
   * model and the four keys below must not end up aliasing one another. */
  const axis = () => ({
    axisLine: { lineStyle: { color: outlineVariant } },
    axisTick: { lineStyle: { color: outlineVariant } },
    axisLabel: { color: onSurfaceVariant },
    splitLine: { lineStyle: { color: outlineVariant } }
  })

  return {
    color: SERIES.map(entry => colorRole(entry.color)),

    /* The card behind the chart owns the surface tone -- see design-system.md
     * on elevation. Painting one here would double it up and clip the card's
     * corner radius with a square canvas fill. */
    backgroundColor: 'transparent',

    textStyle: {
      fontFamily: cssVar('--md-sys-typescale-plain-font'),
      color: onSurface
    },

    title: {
      textStyle: { color: onSurface },
      subtextStyle: { color: onSurfaceVariant }
    },

    legend: {
      textStyle: { color: onSurface },
      inactiveColor: outline,
      pageTextStyle: { color: onSurfaceVariant },
      pageIconColor: onSurfaceVariant,
      pageIconInactiveColor: outlineVariant
    },

    tooltip: {
      backgroundColor: colorRole('surface-container-high'),
      borderColor: outlineVariant,
      borderWidth: 1,
      textStyle: { color: onSurface },
      axisPointer: {
        lineStyle: { color: outline },
        crossStyle: { color: outline },
        /* The pointer's value chip is a floating label over the plot, which is
         * the inverse-surface role's whole purpose. */
        label: {
          backgroundColor: colorRole('inverse-surface'),
          borderColor: colorRole('inverse-surface'),
          color: colorRole('inverse-on-surface')
        },
        shadowStyle: { color: withAlpha(onSurface, 0.08) }
      }
    },

    axisPointer: {
      lineStyle: { color: outline },
      crossStyle: { color: outline },
      label: {
        backgroundColor: colorRole('inverse-surface'),
        color: colorRole('inverse-on-surface')
      }
    },

    categoryAxis: axis(),
    valueAxis: axis(),
    logAxis: axis(),
    timeAxis: axis(),

    /*
     * Pie slices are separated with padAngle rather than a border painted in
     * the card's colour: the card behind them is white in light mode but a
     * surface-container in dark, so no single role can stand in for it. A gap
     * is correct against whatever is behind.
     */
    pie: {
      itemStyle: { borderRadius: 8, borderWidth: 0 },
      padAngle: 2,
      label: { color: onSurface },
      labelLine: { lineStyle: { color: outlineVariant } }
    },

    scatter: {
      label: { color: onSurfaceVariant },
      labelLine: { lineStyle: { color: outlineVariant } }
    },

    /*
     * The gauge's unfilled track is a surface step, not a tint of the value --
     * surface-container-highest is the one that stays visible against both a
     * white card and a dark one.
     */
    gauge: {
      axisLine: { lineStyle: { color: [ [ 1, colorRole('surface-container-highest') ] ] } },
      axisTick: { lineStyle: { color: outlineVariant } },
      splitLine: { lineStyle: { color: outlineVariant } },
      axisLabel: { color: onSurfaceVariant },
      pointer: { itemStyle: { color: primary } },
      anchor: { itemStyle: { color: primary } },
      progress: { itemStyle: { color: primary } },
      title: { color: onSurfaceVariant },
      detail: { color: onSurface }
    }
  }
}

/*
 * Re-resolves the roles for whichever scheme the document is currently in and
 * points `chartTheme` at it. Each scheme is built once: the token values within
 * a scheme never change, so flipping back is a name swap, not a rebuild.
 */
export function refreshChartTheme () {
  if (ready() === false) return

  const name = document.body.classList.contains('body--dark') ? DARK : LIGHT
  if (registered.has(name) === false) {
    registerTheme(name, buildTheme())
    registered.add(name)
  }
  active.value = name
}

if (ready() === true) {
  refreshChartTheme()

  /* Body picks up unrelated classes too (platform flags, scroll locks), so the
   * callback is deliberately cheap: refreshChartTheme() short-circuits unless
   * the scheme actually changed. */
  new MutationObserver(() => refreshChartTheme())
    .observe(document.body, { attributes: true, attributeFilter: [ 'class' ] })
}
