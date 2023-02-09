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
    TableProgress: defineAsyncComponent(() => import('components/tables/TableProgress.vue')),
    TableCustomGrid: defineAsyncComponent(() => import('components/tables/TableCustomGrid.vue')),
    TableDarkMode: defineAsyncComponent(() => import('components/tables/TableDarkMode.vue')),
    TableActions: defineAsyncComponent(() => import('components/tables/TableActions.vue')),
    TablesBasic: defineAsyncComponent(() => import('components/tables/TableBasic.vue'))
  },
})
</script>

<style>

</style>
