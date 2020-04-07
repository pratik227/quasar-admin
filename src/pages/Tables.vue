<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-grey-8">
          Basic
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-table
          title="Treats"
          :data="data2"
          :columns="columns3"
          row-key="name"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input v-if="show_filter" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search"/>
              </template>
            </q-input>

            <q-btn class="q-ml-sm" icon="filter_list" @click="show_filter=!show_filter" flat/>
          </template>


        </q-table>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-lg">
      <q-card-section>
        <div class="text-h6 text-grey-8">
          Inline Actions
          <q-btn label="Export" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person"/>
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <q-table :data="data" :columns="columns" hide-bottom>
          <template v-slot:body-cell-Name="props">
            <q-td :props="props">
              <q-item style="max-width: 420px">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="props.row.avatar">
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
              <q-btn icon="edit" size="sm" flat dense/>
              <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense/>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-card class="q-mt-lg table-bg">
      <q-card-section>
        <div class="text-h6 text-white">
          Dark Mode
          <q-btn label="Export" color="blue" class="float-right text-capitalize  shadow-3" icon="person"/>
        </div>
      </q-card-section>
      <q-separator color="white"/>
      <q-card-section class="q-pa-none">
        <q-table dark class="table-bg" :data="data" :columns="columns2" hide-bottom>
          <template v-slot:body-cell-Name="props">
            <q-td :props="props">
              <q-item style="max-width: 420px">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="props.row.avatar">
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
              <q-btn icon="edit" size="sm" flat dense/>
              <q-btn icon="delete" size="sm" class="q-ml-sm" flat dense/>
            </q-td>
          </template>
          <template v-slot:body-cell-Progress="props">
            <q-td :props="props">
              <q-linear-progress dark :color="getColor(props.row.progress)" :value="props.row.progress/100"
                                 class="q-mt-md"/>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>


    <q-card class="q-mt-lg">
      <q-card-section>
        <div class="text-h6 text-grey-8">
          Team Progress
        </div>
      </q-card-section>
      <q-separator color="white"/>
      <q-card-section class="q-pa-none">
        <q-table class="" :data="data3" :columns="column4" hide-bottom>
          <template v-slot:body-cell-Name="props">
            <q-td :props="props" style="max-width: 100px">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="props.row.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ props.row.name }}</q-item-label>
                  <q-item-label caption class="">{{ props.row.des }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
          <template v-slot:body-cell-Task="props">
            <q-td :props="props">
              <q-item>
                <q-item-section>
                  <q-item-label>
                    <span class="text-blue">
                      <q-icon name="bug_report" color="blue" size="20px" v-if="props.row.type=='error'"></q-icon>
                      <q-icon name="settings" color="blue" size="20px" v-if="props.row.type=='info'"></q-icon>
                      <q-icon name="flag" color="blue" size="20px" v-if="props.row.type=='success'"></q-icon>
                      <q-icon name="fireplace" color="blue" size="20px" v-if="props.row.type=='warning'"></q-icon>
                      {{ props.row.issue }}
                    </span>
                    <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="positive"
                            v-if="props.row.type=='success'"></q-chip>
                    <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="info"
                            v-if="props.row.type=='info'"></q-chip>
                    <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="warning"
                            v-if="props.row.type=='warning'"></q-chip>
                    <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="negative"
                            v-if="props.row.type=='error'"></q-chip>
                  </q-item-label>
                  <q-item-label caption class="">
                    <q-linear-progress dark :color="getColor(props.row.Progress)" :value="props.row.Progress/100"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-lg">
      <q-card-section>
        <div class="text-h6 text-grey-8">
          Custom Grid View
        </div>
      </q-card-section>
      <q-separator/>
      <q-card-section class="q-pa-none">
        <q-table grid :data="data" :columns="columns" hide-bottom>
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <q-card class="">
                <q-card-section class="text-center">
                  <q-avatar size="100px" class="shadow-10">
                    <img :src="props.row.avatar">
                  </q-avatar>
                </q-card-section>

                <q-card-section class="q-pt-none text-center ">
                  <div class="text-h6  text-grey-8">
                    {{props.row.name}}
                  </div>
                  <div class="text-caption text-capitalize text-grey-8">
                    {{props.row.des}}
                  </div>
                </q-card-section>

                <q-card-actions align="center">
                  <q-btn flat round icon="fab fa-facebook" class="bg-indigo-7 text-white"/>
                  <q-btn flat round icon="fab fa-twitter" class="bg-info text-white"/>
                  <q-btn flat round icon="fab fa-instagram" class="bg-indigo-8 text-white"/>
                </q-card-actions>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
    export default {
        name: "Tables",
        data() {
            return {
                columns: [
                    {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
                    {name: 'Crated Date', label: 'Crated Date', field: 'Crated_Date', sortable: true, align: 'left'},
                    {name: 'Project', label: 'Project', field: 'Project', sortable: true, align: 'left'},
                    {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
                ],
                columns2: [
                    {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
                    {name: 'Crated Date', label: 'Crated Date', field: 'Crated_Date', sortable: true, align: 'left'},
                    {name: 'Project', label: 'Project', field: 'Project', sortable: true, align: 'left'},
                    {name: 'Progress', label: 'Progress', field: 'Progress', sortable: true, align: 'left'},
                    {name: 'Action', label: '', field: 'Action', sortable: false, align: 'center'}
                ],
                data: [
                    {
                        name: 'Pratik Patel',
                        Crated_Date: '15/3/2020',
                        Project: 'Quasar Admin',
                        avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
                        progress: 80,
                        des: 'Solutions Developer'
                    },
                    {
                        name: 'Mayank Patel',
                        Crated_Date: '10/2/2018',
                        Project: 'Quasar QDraggableTree',
                        avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
                        progress: 50,
                        des: 'Solutions Developer'
                    },
                    {
                        name: 'Mayur Patel',
                        Crated_Date: '10/2/2018',
                        Project: 'Quasar Shopping',
                        avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
                        progress: 100,
                        des: 'Solutions Developer'
                    },
                    {
                        name: 'Jeff Galbraith',
                        Crated_Date: '10/2/2019',
                        Project: 'Quasar QMarkdown',
                        avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
                        progress: 60,
                        des: 'Solutions Developer'
                    },
                    {
                        name: 'Pratik Patel',
                        Crated_Date: '10/1/2020',
                        Project: 'Quasar QGrid',
                        avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
                        progress: 30,
                        des: 'Solutions Developer'
                    },
                ],
                filter: '',
                show_filter: false,
                columns3: [
                    {
                        name: 'name',
                        required: true,
                        label: 'Dessert (100g serving)',
                        align: 'left',
                        field: row => row.name,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true},
                    {name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true},
                    {name: 'carbs', label: 'Carbs (g)', field: 'carbs'},
                    {name: 'protein', label: 'Protein (g)', field: 'protein'},
                    {name: 'sodium', label: 'Sodium (mg)', field: 'sodium'},
                    {
                        name: 'calcium',
                        label: 'Calcium (%)',
                        field: 'calcium',
                        sortable: true,
                        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                    },
                    {
                        name: 'iron',
                        label: 'Iron (%)',
                        field: 'iron',
                        sortable: true,
                        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                    }
                ],
                data2: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        sodium: 87,
                        calcium: '14%',
                        iron: '1%'
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                        fat: 9.0,
                        carbs: 37,
                        protein: 4.3,
                        sodium: 129,
                        calcium: '8%',
                        iron: '1%'
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        sodium: 337,
                        calcium: '6%',
                        iron: '7%'
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                        fat: 3.7,
                        carbs: 67,
                        protein: 4.3,
                        sodium: 413,
                        calcium: '3%',
                        iron: '8%'
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                        fat: 16.0,
                        carbs: 49,
                        protein: 3.9,
                        sodium: 327,
                        calcium: '7%',
                        iron: '16%'
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        sodium: 50,
                        calcium: '0%',
                        iron: '0%'
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                        fat: 0.2,
                        carbs: 98,
                        protein: 0,
                        sodium: 38,
                        calcium: '0%',
                        iron: '2%'
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                        fat: 3.2,
                        carbs: 87,
                        protein: 6.5,
                        sodium: 562,
                        calcium: '0%',
                        iron: '45%'
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                        fat: 25.0,
                        carbs: 51,
                        protein: 4.9,
                        sodium: 326,
                        calcium: '2%',
                        iron: '22%'
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        sodium: 54,
                        calcium: '12%',
                        iron: '6%'
                    }
                ],
                column4: [
                    {name: 'Name', label: 'Name', field: 'name', sortable: true, align: 'left'},
                    {name: 'Task', label: 'Task', field: 'task', sortable: true, align: 'left'},
                ],
                data3: [
                    {
                        name: 'Pratik Patel',
                        des: 'Developer',
                        Progress: 70,
                        type: 'info',
                        issue: '#125',
                        avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',

                    },
                    {
                        name: 'Mayank Patel',
                        des: 'Developer',
                        Progress: 60,
                        type: 'success',
                        issue: '#1425',
                        avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
                    },
                    {
                        name: 'Mayur Patel',
                        des: 'Developer',
                        Progress: 30,
                        type: 'warning',
                        issue: '#1475',
                        avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
                    },
                    {
                        name: 'Jeff Galbraith',
                        des: 'Developer',
                        Progress: 100,
                        type: 'success',
                        issue: '#134',
                        avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
                    }
                ]
            }
        },
        methods: {
            getColor(val) {
                if (val > 70 && val <= 100) {
                    return 'green'
                } else if (val > 50 && val <= 70) {
                    return 'blue'
                }
                return 'red'
            }
        }
    }
</script>

<style>

  .table-bg {
    background-color: #162b4d;
  }
</style>
