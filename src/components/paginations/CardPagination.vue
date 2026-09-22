<template>
  <q-page>
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="row">
        <div class="col-12 row items-center no-wrap">
          <!--          <div class="text-h6 float-left q-ml-md q-mt-sm">Pagination With Filters</div>-->
          <q-space/>
          <q-select dense outlined style="min-width: 200px" v-model="type" :options="['All','Free','Paid']"
                    label="Category"/>
        </div>
      </q-card-section>
      <q-card-section class="q-mx-sm">
        <div class="row q-col-gutter-lg">
          <div class="col-lg-3 col-sm-12 col-xs-12 col-md-3" v-for="data in getData2">
            <q-card class="md-media-card">
              <q-img :src="data.img" :alt="data.title">
                <template v-slot:loading>
                  <div class="md-title-medium">
                    Loading...
                  </div>
                </template>
              </q-img>
              <q-separator></q-separator>
              <q-card-section class="md-title-large text-center">{{ data.title }}</q-card-section>
              <q-card-section class="md-body-medium text-justify">
                <div>{{ data.text }}</div>
              </q-card-section>
              <q-card-actions>
                <q-btn
                  icon="remove_red_eye"
                  class="md-text-button"
                  no-caps
                  flat
                  label="200 Views"
                />

                <q-space/>

                <q-btn icon="chat_bubble" class="md-text-button" no-caps flat label="56"/>
              </q-card-actions>

            </q-card>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-pagination
          v-model="page"
          :min="currentPage"
          :max="Math.ceil(getData().length/totalPages)"
          :input="true"
          input-class="md-pagination__input"
        >
        </q-pagination>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue';
import {ref} from 'vue';


const cards_data = [
  {
    img: new URL('../../assets/action.jpg', import.meta.url).href,
    type: 'free',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    title: 'Title 1'
  },
  {
    img: new URL('../../assets/bag.jpg', import.meta.url).href,
    type: 'paid',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    title: 'Title 2'
  },
  {
    img: new URL('../../assets/jam.jpg', import.meta.url).href,
    type: 'free',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    title: 'Title 3'
  },
  {
    img: new URL('../../assets/laptop.jpg', import.meta.url).href,
    type: 'free',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    title: 'Title 4'
  },
  {
    img: new URL('../../assets/lookgood.jpeg', import.meta.url).href,
    type: 'paid',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    title: 'Title 5'
  },
  {
    img: new URL('../../assets/trawel.jpeg', import.meta.url).href,
    type: 'free',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    title: 'Title 6'
  },
];

export default defineComponent({
  name: 'CardPagination',
  setup() {
    return {
      cards_data,
      type: ref('All'),
      page: ref(1),
      currentPage: ref(1),
      nextPage: ref(null),
      totalPages: ref(4),
    }
  },
  methods: {
    getData() {
      if (this.type == 'All') {
        return cards_data
      } else {
        let self = this
        return this.cards_data.filter(function (item) {
          return item.type.toLowerCase() == self.type.toLowerCase()
        })
      }
    },
  },
  computed: {
    getData2() {
      return this.getData().slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
    }
  }
})
</script>

<style scoped>
/*
 * Was `style="background-color: #292845"` plus `text-white` -- a fixed dark card
 * picked to read against a white page, which had no way to follow a theme.
 * surface-container-high is the M3 "raised above the page" surface tone, and
 * the on-surface pair is what guarantees the text in both schemes.
 *
 * No border-radius here: $generic-border-radius already gives QCard the 12px
 * "medium" step from the shape scale.
 */
.md-media-card {
  background: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface);
}

/* M3 text button, replacing the bare `color` / `bg-transparent` pair. */

/*
 * Was `input-class="text-orange-10"` -- a palette entry with no relationship to
 * the theme. The page input sits on the page surface, so it takes on-surface.
 */
/* :deep() because the class lands on an <input> inside QPagination, not on its root. */
:deep(.md-pagination__input) {
  color: var(--md-sys-color-on-surface);
}
</style>
