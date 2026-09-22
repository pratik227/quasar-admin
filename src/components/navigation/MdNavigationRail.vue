<template>
  <q-list
    class="md-rail"
    :class="`md-rail--${mode}`"
    role="navigation"
    aria-label="Main navigation"
    padding
  >
    <template v-for="(item, index) in resolvedItems" :key="index">

      <!-- Section header. Expanded rail only: with no labels to group, a header
           in the collapsed rail is just an unexplained gap. -->
      <q-item-label
        v-if="item.header"
        header
        class="md-rail__header md-label-medium"
      >
        {{ item.header }}
      </q-item-label>

      <!-- Group. QExpansionItem brings its own toggle, rotation and
           aria-expanded, so none of that is reimplemented here. -->
      <q-expansion-item
        v-else-if="item.children"
        :icon="item.icon"
        :label="item.label"
        :content-inset-level="0.5"
        class="md-rail__group"
      >
        <md-navigation-rail
          :items="item.children"
          :mode="mode"
          @navigate="$emit('navigate')"
        />
      </q-expansion-item>

      <!-- Destination. `to` + active-class is Quasar's router integration;
           it handles modified clicks and the active state for us. -->
      <!--
        `exact` matters here. Vue Router marks a link active when the current
        path STARTS WITH its target, so the Dashboard entry (to="/") lit up on
        every single route -- two destinations showed as current at once.
      -->
      <q-item
        v-else-if="item.to"
        v-ripple
        clickable
        exact
        :to="item.to"
        active-class="md-rail__item--active"
        :aria-current="isCurrent(item.to) ? 'page' : undefined"
        class="md-rail__item"
        @click="$emit('navigate')"
      >
        <q-item-section avatar class="md-rail__indicator">
          <q-icon :name="item.icon" size="24px" />
        </q-item-section>
        <q-item-section v-if="mode === 'expanded'" class="md-rail__label">
          <q-item-label>{{ item.label }}</q-item-label>
        </q-item-section>

        <!-- Collapsed: the full label as a tooltip rather than truncated text.
             96px cannot hold "Product Catalogues", and abbreviating it to
             "Products" (or "CRM Dashboard" to "CRM") produced labels that read
             as different destinations than the ones they point at. -->
        <q-tooltip v-if="mode === 'collapsed'" anchor="center right" self="center left">
          {{ item.label }}
        </q-tooltip>
      </q-item>

      <!-- A tree node with no `to` -- the "Menu Levels" depth demo. Not
           clickable, so it is not announced as an interactive element. -->
      <q-item v-else class="md-rail__item">
        <q-item-section avatar class="md-rail__indicator">
          <q-icon v-if="item.icon" :name="item.icon" size="24px" />
        </q-item-section>
        <q-item-section class="md-rail__label">
          <q-item-label>{{ item.label }}</q-item-label>
        </q-item-section>
      </q-item>

    </template>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue'

import { navigation } from '@/config/navigation.js'

/* Every node carrying a `to`, at any depth. Nodes without one are structural
 * (headers, groups, the "Menu Levels" depth demo) and have nothing to link to. */
function flattenDestinations (items) {
  return items.reduce((found, item) => {
    if (item.to !== undefined) found.push(item)
    if (Array.isArray(item.children) === true) found.push(...flattenDestinations(item.children))
    return found
  }, [])
}

