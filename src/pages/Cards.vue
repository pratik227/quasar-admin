<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-lg">
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <q-card>
          <q-img
            src="https://cdn.quasar.dev/img/parallax1.jpg"
          />
          <q-separator></q-separator>
          <q-card-section class="text-h6 text-grey-8 q-pa-md">
            Bar XYZ
          </q-card-section>
          <q-separator></q-separator>

          <q-card-section class="text-h6 text-grey-8 q-pa-md">
            Gas Station
          </q-card-section>
          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs text-grey-8">Title</div>
            <div>
              {{text}}
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Go Somewhere" class="text-capitalize" color="indigo-7"/>
          </q-card-actions>
        </q-card>

        <basic-card class="q-mt-lg"></basic-card>

        <q-card class="q-mt-lg">
          <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg"/>

          <q-card-section class="absolute absolute-center text-center">
            <q-avatar size="100px" class="shadow-10">
              <img src="https://cdn.quasar.dev/img/avatar6.jpg">
            </q-avatar>
          </q-card-section>

          <q-card-section class="q-pt-none q-mt-xl">
            <div class="text-subtitle1">
              $・Italian, Cafe
            </div>
            <div class="text-caption text-grey">
              Small plates, salads & sandwiches in an intimate setting.
            </div>
          </q-card-section>

          <q-separator/>

          <q-card-actions>
            <q-btn flat round icon="event"/>
            <q-btn flat color="primary">
              Reserve
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">

        <basic-card></basic-card>

        <q-card class="q-mt-lg">
          <q-item>
            <q-item-section avatar>
              <q-avatar size="70px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Pratik Patel</q-item-label>
              <q-item-label caption>
                Solution developer
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn label="add" size="sm" class="bg-indigo-8 text-capitalize text-white"></q-btn>
            </q-item-section>
          </q-item>

          <q-separator/>
        </q-card>

        <q-card class="q-mt-lg">
          <q-card-section class="text-center">
            <q-avatar size="100px" class="shadow-10">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-card-section>

          <q-card-section class="q-pt-none text-center ">
            <div class="text-h6  text-grey-8">
              Pratik Patel
            </div>
            <div class="text-caption text-grey-8">
              Solutions Developer
            </div>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn flat round icon="fab fa-facebook" class="bg-indigo-7 text-white"/>
            <q-btn flat round icon="fab fa-twitter" class="bg-info text-white"/>
            <q-btn flat round icon="fab fa-instagram" class="bg-indigo-8 text-white"/>
          </q-card-actions>
        </q-card>

        <q-card class="q-mt-lg text-white" style="background-color: #181c4d">
          <q-card-section>
            <div class="text-h6 q-pa-sm">
              Pratik Patel
            </div>
            <div class="q-pa-sm">
              {{text}}
            </div>
            <div class="q-pa-sm text-red-6">
              --- Solution Developer, Pune
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <q-card class="text-white"
                style="background:linear-gradient(87deg, rgb(45, 206, 137), rgb(45, 206, 204)) !important;">
          <q-card-section>
            <div class="text-h6 text-center">
              Extended
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <div class="text-h3 text-weight-bolder text-center">
              <q-icon name="apartment"></q-icon>
            </div>
          </q-card-section>
          <q-card-section class="q-pa-none">
            <div class="text-h4 text-weight-bolder text-center">
              $250
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-weight-bolder text-center">
              This is good if your company size is between 2 and 10 Persons.
            </div>
          </q-card-section>
          <q-card-actions vertical align="center">
            <q-btn class="text-capitalize bg-indigo-8" color="">Start Free Trail</q-btn>
          </q-card-actions>
          <q-separator/>
          <q-card-section class="text-center">
            Request Demo
          </q-card-section>
        </q-card>


        <basic-card class="q-mt-lg"></basic-card>

        <q-card class="text-white q-mt-lg"

                style="background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);">
          <q-card-section>
            <div class="text-h6 text-center">
              Extended
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <div class="text-h3 text-weight-bolder text-center">
              <q-icon name="apartment"></q-icon>
            </div>
          </q-card-section>
          <q-card-section class="q-pa-none">
            <div class="text-h4 text-weight-bolder text-center">
              $250
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-weight-bolder text-center">
              This is good if your company size is between 2 and 10 Persons.
            </div>
          </q-card-section>
          <q-card-actions vertical align="center">
            <q-btn class="text-capitalize bg-indigo-8" color="">Start Free Trail</q-btn>
          </q-card-actions>
          <q-separator/>
          <q-card-section class="text-center">
            Request Demo
          </q-card-section>
        </q-card>

         <q-card class="q-mt-lg text-white" style="background-color: #181c4d">
          <q-card-section>
            <div class="text-h6 q-pa-sm">
              Pratik Patel
            </div>
            <div class="q-pa-sm">
              {{text}}
            </div>
            <div class="q-pa-sm text-red-6">
              --- Solution Developer, Pune
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
    import BasicCard from "../layouts/BasicCard";
    export default {
        name: "Cards",
        components: {BasicCard},
        data() {
            return {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
        }
    }
</script>

<style scoped>

</style>
