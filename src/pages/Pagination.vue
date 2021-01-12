<template>
  <q-page class="q-pa-sm">
    <div class="text-h6 q-ma-md">Pagination and Filters</div>
    <q-separator/>

    <CardPagination></CardPagination>

    <list-pagination></list-pagination>

    <basic-filter></basic-filter>

  </q-page>
</template>

<script>

export default {
  name: "Pagination",
  components: {
    BasicFilter: () => import('components/paginations/BasicFilter'),
    ListPagination: () => import('components/paginations/ListPagination'),
    CardPagination: () => import('components/paginations/CardPagination')
  },
}
</script>

<style scoped>

</style>
