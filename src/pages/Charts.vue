<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm q-py-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <bar-chart></bar-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <line-chart></line-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <scatter-plot></scatter-plot>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <pie-chart></pie-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <area-chart></area-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
    PieChart: defineAsyncComponent(() => import('components/charts/PieChart.vue')),
    ScatterPlot: defineAsyncComponent(() => import('components/charts/ScatterPlot.vue')),
    LineChart: defineAsyncComponent(() => import('components/charts/LineChart.vue')),
    BarChart: defineAsyncComponent(() => import('components/charts/BarChart.vue')),
    AreaChart: defineAsyncComponent(() => import('components/charts/AreaChart.vue')),
    GuageChart: defineAsyncComponent(() => import('components/charts/GuageChart.vue')),
  },
})
</script>

<style scoped>

</style>
