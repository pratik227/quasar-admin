<template>
  <q-card flat bordered class="md-card">
    <q-img src="/img/chicken-salad.jpg" alt="Chicken salad served on a plate"/>

    <q-card-section class="absolute absolute-center text-center">
      <!--
        One of the few things in this file that genuinely floats -- it overlaps
        the media edge -- so it keeps a real shadow, drawn from the shadow role
        rather than Quasar's fixed-black `shadow-10`, plus a ring in the card's
        own surface colour to separate it from the photograph.
      -->
      <q-avatar size="100px" class="md-avatar--floating">
        <img width="100" height="100" src="/img/avatar6.jpg" alt="">
      </q-avatar>
    </q-card-section>

    <q-card-section class="q-pt-none q-mt-xl">
      <div class="md-title-medium md-title-medium--emphasized">
        $・Italian, Cafe
      </div>
      <div class="md-body-medium md-card__supporting">
        Small plates, salads & sandwiches in an intimate setting.
      </div>
    </q-card-section>

    <q-separator/>

    <q-card-actions>
      <q-btn flat round icon="event" aria-label="Pick a date"/>
      <q-btn flat color="primary">
        Reserve
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardCafe"
})
</script>

<style scoped>
/* See CardBasic.vue: surface tone + hairline outline in place of a shadow. */
.md-card {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-large);
}

.md-card__supporting { color: var(--md-sys-color-on-surface-variant); }

.md-avatar--floating {
  border: 2px solid var(--md-sys-color-surface-container-low);
  box-shadow: 0 2px 6px color-mix(in srgb, var(--md-sys-color-shadow) 30%, transparent);
}
</style>
