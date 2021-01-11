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
import TablesBasic from "components/tables/TableBasic";
import TableActions from "components/tables/TableActions";
import TableDarkMode from "components/tables/TableDarkMode";
import TableCustomGrid from "components/tables/TableCustomGrid";
import TableProgress from "components/tables/TableProgress";

export default {
  name: "Tables",
  components: {TableProgress, TableCustomGrid, TableDarkMode, TableActions, TablesBasic},
}
</script>

<style>

</style>
