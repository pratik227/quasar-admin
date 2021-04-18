<template>
  <div>
    <q-card>
      <q-card-section class="text-h6">
        Pie Chart
      </q-card-section>
      <q-card-section>
        <div ref="piechart" id="pieChart" style="height: 300px;"></div>
      </q-card-section>
      <q-resize-observer @resize="onResize"/>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "PieChart",
  data() {
    return {
      model: false,
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          top: 'bottom',
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access source',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '35%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 1048, name: 'Search Engine'},
              {value: 735, name: 'Direct access'},
              {value: 580, name: 'Email marketing'},
              {value: 484, name: 'Affiliate Advertising'},
              {value: 300, name: 'Video ad'}
            ]
          }
        ]
      },
      pie_chart: null
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    '$q.dark.isActive': function () {
      this.init();
    }
  },
  methods: {
    init() {
      let pieChart = document.getElementById('pieChart');
      echarts.dispose(pieChart);
      let theme = this.model ? 'dark' : 'light';
      this.pie_chart = echarts.init(pieChart, theme);
      this.pie_chart.setOption(this.options)
    },
    onResize() {
      if (this.pie_chart) {
        this.pie_chart.resize();
      }
    }
  }
}
</script>

<style scoped>
</style>
