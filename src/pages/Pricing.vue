<template>
  <!--
    A marketing page rendered outside MainLayout, so it carries its own surface.
    It used to hang a fixed `linear-gradient(135deg, #5B6A82, #162b4d)` off the
    layout with `text-white` over it, which meant the dark toggle never reached
    it and every heading was the same near-black-on-slate in both schemes.
  -->
  <q-layout view="lHh Lpr lFf" class="md-pricing">
    <q-header class="md-pricing__header">
      <q-toolbar class="md-pricing__toolbar">
        <q-toolbar-title class="md-title-large">
          Pricing Page
        </q-toolbar-title>
        <q-space/>

        <!--
          These three had `color="text-grey-7"`, which Quasar renders as the
          non-existent class `text-text-grey-7`. A flat QBtn with no colour
          draws from currentColor, i.e. the header's on-surface role.
        -->
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn square dense flat to="/" label="Dashboard" icon="dashboard">
            <q-tooltip>Dashboard</q-tooltip>
          </q-btn>
          <q-btn square dense flat to="/Pricing" label="Pricing" icon="lock">
            <q-tooltip>Pricing</q-tooltip>
          </q-btn>
          <q-btn square dense flat to="/Lock-2" label="Lock" icon="lock">
            <q-tooltip>Lock</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <section class="flex flex-center md-pricing__hero">
        <div>
          <div class="md-headline-large text-center">
            Pick the best plan for you
          </div>
          <div class="md-body-large q-pt-sm text-center md-pricing__lede">
            You have Free Unlimited Updates and Premium Support on
            each package.
          </div>
        </div>
      </section>
      <section class="md-pricing__plans">
        <!--
          1 -> 2 -> 4 columns. `col-sm-6` is new: with the breakpoints realigned
          to Material's, `col-md-3` only starts at 840px, so the 600-839 band
          was showing one full-width plan card per row.
        -->
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6 col-md-3" v-for="pricing_item, pricing_index in pricing_data">
            <!--
              `background_image` is no longer passed. It carried four hardcoded
              gradients that could not follow the theme; CardPricing now paints
              itself from primary-container with its on- pair.
            -->
            <card-pricing :title="pricing_item.title" :icon="pricing_item.icon" :price="pricing_item.price"
                          :text="pricing_item.text"></card-pricing>
          </div>
        </div>
      </section>
    </q-page-container>

    <section class="flex row flex-center q-py-md">
      <div class="md-label-large md-pricing__lede">
        Copyright © {{ year }}, made with
        <q-icon name="fas fa-heart"></q-icon>
        by Pratik Patel
      </div>
    </section>
  </q-layout>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue'

const pricing_data = [
  {
    title: 'Basic',
    price: '$0',
    icon: 'home_work',
    text: 'This is good if your company size is between 2 and 10 Persons.'
  },
  {
    title: 'Small Company',
    price: '$25',
    icon: 'home',
    text: 'This is good if your company size is between 2 and 10 Persons.'
  },
  {
    title: 'Extended',
    price: '$250',
    icon: 'apartment',
    text: 'This is good if your company size is between 2 and 10 Persons.'
  },
  {
    title: 'Extra Pack',
    price: '$750',
    icon: 'business_center',
    text: 'This is good if your company size is between 2 and 10 Persons.'
  },
]
export default defineComponent({
  name: "Pricing",
  components: {
    CardPricing: defineAsyncComponent(() => import('@/components/cards/CardPricing.vue'))
  },
  setup() {
    return {
      year: (new Date()).getFullYear(),
      pricing_data
    }
  }
})
</script>

<style scoped>
.md-pricing {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

/* QHeader defaults to bg-primary/text-white; on this page it is part of the
   surface, matching the app bar treatment in MainLayout. */
.md-pricing__header {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

.md-pricing__toolbar {
  min-height: 64px;
  padding-inline: var(--md-layout-margin);
}

/* Was an inline `min-height: 25vh`. The hero steps one container off the page
   so the band is visible without a gradient. */
.md-pricing__hero {
  min-block-size: 25vh;
  padding: var(--md-sys-space-600) var(--md-layout-margin);
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

.md-pricing__plans {
  padding: var(--md-sys-space-300) var(--md-layout-margin) var(--md-sys-space-600);
}

.md-pricing__lede { color: var(--md-sys-color-on-surface-variant); }
</style>
