<template>
  <q-page class="q-pa-sm bg-white">
    <q-resize-observer @resize="onResize"/>

    <div class="row" v-if="!$q.screen.lt.sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card class="no-border no-border">
          <q-tab-panels v-model="tab" animated class="bg-white">
            <q-tab-panel name="all" class="q-pa-none full-height" :style="{'height':size['height']-80+'px !important'}">
              <q-list class="">
                <q-item-label class="text-center q-pa-sm">
                  <q-input dense rounded outlined v-model="search">
                    <template v-slot:append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </q-item-label>
                <q-item-label header class="text-center">{{ contacts_list.length }} CONTACTS</q-item-label>


                <span v-for="(contact, index) in contacts_list" :key="index" @click="selected_contact=contact">
                  <contact-item
                    :avatar="contact.avatar" :name="contact.name" :position="contact.position"></contact-item>
                </span>

              </q-list>
            </q-tab-panel>

            <q-tab-panel name="favorites" class="q-pa-none" :style="{'height':size['height']-80+'px !important'}">
              <q-list class="">

                <q-item-label class="text-center q-pa-sm">
                  <q-input dense rounded outlined v-model="search">
                    <template v-slot:append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </q-item-label>
                <q-item-label header class="text-center">{{ favorites_list.length }} Favorites</q-item-label>

                <span v-for="(favorite, index) in favorites_list" :key="index" @click="selected_contact=favorite">
                  <contact-item
                    :avatar="favorite.avatar" :name="favorite.name" :position="favorite.position"></contact-item>
                </span>

              </q-list>
            </q-tab-panel>

          </q-tab-panels>

          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-3"
            align="justify"
          >
            <q-tab name="all" icon="person" class="text-capitalize" label="All"></q-tab>
            <q-tab name="favorites" icon="star" class="text-capitalize" label="Favorites"></q-tab>
          </q-tabs>
        </q-card>
      </div>
      <div class="col-lg-8 q-pl-xs col-md-8 col-sm-12 col-xs-12">
        <q-card class="no-border no-border" :style="{'height':size['height']-24+'px !important'}">
          <q-toolbar class="text-black ">
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img :src="selected_contact.avatar">
              </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label lines="1">{{ selected_contact.name }}</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold">{{ selected_contact.position }}</span>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-space/>

            <q-btn round flat icon="star_outline" color="yellow">
            </q-btn>
            <q-btn round flat icon="edit"/>

          </q-toolbar>
          <q-separator></q-separator>

          <div v-for="detail, detail_index in detail_list">

            <contact-detail-item :icon="detail.icon" :text_color="detail.text_color"
                                 :value="selected_contact[detail['field']]" :label="detail.label"></contact-detail-item>

            <q-separator inset="item" v-if="detail_index!=detail_list.length-1"></q-separator>
          </div>

        </q-card>
      </div>
    </div>

    <div v-else>
      <div v-if="Object.keys(selected_contact).length==0">
        <q-tab-panels v-model="tab" animated class="bg-white">
          <q-tab-panel name="all" class="q-pa-none full-height" :style="{'height':size['height']-100+'px !important'}">
            <q-list class="">

              <q-item-label class="text-center q-pa-sm">
                <q-input dense rounded outlined v-model="search">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label header class="text-center">{{ contacts_list.length }} CONTACTS</q-item-label>

              <span v-for="(contact, index) in contacts_list" :key="index" @click="selected_contact=contact">
                <contact-item
                  :avatar="contact.avatar" :name="contact.name" :position="contact.position"></contact-item>
              </span>

            </q-list>
          </q-tab-panel>

          <q-tab-panel name="favorites" class="q-pa-none" :style="{'height':size['height']-80+'px !important'}">
            <q-list class="">

              <q-item-label class="text-center q-pa-sm">
                <q-input dense rounded outlined v-model="search">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label header class="text-center">{{ favorites_list.length }} Favorites</q-item-label>

              <span v-for="(favorite, index) in favorites_list" :key="index" @click="selected_contact=favorite">
                <contact-item
                  :avatar="favorite.avatar" :name="favorite.name" :position="favorite.position"></contact-item>
              </span>

            </q-list>
          </q-tab-panel>

        </q-tab-panels>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3"
          align="justify"
        >
          <q-tab name="all" icon="person" class="text-capitalize" label="All"></q-tab>
          <q-tab name="favorites" icon="star" class="text-capitalize" label="Favorites"></q-tab>
        </q-tabs>
      </div>
      <transition v-else
                  appear
                  enter-active-class="animated bounceInRight"
      >
        <q-card class="no-border no-border"
                :style="{'height':size['height']-100+'px !important'}">
          <q-toolbar class="text-black ">
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img :src="selected_contact.avatar">
              </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label lines="1">{{ selected_contact.name }}</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold">{{ selected_contact.position }}</span>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-space/>

            <q-btn round flat icon="star_outline" color="yellow">
            </q-btn>
            <q-btn round flat icon="edit"/>
            <q-btn round flat icon="keyboard_backspace" @click="selected_contact={}"/>

          </q-toolbar>
          <q-separator></q-separator>

          <div v-for="detail, detail_index in detail_list">
            <contact-detail-item :icon="detail.icon" :text_color="detail.text_color"
                                 :value="selected_contact[detail['field']]" :label="detail.label"></contact-detail-item>

            <q-separator inset="item" v-if="detail_index!=detail_list.length-1"></q-separator>
          </div>

        </q-card>
      </transition>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue';
