<template>
  <q-page class="md-page">
    <div class="md-headline-small q-mb-md">Pagination and Filters</div>
    <q-separator/>

    <CardPagination></CardPagination>

    <list-pagination></list-pagination>

    <basic-filter></basic-filter>

  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue';

export default defineComponent({
  name: "Pagination",
  components: {
    BasicFilter: defineAsyncComponent(() => import('@/components/paginations/BasicFilter.vue')),
    ListPagination: defineAsyncComponent(() => import('@/components/paginations/ListPagination.vue')),
    CardPagination: defineAsyncComponent(() => import('@/components/paginations/CardPagination.vue'))
  },
})
</script>

<style scoped>
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }
</style>
