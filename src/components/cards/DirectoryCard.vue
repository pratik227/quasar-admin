<template>
  <q-card>
    <q-item>
      <q-item-section avatar>
        <q-avatar size="60px" class="shadow-10">
          <img :src="avatar">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-grey-8 text-weight-bold">{{ name }}</q-item-label>
        <q-item-label caption>
          {{ des }}
        </q-item-label>
        <q-item-label class="text-grey-8">
          {{ email }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label>
          <q-btn size="sm" flat round icon="fab fa-facebook" class="bg-indigo-7 text-white"/>
        </q-item-label>
        <q-item-label>
          <q-btn size="sm" flat round icon="fab fa-twitter" class="bg-info text-white"/>
        </q-item-label>

      </q-item-section>
    </q-item>

    <q-separator></q-separator>
    <q-card-section>
      <div class="q-pa-sm text-grey-8">
        Intro : At vero eos et accusamus et iusto
        odio dignissimos ducimus qui blanditiis atque corrupti quos dolores
        et...
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "DirectoryCard",
  props: ['avatar', 'name', 'des', 'email']
})
</script>

<style scoped>

</style>
