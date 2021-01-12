<template>
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
              {{ data.title }}
            </q-card-section>
            <q-card-section class="text-justify">
              <div>
                {{ text }}
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
</template>

<script>
export default {
  name: "BasicFilter",
  data() {
    return {
      type: 'All',
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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
  }
}
</script>

<style scoped>

</style>
