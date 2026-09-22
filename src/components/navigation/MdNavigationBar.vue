<template>
  <q-tabs
    class="md-navbar"
    active-class="md-navbar__tab--active"
    indicator-color="transparent"
    active-color="on-secondary-container"
    no-caps
    stretch
    role="navigation"
    aria-label="Primary navigation"
  >
    <!-- QRouteTab is the router-aware tab: it resolves `to`, applies
         active-class on match and handles keyboard navigation, so none of
         that is reimplemented. -->
    <q-route-tab
      v-for="item in destinations"
      :key="item.to"
      exact
      :to="item.to"
      :icon="item.icon"
      :label="item.short || item.label"
      class="md-navbar__tab"
      @click="$emit('navigate')"
    />

    <!-- Material caps the bar at five destinations, so the rest of the tree is
         reached through the modal expanded rail rather than being crammed in. -->
    <q-tab
      name="more"
      icon="more_horiz"
      label="More"
      class="md-navbar__tab"
      @click="$emit('more')"
    />
  </q-tabs>
</template>

<script>
import { defineComponent } from 'vue'

import { primaryDestinations } from '@/config/navigation.js'

/*
 * Four, not five: the fifth slot is the "More" affordance. Going past five
 * destinations shrinks each target below a comfortable touch width on a narrow
 * phone, which is the reason Material sets the cap.
 */
const MAX_BAR_DESTINATIONS = 4

export default defineComponent({
  name: 'MdNavigationBar',

  emits: [ 'more', 'navigate' ],

  setup () {
    return {
      destinations: primaryDestinations.slice(0, MAX_BAR_DESTINATIONS)
    }
  }
})
</script>

<style scoped>
.md-navbar {
  height: 80px;
  background: var(--md-sys-color-surface-container);
  color: var(--md-sys-color-on-surface-variant);
  /*
   * The bar sits against the bottom edge, where phone gesture bars and home
   * indicators live -- Material's "safety region". Without the inset the row of
   * targets ends up underneath system UI.
   */
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

/*
 * :deep() because these elements are rendered inside QTab, not in this
 * template, so scoped styling cannot reach them otherwise.
 *
 * M3 puts a full-round pill behind the icon and the label underneath it. QTab
 * already stacks icon over label; what it has no prop for is the pill, which is
 * why the icon gets a background here rather than the tab itself.
 */
.md-navbar__tab :deep(.q-icon) {
  width: 64px;
  height: 32px;
  border-radius: var(--md-sys-shape-corner-full);
  transition:
    background-color var(--md-sys-motion-duration-default-effects) var(--md-sys-motion-spring-standard-default-effects);
}

.md-navbar__tab--active :deep(.q-icon) {
  background-color: var(--md-sys-color-secondary-container);
}

.md-navbar__tab :deep(.q-tab__label) {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.5px;
}
</style>
