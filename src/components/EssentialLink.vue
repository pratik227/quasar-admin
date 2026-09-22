<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="md-label-large">{{ title }}</q-item-label>
      <q-item-label caption class="md-body-small">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>
/*
 * Deliberately colourless. This renders inside the navigation drawer, so it has
 * to take whatever surface role the drawer is painted with -- Quasar resolves
 * the icon and the caption from currentColor, and M3's list-item type pair is
 * label-large over body-small. Pinning a colour here would break the moment the
 * drawer's own container role changes.
 */
</style>
