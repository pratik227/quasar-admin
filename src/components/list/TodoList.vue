<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <!--
      Was bg-blue-8 + text-white. The panel is meant to read as a distinct,
      tinted module next to the neutral dashboard cards, which is what a filled
      container role does -- and unlike the blue it keeps working when the page
      goes dark, because on-primary-container moves with it.
    -->
    <q-card flat class="md-panel">
      <q-card-section class="q-pb-none">
        <!-- Layout-only header, not a list item: role="presentation" stops QItem
             emitting role="listitem" with no enclosing list. -->
        <q-item role="presentation">
          <q-item-section avatar>
            <!-- No `color`: the icon inherits the container's on- role. -->
            <q-icon name="library_add_check" size="32px"/>
          </q-item-section>

          <q-item-section>
            <div class="md-title-large md-title-large--emphasized">To do list</div>
            <div class="md-body-medium md-panel__subtitle">All Your to do list</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="">
        <todo></todo>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {defineComponent,defineAsyncComponent} from 'vue'

export default defineComponent({
  name: 'ToDoList',
  components: {
    Todo: defineAsyncComponent(() =>  import('@/components/Todo.vue')),
  },
  setup () {
    return {
      layout: 'dense',
      side: 'right'
    }
  }
})
</script>

<style scoped>
.md-panel {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-radius: var(--md-sys-shape-corner-extra-large);
}

/* Subordinate to the title, same role, receded -- not a second colour. */
.md-panel__subtitle { opacity: 0.74; }
</style>
