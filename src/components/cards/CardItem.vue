<template>
  <q-card flat bordered class="md-card">
    <q-item>
      <q-item-section avatar>
        <q-avatar size="70px">
          <img width="70" height="70" :src="avatar" alt="">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="md-title-medium md-title-medium--emphasized">{{ name }}</q-item-label>
        <q-item-label caption class="md-body-medium">
          {{ des }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn unelevated label="add" size="sm" class="text-capitalize md-button-tonal"></q-btn>
      </q-item-section>
    </q-item>

  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardItem",

  props: ['avatar', 'name', 'des']
})
</script>

<style scoped>
/* See CardBasic.vue: surface tone + hairline outline in place of a shadow. */
.md-card {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-large);
}

/*
 * A tonal button rather than filled: this is the secondary action on a list
 * row, and secondary-container sits below the row's own emphasis instead of
 * competing with it. `size="sm"` shrinks the hit area well under the 48px
 * minimum, so it is restored here without changing the label's type size.
 */
.md-button-tonal {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
  min-block-size: 48px;
  min-inline-size: 48px;
}
</style>
