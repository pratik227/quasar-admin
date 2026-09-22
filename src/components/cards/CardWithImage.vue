<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card flat bordered class="my-card md-card">
      <!--
        :ratio, not ratio="3/2".

        As a plain string the value reaches QImg's validator as "3/2", which
        coerces to NaN, fails `v > 0` and is dropped. QImg then has no aspect
        ratio to reserve, and since both of its children are absolutely
        positioned the container collapses to 0px -- the card rendered as an
        empty 22px sliver. Binding it makes 3 / 2 evaluate to 1.5 in JS.

        `basic` was also removed: it is not a QImg prop, so it fell through to
        the DOM as a bare attribute and did nothing.
      -->
      <q-img
        src="/img/parallax1.jpg"
        alt=""
        :ratio="3 / 2"
      >
        <!--
          Quasar's image caption is a fixed black scrim with white text, and a
          scrim has no `on-` pair to reach for. A translucent surface panel does
          have one, so the overlay is a real surface: near-white with dark text
          in the light scheme, near-black with light text in the dark one, and
          legible over any photograph in both.
        -->
        <div class="absolute-bottom-left md-img-overlay">
          <div class="md-display-large">
            28 <sup>o</sup>
          </div>
          <div class="md-headline-small">
            India
          </div>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CardWithImage'
})
</script>

<style scoped>
/* See CardBasic.vue: surface tone + hairline outline in place of a shadow. */
.md-card {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-large);
  overflow: hidden;
}

/*
 * Optical roundness: the panel is inset 16px inside a 16px corner, so it gets
 * its own smaller radius rather than repeating the card's.
 * Offsets are logical so the panel moves to the trailing edge under RTL.
 */
.md-img-overlay {
  margin-inline-start: var(--md-sys-space-200);
  margin-block-end: var(--md-sys-space-200);
  padding-block: var(--md-sys-space-150);
  padding-inline: var(--md-sys-space-250);
  border-radius: var(--md-sys-shape-corner-medium);
  background: color-mix(in srgb, var(--md-sys-color-surface-container-lowest) 80%, transparent);
  color: var(--md-sys-color-on-surface);
  backdrop-filter: blur(8px);
}
</style>
