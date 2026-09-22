<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="card in cards"
      :key="card.title"
      class="col-lg-4 col-md-4 col-sm-12 col-xs-12"
    >
      <q-card flat class="md-chart-card" :class="`md-chart-card--${card.tone}`">
        <q-card-section class="md-title-medium">
          {{ card.title }}
        </q-card-section>
        <q-card-section class="q-pa-none">
          <ECharts :option="card.option"
                   :theme="chartTheme"
                   class="q-mt-md"
                   :resizable="true"
                   autoresize style="height: 250px;"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {graphic} from '@/utils/echarts.js'
import {chartTheme, colorRole, withAlpha} from '@/utils/echarts-theme.js'
import ECharts from "vue-echarts";

/*
 * These three used to be #298190 / #d04359 / #1b79cc -- hexes picked to shout
 * against a white page, which meant they could not follow the theme and read as
 * three unrelated blocks above the KPI tiles.
 *
 * They now use the same mechanism CardSocial's tiles do, in the same rotation:
 * a container role for the fill and its `on-` pair for everything drawn on top,
 * including the chart ink. That pairing is what guarantees the series stays
 * legible on the card in both schemes -- the alternative, letting the shared
 * categorical palette colour these, would put a tone-40 line on a tone-90
 * container and lose it.
 *
 * error-container is out of the rotation for the reason given in CardSocial:
 * it carries meaning, and a sales chart tinted with it reads as a failure.
 */
const CARDS = [
  { title: "Today's View", tone: 'primary', chart: 'visits' },
  { title: 'Daily Sales', tone: 'secondary', chart: 'sales' },
  { title: "Today's User Visit", tone: 'tertiary', chart: 'visits-smooth' }
]

const VISITS = [
  {month: 'Jan', 'Unique Visit': 296, 'Page View': 548},
  {month: 'Feb', 'Unique Visit': 1181, 'Page View': 714},
  {month: 'Mar', 'Unique Visit': 235, 'Page View': 961},
  {month: 'Apr', 'Unique Visit': 294, 'Page View': 580},
  {month: 'May', 'Unique Visit': 765, 'Page View': 730},
  {month: 'Jun', 'Unique Visit': 412, 'Page View': 1249},
  {month: 'Jul', 'Unique Visit': 1125, 'Page View': 267},
  {month: 'Aug', 'Unique Visit': 800, 'Page View': 251},
  {month: 'Sep', 'Unique Visit': 948, 'Page View': 1043},
  {month: 'Oct', 'Unique Visit': 1046, 'Page View': 1118},
  {month: 'Nov', 'Unique Visit': 363, 'Page View': 573},
  {month: 'Dec', 'Unique Visit': 909, 'Page View': 283}
]

const SALES = [
  {label: '0D', max: 500, sales: 220}, {label: '1D', max: 500, sales: 182},
  {label: '2D', max: 500, sales: 191}, {label: '3D', max: 500, sales: 234},
  {label: '4D', max: 500, sales: 290}, {label: '5D', max: 500, sales: 330},
  {label: '6D', max: 500, sales: 310}, {label: '7D', max: 500, sales: 123},
  {label: '8D', max: 500, sales: 442}, {label: '9D', max: 500, sales: 321},
  {label: '10D', max: 500, sales: 90}, {label: '11D', max: 500, sales: 149},
  {label: '12D', max: 500, sales: 210}, {label: '13D', max: 500, sales: 122},
  {label: '14D', max: 500, sales: 133}, {label: '15D', max: 500, sales: 334},
  {label: '16D', max: 500, sales: 198}, {label: '17D', max: 500, sales: 123},
  {label: '18D', max: 500, sales: 125}, {label: '19D', max: 500, sales: 220}
]

/* Both axes are hidden -- these are sparklines, and the card's title carries
 * the meaning -- so no axis chrome is configured here; the theme covers the
 * tooltip, which is the only chrome that shows. */
const hiddenAxis = type => ({ show: false, type })

function visitsOption (ink, smooth) {
  return {
    tooltip: {trigger: 'axis'},
    grid: {containLabel: true, left: '0', bottom: '0', right: '0'},
    xAxis: {...hiddenAxis('category'), boundaryGap: false},
    yAxis: hiddenAxis('value'),
    color: [ink],
    series: [{
      type: 'line',
      smooth,
      showSymbol: false,
      /* Fading the fill to nothing rather than filling solid keeps the card a
       * container with a chart on it, instead of two stacked blocks of colour. */
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {offset: 0, color: withAlpha(ink, 0.38)},
          {offset: 1, color: withAlpha(ink, 0.02)}
        ])
      }
    }],
    dataset: {source: VISITS}
  }
}

function salesOption (ink) {
  return {
    tooltip: {},
    grid: {containLabel: true, bottom: '10%', top: '5%'},
    xAxis: hiddenAxis('category'),
    yAxis: hiddenAxis('value'),
    series: [
      /* The first series is the full-height track the sales bar sits in: the
       * card's own ink at state-layer opacity, not a grey. */
      {type: 'bar', barGap: '-100%', barWidth: '50%', itemStyle: {color: withAlpha(ink, 0.12)}},
      {type: 'bar', barWidth: '50%', itemStyle: {color: ink}}
    ],
    dataset: {source: SALES}
  }
}

export default defineComponent({
  name: 'CardCharts',
  components:{
    ECharts
  },
  setup () {
    return {chartTheme}
  },
  computed: {
    /*
     * The ink is read out of the document, so it has to be re-read when the
     * scheme flips -- setTheme() re-colours a palette series, but these set
     * their colour explicitly and carry gradients, which it cannot reach.
     * chartTheme is the signal; see echarts-theme.js.
     */
    cards () {
      void this.chartTheme

      return CARDS.map(card => {
        const ink = colorRole(`on-${card.tone}-container`)

        return {
          title: card.title,
          tone: card.tone,
          option: card.chart === 'sales'
            ? salesOption(ink)
            : visitsOption(ink, card.chart === 'visits-smooth')
        }
      })
    }
  }
})
</script>

<style scoped>
/*
 * Kept in sync with CardChartsSkeleton.vue, which mirrors this footprint to
 * hold the dashboard's layout while the ECharts chunk loads. Radius, padding
 * and the 250px chart height have to change in both files or CLS comes back.
 *
 * 28px matches CardSocial's KPI tiles; overflow is clipped because the chart
 * canvas runs flush to the bottom edge and would square the corners off.
 */
.md-chart-card {
  border-radius: var(--md-sys-shape-corner-extra-large);
  overflow: hidden;
}

.md-chart-card--primary {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.md-chart-card--secondary {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-chart-card--tertiary {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}
</style>
