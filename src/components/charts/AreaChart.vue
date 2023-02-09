<template>
  <div>
    <q-card class="no-shadow" bordered>
      <q-card-section class="text-h6">
        Stacked Area Chart
      </q-card-section>
      <q-card-section>
        <ECharts :option="options"
                 class="q-mt-md"
                 :resizable="true"
                 autoresize style="height: 285px;"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import ECharts from 'vue-echarts';
import "echarts";
import {defineComponent} from "vue";

export default defineComponent({
  name: "AreaChart",
  setup() {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Email marketing', 'Affiliate advertising', 'Video advertising', 'Direct access', 'Search engine'],
          bottom: 0,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
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
        series: [
          {
            name: 'Email marketing',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Affiliate Advertising',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct access',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  },
  components: {
    ECharts
  }
})
</script>

<style scoped>
</style>
