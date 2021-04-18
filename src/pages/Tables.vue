<template>
  <q-page class="q-pa-sm">

    <tables-basic></tables-basic>

    <table-actions class="q-mt-lg"></table-actions>

    <table-dark-mode class="q-mt-lg"></table-dark-mode>

    <table-progress class="q-mt-lg"></table-progress>

    <table-custom-grid class="q-mt-lg"></table-custom-grid>

  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue';

export default defineComponent({
  name: "Tables",
  components: {
    TableProgress: defineAsyncComponent(() => import('components/tables/TableProgress')),
    TableCustomGrid: defineAsyncComponent(() => import('components/tables/TableCustomGrid')),
    TableDarkMode: defineAsyncComponent(() => import('components/tables/TableDarkMode')),
    TableActions: defineAsyncComponent(() => import('components/tables/TableActions')),
    TablesBasic: defineAsyncComponent(() => import('components/tables/TableBasic'))
  },
})
</script>

<style>

</style>