export default defineComponent({
  /*
   * Named so the template can render itself for nested groups -- the tree is
   * arbitrarily deep ("Menu Levels" goes three down), and recursion is how
   * QExpansionItem expects its content to be composed.
   */
  name: 'MdNavigationRail',

  props: {
    /*
     * collapsed -- icon rail, primary destinations only (medium..large)
     * expanded  -- full tree with headers and groups (extra-large, and modal)
     */
    mode: {
      type: String,
      default: 'collapsed',
      validator: value => [ 'collapsed', 'expanded' ].includes(value)
    },

    /*
     * Only passed when recursing into a group's children. At the top level the
     * component picks its own list from the mode.
     */
    items: {
      type: Array,
      default: null
    }
  },

  emits: [ 'navigate' ],

  computed: {
    resolvedItems () {
      if (this.items !== null) return this.items

      /*
       * The collapsed rail lists EVERY destination, flattened.
       *
       * It used to show only the six marked `primary`, on the reasoning that
       * Material caps a rail at about seven entries. That cap assumes an app
       * with a handful of top-level sections; this template has 24 pages, and
       * the effect was that three quarters of the app was unreachable until you
       * found the expand button. A rail you have to leave in order to navigate
       * is not doing its job.
       *
       * Headers and the group rows themselves are dropped rather than rendered
       * as icons: a header has no icon, and a group icon in an icon-only rail
       * is indistinguishable from a destination. Their children come through
       * flattened, so nothing is lost.
       */
      return this.mode === 'collapsed' ? flattenDestinations(navigation) : navigation
    }
  },

  methods: {
    /*
     * Quasar's active-class handles the visual state, but not the accessible
     * one -- aria-current is what tells a screen reader which destination is
     * the current page.
     */
    isCurrent (to) {
      return this.$route.path === to
    }
  }
})
</script>

<style scoped>
.md-rail {
  height: 100%;
  background: var(--md-sys-color-surface);

  /*
   * Matches the 12px the items are inset from the sides, so the rail has the
   * same breathing room on all four edges. QList's `padding` prop only gives
   * 8px vertically, which against a 12px horizontal inset reads as none at all
   * -- the first pill sat against the top of the drawer.
   *
   * The bottom half also matters while scrolling: it is what lets the last
   * destination clear the drawer edge instead of ending flush against it.
   */
  padding-block: var(--md-sys-space-150);
}

/*
 * Section headers line up with the item CONTENT, not the drawer edge.
 *
 * QItemLabel[header] ships its own padding, which left these sitting flush at
 * x=0 while every item below was inset -- the ragged left edge read as a
 * missing gap. The inset is the item's own margin plus its leading padding, so
 * a header and the icon beneath it share one vertical line.
 */
.md-rail__header {
  color: var(--md-sys-color-on-surface-variant);
  text-transform: uppercase;
  padding-inline: calc(var(--md-sys-space-150) + var(--md-sys-space-200)) var(--md-sys-space-150);
}

.md-rail__item {
  color: var(--md-sys-color-on-surface-variant);
  min-height: var(--md-sys-target-min);
}

/*
 * Quasar draws hover and focus with .q-focus-helper: an absolutely positioned
 * overlay that fills the entire item as a hard-edged rectangle. M3 puts the
 * state layer on the SHAPE instead -- the pill behind the icon when collapsed,
 * the full-round row when expanded -- so the helper is switched off and the
 * layer is applied to the right element below.
 */
.md-rail__item :deep(.q-focus-helper) { display: none; }

/*
 * The M3 active indicator: a full-round pill behind the icon. QItem's avatar
 * section is a plain box with no prop for this, which is why it is styled here
 * rather than rebuilt.
 */
.md-rail__indicator {
  min-width: 56px;
  width: 56px;
  height: 32px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: var(--md-sys-shape-corner-full);
  transition:
    background-color var(--md-sys-motion-duration-default-effects) var(--md-sys-motion-spring-standard-default-effects),
    color var(--md-sys-motion-duration-default-effects) var(--md-sys-motion-spring-standard-default-effects);
}

.md-rail__item--active { color: var(--md-sys-color-on-secondary-container); }

.md-rail__item--active .md-rail__indicator {
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

/*
 * State layers are the content colour at a fixed opacity composited over the
 * surface -- 8% hover, 12% pressed -- not a grey wash. Applied to the pill when
 * collapsed so the tint follows the shape.
 */
.md-rail--collapsed .md-rail__item:hover .md-rail__indicator {
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
}

.md-rail--collapsed .md-rail__item:active .md-rail__indicator {
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent);
}

/* The active pill keeps its fill on hover; it must not wash out to grey. */
.md-rail--collapsed .md-rail__item--active:hover .md-rail__indicator,
.md-rail--collapsed .md-rail__item--active:active .md-rail__indicator {
  background-color: var(--md-sys-color-secondary-container);
}

