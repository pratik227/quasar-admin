<template>
  <q-layout class="bg-image" v-cloak>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="bg-transparent no-border no-shadow">
          <div class="row items-center full-width justify-center q-col-gutter-lg">
            <q-icon name="settings" color="bg-grey-2 text-white" size="5rem"></q-icon>
            <q-icon name="warnings" class="q-ml-lg" color="bg-grey-2 text-white" size="5rem"></q-icon>
          </div>
          <div class="row full-width">
            <div class="col-lg-12 col-md-12 cl-sm-12 col-xs-12">
              <div>
                <div class="text-h3 text-center text-white">
                  Under Maintenance
                </div>
                <div class="text-h6 text-center text-white">
                  Our site is Under Maintenance. We will be back shortly.
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Maintenance"
})
</script>


<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}

[v-cloak] {
  display: none !important;
}
</style>
