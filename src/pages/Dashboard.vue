<template>
  <q-page class="q-pa-sm">

    <card-social icon_position="left"/>

    <card-charts/>

    <div class="row q-col-gutter-sm  q-py-sm">
      <tab-social/>
      <card-with-image/>
    </div>

    <div class="row q-col-gutter-sm  q-pb-sm">
      <todo-list/>

      <card-time-line/>
    </div>

    <table-visits/>
  </q-page>
</template>

<script>
import {defineComponent,defineAsyncComponent} from 'vue'

/*
 * These widgets ARE the dashboard, so they're imported statically rather than
 * lazily. Code-splitting the landing page's own content bought nothing (it is
 * always needed) while costing a chunk round-trip each — and because each one
 * rendered nothing until its chunk arrived, they shifted the page as they popped
 * in (CLS ~0.59). Statically importing them also lets CardWithImage's hero image
 * be discovered on the first pass instead of after a chunk waterfall.
 */
import CardSocial from '@/components/cards/CardSocial.vue'
import TabSocial from '@/components/tabs/TabSocial.vue'
import CardWithImage from '@/components/cards/CardWithImage.vue'
import CardTimeLine from '@/components/cards/CardTimeLine.vue'
import TodoList from '@/components/list/TodoList.vue'
import TableVisits from '@/components/tables/TableVisits.vue'
import CardChartsSkeleton from '@/components/cards/CardChartsSkeleton.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    CardSocial,
    TabSocial,
    CardWithImage,
    CardTimeLine,
    TodoList,
    TableVisits,

    // Kept lazy: this one pulls in ECharts, which we don't want blocking the
    // dashboard's first paint. The skeleton reserves its exact footprint.
    CardCharts: defineAsyncComponent({
      loader: () => import('@/components/cards/CardCharts.vue'),
      loadingComponent: CardChartsSkeleton,
      delay: 0
    }),
  },
  setup() {
    return {
      mode: 'list',
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
          avatar: '/img/avatar6.jpg',
          time: '11:17 AM'
        }, {
          id: 1,
          name: 'Boy',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: '/img/boy-avatar.jpg',
          time: '5:17 AM'
        }, {
          id: 2,
          name: 'Jeff Galbraith',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: '/img/team/jeff_galbraith.jpg',
          time: '5:17 AM'
        }, {
          id: 3,
          name: 'Razvan Stoenescu',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: '/img/team/razvan_stoenescu.jpeg',
          time: '5:17 AM'
        }
      ],
    }
  },

})
</script>
