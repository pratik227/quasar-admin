/*
 * Shared ECharts registration.
 *
 * vue-echarts renders through "echarts/core", which ships with nothing
 * registered. Importing the full "echarts" bundle instead would work, but pulls
 * ~1.1 MB (every chart type, incl. geo/map data) into the first chunk that
 * touches a chart — which on this app is the dashboard landing page.
 *
 * So we register only what the app's options actually use. When you add a new
 * chart type or a new top-level option key (dataZoom, visualMap, title, ...),
 * add its module here or the chart will fail with "not a constructor".
 *
 * Import this module for its side effect in any component that renders <ECharts>:
 *   import '@/utils/echarts.js'
 */

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import {
  BarChart,
  GaugeChart,
  LineChart,
  PieChart,
  ScatterChart
} from 'echarts/charts'
import {
  AxisPointerComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,

  // series types in use: line, bar, pie, scatter, gauge
  BarChart,
  GaugeChart,
  LineChart,
  PieChart,
  ScatterChart,

  // option keys in use: grid/xAxis/yAxis, tooltip (incl. axisPointer), legend, dataset, title
  AxisPointerComponent,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
])

// Re-exported for building gradients in chart options (see LineChart.vue).
export { graphic } from 'echarts/core'
