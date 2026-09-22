<template>
  <!--
    `background_image` is still honoured so Cards.vue keeps control of the
    banner, but it is now an OVERRIDE rather than the only source of colour:
    with nothing passed the card is a fully themed primary-container tile.
  -->
  <q-card flat class="md-plan" :style="{'background-image': background_image}">
    <q-card-section>
      <div class="md-title-large md-title-large--emphasized text-center">
        Extended
      </div>
    </q-card-section>
    <q-separator class="md-plan__rule"/>
    <q-card-section>
      <div class="text-center">
        <q-icon name="apartment" size="36px"></q-icon>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="md-display-small md-display-small--emphasized text-center">
        $250
      </div>
    </q-card-section>
    <q-card-section>
      <div class="md-title-medium text-center md-measure">
        This is good if your company size is between 2 and 10 Persons.
      </div>
    </q-card-section>
    <q-card-actions vertical align="center">
      <q-btn unelevated class="text-capitalize md-plan__cta">Start Free Trail</q-btn>
    </q-card-actions>
    <q-separator class="md-plan__rule"/>
    <q-card-section class="text-center md-label-large">
      Request Demo
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardCompany",

  props:['background_image']
})
</script>

<style scoped>
/*
 * A filled card: primary-container with its on- pair, which replaces the old
 * `text-white` + gradient combination. The pairing is what guarantees contrast
 * in both schemes -- white-on-gradient only worked against a light page.
 */
.md-plan {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
  border-radius: var(--md-sys-shape-corner-extra-large);
}

/*
 * The separator's own token is tuned for a neutral surface and disappears on a
 * filled container, so the rules are drawn from the content colour instead.
 */
.md-plan__rule {
  background: color-mix(in srgb, currentColor 20%, transparent);
}

/* The call to action has to out-contrast the container it sits on. */
.md-plan__cta {
  background: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}
</style>
