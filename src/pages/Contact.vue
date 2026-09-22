<template>
  <q-page class="md-page">
    <div class="row q-col-gutter-md" v-if="!$q.screen.lt.sm">
      <div class="col-12 col-md-4">
        <q-card class="no-shadow" bordered>
          <q-tab-panels v-model="tab" animated class="md-panels">
            <q-tab-panel name="all" class="q-pa-none md-contact__fill">
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

            <q-tab-panel name="favorites" class="q-pa-none md-contact__fill">
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
            class="md-tabs"
            align="justify"
          >
            <q-tab name="all" icon="person" class="text-capitalize" label="All"></q-tab>
            <q-tab name="favorites" icon="star" class="text-capitalize" label="Favorites"></q-tab>
          </q-tabs>
        </q-card>
      </div>
      <div class="col-12 col-md-8">
        <q-card class="no-shadow md-contact__fill" bordered>
          <q-toolbar>
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img width="80" height="80" :src="selected_contact.avatar" alt="">
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

            <q-btn round flat icon="star_outline" color="accent" aria-label="Add to favorites">
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
        <q-tab-panels v-model="tab" animated class="md-panels">
          <q-tab-panel name="all" class="q-pa-none md-contact__fill">
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

          <q-tab-panel name="favorites" class="q-pa-none md-contact__fill">
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
          class="md-tabs"
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
        <q-card class="no-border md-contact__fill">
          <q-toolbar>
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img width="80" height="80" :src="selected_contact.avatar" alt="">
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

            <q-btn round flat icon="star_outline" color="accent" aria-label="Add to favorites">
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
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
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
    avatar: '/img/team/razvan_stoenescu.jpeg',
    email: 'mailto:razvan@quasar.dev',
    company_email: 'mailto:razvan@quasar.dev',
    website: 'https://github.com/rstoenescu',
    phone: '+1-004-658-0042',
    secondary_phone: '(331) 009-4655 x3147',
    address: '92290 Lisa Cove'
  },
  {
    name: 'Jordan Lee',
    position: 'Developer',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
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
    avatar: '/img/avatar2.jpg',
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
    avatar: '/img/avatar6.jpg',
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
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
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
    avatar: '/img/team/razvan_stoenescu.jpeg',
    email: 'mailto:razvan@quasar.dev',
    company_email: 'mailto:razvan@quasar.dev',
    website: 'https://github.com/rstoenescu',
    phone: '+1-004-658-0042',
    secondary_phone: '(331) 009-4655 x3147',
    address: '92290 Lisa Cove'
  },
  {
    name: 'Jordan Lee',
    position: 'Developer',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
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
    ContactDetailItem: defineAsyncComponent(() => import('@/components/ContactDetailItem.vue')),
    ContactItem: defineAsyncComponent(() => import('@/components/ContactItem.vue'))
  },
  setup() {

    const $q = useQuasar()

    return {
      tab: ref('all'),
      search: ref(''),
      contacts_list,
      favorites_list,
      selected_contact: ref({}),
      detail_list,

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
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page {
  padding: var(--md-layout-margin);

  /*
   * Replaces a QResizeObserver that drove six inline heights.
   *
   * That was a feedback loop: the observer wrote the measured height into
   * `size`, six :style bindings set panel heights from it, and changing those
   * heights resized the observed element, which fired the observer again. It
   * also computed `'200px' - 80` on first render -- the ref was seeded with a
   * STRING -- so every panel got `height: NaNpx` until the first resize landed.
   *
   * Flex does the same job declaratively: the page fills the layout, the row
   * fills the page, and the panels fill the row. No measuring, no loop.
   */
  display: flex;
  flex-direction: column;
}

.md-page > .row,
.md-page > div {
  flex: 1;
  min-height: 0;
}

/*
 * min-height:0 is the part that is easy to miss: a flex child defaults to
 * min-height:auto, which refuses to shrink below its content, so a long
 * contact list would push the card past the viewport instead of scrolling.
 */
.md-contact__fill {
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  overflow-y: auto;
}

/*
 * QTabPanels paints itself white unless told otherwise, so it has to be given
 * a surface role explicitly -- a bare `bg-white` survived the dark toggle and
 * left white-on-white text.
 */
.md-panels {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

/* The tab strip sits on top of the panel, so it takes the next tone up. */
.md-tabs {
  background: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface-variant);
}
</style>
