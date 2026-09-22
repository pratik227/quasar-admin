<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card flat bordered class="fit md-card">
      <!--
        The per-tab `text-blue-8` ternaries are gone: `active-color` already
        marks the selected tab, and it resolves through the Quasar bridge to
        md-sys-color-primary, so the highlight follows the theme.
      -->
      <q-tabs
        v-model="tab"
        dense
        class="md-tabs"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="contact" icon="contacts" label="Contact"/>
        <q-tab name="message" icon="comment" label="Message">
          <!-- M3 badges are the one place `error` is the documented decorative
               role rather than a failure signal. -->
          <q-badge floating class="md-badge">{{ messages.length }}</q-badge>
        </q-tab>
        <q-tab name="notification" icon="notifications"
               label="Notification">
          <q-badge floating class="md-badge">4</q-badge>
        </q-tab>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated class="md-panels">
        <q-tab-panel name="contact" class="q-pa-sm">
          <!-- role="presentation": a clickable QItem renders role="button", which
               ARIA does not allow as a direct child of role="list". -->
          <q-list class="md-list" separator role="presentation">

            <q-item
              v-for="(contact, index) in contacts"
              :key="index"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-avatar>
                  <img width="40" height="40" :src="contact.avatar" alt="">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1" class="md-body-large">{{ contact.name }}</q-item-label>
                <q-item-label caption lines="2">
                  <span class="md-label-medium md-label-medium--emphasized">{{ contact.position }}</span>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <!--
                  blue/red/green told the three actions apart by hue alone.
                  primary/secondary/tertiary are the scheme's three accents and
                  keep them distinguishable in both schemes; the icons still
                  carry the meaning.
                -->
                <div class="q-gutter-xs">
                  <q-btn class="gt-xs" size="md" flat color="primary" dense round icon="comment"
                         :aria-label="`Message ${contact.name}`"/>
                  <q-btn class="gt-xs" size="md" flat color="secondary" dense round icon="email"
                         :aria-label="`Email ${contact.name}`"/>
                  <q-btn size="md" flat dense round color="accent" icon="phone"
                         :aria-label="`Call ${contact.name}`"/>
                </div>
              </q-item-section>
            </q-item>
          </q-list>

        </q-tab-panel>

        <q-tab-panel name="message" class="q-pa-sm">
          <q-item v-for="msg in messages" :key="msg.id" clickable v-ripple>
            <q-item-section avatar>
              <q-avatar>
                <img width="40" height="40" :src="msg.avatar" alt="">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="md-body-large">{{ msg.name }}</q-item-label>
              <q-item-label caption lines="1">{{ msg.msg }}</q-item-label>
            </q-item-section>

            <q-item-section side class="md-label-medium">
              {{ msg.time }}
            </q-item-section>
          </q-item>
        </q-tab-panel>

        <q-tab-panel name="notification" class="q-pa-sm">
          <!-- role="presentation": see the contact list above. -->
          <q-list role="presentation">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar icon="info" class="md-avatar-tonal"/>
              </q-item-section>

              <q-item-section class="md-body-large">Avatar-type icon</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar icon="report" class="md-avatar-tonal"/>
              </q-item-section>

              <q-item-section class="md-body-large">Avatar-type icon</q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar icon="remove" class="md-avatar-tonal"/>
              </q-item-section>

              <q-item-section class="md-body-large">Avatar-type icon</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar icon="remove_circle_outline" class="md-avatar-tonal"/>
              </q-item-section>

              <q-item-section class="md-body-large">Avatar-type icon</q-item-section>
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
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4'
        },
        {
          name: 'Razvan Stoenescu',
          position: 'Developer',
          avatar: '/img/team/razvan_stoenescu.jpeg'
        },
        {
          name: 'Jordan Lee',
          position: 'Developer',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4'
        },
        {
          name: 'Brunhilde Panswick',
          position: 'Administrator',
          avatar: '/img/avatar2.jpg'
        },
        {
          name: 'Winfield Stapforth',
          position: 'Administrator',
          avatar: '/img/avatar6.jpg'
        },
      ],
      messages: [
        {
          id: 5,
          name: 'Pratik Patel',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
          time: '10:42 PM'
        }, {
          id: 6,
          name: 'Winfield Stapforth',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: '/img/avatar6.jpg',
          time: '11:17 AM'
        }, {
          id: 1,
          name: 'Boy',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: '/img/boy-avatar.jpg',
          time: '5:17 AM'
        }, {
          id: 2,
          name: 'Jordan Lee',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
          time: '5:17 AM'
        }, {
          id: 3,
          name: 'Razvan Stoenescu',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: '/img/team/razvan_stoenescu.jpeg',
          time: '5:17 AM'
        }
      ],
    }
  }
})
</script>

<style scoped>
/* See CardBasic.vue: surface tone + hairline outline in place of a shadow. */
.md-card {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-large);
}

/* Unselected tabs recede to on-surface-variant; `active-color` handles the
   selected one. Was text-grey-9. */
.md-tabs { color: var(--md-sys-color-on-surface-variant); }

/* QTabPanels hardcodes a white background of its own. */
.md-panels { background: transparent; }

/*
 * Optical roundness: the list is inset 8px (q-pa-sm) inside the card's 16px
 * corner, so 16 - 8 = 8 (small).
 */
.md-list {
  border-radius: var(--md-sys-shape-corner-small);
  overflow: hidden;
}

.md-badge {
  background: var(--md-sys-color-error);
  color: var(--md-sys-color-on-error);
}

/* Was color="teal" text-color="white" -- a pair that cannot follow a theme. */
.md-avatar-tonal {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}
</style>
