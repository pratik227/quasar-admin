<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="fit">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="contact" :class="tab=='contact'?'text-blue':''" icon="contacts" label="Contact"/>
        <q-tab name="message" :class="tab=='message'?'text-blue':''" icon="comment" label="Message">
          <q-badge color="red" floating>{{ messages.length }}</q-badge>
        </q-tab>
        <q-tab name="notification" :class="tab=='notification'?'text-blue':''" icon="notifications"
               label="Notification">
          <q-badge color="red" floating>4</q-badge>
        </q-tab>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="contact" class="q-pa-sm">
          <q-list class="rounded-borders" separator>

            <q-item
              v-for="(contact, index) in contacts"
              :key="index"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="contact.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ contact.name }}</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold">{{ contact.position }}</span>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="gt-xs" size="md" flat color="blue" dense round icon="comment"/>
                  <q-btn class="gt-xs" size="md" flat color="red" dense round icon="email"/>
                  <q-btn size="md" flat dense round color="green" icon="phone"/>
                </div>
              </q-item-section>
            </q-item>
          </q-list>

        </q-tab-panel>

        <q-tab-panel name="message" class="q-pa-sm">
          <q-item v-for="msg in messages" :key="msg.id" clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img :src="msg.avatar">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ msg.name }}</q-item-label>
              <q-item-label caption lines="1">{{ msg.msg }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              {{ msg.time }}
            </q-item-section>
          </q-item>
        </q-tab-panel>

        <q-tab-panel name="notification" class="q-pa-sm">
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="teal" text-color="white" icon="info"/>
              </q-item-section>

              <q-item-section>Avatar-type icon</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="teal" text-color="white" icon="report"/>
              </q-item-section>

              <q-item-section>Avatar-type icon</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="teal" text-color="white" icon="remove"/>
              </q-item-section>

              <q-item-section>Avatar-type icon</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar color="teal" text-color="white" icon="remove_circle_outline"/>
              </q-item-section>

              <q-item-section>Avatar-type icon</q-item-section>
            </q-item>

          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: 'TabSocial',
  setup() {
    return {
      tab: ref('contact'),
      contacts: [
        {
          name: 'Pratik Patel',
          position: 'Developer',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4'
        },
        {
          name: 'Razvan Stoenescu',
          position: 'Developer',
          avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg'
        },
        {
          name: 'Jeff Galbraith',
          position: 'Developer',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg'
        },
        {
          name: 'Brunhilde Panswick',
          position: 'Administrator',
          avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
        },
        {
          name: 'Winfield Stapforth',
          position: 'Administrator',
          avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
        },
      ],
      messages: [
        {
          id: 5,
          name: 'Pratik Patel',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
          time: '10:42 PM'
        }, {
          id: 6,
          name: 'Winfield Stapforth',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
          time: '11:17 AM'
        }, {
          id: 1,
          name: 'Boy',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          time: '5:17 AM'
        }, {
          id: 2,
          name: 'Jeff Galbraith',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          time: '5:17 AM'
        }, {
          id: 3,
          name: 'Razvan Stoenescu',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
          time: '5:17 AM'
        }
      ],
    }
  }
})
</script>
