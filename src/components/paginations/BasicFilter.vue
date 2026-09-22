<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="row">
      <!--
        Was `float-left` on the heading and `float-right` on the select. A flex
        row keeps them at the leading/trailing edges under RTL as well.
      -->
      <div class="col-12 row items-center no-wrap">
        <div class="col md-title-large">Filters</div>
        <q-space/>
        <q-select dense outlined style="min-width: 200px" v-model="type" :options="['All','Free','Paid']"
                  label="Category"/>
      </div>
    </q-card-section>
    <q-card-section class="q-mx-sm">
      <div class="row q-col-gutter-lg">
        <div class="col-lg-3 col-sm-12 col-xs-12 col-md-3" v-for="data in getData">
          <q-card class="md-media-card">
            <q-img
              :src="data.img"
              :alt="data.title"
            />
            <q-separator></q-separator>
            <q-card-section class="md-title-large text-center">
              {{ data.title }}
            </q-card-section>
            <q-card-section class="md-body-medium text-justify">
              <div>
                {{ text }}
              </div>
            </q-card-section>
            <q-card-actions align="around">
              <q-btn icon="remove_red_eye" class="md-text-button" no-caps flat label="200 Views"/>
              <q-btn icon="chat_bubble" class="md-text-button" no-caps flat label="56"/>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-card-section>

  </q-card>
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
  name: "BasicFilter",
  setup() {
    return {
      type: ref('All'),
      cards_data,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  computed: {
    getData() {
      if (this.type == 'All') {
        return cards_data
      } else {
        let self = this;
        return cards_data.filter(function (item) {
          return item.type.toLowerCase() == self.type.toLowerCase()
        })
      }
    },
  }
})
</script>

<style scoped>
/*
 * Was `style="background-color: #292845"` plus `text-white` -- a fixed dark card
 * chosen to read against a white page, which inverted into an unreadable block
 * the moment the page itself went dark.
 *
 * surface-container-high is the M3 "raised above the page" surface tone;
 * elevation in M3 is tone, not shadow, which is why no box-shadow replaces the
 * old contrast. The on-surface pair guarantees the text in both schemes.
 */
.md-media-card {
  /* No border-radius here: $generic-border-radius already gives QCard the
     12px "medium" step from the shape scale. */
  background: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface);
}

/*
 * M3 text button. The originals carried `color=""` plus `bg-transparent`, which
 * left them at Quasar's inherited default rather than at any role.
 */
</style>
