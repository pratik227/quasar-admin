<template>
  <q-card class="q-pa-sm text-white" style="background-image: linear-gradient(to right, #09203f 0%, #537895 100%);">
    <q-card-section class="text-h6">
      Custom Pie Chart
    </q-card-section>
    <q-card-section class="q-pa-none q-pt-md">
      <IEcharts style="height: 250px;" :option="getPieChartOptions" :resizable="true"></IEcharts>
    </q-card-section>
  </q-card>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.js';

    export default {
        name: "PieChart",
        components: {
            IEcharts
        },
        computed: {
            getPieChartOptions() {
                return {
                    title: {
                        // text: 'Customized Pie',
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                {value: 335, name: 'Direct access'},
                                {value: 310, name: 'Mail Marketing'},
                                {value: 274, name: 'Affiliate Advertising'},
                                {value: 235, name: 'Video ad'},
                                {value: 400, name: 'Search Engine'}
                            ].sort(function (a, b) {
                                return a.value - b.value;
                            }),
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
</style>
