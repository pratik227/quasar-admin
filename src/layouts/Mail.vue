<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header class="bg-white text-grey-8">
      <q-toolbar class="GNL__toolbar">

        <q-btn
          flat
          dense
          round
          @click="$q.screen.gt.sm?toogleMiniState():toggleLeftDrawer()"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <!--          <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg">-->
          Email
        </q-toolbar-title>

        <q-space/>

        <q-input class="GNL__toolbar-input" outlined dense v-model="search" color="bg-grey-7 shadow-1"
                 placeholder="Search for topics, locations & sources">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
          </template>
          <template v-slot:append>
            <q-btn
              flat
              dense
              round
              aria-label="Menu"
              icon="arrow_drop_down"
            >
            </q-btn>
          </template>
        </q-input>

        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn v-if="$q.screen.gt.sm" round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>Google Apps</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item>
            <q-btn :rounded="!miniState" :round="miniState" icon="add" color="white" class="text-grey-8"
                   :label="miniState?'':'Compose'"></q-btn>
          </q-item>
          <q-item class="GNL__drawer-item" v-ripple v-for="link in links1" :key="link.text" clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm"/>

          <q-item class="GNL__drawer-item " v-ripple v-for="link in links2" :key="link.text" clickable>
            <q-item-section avatar>
              <q-icon :name="link.icon" :class="link.color"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-list class="q-ma-sm q-mt-md">
        <q-expansion-item
          v-for="(mail, index) in mail_data" :key="index"
          style="border-radius: 10px"
          popup
          header-class="bg-white"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar>
                <img :src="mail.avatar">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ mail.name }}</q-item-label>
              <q-item-label caption>{{ mail.date }}</q-item-label>
            </q-item-section>
          </template>

          <q-separator/>
          <q-card>
            <q-card-section>
              {{ mail.msg }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-page-container>

    <q-page-sticky v-if="$q.screen.lt.sm" position="bottom-right" :offset="[10,10]">
      <q-btn round
             icon="add"
             direction="up"
             color="accent"
      >

      </q-btn>
    </q-page-sticky>
  </q-layout>
</template>

<script>
import {fasGlobeAmericas, fasFlask} from '@quasar/extras/fontawesome-v5'

import {defineComponent} from 'vue'
import {ref} from 'vue'
import {useQuasar} from "quasar";


const links1 = [
  {icon: 'move_to_inbox', text: 'Inbox'},
  {icon: 'star', text: 'Stared'},
  {icon: 'send', text: 'Sent'},
  {icon: 'error', text: 'Spam'}
];
const links2 = [
  {icon: 'flag', text: 'Updates', color: 'text-orange'},
  {icon: 'group', text: 'Social', color: 'text-red'},
  {icon: 'label', text: 'Promos', color: 'text-indigo-8'},
  {icon: 'forum', text: 'Forums', color: 'text-teal'}
];

export default defineComponent({
  name: 'Mail',
  setup() {

    const $q = useQuasar()

    // $q.screen.setSizes({ sm: 300, md: 500, lg: 1000, xl: 2000 })

    const leftDrawerOpen = ref(false)
    const miniState = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      miniState,
      toogleMiniState() {
        miniState.value = !miniState.value
      },
      search: '',
      showAdvanced: ref(false),
      showDateOptions: ref(false),
      exactPhrase: '',
      hasWords: '',
      excludeWords: '',
      byWebsite: '',
      byDate: 'Any time',
      links1,
      links2,
      mail_data: [
        {
          name: 'Pratik Patel',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
          date: 'March 12, 2019',
        },
        {
          name: 'Pratik Patel',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
          date: 'March 22, 2019',
        },
        {
          name: 'Pratik Patel',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
          date: 'March 12, 2019',
        },
        {
          name: 'Winfield Stapforth',
          avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
          date: 'March 22, 2019',
        },
        {
          name: 'Jeff Galbraith',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          date: 'March 12, 2019',
        },
        {
          name: 'Jeff Galbraith',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          date: 'March 22, 2019',
        },
        {
          name: 'Razvan Stoenescu',
          avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
          date: 'March 12, 2019',
        },
        {
          name: 'Razvan Stoenescu',
          avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
          date: 'March 22, 2019',
        },
        {
          name: 'John Doe',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          date: 'March 12, 2019',
        },
        {
          name: 'Pratik Patel',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          date: 'March 22, 2019',
        },
      ]
    }
  },
  mounted() {
    this.mail_data = this.mail_data.map(function (item) {
      item['msg'] = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti\n' +
        '              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste\n' +
        '              eveniet doloribus ullam aliquid.';
      return item;
    })
  }

})
</script>

<style>
.GNL__toolbar {
  height: 64px;
}

.GNL__toolbar-input {
  width: 55%;
}

.GNL__drawer-item {
  line-height: 24px;
  border-radius: 0 24px 24px 0;
  margin-right: 12px;
}

.GNL__drawer-item .q-item__section--avatar .q-icon {
  color: #5f6368;
}

.GNL__drawer-item .q-item__label {
  color: #3c4043;
  letter-spacing: .01785714em;
  font-size: .875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.GNL__drawer-footer-link {
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  font-size: .75rem;
}

.GNL__drawer-footer-link:hover {
  color: #000;
}
</style>
