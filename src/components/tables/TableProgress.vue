<template>
  <q-card class="md-table-card no-shadow" bordered>
    <q-card-section>
      <div class="md-title-large">
        Team Progress
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section class="q-pa-none">
      <q-table
        class="md-table no-shadow"
        :rows="data3"
        :columns="column"
        hide-bottom
        table-header-class="md-title-small"
        table-class="md-body-medium"
      >
        <template v-slot:body-cell-Name="props">
          <q-td :props="props" style="max-width: 100px">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img width="40" height="40" :src="props.row.avatar" alt="">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ props.row.name }}</q-item-label>
                <q-item-label caption class="md-caption">{{ props.row.des }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-Task="props">
          <q-td :props="props">
            <q-item>
              <q-item-section>
                <q-item-label>
                  <!--
                    Was `float-right` on each chip. A flex row keeps the chip on
                    the trailing edge in RTL as well as LTR.
                  -->
                  <div class="row items-center no-wrap">
                    <span class="col md-issue">
                      <q-icon name="bug_report" size="20px" v-if="props.row.type=='error'"></q-icon>
                      <q-icon name="settings" size="20px" v-if="props.row.type=='info'"></q-icon>
                      <q-icon name="flag" size="20px" v-if="props.row.type=='success'"></q-icon>
                      <q-icon name="fireplace" size="20px" v-if="props.row.type=='warning'"></q-icon>
                      {{ props.row.issue }}
                    </span>
                    <!--
                      One chip with a role class instead of four chips that
                      differed only by a hardcoded Quasar colour + text-white.
                    -->
                    <q-chip square class="text-capitalize md-status-chip"
                            :class="`md-status-chip--${props.row.type}`"
                            :label="props.row.type"></q-chip>
                  </div>
                </q-item-label>
                <q-item-label caption class="md-caption">
                  <q-linear-progress :class="getColor(props.row.Progress)" :value="props.row.Progress/100"
                                     class="md-progress"/>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

const column = [
  {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
  {name: 'Task', label: 'Task', field: 'task', sortable: true, align: 'left'},
];

const data3 = [
  {
    name: 'Pratik Patel',
    des: 'Developer',
    Progress: 70,
    type: 'info',
    issue: '#125',
    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=96&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',

  },
  {
    name: 'Alex Morgan',
    des: 'Developer',
    Progress: 60,
    type: 'success',
    issue: '#1425',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
  },
  {
    name: 'Sam Rivera',
    des: 'Developer',
    Progress: 30,
    type: 'warning',
    issue: '#1475',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
  },
  {
    name: 'Jordan Lee',
    des: 'Developer',
    Progress: 100,
    type: 'success',
    issue: '#134',
    avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=96&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
  }
];


export default defineComponent({
  name: "TableProgress",
  setup() {

    return {
      column,
      data3,
      /*
       * Returns a class rather than a Quasar palette name. QLinearProgress
       * draws its bar from `currentColor`, so a class that sets `color` themes
       * it from the token layer -- whereas the old 'green'/'blue'/'red' were
       * fixed palette entries that could not follow the scheme. Thresholds are
       * unchanged.
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
 * Quasar hardcodes `background: #fff` on .q-card and `background: #fff;
 * color: #000` on .q-table__card -- neither goes through var(), so the M3
 * surface roles are restated here. Borders are left alone: $separator-color is
 * already bridged to outline-variant in quasar.variables.scss.
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
 * <thead>/<table>; deferring to the inherited value lets the M3 type classes
 * passed through table-header-class / table-class take effect.
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
 * Selected rows. Quasar's selection overlay is a pseudo-element painted above
 * the text, so an opaque container role cannot live there -- the pair goes on
 * the row and the overlay is switched off.
 */
.md-table :deep(tbody tr.selected) {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-table :deep(tbody tr.selected td:after) {
  background: transparent;
}

/* Secondary text inside a row -- the role, not a grey. */
.md-caption {
  color: var(--md-sys-color-on-surface-variant);
}

/* Was `text-blue` plus color="blue" on each icon. */
.md-issue {
  color: var(--md-sys-color-primary);
}

/*
 * Status chips. M3 defines `error` and nothing else -- there is no success /
 * info / warning role -- so those three keep Quasar's status hues (bridged in
 * _quasar-bridge.css, and lightened under .body--dark) but are drawn as TONAL
 * chips: the hue mixed into the surface with on-surface text. That keeps the
 * hue meaningful AND the label legible in both schemes, which a solid fill plus
 * a hardcoded `text-white` did not.
 *
 * `error` is the one type that maps to a real role, and here it genuinely means
 * an error rather than decoration, so it takes the error-container pair.
 */
.md-status-chip {
  border-radius: var(--md-sys-shape-corner-small);
  color: var(--md-sys-color-on-surface);
}

.md-status-chip--success { background: color-mix(in srgb, var(--q-positive) 24%, var(--md-sys-color-surface-container-low)); }
.md-status-chip--info    { background: color-mix(in srgb, var(--q-info)     24%, var(--md-sys-color-surface-container-low)); }
.md-status-chip--warning { background: color-mix(in srgb, var(--q-warning)  24%, var(--md-sys-color-surface-container-low)); }

.md-status-chip--error {
  background: var(--md-sys-color-error-container);
  color: var(--md-sys-color-on-error-container);
}

/*
 * Progress tiers. Same reasoning as the chips: no M3 status roles, so the
 * bridged Quasar hues are used directly -- they already lighten under
 * .body--dark for contrast.
 */
.md-progress--high { color: var(--q-positive); }
.md-progress--mid  { color: var(--q-info); }
.md-progress--low  { color: var(--q-negative); }

/* The inactive track is the active colour at low alpha, not a fixed grey. */
.md-progress :deep(.q-linear-progress__track) {
  background: color-mix(in srgb, currentColor 24%, transparent);
  opacity: 1;
}
</style>
