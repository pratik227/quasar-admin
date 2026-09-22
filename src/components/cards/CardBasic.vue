<template>
  <q-card flat bordered class="md-card">
    <q-card-section>
      <div class="md-title-large md-title-large--emphasized">
        Our Changing Planet
      </div>
    </q-card-section>
    <q-separator/>
    <q-card-section class="md-body-medium md-card__supporting">
      {{ text }}
    </q-card-section>
    <q-card-actions align="left">
      <q-btn unelevated label="Go Somewhere" class="text-capitalize q-ma-sm md-filled-button"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "BasicCard",
  setup() {
    return {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
})
</script>

<style scoped>
/*
 * Elevation is expressed as surface tone, not shadow: the card sits one step
 * above the page surface and takes a hairline outline-variant border (Quasar's
 * `bordered` already resolves to that token via $separator-color) instead of
 * the stock box-shadow. Quasar hardcodes `.q-card { background: #fff }`, so the
 * role has to be restated here or the card stays white in dark mode.
 */
.md-card {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-large);
}

/* Supporting text recedes one role rather than dropping to a grey literal. */
.md-card__supporting { color: var(--md-sys-color-on-surface-variant); }

/*
 * QBtn's `color` prop pairs a background with a hardcoded white label, which
 * inverts wrongly in dark mode (primary becomes light there). A role pair does
 * the job in both schemes, so the button carries no `color` prop at all.
 */
</style>
