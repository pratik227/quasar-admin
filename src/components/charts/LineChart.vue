<template>
  <div>
    <q-card class="no-shadow" bordered>
      <q-card-section class="text-h6">
        Line Chart
      </q-card-section>
      <q-card-section>
        <ECharts :option="options"
                 :theme="chartTheme"
                 class="q-mt-md"
                 :resizable="true"
                 autoresize style="height: 300px;"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import '@/utils/echarts.js'
import { chartTheme, seriesGradient } from '@/utils/echarts-theme.js'
import ECharts from "vue-echarts";
import {defineComponent} from "vue";

const SERIES = [
  { name: 'Line 1', data: [140, 232, 101, 264, 90, 340, 250] },
  { name: 'Line 2', data: [120, 282, 111, 234, 220, 340, 310] },
  { name: 'Line 3', data: [320, 132, 201, 334, 190, 130, 220] },
  { name: 'Line 4', data: [220, 402, 231, 134, 190, 230, 120] },
  { name: 'Line 5', data: [220, 302, 181, 234, 210, 290, 150] }
]

export default defineComponent({
  name: "LineChart",
  components:{
    ECharts
  },
  setup() {
    return {chartTheme}
  },
  computed: {
    /*
     * Computed rather than static because the area gradients are resolved
     * colour baked into the option: setTheme() can re-colour a series but it
     * cannot rewrite a LinearGradient that is already in there. Reading
     * chartTheme is what makes this rebuild when the scheme flips.
     */
    options() {
      void this.chartTheme

      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: SERIES.map(series => series.name),
          bottom: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '20%',
          top: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: SERIES.map((series, index) => ({
          name: series.name,
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          /*
           * The bands are the chart -- there is no stroke -- so they stay fully
           * opaque. A translucent fill would let the stack below bleed through
           * and turn two adjacent roles into a third colour that is in no
           * scheme.
           */
          areaStyle: {
            color: seriesGradient(index)
          },
          label: index === SERIES.length - 1
            ? { show: true, position: 'top' }
            : undefined,
          emphasis: {
            focus: 'series'
          },
          data: series.data
        }))
      }
    }
  }
})
</script>

<style scoped>
</style>
