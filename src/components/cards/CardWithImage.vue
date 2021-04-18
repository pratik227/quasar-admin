<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="my-card">
      <q-img
        src="https://cdn.quasar.dev/img/parallax1.jpg"
        basic
      >
        <div class="absolute-bottom-left bg-transparent q-ml-md">
          <div class="text-h1">
            28 <sup>o</sup>
          </div>
          <div class="text-h5">
            India
          </div>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CardWithImage'
})
</script>
