<template>
  <q-page class="md-page">
    <q-input rounded v-model="search" outlined placeholder="Search Product" class="q-mb-md">
      <template v-slot:append>
        <q-icon v-if="search === ''" name="search"/>
        <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
      </template>
    </q-input>

    <!--
      Product grid: 1 column on compact, 2 at medium (600px), 3 from expanded
      (840px) up. `col-sm-6` is new -- without it the realigned breakpoints left
      a single very wide card across the whole 600-839 band.
    -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-4" v-for="item, item_index in data">
        <card-product :data="item"></card-product>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue';
import {ref} from 'vue';

/*
 * Chip colour used to be `grey-4` + `text-blue` / `grey-8` + `text-white`,
 * picked to sit on a light page. Quasar's `color` prop can only name a brand
 * colour, and none of the eight is an M3 container role, so `chip_color` is
 * left unset and the role pair is carried by `chip_class` instead -- see the
 * :deep() rules at the bottom of this file for why the page owns those.
 *
 * "Sold Out" deliberately does NOT use error-container: that role carries
 * meaning in this system and an out-of-stock badge is a state, not a failure.
 */
const data = [
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 2,
    amount: '$30',
    img: new URL("../assets/products/c-d-x-PDX_a_82obo-unsplash.jpg", import.meta.url),
    chip: 'Discount 90%',
    chip_color: null,
    chip_class: 'md-product-chip md-product-chip--offer absolute-top-right'
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 4,
    amount: '$15',
    img: new URL('../assets/products/frankie-valentine-VghbBAYqUJ0-unsplash.jpg', import.meta.url),
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 1,
    amount: '$50',
    img: new URL('../assets/products/giorgio-trovato-K62u25Jk6vo-unsplash.jpg', import.meta.url),
    chip: 'Sold Out',
    chip_color: null,
    chip_class: 'md-product-chip md-product-chip--muted absolute-top-right'
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 5,
    amount: '$70',
    img: new URL('../assets/products/jeroen-den-otter-iKmm0okt6Q4-unsplash.jpg', import.meta.url),
    chip: 'Discount 50%',
    chip_color: null,
    chip_class: 'md-product-chip md-product-chip--offer absolute-top-right'
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 2,
    amount: '$50',
    img: new URL('../assets/products/john-fornander-m2WpKnlLcEc-unsplash.jpg', import.meta.url),
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 4,
    amount: '$30',
    img: new URL('../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg', import.meta.url),
  },
];

export default defineComponent({
  name: "ProductCatalogues",
  components: {CardProduct: defineAsyncComponent(() => import('@/components/cards/CardProduct.vue'))},
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
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }

/*
 * :deep() because the chip these class names land on is rendered inside
 * CardProduct, so the page's scope attribute never reaches it. The page owns
 * the badge vocabulary (it supplies chip_class), so it owns the colour too.
 */
:deep(.md-product-chip) {
  border-radius: var(--md-sys-shape-corner-small);
}

:deep(.md-product-chip--offer) {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

:deep(.md-product-chip--muted) {
  background: var(--md-sys-color-surface-container-highest);
  color: var(--md-sys-color-on-surface-variant);
}
</style>
