<template>
  <q-card class="no-shadow" bordered>
    <q-img src="/img/chicken-salad.jpg" alt="Chicken salad served on a plate"/>

    <q-card-section class="absolute absolute-center text-center">
      <q-avatar size="100px" class="shadow-10">
        <img width="100" height="100" src="/img/avatar6.jpg" alt="">
      </q-avatar>
    </q-card-section>

    <q-card-section class="q-pt-none q-mt-xl">
      <div class="text-subtitle1">
        $・Italian, Cafe
      </div>
      <div class="text-caption text-grey">
        Small plates, salads & sandwiches in an intimate setting.
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions>
      <q-btn flat round icon="event"/>
      <q-btn flat color="primary">
        Reserve
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardCafe"
})
</script>

<style scoped>

</style>
