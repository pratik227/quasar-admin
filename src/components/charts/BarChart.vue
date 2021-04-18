<template>
  <div>
    <q-card>
      <q-card-section class="text-h6">
        Bar Chart
        <q-btn icon="fa fa-download" class="float-right" @click="SaveImage" flat dense>
          <q-tooltip>Download PNG</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-card-section>
        <div ref="barchart" id="barChart" style="height: 300px;"></div>
      </q-card-section>
    </q-card>
    <q-resize-observer @resize="onResize"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {ref} from 'vue';

export default defineComponent({
  name: "BarChart",
  setup() {
    return {
      model: ref(false),
      options: {
        legend: {
          bottom: 10,
        },
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '20%',
          top: '5%',
          containLabel: true
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
        ]
      },
      bar_chart: ref(null),
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    SaveImage() {
      const linkSource = this.bar_chart.getDataURL();
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = linkSource;
      downloadLink.target = '_self';
      downloadLink.download = 'BarChart.png';
      downloadLink.click();
    },
    init() {
      let barChart = document.getElementById('barChart');
      this.bar_chart = echarts.init(barChart,'light');
      this.bar_chart.setOption(this.options)
    },
    onResize() {
      if (this.bar_chart) {
        this.bar_chart.resize();
      }
    }
  }
})
</script>

<style scoped>
</style>
