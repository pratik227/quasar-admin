<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="row q-pa-sm">
      <!-- Was `float-left`; a flex row is direction-agnostic. -->
      <div class="col-12 row items-center">
        <div class="col md-title-large md-list__heading">Pagination on QList</div>
      </div>
    </q-card-section>
    <q-card-section class="md-list">
      <q-item v-for="msg in getListData" class="md-list__item" :key="msg.id" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img width="40" height="40" :src="msg.avatar" alt="">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ msg.name }}</q-item-label>
          <q-item-label caption lines="1" class="md-list__caption">{{ msg.msg }}</q-item-label>
        </q-item-section>

        <q-item-section side class="md-list__side">
          {{ msg.time }}
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-actions align="center">
      <q-pagination
        v-model="page"
        :min="currentPage"
        :max="Math.ceil(list_Data.length/totalPages)"
        :input="true"
        input-class="md-pagination__input"
      >
      </q-pagination>
    </q-card-actions>
  </q-card>
</template>

<script>

import {defineComponent} from 'vue';
import {ref} from 'vue';


const list_Data = [
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
    id: 5,
    name: 'Pratik Patel',
    msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
      '            weekend. Do you want to grab brunch?',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
    time: '10:42 PM'
  },
];

export default defineComponent({
  name: "ListPagination",
  setup() {
    return {
      list_Data,
      page: ref(1),
      currentPage: ref(1),
      nextPage: ref(null),
      totalPages: ref(5),
    }
  },
  computed: {
    getListData() {
      return list_Data.slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
    }
  }
})
</script>

<style scoped>
/*
 * The items used to be `bg-white`, which pinned them to a colour the theme
 * cannot reach. They are one continuous list rather than eight separate cards,
 * so the corner rounding belongs to the group; clipping it here means the
 * individual rows can stay square and still sit inside a 12px "medium" corner.
 */
.md-list {
  border-radius: var(--md-sys-shape-corner-medium);
  overflow: hidden;
}

/* Logical replacement for `q-ml-md q-mt-sm`, which were physical offsets. */
.md-list__heading {
  margin-inline-start: var(--md-sys-space-200);
  margin-block-start: var(--md-sys-space-100);
}

.md-list__item {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

/*
 * Quasar gives caption/side sections a fixed black alpha. on-surface-variant is
 * the role for exactly this relationship, and it flips with the scheme.
 */
.md-list__caption,
.md-list__side {
  color: var(--md-sys-color-on-surface-variant);
}

/*
 * Was `input-class="text-orange-10"` -- a palette entry with no relationship to
 * the theme. :deep() because the class lands on an <input> inside QPagination,
 * not on its root.
 */
:deep(.md-pagination__input) {
  color: var(--md-sys-color-on-surface);
}
</style>
