<template>
  <q-item clickable>
    <q-item-section avatar>
      <q-avatar>
        <img width="40" height="40" :src="avatar" alt="">
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1" class="md-body-large">{{ name }}</q-item-label>
      <q-item-label caption lines="2">
        <span class="md-label-medium md-label-medium--emphasized">{{ position }}</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "ContactItem",
  props: ['avatar', 'name', 'position']
})
</script>

<style scoped>
/*
 * No colour of its own on purpose. Quasar resolves the caption and the trailing
 * section from currentColor (54% / 70%), so the row inherits whatever surface
 * role its list is painted with and needs no `text-*` class to stay legible in
 * either scheme.
 */
</style>
