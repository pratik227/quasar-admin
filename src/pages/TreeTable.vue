<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          Tree Table
        </div>
        <div class="text-subtitle2">
          A simple Tree Collapsed/Expanded Table
        </div>
      </q-card-section>

      <q-separator></q-separator>
      <q-card-section class="q-pa-none">
        <simple-hierarchy></simple-hierarchy>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-sm">
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          Custom Icon with Chip
        </div>
        <div class="text-subtitle2">
          A simple Tree Collapsed/Expanded Table
        </div>
      </q-card-section>
      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <custom-hierarchy></custom-hierarchy>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

    export default {
        name: "TreeTable",
        components: {
          SimpleHierarchy: () => import('components/tree-table/SimpleHierarchy'),
          CustomHierarchy: () => import('components/tree-table/CustomHierarchy')
        }
    }
</script>

<style scoped>

</style>
