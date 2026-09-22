<template>
  <div class="row q-col-gutter-md">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-card class="md-table-card no-shadow" bordered>
        <q-card-section class="q-pa-none">
          <q-table class="md-table no-shadow"
                   :rows="rows"
                   title="Page Visits"
                   :hide-header="mode === 'grid'"
                   :columns="columns"
                   row-key="name"
                   :filter="filter"
                   v-model:pagination="pagination"
                   title-class="md-title-large"
                   table-header-class="md-title-small"
                   table-class="md-body-medium"
          >
            <template v-slot:top-right="props">
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search"/>
                </template>
              </q-input>

              <q-btn
                flat
                round
                dense
                :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"

                :aria-label="props.inFullscreen ? 'Exit full screen' : 'View table full screen'"
                @click="props.toggleFullscreen"
                v-if="mode === 'list'" class="q-px-sm md-toolbar-btn"
              >
                <q-tooltip
                  :disable="$q.platform.is.mobile"
                  v-close-popup
                >{{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
                </q-tooltip>
              </q-btn>

              <q-btn
                class="md-filled-button"
                icon-right="archive"
                label="Export to csv"
                no-caps
                @click="exportTable"
              />
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {exportFile, useQuasar} from 'quasar'
import { ref } from 'vue'

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const columns = [
  {name: 'id', align: 'left', label: 'User ID', field: 'id', sortable: true},
  {name: 'user_name', align: 'left', label: 'User Name', field: 'user_name', sortable: true},
  {
    name: 'desc',
    required: true,
    label: 'Page',
    align: 'left',
    field: row => row.name,
    sortable: true
  },
  {
    name: 'date',
    align: 'right',
    label: 'Date',
    field: 'date',
    sortable: true
  }
];
const rows = [
  {
    id: "U0001",
    name: '/login',
    date: '12-10-2019',
    user_name: 'Pratik Patel'
  },
  {
    id: "U0002",
    name: '/Dashboard',
    date: '11-02-2019',
    user_name: 'Razvan Stoenescu'
  },
  {
    id: "U0003",
    name: '/Map',
    date: '03-25-2019',
    user_name: 'Pratik Patel'
  },
  {
    id: "U0004",
    name: '/Mail',
    date: '03-18-2019',
    user_name: 'Jordan Lee'
  },
  {
    id: "U0005",
    name: '/Profile',
    date: '04-09-2019',
    user_name: 'Pratik Patel'
  },
];

export default defineComponent({
  name: 'TableVisits',
  setup() {
    const $q = useQuasar()
    const filter = ref('')

    return {
      filter,
      mode: 'list',
      columns,
      rows,
      pagination: {
        rowsPerPage: 10
      },

      exportTable() {
        // naive encoding to csv format
        const content = [columns.map(col => wrapCsvValue(col.label))].concat(
          rows.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[col.field === void 0 ? col.name : col.field],
            col.format
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
          })
        }
      }
    }
  },
})
</script>

<style scoped>
/*
 * Quasar hardcodes `background: #fff` on .q-card and `background: #fff;
 * color: #000` on .q-table__card -- neither goes through var(), so the M3
 * surface roles have to be restated here. Borders are left alone:
 * $separator-color is already bridged to outline-variant in
 * quasar.variables.scss, so Quasar's own table borders follow the scheme.
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

/* Toolbar and pagination bar are chrome, not data. */
.md-table :deep(.q-table__bottom) {
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

/*
 * M3 filled button. `color="primary"` was not wrong in itself -- --q-primary is
 * bridged -- but Quasar pairs a coloured button with a hardcoded `text-white`,
 * which drops below contrast in dark mode where primary is a light tone. The
 * role pair guarantees it in both schemes.
 */

/* Interactive targets stay 48x48 whatever the density. */
.md-toolbar-btn {
  min-inline-size: 48px;
  min-block-size: 48px;
}
</style>
