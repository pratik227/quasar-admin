<template>
  <div>
    <q-item class="md-message" v-for="msg in messages" :key="msg.id" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar>
          <img width="40" height="40" :src="msg.avatar" alt="">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="md-body-large">{{ msg.name }}</q-item-label>
        <q-item-label caption lines="1" class="md-body-small md-message__preview">{{ msg.msg }}</q-item-label>
      </q-item-section>

      <q-item-section side class="md-label-small md-message__preview">
        {{ msg.time }}
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Messages",
  setup() {
    return {
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
/* Was an inline `max-width: 420px`; logical, so the menu keeps its cap in RTL. */
.md-message { max-inline-size: 420px; }

/* Preview and timestamp are secondary to the sender name. */
.md-message__preview { color: var(--md-sys-color-on-surface-variant); }
</style>
