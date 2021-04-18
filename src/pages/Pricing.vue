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
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12" v-for="pricing_item, pricing_index in pricing_data">
            <card-pricing :title="pricing_item.title" :icon="pricing_item.icon" :price="pricing_item.price"
                          :background_image="pricing_item.background_image" :text="pricing_item.text"></card-pricing>
          </div>
        </div>
      </section>
    </q-page-container>

    <section class="flex row flex-center q-py-sm ">
      <div class="text-weight-bold text-subtitle2 text-white ">
        Copyright © {{ year }}, made with
        <q-icon name="fas fa-heart"></q-icon>
        by Pratik Patel
      </div>
    </section>
  </q-layout>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue'

const pricing_data = [
  {
    title: 'Basic',
    price: '$0',
    icon: 'home_work',
    background_image: 'linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)',
    text: 'This is good if your company size is between 2 and 10 Persons.'
  },
  {
    title: 'Small Company',
    price: '$25',
    icon: 'home',
    background_image: 'linear-gradient(-225deg, #5D9FFF 0%, #6BBBFF 100%)',
    text: 'This is good if your company size is between 2 and 10 Persons.'
  },
  {
    title: 'Extended',
    price: '$250',
    icon: 'apartment',
    background_image: 'linear-gradient(to right, #2B86C5 0%, #2B86C5 100%)',
    text: 'This is good if your company size is between 2 and 10 Persons.'
  },
  {
    title: 'Extra Pack',
    price: '$750',
    icon: 'business_center',
    background_image: 'linear-gradient(87deg, rgb(17, 205, 239), rgb(17, 113, 239)) !important',
    text: 'This is good if your company size is between 2 and 10 Persons.'
  },
]
export default defineComponent({
  name: "Pricing",
  components: {
    CardPricing: defineAsyncComponent(() => import('components/cards/CardPricing'))
  },
  setup() {
    return {
      year: (new Date()).getFullYear(),
      pricing_data
    }
  }
})
</script>

<style scoped>

</style>
