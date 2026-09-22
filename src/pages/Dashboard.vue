<template>
  <!--
    The feed canonical layout: a configurable grid of cards, which is what
    Material recommends when a view is "a lot of content at a glance" rather
    than a list paired with a detail pane.
    https://m3.material.io/foundations/layout/canonical-examples/overview

    Page padding comes from --md-layout-margin, which already steps 16dp on
    compact to 24dp from 600dp up, so the page does not need its own breakpoint
    logic. It replaces q-pa-sm, which was a flat 8dp at every size.
  -->
  <q-page class="md-page">
    <!--
      The feed canonical layout: a configurable grid of cards, which is what
      Material recommends for "a lot of content at a glance" rather than a list
      paired with a detail pane.
      https://m3.material.io/foundations/layout/canonical-examples/overview

      Page padding comes from --md-layout-margin, which already steps 16dp on
      compact to 24dp from 600dp up, so the page needs no breakpoint logic of
      its own. Vertical rhythm is handled in the stylesheet below -- see the
      note there, because Quasar's gutters make it non-obvious.
    -->
    <div class="md-page__stack">
      <card-social icon_position="left" />

      <card-charts />

      <div class="row q-col-gutter-md">
        <tab-social />
        <card-with-image />
      </div>

      <div class="row q-col-gutter-md">
        <todo-list />
        <card-time-line />
      </div>

      <table-visits />
    </div>
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
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
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
          name: 'Jordan Lee',
          msg: ' -- I\'ll be in your neighborhood doing errands this\n' +
            '            weekend. Do you want to grab brunch?',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=96&v=4',
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

<style scoped>
.md-page {
  padding: var(--md-layout-margin);
}

/*
 * Vertical rhythm between sections.
 *
 * Quasar's q-col-gutter-* predates flex `gap`: it spaces columns by padding
 * each one and pulling the row back up with an equal negative top margin. That
 * mechanism cannot be combined with a `gap` on the parent -- flex gap applies
 * between MARGIN boxes, so the -16px cancels a 16px gap exactly and sections
 * render flush. Nesting the sections in an outer gutter grid fails the mirror
 * way, and partially neutralising the margin leaves one boundary at 32px
 * because the first section's lift widens the space beneath it.
 *
 * So the vertical half of the gutter is switched off for section rows and
 * replaced with `row-gap`, which has none of that history: it adds space only
 * BETWEEN wrapped lines, never above the first. Columns that wrap on narrow
 * screens still separate correctly, and the stack's own gap is then the only
 * thing controlling the space between sections.
 *
 * The :deep() halves cover components that render their own gutter row as their
 * root element (CardSocial, CardCharts, TableVisits).
 */
.md-page__stack {
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-space-200);
}

.md-page__stack > .row[class*="q-col-gutter"],
.md-page__stack > :deep(.row[class*="q-col-gutter"]) {
  margin-top: 0;
  row-gap: var(--md-sys-space-200);
}

.md-page__stack > .row[class*="q-col-gutter"] > *,
.md-page__stack > :deep(.row[class*="q-col-gutter"] > *) {
  padding-top: 0;
}
</style>
