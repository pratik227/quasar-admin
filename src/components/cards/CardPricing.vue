<template>
  <q-card class="text-white" :style="{'background-image': background_image}">
    <q-card-section>
      <div class="text-h6 text-center">
        {{ title }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h2 text-weight-bolder text-center">
        <q-icon :name="icon"></q-icon>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="text-h2 text-weight-bolder text-center">
        {{ price }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-bolder text-center">
        {{ text }}
      </div>
    </q-card-section>
    <q-card-actions vertical align="center">
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

</style>
