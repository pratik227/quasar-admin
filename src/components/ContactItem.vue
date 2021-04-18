<template>
  <q-item clickable>
    <q-item-section avatar>
      <q-avatar>
        <img :src="avatar">
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ name }}</q-item-label>
      <q-item-label caption lines="2">
        <span class="text-weight-bold">{{ position }}</span>
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

</style>
