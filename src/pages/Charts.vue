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
    </div>
  </q-page>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.js'

    export default {
        name: "Charts",
        components: {
            PieChart: () => import('components/charts/PieChart'),
            ScatterPlot: () => import('components/charts/ScatterPlot'),
            LineChart: () => import('components/charts/LineChart'),
            BarChart: () => import('components/charts/BarChart'),
            IEcharts
        },
        data() {
            return {
                options: {
                    title: {
                        text: '阶梯瀑布图',
                        subtext: 'From ExcelHome',
                        sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function (params) {
                            var tar;
                            if (params[1].value != '-') {
                                tar = params[1];
                            } else {
                                tar = params[0];
                            }
                            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                        }
                    },
                    legend: {
                        data: ['bar', 'line']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {show: false},
                        data: function () {
                            var list = [];
                            for (var i = 1; i <= 11; i++) {
                                list.push(i);
                            }
                            return list;
                        }()
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '辅助',
                            type: 'bar',
                            stack: '总量',
                            z: 10,
                            itemStyle: {
                                normal: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                },
                                emphasis: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                    color: 'rgba(0,0,0,0)'
                                }
                            },
                            data: [0, 1000, 1440, 1775, 1376, 1376, 1565, 1860, 2030, 1515, 1280]
                        },
                        {
                            name: 'bar3',
                            type: 'bar',
                            stack: '总量',
                            data: [100, 100, 100, 50, 235, 50, 100, 100, 100, 145, 20]
                        },
                        {
                            name: 'line',
                            type: 'bar',
                            stack: '总量',
                            z: 10,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: [{
                                value: 900,
                                itemStyle: {color: 'blue'},
                            }, 345, {
                                value: 393,
                                itemStyle: {color: 'blue'},
                            }, '-', '-', 135, 178, 286, '-', '-', '-']
                        },
                        {
                            name: 'bar',
                            type: 'bar',
                            stack: '总量',
                            z: 10,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'bottom'
                                }
                            },
                            data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
                        },
                        {
                            name: 'test',
                            type: 'line',
                            symbol: 'none',
                            z: 1,
                            lineStyle: {
                                type: 'dotted'
                            },
                            step: 'start',
                            data: [0, 1000, 1450, 1935, 1770, 1380, 1565, 1850, 2250, 2025, 1505]
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
