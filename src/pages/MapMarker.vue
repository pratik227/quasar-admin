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
    }
</script>

<style scoped>

</style>
