<template>
    <span>
      <!--
        `classes` is forwarded to the QMarkupTable that QHierarchy renders, so it
        is the only hook into that table. It used to carry `bg-indigo-8
        text-white`; those are now role-backed classes defined below.
      -->
      <q-hierarchy square id="test" :columns="columns" :data="data"
                   classes="md-hierarchy md-hierarchy--accent md-body-medium">
          <template v-slot:body="props">
            <td data-th="Name">
              <!--
                setPadding() comes from quasar-ui-qhierarchy and emits a physical
                `padding-left`, so the depth indent cannot be made logical from
                here. The indent this component owns is logical.
              -->
              <div v-bind:style="props.setPadding(props.item)"
                   :class="props.iconName(props.item)!='done'?'md-hierarchy__indent':''">
                <q-btn @click="props.toggle(props.item)" v-if="props.iconName(props.item)!='done'"
                       :icon="props.iconName(props.item)" flat
                       dense class="md-hierarchy__toggle">
                </q-btn>
                <span class="md-hierarchy__label">{{ props.item.label }}</span>
              </div>
            </td>
            <td class="text-center">{{ props.item.description }}</td>
            <td class="text-left">
              <q-chip v-if="props.item.note" square size="sm" class="md-hierarchy__note">
                {{ props.item.note }}
              </q-chip>
            </td>
          </template>
        </q-hierarchy>
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
  name: "CustomHierarchy",
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
 * outline-variant in quasar.variables.scss.
 *
 * :deep() throughout because the table is rendered by QHierarchy, not by this
 * template.
 */
:deep(.md-hierarchy) {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

/*
 * Quasar sets font-size directly on td, which outranks the .md-body-medium
 * class on the table element. Deferring to the inherited value is what lets the
 * M3 type class reach the cells.
 */
:deep(.md-hierarchy) td {
  font: inherit;
}

/*
 * The old `bg-indigo-8 text-white` tinted the WHOLE table, which is what made it
 * read as "the custom one" next to SimpleHierarchy. primary-container keeps that
 * distinction but confines it to the header, where M3 puts emphasis in a table --
 * and it brings its own guaranteed `on-` foreground.
 */
:deep(.md-hierarchy--accent) thead th {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  /* .md-title-small, restated: QHierarchy gives no class hook on <thead>. */
  font: 500 14px/20px var(--md-sys-typescale-plain-font);
  letter-spacing: 0.1px;
}

/*
 * Logical replacement for `q-pl-lg`, so leaf rows line up with expandable ones
 * in RTL too.
 */
.md-hierarchy__indent {
  padding-inline-start: var(--md-sys-space-300);
}

/* Logical replacement for `q-ml-sm`. */
.md-hierarchy__label {
  margin-inline-start: var(--md-sys-space-100);
}

/* `dense` draws a ~28px button; interactive targets stay 48x48 regardless. */
.md-hierarchy__toggle {
  min-inline-size: 48px;
  min-block-size: 48px;
  color: var(--md-sys-color-on-surface-variant);
}

/*
 * Was `color="lime-9"` + `text-white`. The note is decorative metadata, not a
 * status, so it takes tertiary-container -- the M3 accent container that carries
 * no meaning -- with its paired foreground.
 */
.md-hierarchy__note {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
  border-radius: var(--md-sys-shape-corner-small);
}
</style>
