<template>
  <!--
    Two panes side by side from expanded (840px) up, stacked below it -- the
    grid columns own the widths now, so the old inline `width: 50%` (which
    fought the column at every size) is gone.
  -->
  <q-page class="md-page row q-col-gutter-md">
    <div id="myMap" class="col-12 col-md-6 md-map"></div>
    <div id="pano" class="col-12 col-md-6 md-map"></div>
  </q-page>
</template>

<script>

import {defineComponent} from 'vue'
import {ref} from 'vue'
import { loadGoogleMaps } from '@/utils/google-maps.js'

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