import {useQuasar} from "quasar";
import {ref} from 'vue';

const detail_list = [
  {
    icon: 'phone',
    label: 'Phone',
    field: 'phone',
    text_color: 'blue'
  },
  {
    icon: 'phone_iphone',
    label: 'Secondary Phone',
    field: 'secondary_phone',
    text_color: 'orange'
  },
  {
    icon: 'mail',
    label: 'Personal Email',
    field: 'email',
    text_color: 'grey-8'
  },
  {
    icon: 'business_center',
    label: 'Company Email',
    field: 'company_email',
    text_color: 'grey-8'
  },
  {
    icon: 'location_on',
    label: 'Address',
    field: 'address',
    text_color: 'grey-8'
  },
  {
    icon: 'home_work',
    label: 'Website',
    field: 'website',
    text_color: 'grey-8'
  },
];

const contacts_list = [
  {
    name: 'Pratik Patel',
    position: 'Developer',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
    email: 'pratikpatelpp802@gmail.com',
    company_email: 'pratikpatelpp802@gmail.com',
    website: 'www.test.com',
    phone: '+9910101010',
    secondary_phone: '+9910101010',
    address: 'BB 101 Om Sai Residency Palsana'
  },
  {
    name: 'Razvan Stoenescu',
    position: 'Developer',
    avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
    email: 'mailto:razvan@quasar.dev',
    company_email: 'mailto:razvan@quasar.dev',
    website: 'https://github.com/rstoenescu',
    phone: '+1-004-658-0042',
    secondary_phone: '(331) 009-4655 x3147',
    address: '92290 Lisa Cove'
  },
  {
    name: 'Jeff Galbraith',
    position: 'Developer',
    avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
    email: 'mailto:jeff@quasar.dev',
    company_email: 'mailto:jeff@quasar.dev',
    website: 'http://jeffgalbraith.dev/',
    phone: '175.718.4633 x878',
    secondary_phone: '175.718.4633 x878',
    address: 'Calgary, Canada'
  },
  {
    name: 'Brunhilde Panswick',
    position: 'Administrator',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    email: 'test.@quasar.dev',
    company_email: 'test.@quasar.dev',
    website: 'http://test1.dev/',
    phone: '175.718.4633 x878',
    secondary_phone: '175.718.4633 x878',
    address: 'Calgary, Canada'
  },
  {
    name: 'Winfield Stapforth',
    position: 'Administrator',
    avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
    email: 'test2.@quasar.dev',
    company_email: 'test.@quasar.dev',
    website: 'http://test2.dev/',
    phone: '175.718.4633 x878',
    secondary_phone: '175.718.4633 x878',
    address: 'Calgary, Canada'
  },

];

const favorites_list = [
  {
    name: 'Pratik Patel',
    position: 'Developer',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
    email: 'pratikpatelpp802@gmail.com',
    company_email: 'pratikpatelpp802@gmail.com',
    website: 'www.test.com',
    phone: '+9910101010',
    secondary_phone: '+9910101010',
    address: 'BB 101 Om Sai Residency Palsana'
  },
  {
    name: 'Razvan Stoenescu',
    position: 'Developer',
    avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
    email: 'mailto:razvan@quasar.dev',
    company_email: 'mailto:razvan@quasar.dev',
    website: 'https://github.com/rstoenescu',
    phone: '+1-004-658-0042',
    secondary_phone: '(331) 009-4655 x3147',
    address: '92290 Lisa Cove'
  },
  {
    name: 'Jeff Galbraith',
    position: 'Developer',
    avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
    email: 'mailto:jeff@quasar.dev',
    company_email: 'mailto:jeff@quasar.dev',
    website: 'http://jeffgalbraith.dev/',
    phone: '175.718.4633 x878',
    secondary_phone: '175.718.4633 x878',
    address: 'Calgary, Canada'
  },
];

export default defineComponent({
  name: "Contact",
  components: {
    ContactDetailItem: defineAsyncComponent(() => import('components/ContactDetailItem')),
    ContactItem: defineAsyncComponent(() => import('components/ContactItem'))
  },
  setup() {

    const $q = useQuasar()
    const size = ref({ width: '200px', height: '200px' });

    return {
      tab: ref('all'),
      search: ref(''),
      size,
      contacts_list,
      favorites_list,
      selected_contact: ref({}),
      detail_list,

      onResize(size_dynamic) {
        size.value = size_dynamic;
      },

    }
  },
  mounted() {
    if (!this.$q.screen.lt.sm) {
      this.selected_contact = this.contacts_list[0];
    }
  }
})
</script>

<style scoped>

</style>
