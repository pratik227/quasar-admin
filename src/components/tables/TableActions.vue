<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-grey-8">
        Inline Actions
        <q-btn label="Export" class="float-right text-capitalize text-indigo-8 shadow-3" icon="person"/>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table :rows="data" :columns="columns" hide-bottom>
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
</template>

<script>
import {defineComponent} from 'vue'


const data = [
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

</style>
