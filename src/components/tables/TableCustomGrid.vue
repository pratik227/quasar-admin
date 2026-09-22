<template>
  <q-card class="md-table-card no-shadow" bordered>
    <q-card-section>
      <div class="md-title-large">
        Custom Grid View
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section class="q-pa-none">
      <q-table
        grid
        class="md-table"
        :rows="data"
        :columns="columns"
        hide-bottom
        table-header-class="md-title-small"
      >
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <card-profile :avatar="props.row.avatar" :name="props.row.name" :des="props.row.des"></card-profile>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

import CardProfile from "@/components/cards/CardProfile.vue";


const columns = [
  {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
  {name: 'Crated Date', label: 'Crated Date', field: 'Crated_Date', sortable: true, align: 'left'},
  {name: 'Project', label: 'Project', field: 'Project', sortable: true, align: 'left'},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
];

const data = [
  {
    name: 'Pratik Patel',
    Crated_Date: '15/3/2020',
    Project: 'Quasar Admin',
    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=96&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
    progress: 80,
    des: 'Solutions Developer'
  },
  {
    name: 'Alex Morgan',
    Crated_Date: '10/2/2018',
    Project: 'Quasar QDraggableTree',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
    progress: 50,
    des: 'Solutions Developer'
  },
  {
    name: 'Sam Rivera',
    Crated_Date: '10/2/2018',
    Project: 'Quasar Shopping',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
    progress: 100,
    des: 'Solutions Developer'
  },
  {
    name: 'Jordan Lee',
    Crated_Date: '10/2/2019',
    Project: 'Quasar QMarkdown',
    avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=96&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
    progress: 60,
    des: 'Solutions Developer'
  },
  {
    name: 'Pratik Patel',
    Crated_Date: '10/1/2020',
    Project: 'Quasar QGrid',
    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=96&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
    progress: 30,
    des: 'Solutions Developer'
  },
];

export default defineComponent({
  name: "TableCustomGrid",
  components: {CardProfile},
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
 * Quasar hardcodes `background: #fff` on .q-card; it does not go through var(),
 * so the M3 surface roles are restated here. Borders are left alone --
 * $separator-color is already bridged to outline-variant in
 * quasar.variables.scss.
 */
.md-table-card {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

/*
 * In grid mode the rows are QCards supplied by the `item` slot, so the table
 * itself is only a layout container -- it shows the card's surface through
 * rather than painting one of its own.
 */
.md-table {
  background: transparent;
  color: inherit;
}

/* Quasar sets font-size/weight directly on th, which outranks table-header-class. */
.md-table :deep(thead th) {
  font: inherit;
  color: var(--md-sys-color-on-surface-variant);
}

/* The grid toolbar (sort control, records-per-page) is secondary to the data. */
.md-table :deep(.q-table__top),
.md-table :deep(.q-table__bottom) {
  color: var(--md-sys-color-on-surface-variant);
}
</style>
