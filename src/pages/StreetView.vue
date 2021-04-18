<template>
  <q-page class="q-pa-sm row">
    <div id="myMap" class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="height: 85vh;width: 50%;"></div>
    <div id="pano" class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="height: 85vh;width: 50%;"></div>
  </q-page>
</template>

<script>

import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "StreetView",
  data() {
    return {
      mapData: ref(''),

      initMap() {
        this.mapData = new google.maps.Map(document.getElementById('myMap'), {
          center: {lat: 42.345573, lng: -71.098326},
          zoom: 7
        })

        let pano = new google.maps.StreetViewPanorama(
          document.getElementById('pano'), {
            position: {lat: 42.345573, lng: -71.098326},
            pov: {
              heading: 34,
              pitch: 10
            }
          });
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

