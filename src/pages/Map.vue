<template>
  <q-page class="q-pa-sm">
    <div id="myMap" style="height: 85vh;"></div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

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
  mounted() {
    this.initMap();
  },
})
</script>

<style scoped>

</style>
