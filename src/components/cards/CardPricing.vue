<template>
  <!--
    As in CardCompany.vue, `background_image` stays in the public API and still
    paints over the card when Pricing.vue passes one; the card's own colour is
    now a role pair, so it is already correct the day the page stops sending a
    hardcoded gradient.
  -->
  <q-card flat class="md-plan" :style="{'background-image': background_image}">
    <q-card-section>
      <div class="md-title-large md-title-large--emphasized text-center">
        {{ title }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-center">
        <q-icon :name="icon" size="45px"></q-icon>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="md-display-medium md-display-medium--emphasized text-center">
        {{ price }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="md-title-medium text-center md-measure">
        {{ text }}
      </div>
    </q-card-section>
    <q-card-actions vertical align="center">
      <!-- No `color`: an outlined button already draws border and label from
           currentColor, which is the container's on- role. -->
      <q-btn outline class="text-capitalize">Buy Now</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardPricing",

  props:['background_image','title','icon','price','text']
})
</script>

<style scoped>
.md-plan {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-radius: var(--md-sys-shape-corner-extra-large);
}
</style>
