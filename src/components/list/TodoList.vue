<template>
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
</template>

<script>
import {defineComponent,defineAsyncComponent} from 'vue'

export default defineComponent({
  name: 'ToDoList',
  components: {
    Todo: defineAsyncComponent(() =>  import('components/Todo')),
  },
  setup () {
    return {
      layout: 'dense',
      side: 'right'
    }
  }
})
</script>
