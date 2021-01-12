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
export default {
  name: "Tables",
  components: {
    TableProgress: () => import('components/tables/TableProgress'),
    TableCustomGrid: () => import('components/tables/TableCustomGrid'),
    TableDarkMode: () => import('components/tables/TableDarkMode'),
    TableActions: () => import('components/tables/TableActions'),
    TablesBasic: () => import('components/tables/TableBasic')
  },
}
</script>

<style>

</style>