/*
 * Collapsed: icon only. The label lives in a tooltip, because 96px truncates
 * anything longer than about eight characters and the abbreviations that fit
 * ("CRM", "Products") read as different destinations than they point at.
 */
.md-rail--collapsed .md-rail__item {
  justify-content: center;
  padding: var(--md-sys-space-75) var(--md-sys-space-50);
  margin-block: var(--md-sys-space-50);
}

.md-rail--collapsed .md-rail__indicator { margin: 0; }

/*
 * Expanded: M3 makes the whole row a full-round pill, so the indicator has no
 * separate fill and the state layer belongs to the row.
 */
.md-rail--expanded .md-rail__item {
  margin-inline: var(--md-sys-space-150);
  padding-inline: var(--md-sys-space-200);
  border-radius: var(--md-sys-shape-corner-full);

  /*
   * Rows must not touch. Each row is a full-round pill once it is hovered or
   * selected, so with no gap two filled pills meet edge to edge and read as a
   * single blob -- most obviously when the pointer is on the row directly above
   * the current page.
   *
   * QList is a block container, so adjacent vertical margins COLLAPSE: 2px a
   * side gave a 2px channel, not 4. 4px a side collapses to a 4px channel,
   * which is legible against a 48px row without stretching a 24-item list.
   */
  margin-block: var(--md-sys-space-50);
}

/*
 * The 56x32 pill is COLLAPSED-rail geometry. Left in place when expanded it
 * padded the icon out to 44px from the drawer edge and pushed the label to 84,
 * which is what made the row look unanchored. Expanded, the row itself is the
 * pill, so the icon only needs to be an icon.
 */
.md-rail--expanded .md-rail__indicator {
  min-width: 24px;
  width: 24px;
  height: 24px;
  margin-inline-end: var(--md-sys-space-150);
}

.md-rail--expanded .md-rail__item--active {
  background-color: var(--md-sys-color-secondary-container);
}

.md-rail--expanded .md-rail__item--active .md-rail__indicator {
  background-color: transparent;
}

.md-rail--expanded .md-rail__item:hover {
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
}

.md-rail--expanded .md-rail__item--active:hover {
  background-color: var(--md-sys-color-secondary-container);
}

/*
 * Group rows onto the same grid as destinations.
 *
 * QExpansionItem renders its own QItem header internally, which Quasar pads and
 * lays out on its own terms -- so groups sat flush at x=0, full width, icon at
 * 16 and label at 72, while every destination beside them was inset to 12/28/64.
 * That mismatch is what makes the drawer look like it has no left gap: two
 * different left edges alternating down the list.
 *
 * :deep() because the header is rendered inside QExpansionItem, not here.
 */
.md-rail__group :deep(.q-expansion-item__container > .q-item) {
  margin-inline: var(--md-sys-space-150);
  margin-block: var(--md-sys-space-50);
  padding-inline: var(--md-sys-space-200);
  min-height: var(--md-sys-target-min);
  border-radius: var(--md-sys-shape-corner-full);
  color: var(--md-sys-color-on-surface-variant);
}

/* Quasar's avatar section is 56px -- collapsed-rail geometry again. Expanded,
   the icon is just an icon, matching .md-rail--expanded .md-rail__indicator. */
.md-rail__group :deep(.q-expansion-item__container > .q-item .q-item__section--avatar) {
  min-width: 24px;
  width: 24px;
  padding: 0;
  margin-inline-end: var(--md-sys-space-150);
}

/* Same state-layer treatment as destinations: tint the shape, not a rectangle. */
.md-rail__group :deep(.q-focus-helper) {
  display: none;
}

.md-rail__group :deep(.q-expansion-item__container > .q-item:hover) {
  background-color: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
}

/* Keyboard focus must stay visible now that the focus helper is off. */
.md-rail__item:focus-visible {
  outline: 3px solid var(--md-sys-color-primary);
  outline-offset: -3px;
  border-radius: var(--md-sys-shape-corner-full);
}
</style>
