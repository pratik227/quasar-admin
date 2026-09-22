<template>
  <q-page class="md-page">
    <!--
      Three equal columns of sample cards. With Quasar's breakpoints realigned
      to Material's, `col-md-4` now splits at 840px -- the point where the
      scaffold gains its second pane -- and everything below that is one column.
    -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4">
        <q-card class="no-shadow" bordered>
          <q-img
            src="/img/parallax1.jpg"
            alt=""
          />
          <q-separator></q-separator>
          <q-card-section class="md-title-large q-pa-md">
            Bar XYZ
          </q-card-section>
          <q-separator></q-separator>

          <q-card-section class="md-title-large q-pa-md">
            Gas Station
          </q-card-section>
          <q-card-section>
            <div class="md-headline-small q-mt-sm q-mb-xs">Title</div>
            <div class="md-body-medium md-measure">
              {{ text }}
            </div>
          </q-card-section>
          <q-card-actions>
            <!-- No `color` prop: Quasar pairs a filled colour with a hardcoded
                 `text-white`, which is unreadable on the dark-scheme primary.
                 The role pair lives on the class instead. -->
            <q-btn label="Go Somewhere" unelevated class="text-capitalize md-filled-button"/>
          </q-card-actions>
        </q-card>

        <basic-card class="q-mt-lg"></basic-card>

        <card-cafe class="q-mt-lg"></card-cafe>
      </div>
      <div class="col-12 col-md-4">

        <basic-card></basic-card>

        <card-item class="q-mt-lg" :name="profile_card_data.name" :des="profile_card_data.des"
                   :avatar="profile_card_data.avatar"></card-item>

        <card-profile class="q-mt-lg" :name="profile_card_data.name" :des="profile_card_data.des"
                      :avatar="profile_card_data.avatar"></card-profile>

        <card-profile-dark class="q-mt-lg" :name="profile_data.name" :des="profile_data.des"
                           :text="profile_data.text"></card-profile-dark>
      </div>
      <div class="col-12 col-md-4">

        <!--
          `background_image` is deliberately not passed any more. It used to
          carry two hardcoded gradients (#30cfd0/#330867 and rgb(45,206,137)...)
          that could not follow the theme; CardCompany now paints itself from
          primary-container with its on- pair, so the tile is legible in both
          schemes without the page dictating a colour.
        -->
        <card-company class="q-mt-lg"></card-company>

        <basic-card class="q-mt-lg"></basic-card>

        <card-company class="q-mt-lg"></card-company>

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
    CardItem: defineAsyncComponent(() => import('@/components/cards/CardItem.vue')),
    CardCafe: defineAsyncComponent(() => import('@/components/cards/CardCafe.vue')),
    CardCompany: defineAsyncComponent(() => import('@/components/cards/CardCompany.vue')),
    CardProfileDark: defineAsyncComponent(() => import('@/components/cards/CardProfileDark.vue')),
    CardProfile: defineAsyncComponent(() => import('@/components/cards/CardProfile.vue')),
    BasicCard: defineAsyncComponent(() => import('@/components/cards/CardBasic.vue'))
  },
  setup() {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    return {
      text,
      profile_card_data: {
        name: 'Pratik Patel',
        des: 'Solutions Developer',
        avatar: '/img/boy-avatar.jpg',
      },
      profile_data: {
        name: 'Pratik Patel',
        des: '--- Solution Developer, Pune',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  },
})
</script>

<style scoped>
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }

</style>
