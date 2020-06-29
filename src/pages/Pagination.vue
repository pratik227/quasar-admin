<template>
  <q-page class="q-pa-sm">
    <div class="text-h6 q-ma-md">Pagination and Filters</div>
    <q-separator/>
    <CardPagination></CardPagination>

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
            {{msg.time}}
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

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
          <div class="text-h6 float-left q-ml-md q-mt-sm">Filters</div>
          <q-space/>
          <q-select dense outlined style="min-width: 200px" v-model="type" :options="['All','Free','Paid']"
                    class="float-right" label="Category"/>
        </div>
      </q-card-section>
      <q-card-section class="q-mx-sm">
        <div class="row q-col-gutter-lg">
          <div class="col-lg-3 col-sm-12 col-xs-12 col-md-3" v-for="data in getData">
            <q-card style="background-color: #292845" class="text-white">
              <q-img
                :src="data.img"
              />
              <q-separator></q-separator>
              <q-card-section class="text-h5 text-center">
                {{data.title}}
              </q-card-section>
              <q-card-section class="text-justify">
                <div>
                  {{text}}
                </div>
              </q-card-section>
              <q-card-actions align="around" class="text-subtitle1">
                <q-btn color="" icon="remove_red_eye" class="bg-transparent text-capitalize" flat label="200 Views"/>
                <div class="float-right">
                  <q-btn color="" icon="chat_bubble" class="bg-transparent" flat label="56"/>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script>
    import CardPagination from "../components/CardPagination";
    export default {
        name: "Pagination",
        components: {CardPagination},
        data() {
            return {
                cards_data: [
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'free',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Title 1'
                    },
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'paid',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Title 2'
                    },
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'free',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Title 3'
                    },
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'free',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Title 4'
                    },
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'paid',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Title 5'
                    },
                    {
                        img: 'https://placeimg.com/500/300/nature?t=' + Math.random(),
                        type: 'free',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                        title: 'Title 6'
                    },
                ],
                type: 'All',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
                    },{
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
                    },{
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
            getData() {
                if (this.type == 'All') {
                    return this.cards_data
                } else {
                    let self = this;
                    return this.cards_data.filter(function (item) {
                        return item.type.toLowerCase() == self.type.toLowerCase()
                    })
                }
            },
            getListData() {
                return this.list_Data.slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
            }
        }
    }
</script>

<style scoped>

</style>
