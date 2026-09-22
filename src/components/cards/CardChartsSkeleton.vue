<!--
  Placeholder shown while CardCharts (and the ECharts chunk it pulls) loads.

  CardCharts stays lazily loaded so ECharts stays out of the dashboard's first
  paint, but rendering nothing in the meantime shifted the whole page down once
  it arrived. This mirrors CardCharts' structure and its fixed 250px chart height
  so the space is reserved up front and Cumulative Layout Shift stays at 0.

  The card titles are real text (they render instantly); only the chart area is a
  QSkeleton, drawn as a state layer over the card's own ink so it reads as part
  of the container in either scheme.

  Keep the column classes, the tone classes, the title type style, the card
  radius and the 250px height in sync with CardCharts.vue.
-->
<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="card in cards"
      :key="card.title"
      class="col-lg-4 col-md-4 col-sm-12 col-xs-12"
    >
      <q-card flat class="md-chart-card" :class="`md-chart-card--${card.tone}`">
        <q-card-section class="md-title-medium">
          {{ card.title }}
        </q-card-section>
        <q-card-section class="q-pa-none">
          <q-skeleton
            square
            type="rect"
            animation="wave"
            height="250px"
            class="q-mt-md md-chart-card__placeholder"
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
        { title: "Today's View", tone: 'primary' },
        { title: 'Daily Sales', tone: 'secondary' },
        { title: "Today's User Visit", tone: 'tertiary' }
      ]
    }
  }
})
</script>

<style scoped>
/* Duplicated from CardCharts.vue on purpose: the two components must render an
 * identical box, and a shared stylesheet would let one drift without the other
 * failing. Change both together. */
.md-chart-card {
  border-radius: var(--md-sys-shape-corner-extra-large);
  overflow: hidden;
}

.md-chart-card--primary {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.md-chart-card--secondary {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-chart-card--tertiary {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

/* QSkeleton's own fill is a fixed black/white alpha, which disappears on a
 * tinted container. A state layer over the card's ink tracks the tone instead. */
.md-chart-card__placeholder {
  background: color-mix(in srgb, currentColor 12%, transparent);
}
</style>
