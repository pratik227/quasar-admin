<template>
  <q-card class="md-table-card no-shadow" bordered>
    <!--
      Was `float-right` on the button. A flex row is direction-agnostic, which
      is what M3's RTL requirement needs -- a float always picks a physical side.
    -->
    <q-card-section class="row items-center no-wrap">
      <div class="col md-title-large">
        Inline Actions
      </div>
      <q-btn label="Export" no-caps class="md-tonal-button" icon="person"/>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section class="q-pa-none">
      <q-table
        :rows="data"
        :columns="columns"
        hide-bottom
        class="md-table no-shadow"
        table-header-class="md-title-small"
        table-class="md-body-medium"
      >
        <template v-slot:body-cell-Name="props">
          <q-td :props="props">
            <q-item style="max-width: 420px">
              <q-item-section avatar>
                <q-avatar>
                  <img width="40" height="40" :src="props.row.avatar" alt="">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Action="props">
          <q-td :props="props">
            <div class="md-table__actions">
              <q-btn icon="edit" size="sm" flat dense/>
              <q-btn icon="delete" size="sm" flat dense/>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'


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

const columns = [
  {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
  {name: 'Crated Date', label: 'Crated Date', field: 'Crated_Date', sortable: true, align: 'left'},
  {name: 'Project', label: 'Project', field: 'Project', sortable: true, align: 'left'},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
];


export default defineComponent({
  name: "TableActions",
  setup() {
    return {
      data,
      columns,
    }
  }
})
</script>

<style scoped>
/*
 * Quasar hardcodes `background: #fff` on .q-card and `background: #fff;
 * color: #000` on .q-table__card. Neither goes through var(), so no runtime
 * token can reach them and the M3 surface roles have to be restated here.
 *
 * Borders are deliberately NOT restated: $separator-color is already bridged to
 * outline-variant in quasar.variables.scss, so every Quasar table/card border
 * follows the scheme on its own.
 */
.md-table-card {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

/* The table is the card's surface, not a second surface stacked on top of it. */
.md-table {
  background: transparent;
  color: inherit;
}

/*
 * Quasar sets font-size/weight directly on th and td, which outranks a class on
 * <thead>/<table> no matter how the cascade is ordered. Deferring to the
 * inherited value is what lets the M3 type classes handed to table-header-class
 * / table-class actually reach the cells.
 */
.md-table :deep(thead th),
.md-table :deep(tbody td) {
  font: inherit;
}

.md-table :deep(thead th) {
  color: var(--md-sys-color-on-surface-variant);
}

/* State layer: the content colour at 8%, composited over the surface. */
.md-table :deep(tbody td:before) {
  background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
}

/*
 * Selected rows. Quasar paints selection with an overlay pseudo-element, which
 * only works while that overlay is translucent -- an opaque container role
 * there would sit on top of the text. So the role pair goes on the row itself
 * (th/td already inherit their background) and the overlay is switched off.
 */
.md-table :deep(tbody tr.selected) {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-table :deep(tbody tr.selected td:after) {
  background: transparent;
}

/*
 * M3 filled-tonal button, replacing `text-indigo-8 shadow-3`. No box-shadow:
 * elevation in M3 is surface tone, and a tonal button sits at level 0.
 */

.md-table__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--md-sys-space-100);
}

/*
 * `size="sm" dense` draws a ~28px button. Tables are the one place M3 allows
 * extra density, but interactive targets stay 48x48 whatever the density, so
 * the hit area is padded back out without growing the icon.
 */
.md-table__actions .q-btn {
  min-inline-size: 48px;
  min-block-size: 48px;
}
</style>
