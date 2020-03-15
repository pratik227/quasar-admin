<template>
  <q-page class="q-pa-sm">
    <div id="myMap" style="height: 85vh;"></div>
  </q-page>
</template>

<script>
    export default {
        name: "Map",
        data(){
            return {
                mapData: ''
            }
        },
        mounted() {
            this.initMap();
        },
        methods: {
            initMap() {
                this.mapData = new google.maps.Map(document.getElementById('myMap'), {
                    center: {lat: 54.0682082, lng: -3.6191708},
                    zoom: 7
                })
            }
        }
    }
</script>

<style scoped>

</style>
