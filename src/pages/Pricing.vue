<template>
  <q-layout view="lHh Lpr lFf" style="background:linear-gradient( 135deg, #5B6A82 10%, #162b4d 100%)">
    <q-header class="bg-transparent text-white">
      <q-toolbar class="q-pa-md">
        <q-toolbar-title>
          Pricing Page
        </q-toolbar-title>
        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn square dense flat color="text-grey-7" to="/" label="Dashboard" icon="dashboard">
            <q-tooltip>Dashboard</q-tooltip>
          </q-btn>
          <q-btn square dense flat color="text-grey-7" to="/Pricing" label="Pricing" icon="lock">
            <q-tooltip>Pricing</q-tooltip>
          </q-btn>
          <q-btn square dense flat color="text-grey-7" to="/Lock-2" label="Lock" icon="lock">
            <q-tooltip>Lock</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <section style="min-height: 25vh;" class="flex text-white flex-center layout_bg">
        <div style="position: relative">
          <div class="text-h4 text-center">
            Pick the best plan for you
          </div>
          <div class="text-subtitle2 q-pt-sm text-center">
            You have Free Unlimited Updates and Premium Support on
            each package.
          </div>
        </div>
      </section>
      <section class="q-pb-lg">
        <div class="row q-col-gutter-sm q-px-sm">
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
            <q-card class="text-white" style="background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);">
              <q-card-section>
                <div class="text-h6 text-center">
                  Basic
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h2 text-weight-bolder text-center">
                  <q-icon name="home_work"></q-icon>
                </div>
              </q-card-section>
              <q-card-section class="q-pa-none">
                <div class="text-h2 text-weight-bolder text-center">
                  $0
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-weight-bolder text-center">
                  This is good if your company size is between 2 and 10 Persons.
                </div>
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn outline class="text-capitalize">Buy Now</q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
            <q-card class="text-white"
                    style="background-image: linear-gradient(-225deg, #5D9FFF 0%, #6BBBFF 100%);">
              <q-card-section>
                <div class="text-h6 text-center">
                  Small Compnay
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h2 text-weight-bolder text-center">
                  <q-icon name="home"></q-icon>
                </div>
              </q-card-section>
              <q-card-section class="q-pa-none">
                <div class="text-h2 text-weight-bolder text-center">
                  $25
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-weight-bolder text-center">
                  This is good if your company size is between 2 and 10 Persons.
                </div>
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn outline class="text-capitalize">Buy Now</q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
            <q-card class="text-white"
                    style="background-color: #2B86C5">
              <q-card-section>
                <div class="text-h6 text-center">
                  Extended
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h2 text-weight-bolder text-center">
                  <q-icon name="apartment"></q-icon>
                </div>
              </q-card-section>
              <q-card-section class="q-pa-none">
                <div class="text-h2 text-weight-bolder text-center">
                  $250
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-weight-bolder text-center">
                  This is good if your company size is between 2 and 10 Persons.
                </div>
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn outline class="text-capitalize">Buy Now</q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
            <q-card class="text-white"
                    style="background-image: linear-gradient(87deg, rgb(17, 205, 239), rgb(17, 113, 239)) !important">
              <q-card-section>
                <div class="text-h6 text-center">
                  Extra Pack
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h2 text-weight-bolder text-center">
                  <q-icon name="business_center"></q-icon>
                </div>
              </q-card-section>
              <q-card-section class="q-pa-none">
                <div class="text-h2 text-weight-bolder text-center">
                  $750
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-weight-bolder text-center">
                  This is good if your company size is between 2 and 10 Persons.
                </div>
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn outline class="text-capitalize">Buy Now</q-btn>
              </q-card-actions>
            </q-card>
          </div>

        </div>
      </section>
    </q-page-container>

    <section class="flex row flex-center q-py-sm ">
      <!--      <div class="flex col-12 q-pa-xs flex-center">-->
      <!--        <q-icon name="fab fa-github" color="white" size="md">-->
      <!--        </q-icon>-->
      <!--      </div>-->
      <div class="text-weight-bold text-subtitle2 text-white ">
        Copyright © {{ year }}, made with
        <q-icon name="fas fa-heart"></q-icon>
        by Pratik Patel
      </div>
    </section>
  </q-layout>
</template>

<script>
    export default {
        name: "Pricing",
        data() {
            return {
                year: (new Date()).getFullYear(),
            }
        }
    }
</script>

<style scoped>

</style>
