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
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }

/* The map canvas is the page's single pane, so it gets a card's corner. */
.md-map {
  block-size: 85vh;
  border-radius: var(--md-sys-shape-corner-large);
  overflow: hidden;
}
</style>
