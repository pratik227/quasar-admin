<template>
  <q-card>
    <q-card-section class="text-center">
      <q-avatar size="100px" class="shadow-10">
        <img :src="avatar">
      </q-avatar>
    </q-card-section>

    <q-card-section class="q-pt-none text-center ">
      <div class="text-h6  text-grey-8">
        {{ name }}
      </div>
      <div class="text-caption text-grey-8">
        {{ des }}
      </div>
    </q-card-section>

    <q-card-actions align="center">
      <q-btn flat round icon="fab fa-facebook" class="bg-indigo-7 text-white"/>
      <q-btn flat round icon="fab fa-twitter" class="bg-info text-white"/>
      <q-btn flat round icon="fab fa-instagram" class="bg-indigo-8 text-white"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardProfile",
  props: ['avatar', 'name', 'des']
})
</script>

<style scoped>

</style>
