<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-lg">
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12" v-for="(data,index) in card_data">
        <directory-card class="col-lg-4 fit col-md-4 col-sm-12 col-xs-12" :avatar="data.avatar" :name="data.name"
                        :des="data.des"
                        :email="data.email"></directory-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue'

const card_data = [
  {
    name: 'Pratik Patel',
    Crated_Date: '15/3/2020',
    Project: 'Quasar Admin',
    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
    progress: 80,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },
  {
    name: 'Mayank Patel',
    Crated_Date: '10/2/2018',
    Project: 'Quasar QDraggableTree',
    avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
    progress: 50,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },
  {
    name: 'Mayur Patel',
    Crated_Date: '10/2/2018',
    Project: 'Quasar Shopping',
    avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
    progress: 100,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },
  {
    name: 'Jeff Galbraith',
    Crated_Date: '10/2/2019',
    Project: 'Quasar QMarkdown',
    avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
    progress: 60,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },
  {
    name: 'Pratik Patel',
    Crated_Date: '10/1/2020',
    Project: 'Quasar QGrid',
    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
    progress: 30,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },{
    name: 'Mayank Patel',
    Crated_Date: '10/2/2018',
    Project: 'Quasar QDraggableTree',
    avatar: 'https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4',
    progress: 50,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },
  {
    name: 'Mayur Patel',
    Crated_Date: '10/2/2018',
    Project: 'Quasar Shopping',
    avatar: 'https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4',
    progress: 100,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },{
    name: 'Jeff Galbraith',
    Crated_Date: '10/2/2019',
    Project: 'Quasar QMarkdown',
    avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
    progress: 60,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  }
];

export default defineComponent({
  name: "Directory",
  components: {
    DirectoryCard: defineAsyncComponent(() => import('components/cards/DirectoryCard'))
  },
  setup() {
    return {
      card_data
    }
  }
})
</script>

<style scoped>

</style>
