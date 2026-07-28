<template>
  <q-page class="q-pa-sm">
    <div id="myMap" style="height: 85vh;"></div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import { loadGoogleMaps } from '@/utils/google-maps.js'

export default defineComponent({
  name: "Map",
  setup() {
    return {
      mapData: ref(''),

      initMap() {
        this.mapData = new google.maps.Map(document.getElementById('myMap'), {
          center: {lat: 54.0682082, lng: -3.6191708},
          zoom: 7
        })
      }
    }
  },
  async mounted() {
    await loadGoogleMaps()
    this.initMap()
  },
})
</script>

<style scoped>

</style>
