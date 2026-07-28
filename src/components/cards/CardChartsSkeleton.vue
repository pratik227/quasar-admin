<!--
  Placeholder shown while CardCharts (and the ECharts chunk it pulls) loads.

  CardCharts stays lazily loaded so ECharts stays out of the dashboard's first
  paint, but rendering nothing in the meantime shifted the whole page down once
  it arrived. This mirrors CardCharts' structure and its fixed 250px chart height
  so the space is reserved up front and Cumulative Layout Shift stays at 0.

  The card titles are real text (they render instantly); only the chart area is a
  QSkeleton. `dark` keeps the skeleton visible on the coloured card backgrounds.

  Keep the column classes and the 250px height in sync with CardCharts.vue.
-->
<template>
  <div class="row q-col-gutter-sm q-py-sm">
    <div
      v-for="card in cards"
      :key="card.color"
      class="col-lg-4 col-md-4 col-sm-12 col-xs-12"
    >
      <q-card class="q-ma-xs no-shadow" bordered :style="{ backgroundColor: card.color }">
        <q-card-section class="text-h6 text-white">
          {{ card.title }}
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-skeleton
            dark
            square
            type="rect"
            animation="wave"
            height="250px"
            class="q-mt-md"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardChartsSkeleton',
  setup () {
    return {
      cards: [
        { title: "Today's View", color: '#298190' },
        { title: 'Daily Sales', color: '#d04359' },
        { title: "Today's User Visit", color: '#1b79cc' }
      ]
    }
  }
})
</script>
