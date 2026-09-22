<template>
  <q-card flat bordered class="md-card">
    <q-card-section class="text-center">
      <q-avatar size="100px" class="md-avatar--floating">
        <img width="100" height="100" :src="avatar" alt="">
      </q-avatar>
    </q-card-section>

    <q-card-section class="q-pt-none text-center ">
      <div class="md-title-large md-title-large--emphasized">
        {{ name }}
      </div>
      <div class="md-body-medium md-card__supporting">
        {{ des }}
      </div>
    </q-card-section>

    <!--
      The three networks used to be told apart by brand colour (indigo-7,
      info, indigo-8), which no theme can follow. They are told apart by
      container role now: the icon still identifies the network, the tint just
      keeps them visually separable in both schemes.
    -->
    <q-card-actions align="center">
      <q-btn flat round icon="fab fa-facebook" class="md-social md-social--primary" aria-label="Facebook"/>
      <q-btn flat round icon="fab fa-twitter" class="md-social md-social--secondary" aria-label="Twitter"/>
      <q-btn flat round icon="fab fa-instagram" class="md-social md-social--tertiary" aria-label="Instagram"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardProfile",
  props: ['avatar', 'name', 'des']
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

/* Round icon buttons default to ~36px; rule 3 wants a 48px target. */
.md-social {
  min-block-size: 48px;
  min-inline-size: 48px;
}

.md-social--primary {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

.md-social--secondary {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

.md-social--tertiary {
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}
</style>
