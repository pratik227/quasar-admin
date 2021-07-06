<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="row q-pa-sm">
      <div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
        <div class="text-h6 float-left q-ml-md q-mt-sm">Pagination on QList</div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-item v-for="msg in getListData" class="bg-white" :key="msg.id" clickable v-ripple>
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
    </q-card-section>
    <q-card-actions align="center">
      <q-pagination
        v-model="page"
        :min="currentPage"
        :max="Math.ceil(list_Data.length/totalPages)"
        :input="true"
        input-class="text-orange-10"
      >
      </q-pagination>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "ListPagination",
  data() {
    return {
      list_Data: [
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
          id: 5,
          name: 'Pratik Patel',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
          time: '10:42 PM'
        },
      ],
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 5,
    }
  },
  computed: {
    getListData() {
      return this.list_Data.slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
    }
  }
}
</script>

<style scoped>

</style>
