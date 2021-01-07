<template>
  <div class="row q-col-gutter-sm  q-py-sm">
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card class="q-ma-xs" style="background-color: #38b1c5">
        <q-card-section class="text-h6 text-white">
          Today's View
        </q-card-section>
        <q-card-section class="q-pa-none">
          <IEcharts style="height: 250px" :option="LineChart2" :resizable="true"/>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card class="q-ma-xs" style="background-color: #ea4b64">
        <q-card-section class="text-h6 text-white">
          Daily Sales
        </q-card-section>
        <q-card-section class="q-pa-none">
          <IEcharts style="height: 250px" :option="BarChart" :resizable="true"/>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card class="q-ma-xs" style="background-color: #1e88e5">
        <q-card-section class="text-h6 text-white">
          Today's User Visit
        </q-card-section>
        <q-card-section class="q-pa-none">
          <IEcharts style="height: 250px" :option="LineChart" :resizable="true"/>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.js'
export default {
  name: 'CardCharts',
  components: {
    IEcharts
  },
  data () {
    return {
      BarChart: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "bottom": "10%", "top": "5%"},
        "xAxis": {
            "show": false,
            "type": "category",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisTick": {
                "show": true,
                "alignWithLabel": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            },
            "axisLabel": {"show": false}
        },
        "yAxis": {
            "show": false,
            "type": "value",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisLabel": {"show": false},
            "splitLine": {"lineStyle": {"type": "dashed"}},
            "axisTick": {
                "show": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            }
        },
        "series": [{
            "type": "bar",
            "barGap": "-100%",
            "itemStyle": {"normal": {"color": "rgba(0,0,0,0.1)"}},
            "barWidth": "50%"
        }, {"barWidth": "50%", "type": "bar", "itemStyle": {"normal": {"color": "#ffffff"}}}],
        "dataset": {
            "source": [{"label": "0D", "max": 500, "sales": 220}, {
                "label": "1D",
                "max": 500,
                "sales": 182
            }, {"label": "2D", "max": 500, "sales": 191}, {
                "label": "3D",
                "max": 500,
                "sales": 234
            }, {"label": "4D", "max": 500, "sales": 290}, {
                "label": "5D",
                "max": 500,
                "sales": 330
            }, {"label": "6D", "max": 500, "sales": 310}, {
                "label": "7D",
                "max": 500,
                "sales": 123
            }, {"label": "8D", "max": 500, "sales": 442}, {
                "label": "9D",
                "max": 500,
                "sales": 321
            }, {"label": "10D", "max": 500, "sales": 90}, {
                "label": "11D",
                "max": 500,
                "sales": 149
            }, {"label": "12D", "max": 500, "sales": 210}, {
                "label": "13D",
                "max": 500,
                "sales": 122
            }, {"label": "14D", "max": 500, "sales": 133}, {
                "label": "15D",
                "max": 500,
                "sales": 334
            }, {"label": "16D", "max": 500, "sales": 198}, {
                "label": "17D",
                "max": 500,
                "sales": 123
            }, {"label": "18D", "max": 500, "sales": 125}, {"label": "19D", "max": 500, "sales": 220}]
        }
    },
    LineChart: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "left": "0", "bottom": "0", "right": "0"},
        "xAxis": {
            "show": false,
            "type": "category",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisTick": {
                "show": true,
                "alignWithLabel": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            },
            "axisLabel": {"show": false},
            "boundaryGap": false
        },
        "yAxis": {
            "show": false,
            "type": "value",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisLabel": {"show": false},
            "splitLine": {"lineStyle": {"type": "dashed"}},
            "axisTick": {
                "show": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            }
        },
        "series": [{"type": "line", "areaStyle": {}, "smooth": true}],
        "dataset": {
            "source": [{"month": "Jan", "Unique Visit": 296, "Page View": 548}, {
                "month": "Feb",
                "Unique Visit": 1181,
                "Page View": 714
            }, {"month": "Mar", "Unique Visit": 235, "Page View": 961}, {
                "month": "Apr",
                "Unique Visit": 294,
                "Page View": 580
            }, {"month": "May", "Unique Visit": 765, "Page View": 730}, {
                "month": "Jun",
                "Unique Visit": 412,
                "Page View": 1249
            }, {"month": "Jul", "Unique Visit": 1125, "Page View": 267}, {
                "month": "Aug",
                "Unique Visit": 800,
                "Page View": 251
            }, {"month": "Sep", "Unique Visit": 948, "Page View": 1043}, {
                "month": "Oct",
                "Unique Visit": 1046,
                "Page View": 1118
            }, {"month": "Nov", "Unique Visit": 363, "Page View": 573}, {
                "month": "Dec",
                "Unique Visit": 909,
                "Page View": 283
            }]
        },
        "color": ["#2196f3"]
    },
    LineChart2: {
        "tooltip": {"show": true},
        "title": {"show": true, "textStyle": {"color": "rgba(0, 0, 0 , .87)", "fontFamily": "sans-serif"}},
        "grid": {"containLabel": true, "left": "0", "bottom": "0", "right": "0"},
        "xAxis": {
            "show": false,
            "type": "category",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisTick": {
                "show": true,
                "alignWithLabel": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            },
            "axisLabel": {"show": false},
            "boundaryGap": false
        },
        "yAxis": {
            "show": false,
            "type": "value",
            "axisLine": {"lineStyle": {"color": "rgba(0, 0, 0 , .54)", "type": "dashed"}},
            "axisLabel": {"show": false},
            "splitLine": {"lineStyle": {"type": "dashed"}},
            "axisTick": {
                "show": true,
                "lineStyle": {"show": true, "color": "rgba(0, 0, 0 , .54)", "type": "dashed"}
            }
        },
        "series": [{"type": "line", "areaStyle": {}, "smooth": false}],
        "dataset": {
            "source": [{"month": "Jan", "Unique Visit": 296, "Page View": 548}, {
                "month": "Feb",
                "Unique Visit": 1181,
                "Page View": 714
            }, {"month": "Mar", "Unique Visit": 235, "Page View": 961}, {
                "month": "Apr",
                "Unique Visit": 294,
                "Page View": 580
            }, {"month": "May", "Unique Visit": 765, "Page View": 730}, {
                "month": "Jun",
                "Unique Visit": 412,
                "Page View": 1249
            }, {"month": "Jul", "Unique Visit": 1125, "Page View": 267}, {
                "month": "Aug",
                "Unique Visit": 800,
                "Page View": 251
            }, {"month": "Sep", "Unique Visit": 948, "Page View": 1043}, {
                "month": "Oct",
                "Unique Visit": 1046,
                "Page View": 1118
            }, {"month": "Nov", "Unique Visit": 363, "Page View": 573}, {
                "month": "Dec",
                "Unique Visit": 909,
                "Page View": 283
            }]
        },
        "color": ["#45c2c5"]
    },
    }
  }
}
</script>