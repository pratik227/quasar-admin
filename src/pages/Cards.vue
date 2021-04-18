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
              {{ text }}
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn label="Go Somewhere" class="text-capitalize" color="indigo-7"/>
          </q-card-actions>
        </q-card>

        <basic-card class="q-mt-lg"></basic-card>

        <card-cafe class="q-mt-lg"></card-cafe>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">

        <basic-card></basic-card>

        <card-item class="q-mt-lg" :name="profile_card_data.name" :des="profile_card_data.des"
                   :avatar="profile_card_data.avatar"></card-item>

        <card-profile class="q-mt-lg" :name="profile_card_data.name" :des="profile_card_data.des"
                      :avatar="profile_card_data.avatar"></card-profile>

        <card-profile-dark class="q-mt-lg" :name="profile_data.name" :des="profile_data.des"
                           :text="profile_data.text"></card-profile-dark>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">

        <card-company class="q-mt-lg" :background_image="background_img2"></card-company>

        <basic-card class="q-mt-lg"></basic-card>

        <card-company class="q-mt-lg" :background_image="background_img1"></card-company>

        <card-profile-dark class="q-mt-lg" :name="profile_data.name" :des="profile_data.des"
                           :text="profile_data.text"></card-profile-dark>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue'

export default defineComponent({
  name: "Cards",
  components: {
    CardItem: defineAsyncComponent(() => import('components/cards/CardItem')),
    CardCafe: defineAsyncComponent(() => import('components/cards/CardCafe')),
    CardCompany: defineAsyncComponent(() => import('components/cards/CardCompany')),
    CardProfileDark: defineAsyncComponent(() => import('components/cards/CardProfileDark')),
    CardProfile: defineAsyncComponent(() => import('components/cards/CardProfile')),
    BasicCard: defineAsyncComponent(() => import('components/cards/CardBasic'))
  },
  setup() {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    return {
      text,
      profile_card_data: {
        name: 'Pratik Patel',
        des: 'Solutions Developer',
        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
      },
      profile_data: {
        name: 'Pratik Patel',
        des: '--- Solution Developer, Pune',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      },
      background_img1: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
      background_img2: 'linear-gradient(87deg, rgb(45, 206, 137), rgb(45, 206, 204)) !important'
    }
  },
})
</script>

<style scoped>

</style>
