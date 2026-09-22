<template>
  <q-page class="md-page">
    <div id="myMap" class="md-map"></div>
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
        var myLatLng = {lat: -25.363, lng: 131.044};

        this.mapData = new google.maps.Map(document.getElementById('myMap'), {
          center: {lat: -25.363, lng: 131.044},
          zoom: 7
        })

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: this.mapData,
          title: 'Hello World!'
        });
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
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }

.md-map {
  block-size: 85vh;
  border-radius: var(--md-sys-shape-corner-large);
  overflow: hidden;
}
</style>
