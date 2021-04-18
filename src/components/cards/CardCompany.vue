<template>
  <q-card class="text-white" :style="{'background-image': background_image}">
    <q-card-section>
      <div class="text-h6 text-center">
        Extended
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      <div class="text-h3 text-weight-bolder text-center">
        <q-icon name="apartment"></q-icon>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="text-h4 text-weight-bolder text-center">
        $250
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-bolder text-center">
        This is good if your company size is between 2 and 10 Persons.
      </div>
    </q-card-section>
    <q-card-actions vertical align="center">
      <q-btn class="text-capitalize bg-indigo-8" color="">Start Free Trail</q-btn>
    </q-card-actions>
    <q-separator/>
    <q-card-section class="text-center">
      Request Demo
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardCompany",

  props:['background_image']
})
</script>

<style scoped>

</style>
