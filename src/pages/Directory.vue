<template>
  <q-page class="md-page">
    <!--
      1 -> 2 -> 3 columns. `col-sm-6` is new: with the breakpoints realigned to
      Material's, `col-md-4` only starts at 840px, which left one card per row
      across the whole 600-839 band.
    -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-4" v-for="(data,index) in card_data">
        <directory-card class="fit" :avatar="data.avatar" :name="data.name"
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
    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=96&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
    progress: 80,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },
  {
    name: 'Alex Morgan',
    Crated_Date: '10/2/2018',
    Project: 'Quasar QDraggableTree',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
    progress: 50,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },
  {
    name: 'Sam Rivera',
    Crated_Date: '10/2/2018',
    Project: 'Quasar Shopping',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
    progress: 100,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },
  {
    name: 'Jordan Lee',
    Crated_Date: '10/2/2019',
    Project: 'Quasar QMarkdown',
    avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=96&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
    progress: 60,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },
  {
    name: 'Pratik Patel',
    Crated_Date: '10/1/2020',
    Project: 'Quasar QGrid',
    avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=96&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
    progress: 30,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },{
    name: 'Alex Morgan',
    Crated_Date: '10/2/2018',
    Project: 'Quasar QDraggableTree',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
    progress: 50,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },
  {
    name: 'Sam Rivera',
    Crated_Date: '10/2/2018',
    Project: 'Quasar Shopping',
    avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
    progress: 100,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  },{
    name: 'Jordan Lee',
    Crated_Date: '10/2/2019',
    Project: 'Quasar QMarkdown',
    avatar: 'https://avatars1.githubusercontent.com/u/10262924?s=96&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4',
    progress: 60,
    des: 'Solutions Developer',
    email: 'test@gmail.com'
  }
];

export default defineComponent({
  name: "Directory",
  components: {
    DirectoryCard: defineAsyncComponent(() => import('@/components/cards/DirectoryCard.vue'))
  },
  setup() {
    return {
      card_data
    }
  }
})
</script>

<style scoped>
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }
</style>
