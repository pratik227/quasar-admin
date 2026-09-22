<template>
  <q-card flat class="md-card-inverse">
    <q-card-section>
      <div class="md-title-large md-title-large--emphasized q-pa-sm">
        {{ name }}
      </div>
      <div class="md-body-medium q-pa-sm">
        {{ text }}
      </div>
      <div class="md-label-large md-label-large--emphasized q-pa-sm md-card-inverse__accent">
        {{ des }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardProfileDark",
  props:['name','des','text']
})
</script>

<style scoped>
/*
 * Was a permanently dark card (#181c4d + text-white). Once the app has a real
 * dark mode, "the dark card" stops meaning anything -- on a dark page it is the
 * one card that no longer stands out, which is the opposite of the point.
 *
 * inverse-surface is the role built for exactly this: it is always the opposite
 * end of the neutral ramp from the current scheme, so the card reads as a
 * deliberate inverted panel in BOTH schemes rather than as an unthemed one.
 */
.md-card-inverse {
  background: var(--md-sys-color-inverse-surface);
  color: var(--md-sys-color-inverse-on-surface);
  border-radius: var(--md-sys-shape-corner-extra-large);
}

/*
 * The accent line was `text-red-6`. `error` is not usable here -- it is tuned
 * for contrast against the normal surface and fails against the inverse one,
 * and the string is a name, not a failure. inverse-primary is the only accent
 * role guaranteed legible on inverse-surface.
 */
.md-card-inverse__accent { color: var(--md-sys-color-inverse-primary); }
</style>
