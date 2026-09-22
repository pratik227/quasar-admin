<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card flat bordered class="fit md-card">
      <q-card-section class="q-pb-none">
        <!-- Layout-only header, not a list item: role="presentation" stops QItem
             emitting role="listitem" with no enclosing list. -->
        <q-item role="presentation">
          <q-item-section avatar class="">
            <q-icon color="primary" name="access_time" size="32px"/>
          </q-item-section>

          <q-item-section>
            <div class="md-title-large md-title-large--emphasized">Timeline</div>
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
            <div class="md-body-medium">
              {{ timeline.desc }}
            </div>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {defineComponent} from 'vue'


export default defineComponent({
  name: 'CardTimeLine',
  setup() {
    return {
      /*
       * The dot colours are Quasar brand names on purpose, not literals:
       * _quasar-bridge.css points primary/secondary/accent at the M3 roles, so
       * `color: 'primary'` here resolves to md-sys-color-primary and follows
       * the theme. The old red/orange/blue could not.
       */
      timeline_list: [
        {
          title: 'Pratik Likes your product ',
          side: 'left',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\n' +
            '                  et dolore magna aliqua.',
          color: "primary",
          icon: "thumb_up"
        },
        {
          title: 'Product Update',
          side: 'left',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\n' +
            '                  et dolore magna aliqua.',
          color: "accent",
          icon: "done_all"
        }, {
          title: 'Jeff Likes your product ',
          side: 'left',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore\n' +
            '                  et dolore magna aliqua.',
          color: "secondary",
          icon: "thumb_up"
        }
      ],
    }
  }
})
</script>

<style scoped>
/* See CardBasic.vue: surface tone + hairline outline in place of a shadow. */
.md-card {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-large);
}
</style>
