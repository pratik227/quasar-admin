<template>
  <q-card class="q-pa-sm text-white" style="background:linear-gradient( 135deg, #3A6073 25%, #2c343c 80%)">
    <q-card-section class="text-h6">
      Bar
      <q-btn icon="fa fa-download" class="float-right text-white" @click="SaveImage" flat dense color="white">
        <q-tooltip>Download PNG</q-tooltip>
      </q-btn>
    </q-card-section>
    <q-card-section class="q-pa-none q-pt-md">
      <IEcharts style="height: 300px;" ref="barRef" @ready="onReady" :option="bar" :resizable="true"></IEcharts>
    </q-card-section>
  </q-card>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.js';

    export default {
        name: "BarChart",
        data() {
            return {
                ins: null,
                echarts: null,
                bar: {}
            }
        },
        methods: {
            SaveImage() {
                const linkSource = this.$refs.barRef.getDataURL();
                const downloadLink = document.createElement('a');
                document.body.appendChild(downloadLink);
                downloadLink.href = linkSource;
                downloadLink.target = '_self';
                downloadLink.download = 'BarChart.png';
                downloadLink.click();
            },
            onReady(instance, echarts) {
                this.echarts = echarts
                let dataAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                let data = [220, 182, 191, 234, 290, 330, 310, 442, 321, 90, 149, 210];
                let yMax = 500;
                let dataShadow = [];
                for (let i = 0; i < data.length; i++) {
                    dataShadow.push(yMax);
                }
                this.bar = {
                    xAxis: {
                        data: dataAxis,
                        axisLabel: {
                            inside: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        z: 10
                    },
                    grid: {
                        top: '5%',
                        bottom: '15%',
                        left: '8%',
                        right: '5%'
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside'
                        }
                    ],
                    series: [
                        { // For shadow
                            type: 'bar',
                            itemStyle: {
                                normal: {color: 'rgba(0,0,0,0.05)'}
                            },
                            barGap: '-100%',
                            barCategoryGap: '40%',
                            data: dataShadow,
                            animation: false
                        },
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                            data: data
                        }
                    ]
                }
            }
        },
        components: {
            IEcharts
        },
    }
</script>

<style scoped>
</style>
