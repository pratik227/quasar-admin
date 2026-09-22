<template>
    <span>
      <!--
        `classes` is forwarded to the QMarkupTable that QHierarchy renders, so it
        is the only styling hook into that table.
      -->
      <q-hierarchy :columns="columns" classes="no-shadow md-hierarchy md-body-medium" :data="data"></q-hierarchy>
    </span>
</template>

<script>
import {defineComponent} from 'vue'

const columns = [
  {
    name: 'label',
    required: true,
    label: 'Label',
    align: 'left',
    field: 'label',
    // (optional) tell QHierarchy you want this column sortable
    sortable: true,
    // If you want different sorting icon
    filterable: true
  },
  {
    name: 'Description',
    label: 'Description',
    sortable: true,
    field: 'description',
    align: 'center',
    filterable: false
  },
  {
    name: 'note',
    label: 'Note',
    sortable: true,
    field: 'note',
    align: 'left',
    filterable: false
  }
];
const data = [
  {
    label: "Node 1",
    description: "Node 1 description",
    note: "Node 1 note",
    // id: 1,
    children: [
      {
        label: "Node 1.1",
        description: "Node 1.1 description",
        note: "Node 1.1 note",
        // id: 2
      },
      {
        label: "Node 1.2",
        description: "Node 1.2 description",
        note: "Node 1.2 note",
        // id: 3,
        children: [
          {
            label: "Node 1.2.1",
            description: "Node 1.2.1 description",
            note: "Node 1.2.1 note",
            // id: 4
          },
          {
            label: "Node 1.2.2",
            description: "Node 1.2.2 description",
            note: "Node 1.2.2 note",
            // id: 5
          }
        ],
      }
    ],
  },
  {
    label: "Node 2",
    description: "Node 2 description",
    note: "Node 2 note",
    // id: 6,
    children: [
      {
        label: "Node 2.1",
        description: "Node 2.1 description",
        note: "Node 2.1 note",
        // id: 7,
        children: [
          {
            label: "Node 2.1.1",
            description: "Node 2.1.1 description",
            note: "Node 2.1.1 note",
            // id: 8
          },
          {
            label: "Node 2.1.2",
            description: "Node 2.1.2 description",
            note: "Node 2.1.2 note",
            // id: 9
          }
        ],
      },
      {
        label: "Node 2.2",
        description: "Node 2.2 description",
        note: "Node 2.2 note",
        // id: 10
      }
    ],
  }
];
export default defineComponent({
  name: "SimpleHierarchy",
  setup() {
    return {
      columns,
      data
    }
  }
})
</script>

<style scoped>
/*
 * QHierarchy renders a QMarkupTable, and Quasar hardcodes `background: #fff` on
 * .q-markup-table -- it never goes through var(), so the surface role has to be
 * restated. Borders are left alone: $separator-color is already bridged to
 * outline-variant in quasar.variables.scss, so the row rules follow the scheme.
 *
 * :deep() throughout because the table is rendered by QHierarchy, not by this
 * template.
 */
:deep(.md-hierarchy) {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

/*
 * Quasar sets font-size/weight directly on th and td, which outranks the
 * .md-body-medium class on the table element. Deferring to the inherited value
 * is what lets the M3 type class reach the cells.
 */
:deep(.md-hierarchy) td {
  font: inherit;
}

:deep(.md-hierarchy) thead th {
  color: var(--md-sys-color-on-surface-variant);
  /* .md-title-small, restated: QHierarchy gives no class hook on <thead>. */
  font: 500 14px/20px var(--md-sys-typescale-plain-font);
  letter-spacing: 0.1px;
}

/* The toggle buttons QHierarchy renders are `dense`; targets stay 48x48. */
:deep(.md-hierarchy) tbody .q-btn {
  min-inline-size: 48px;
  min-block-size: 48px;
  color: var(--md-sys-color-on-surface-variant);
}
</style>
