<template>
  <!--
    This demo used to be a permanently-dark table (#162b4d plus `dark` on the
    QTable). That made sense when the app had no dark mode -- hardcoding was the
    only way to show a dark treatment. Now that the whole app switches scheme, a
    permanently-dark table is indistinguishable from every other table as soon
    as the page goes dark.

    inverse-surface / inverse-on-surface is the M3 role pair for exactly this: a
    surface deliberately inverted against whichever scheme is active (it is what
    snackbars use). So this table stays visually distinct in BOTH schemes
    instead of only in one.
  -->
  <q-card class="md-inverse-card no-shadow" bordered>
    <q-card-section class="row items-center no-wrap">
      <div class="col md-title-large">
        Dark Mode
      </div>
      <!-- inverse-primary is the M3 accent for content on an inverse surface. -->
      <q-btn label="Export" no-caps flat class="md-btn-inverse" icon="person"/>
    </q-card-section>
    <q-separator class="md-inverse-separator"/>
    <q-card-section class="q-pa-none">
      <q-table
        class="md-table md-table--inverse"
        :rows="data"
        :columns="columns"
        hide-bottom
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
        <template v-slot:body-cell-Progress="props">
          <q-td :props="props">
            <q-linear-progress :class="getColor(props.row.progress)" :value="props.row.progress/100"
                               class="md-progress q-mt-md"/>
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
  {name: 'Progress', label: 'Progress', field: 'Progress', sortable: true, align: 'left'},
  {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
];

export default defineComponent({
  name: "TableDarkMode",
  setup() {

    return {
      data,
      columns,

      /*
       * Returns a class rather than a Quasar palette name. QLinearProgress
       * draws its bar from `currentColor`, so a class that sets `color` to an
       * M3-derived value themes it -- whereas the old 'green'/'blue'/'red'
       * were fixed palette entries that could not follow the scheme.
       * Thresholds are unchanged.
       */
      getColor(val) {
        if (val > 70 && val <= 100) {
          return 'md-progress--high'
        } else if (val > 50 && val <= 70) {
          return 'md-progress--mid'
        }
        return 'md-progress--low'
      }
    }
  },
})
</script>

<style scoped>
/*
 * The inverse surface. Every colour inside this card is derived from the pair
 * below, so the whole block flips with the scheme instead of being pinned dark.
 */
.md-inverse-card {
  background: var(--md-sys-color-inverse-surface);
  color: var(--md-sys-color-inverse-on-surface);
  /* See the note on borders below -- the bridged outline-variant would vanish here. */
  border-color: color-mix(in srgb, currentColor 12%, transparent);
}

.md-table {
  background: transparent;
  color: inherit;
}

/*
 * Neutralise Quasar's automatic dark styling inside the inverse block.
 *
 * QCard, QItem and friends add `--dark` variants of their own whenever
 * $q.dark.isActive, which pin the text to white. That is correct on a normal
 * dark surface and exactly wrong here: inverse-surface is LIGHT while the
 * scheme is dark, so the white label landed on #e6e0e9 -- a 1.3:1 ratio, which
 * is invisible. Measured, not theorised: the audit caught five rows of names
 * that had disappeared.
 *
 * Everything inside this card takes its colour from the inverse pair instead.
 */
.md-inverse-card :deep(.q-card--dark),
.md-inverse-card :deep(.q-item--dark),
.md-inverse-card :deep(.q-item--dark .q-item__label),
.md-inverse-card :deep(.q-list--dark) {
  color: var(--md-sys-color-inverse-on-surface);
  background: transparent;
  border-color: color-mix(in srgb, currentColor 12%, transparent);
}

/*
 * outline-variant is tuned for the normal surface and all but disappears on an
 * inverse one, so this is the single place the global $separator-color bridge is
 * overridden: boundaries are drawn from the content colour at the same 12%
 * relationship, which resolves correctly whichever scheme is inverted.
 */
.md-inverse-separator {
  background: color-mix(in srgb, currentColor 12%, transparent);
}

.md-table--inverse :deep(thead),
.md-table--inverse :deep(tr),
.md-table--inverse :deep(th),
.md-table--inverse :deep(td) {
  border-color: color-mix(in srgb, currentColor 12%, transparent);
}

/*
 * Quasar sets font-size/weight directly on th and td, which outranks a class on
 * <thead>/<table>; deferring to the inherited value lets the M3 type classes
 * passed through table-header-class / table-class take effect.
 */
.md-table :deep(thead th),
.md-table :deep(tbody td) {
  font: inherit;
}

/*
 * There is no "inverse-on-surface-variant" role, so the header recedes by
 * opacity instead -- same relationship as on-surface-variant, expressed against
 * whichever inverse foreground is live.
 */
.md-table--inverse :deep(thead th) {
  opacity: 0.74;
}

/* State layers, resolved from the inverse foreground rather than on-surface. */
.md-table--inverse :deep(tbody td:before) {
  background: color-mix(in srgb, currentColor 8%, transparent);
}

.md-table--inverse :deep(tbody tr.selected td:after) {
  background: color-mix(in srgb, currentColor 12%, transparent);
}

/* M3 text button on an inverse surface. */
.md-btn-inverse {
  color: var(--md-sys-color-inverse-primary);
}

/*
 * Progress tiers. M3 has no success/info/warning roles, so these keep Quasar's
 * status hues (bridged in _quasar-bridge.css) but mixed toward the inverse
 * foreground: on an inverse surface the raw hues are tuned for the wrong
 * background, and the mix pulls each one to the legible side in both schemes.
 */
.md-progress--high { color: color-mix(in srgb, var(--q-positive) 65%, var(--md-sys-color-inverse-on-surface)); }
.md-progress--mid  { color: color-mix(in srgb, var(--q-info)     65%, var(--md-sys-color-inverse-on-surface)); }
.md-progress--low  { color: color-mix(in srgb, var(--q-negative) 65%, var(--md-sys-color-inverse-on-surface)); }

/* The inactive track is the active colour at low alpha, not a fixed grey. */
.md-progress :deep(.q-linear-progress__track) {
  background: color-mix(in srgb, currentColor 24%, transparent);
  opacity: 1;
}

.md-table__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--md-sys-space-100);
}

/* Interactive targets stay 48x48 whatever the density of the table. */
.md-table__actions .q-btn {
  min-inline-size: 48px;
  min-block-size: 48px;
}
</style>
