<template>
  <q-card class="q-pa-sm text-white" style="background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);">
    <q-card-section class="text-h6">
      Scatter Chart
    </q-card-section>
    <q-card-section class="q-pa-none q-pt-md">
      <IEcharts style="height: 250px;" ref="chartRef" :option="getScatterChartOptions" :resizable="true"></IEcharts>
    </q-card-section>
  </q-card>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.js';

    export default {
        name: "ScatterPlot",
        components: {
            IEcharts
        },
        computed: {
            getScatterChartOptions() {
                return {
                    xAxis: {
                        scale: true,
                        axisLabel: {
                            color: '#fff'
                        }
                    },
                    // toolbox: {
                    //     show: true,
                    //     feature: {
                    //         saveAsImage: {
                    //             title: 'Download PNG',
                    //         }
                    //     }
                    // },
                    grid: {
                        top: '5%',
                        bottom: '15%',
                        left: '8%',
                        right: '5%'
                    },
                    yAxis: {
                        scale: true,
                        axisLabel: {
                            color: '#fff'
                        }
                    },
                    series: [{
                        type: 'scatter',
                        data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                            [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                            [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
                            [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
                            [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
                            [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
                            [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
                            [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
                            [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
                            [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
                            [167.6, 61.0]],
                        color: '#f9982d'
                    }]
                }
            }
        },
    }
</script>

<style scoped>
</style>
