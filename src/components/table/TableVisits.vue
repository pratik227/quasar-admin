<template>
  <div class="row q-col-gutter-sm q-py-sm">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-card class="text-grey-8">
          <q-card-section class="q-pa-none">
            <q-table class="no-shadow"
                     :data="data"
                     title="Page Visits"
                     :hide-header="mode === 'grid'"
                     :columns="columns"
                     row-key="name"
                     :filter="filter"
                     :pagination.sync="pagination"
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
                  @click="props.toggleFullscreen"
                  v-if="mode === 'list'" class="q-px-sm"
                >
                  <q-tooltip
                    :disable="$q.platform.is.mobile"
                    v-close-popup
                  >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
                  </q-tooltip>
                </q-btn>

                <q-btn
                  color="primary"
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
import {exportFile} from 'quasar'

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
export default {
  name: 'TableVisits',
  data () {
    return {
      filter: '',
      mode:'list',
      columns: [
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
      ],
      data:[
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
            user_name: 'Jeff Galbraith'
        },
        {
            id: "U0005",
            name: '/Profile',
            date: '04-09-2019',
            user_name: 'Pratik Patel'
        },
      ],
      pagination: {
          rowsPerPage: 10
      }
    }
  },
  methods: {
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
          this.data.map(row => this.columns.map(col => wrapCsvValue(
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
          this.$q.notify({
              message: 'Browser denied file download...',
              color: 'negative',
              icon: 'warning'
          })
      }
    }
  }
}
</script>
