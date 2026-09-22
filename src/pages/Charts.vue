<template>
  <q-page class="md-page">
    <!--
      Grid: one chart per row on compact/medium, two from expanded (840px) up.
      With Quasar's breakpoints realigned to Material's, `col-md-6` now takes
      effect at 840 rather than 1024, which is where the second pane appears.
    -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <bar-chart></bar-chart>
      </div>
      <div class="col-12 col-md-6">
        <line-chart></line-chart>
      </div>
      <div class="col-12 col-md-6">
        <scatter-plot></scatter-plot>
      </div>
      <div class="col-12 col-md-6">
        <pie-chart></pie-chart>
      </div>
      <div class="col-12 col-md-6">
        <area-chart></area-chart>
      </div>
      <div class="col-12 col-md-6">
        <guage-chart></guage-chart>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue'

export default defineComponent({
  name: "Charts",
  components: {
    PieChart: defineAsyncComponent(() => import('@/components/charts/PieChart.vue')),
    ScatterPlot: defineAsyncComponent(() => import('@/components/charts/ScatterPlot.vue')),
    LineChart: defineAsyncComponent(() => import('@/components/charts/LineChart.vue')),
    BarChart: defineAsyncComponent(() => import('@/components/charts/BarChart.vue')),
    AreaChart: defineAsyncComponent(() => import('@/components/charts/AreaChart.vue')),
    GuageChart: defineAsyncComponent(() => import('@/components/charts/GuageChart.vue')),
  },
})
</script>

<style scoped>
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }
</style>
