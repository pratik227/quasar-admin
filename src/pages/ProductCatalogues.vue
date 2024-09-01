<template>
  <q-page class="q-pa-sm">
    <div>
      <q-card class="no-border no-shadow bg-transparent">
        <q-card-section class="q-pa-sm">
          <q-input rounded v-model="search" outlined placeholder="Search Product">
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search"/>
              <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-sm ">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="item, item_index in data">
        <card-product :data="item"></card-product>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue';
import {ref} from 'vue';

const data = [
  {
    title: 'Our Juices',
    caption: 'Welcome to Tao Boba. Our juices are ...',
    rating: 2,
    size: 'Regular',
    sizeOne: 'Large',
    amount: 'Ksh 300',
    amountLarge: 'Ksh 300',
    img: new URL("../assets/products/smoothie.jpg", import.meta.url),
    chip: 'Discount 90%',
    chip_color: 'grey-4',
    chip_class: 'text-blue absolute-top-right'
  },
  {
    title: 'Our Juices',
    caption: 'Welcome to Tao Boba. Our juices are ...',
    rating: 4,
    size: 'Regular',
    sizeOne: 'Large',
    amount: 'Ksh 250',
    amountLarge: 'Ksh 300',
    img: new URL('../assets/products/smoothie.jpg', import.meta.url),
  },
  {
    title: 'Our Juices',
    caption: 'Welcome to Tao Boba. Our juices are ...',
    rating: 1,
    size: 'Regular',
    sizeOne: 'Large',
    amount: 'Ksh 350',
    amountLarge: 'Ksh 300',
    img: new URL('../assets/products/smoothie.jpg', import.meta.url),
    chip: 'Sold Out',
    chip_color: 'grey-8',
    chip_class: 'text-white absolute-top-right'
  },
  {
    title: 'Our Juices',
    caption: 'Welcome to Tao Boba. Our juices are ...',
    rating: 5,
    size: 'Regular',
    sizeOne: 'Large',
    amount: 'Ksh 270',
    amountLarge: 'Ksh 300',
    img: new URL('../assets/products/smoothie.jpg', import.meta.url),
    chip: 'Discount 50%',
    chip_color: 'grey-4',
    chip_class: 'text-blue absolute-top-right'
  },
  {
    title: 'Our Juices',
    caption: 'Welcome to Tao Boba. Our juices are ...',
    rating: 2,
    size: 'Regular',
    sizeOne: 'Large',
    amount: 'Ksh 150',
    amountLarge: 'Ksh 300',
    img: new URL('../assets/products/smoothie.jpg', import.meta.url),
  },
  {
    title: 'Our Juices',
    caption: 'Welcome to Tao Boba. Our juices are ...',
    rating: 4,
    size: 'Regular',
    sizeOne: 'Large',
    amount: 'Ksh 330',
    amountLarge: 'Ksh 300',
    img: new URL('../assets/products/smoothie.jpg', import.meta.url),
  },
];

export default defineComponent({
  name: "ProductCatalogues",
  components: {CardProduct: defineAsyncComponent(() => import('components/cards/CardProduct.vue'))},
  setup() {
    const search = ref('');
    return {
      search,
      data
    }
  }
})
</script>

<style scoped>

</style>
