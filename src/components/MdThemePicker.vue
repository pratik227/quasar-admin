<template>
  <q-btn round dense flat icon="palette" aria-label="Change colour theme">
    <q-menu anchor="bottom right" self="top right" class="md-theme-menu">
      <q-list role="menu" aria-label="Colour themes" padding>
        <q-item-label header class="md-label-medium md-theme-menu__head">
          Theme
        </q-item-label>

        <q-item
          v-for="theme in themes"
          :key="theme.id"
          v-ripple
          clickable
          v-close-popup
          role="menuitemradio"
          :aria-checked="String(theme.id === current)"
          class="md-theme-menu__item"
          @click="setTheme(theme.id)"
        >
          <q-item-section avatar class="md-theme-menu__swatch-cell">
            <span class="md-theme-menu__swatch" :style="{ background: theme.swatch }" />
          </q-item-section>

          <q-item-section class="md-body-medium">{{ theme.label }}</q-item-section>

          <!-- The tick is the non-colour cue: a swatch ring alone would be the
               only signal for which theme is active, and rings are exactly what
               a colour-blind reader is least able to compare. -->
          <q-item-section side>
            <q-icon v-if="theme.id === current" name="check" size="20px" class="md-theme-menu__check" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <q-tooltip>Colour theme</q-tooltip>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'

import { useTheme } from '@/composables/useTheme.js'

export default defineComponent({
  name: 'MdThemePicker',

  setup () {
    const { themes, current, setTheme } = useTheme()
    return { themes, current, setTheme }
  }
})
</script>

<style scoped>
.md-theme-menu__head {
  color: var(--md-sys-color-on-surface-variant);
  text-transform: uppercase;
  padding-block: 0 var(--md-sys-space-50);
}

.md-theme-menu__item {
  min-height: var(--md-sys-target-min);
  margin-inline: var(--md-sys-space-100);
  margin-block: var(--md-sys-space-50);
  border-radius: var(--md-sys-shape-corner-full);
  color: var(--md-sys-color-on-surface);
}

.md-theme-menu__swatch-cell {
  min-width: 24px;
  width: 24px;
  padding: 0;
  margin-inline-end: var(--md-sys-space-150);
}

.md-theme-menu__swatch {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: var(--md-sys-shape-corner-full);
  /* Outline so a near-white swatch is still visible on a light surface. */
  border: 1px solid var(--md-sys-color-outline-variant);
}

.md-theme-menu__check { color: var(--md-sys-color-primary); }
</style>
