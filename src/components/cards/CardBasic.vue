<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Our Changing Planet
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section>
      {{ text }}
    </q-card-section>
    <q-card-actions align="left">
      <q-btn label="Go Somewhere" class="text-capitalize q-ma-sm" color="indigo-7"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "BasicCard",
  setup() {
    return {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
})
</script>

<style scoped>

</style>
