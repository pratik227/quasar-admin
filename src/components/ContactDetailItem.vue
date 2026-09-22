<template>
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <!--
        Was color="grey-2" with a caller-supplied text-color. The leading icon
        is now a tonal avatar: a container role and its on- pair, which is what
        keeps it legible once the page goes dark.
      -->
      <q-avatar :icon="icon" :class="`md-detail-avatar--${tone}`"/>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1" class="md-body-large">{{ value }}</q-item-label>
      <q-item-label caption class="md-body-small">{{ label }}</q-item-label>
    </q-item-section>

  </q-item>
</template>

<script>
import {defineComponent} from 'vue';

/*
 * Contact.vue still passes legacy Quasar palette names ('blue', 'orange',
 * 'grey-8') through `text_color`. The prop is part of this component's public
 * API so it stays, but the names are folded onto M3 roles here rather than
 * being emitted as `text-blue` classes -- that way the page needs no change and
 * nothing outside the token layer reaches the DOM.
 *
 * Anything unrecognised (including the neutral greys) lands on `neutral`, which
 * is the correct reading: those rows were never meant to be accented.
 */
const TONE_BY_LEGACY_COLOR = {
  blue: 'primary',
  indigo: 'primary',
  purple: 'primary',
  orange: 'tertiary',
  red: 'tertiary',
  pink: 'tertiary',
  teal: 'secondary',
  green: 'secondary'
}

export default defineComponent({
  name: "ContactDetailItem",
  props: ['icon', 'text_color', 'value', 'label'],

  computed: {
    tone () {
      // Legacy values carry a shade suffix ('grey-8'); only the hue matters.
      const hue = String(this.text_color || '').split('-')[ 0 ]
      return TONE_BY_LEGACY_COLOR[ hue ] || 'neutral'
    }
  }
})
</script>

<style scoped>
.md-detail-avatar--primary {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.md-detail-avatar--secondary {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-detail-avatar--tertiary {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

.md-detail-avatar--neutral {
  background: var(--md-sys-color-surface-container-highest);
  color: var(--md-sys-color-on-surface-variant);
}
</style>
