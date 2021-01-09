<template>
  <q-page class="q-pa-sm">

    <card-social icon_position="left" />

    <card-charts />

    <div class="row q-col-gutter-sm  q-py-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="fit">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
          >
            <q-tab name="contact" :class="tab=='contact'?'text-blue':''" icon="contacts" label="Contact"/>
            <q-tab name="message" :class="tab=='message'?'text-blue':''" icon="comment" label="Message">
              <q-badge color="red" floating>{{messages.length}}</q-badge>
            </q-tab>
            <q-tab name="notification" :class="tab=='notification'?'text-blue':''" icon="notifications"
                   label="Notification">
              <q-badge color="red" floating>4</q-badge>
            </q-tab>
          </q-tabs>

          <q-separator/>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="contact" class="q-pa-sm">
              <q-list class="rounded-borders" separator>

                <q-item
                  v-for="(contact, index) in contacts"
                  :key="index"
                  clickable
                  v-ripple 
                >
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="contact.avatar">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{contact.name}}</q-item-label>
                    <q-item-label caption lines="2">
                      <span class="text-weight-bold">{{contact.position}}</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn class="gt-xs" size="md" flat color="blue" dense round icon="comment"/>
                      <q-btn class="gt-xs" size="md" flat color="red" dense round icon="email"/>
                      <q-btn size="md" flat dense round color="green" icon="phone"/>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>

            </q-tab-panel>

            <q-tab-panel name="message" class="q-pa-sm">
              <q-item v-for="msg in messages" :key="msg.id" clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="msg.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ msg.name }}</q-item-label>
                  <q-item-label caption lines="1">{{ msg.msg }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  {{msg.time}}
                </q-item-section>
              </q-item>
            </q-tab-panel>

            <q-tab-panel name="notification" class="q-pa-sm">
              <q-list>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar color="teal" text-color="white" icon="info"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar color="teal" text-color="white" icon="report"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar color="teal" text-color="white" icon="remove"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar color="teal" text-color="white" icon="remove_circle_outline"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>

              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>


      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

        <q-card class="my-card">
          <q-img
            src="https://cdn.quasar.dev/img/parallax1.jpg"
            basic
          >
            <div class="absolute-bottom-left bg-transparent q-ml-md">
              <div class="text-h1">
                28 <sup>o</sup>
              </div>
              <div class="text-h5">
                India
              </div>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-sm  q-py-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="bg-blue text-white">
          <q-card-section class="text-h6 q-pb-none">
            <q-item>
              <q-item-section avatar>
                <q-icon color="white" name="library_add_check" style="font-size: 2em;"/>
              </q-item-section>

              <q-item-section>
                <div class="text-h6">To do list</div>
                <div class="text-subtitle2">All Your to do list</div>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-section class="">
            <todo></todo>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="fit">
          <q-card-section class="text-h6 q-pb-none">
            <q-item>
              <q-item-section avatar class="">
                <q-icon color="blue" name="access_time" style="font-size: 2em;"/>
              </q-item-section>

              <q-item-section>
                <div class="text-h6">Timeline</div>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-section class="">
            <q-timeline :layout="layout" :side="side" color="secondary">

              <q-timeline-entry
                v-for="(timeline, index) in timeline_list"
                :key="index"
                :title="timeline.title"
                :subtitle="timeline.subtitle" :color="timeline.color" :icon="timeline.icon"
                :side="timeline.side"
              >
                <div>
                  {{timeline.desc}}
                </div>
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>
    </div>

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
  </q-page>
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
        name: 'PageIndex',
        components: {
            Todo: () =>  import('components/Todo'),
            CardSocial: () =>  import('components/cards/CardSocial'),
            CardCharts: () =>  import('components/cards/CardCharts'),
        },
        data() {
            return {
                filter: '',
                mode: 'list',
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
                data: [
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
                },
                timeline_list: [
                    {
                        title: 'Pratik Likes your product ',
                        side: 'left',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\n' +
                            '                  et dolore magna aliqua.',
                        color: "red",
                        icon: "thumb_up"
                    },
                    {
                        title: 'Product Update',
                        side: 'left',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\n' +
                            '                  et dolore magna aliqua.',
                        color: "orange",
                        icon: "done_all"
                    }, {
                        title: 'Jeff Likes your product ',
                        side: 'left',
                        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\n' +
                            '                  et dolore magna aliqua.',
                        color: "blue",
                        icon: "thumb_up"
                    }
                ],
                tab: 'contact',
                layout: 'dense',
                side: 'right',
                messages: [
                    {
                        id: 5,
                        name: 'Pratik Patel',
                        msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                            '            weekend. Do you want to grab brunch?',
                        avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
                        time: '10:42 PM'
                    }, {
                        id: 6,
                        name: 'Winfield Stapforth',
                        msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                            '            weekend. Do you want to grab brunch?',
                        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
                        time: '11:17 AM'
                    }, {
                        id: 1,
                        name: 'Boy',
                        msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                            '            weekend. Do you want to grab brunch?',
                        avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
                        time: '5:17 AM'
                    }, {
                        id: 2,
                        name: 'Jeff Galbraith',
                        msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                            '            weekend. Do you want to grab brunch?',
                        avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
                        time: '5:17 AM'
                    }, {
                        id: 3,
                        name: 'Razvan Stoenescu',
                        msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
                            '            weekend. Do you want to grab brunch?',
                        avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
                        time: '5:17 AM'
                    }
                ],
                contacts: [
                    {
                        name: 'Pratik Patel',
                        position: 'Developer',
                        avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4'
                    },
                    {
                        name: 'Razvan Stoenescu',
                        position: 'Developer',
                        avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg'
                    },
                    {
                        name: 'Jeff Galbraith',
                        position: 'Developer',
                        avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg'
                    },
                    {
                        name: 'Brunhilde Panswick',
                        position: 'Administrator',
                        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
                    },
                    {
                        name: 'Winfield Stapforth',
                        position: 'Administrator',
                        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
                    },

                ]

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
