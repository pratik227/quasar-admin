<template>
  <q-card flat bordered class="md-card">
    <q-item>
      <q-item-section avatar>
        <q-avatar size="60px" class="md-avatar--floating">
          <img width="60" height="60" :src="avatar" alt="">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="md-title-medium md-title-medium--emphasized">{{ name }}</q-item-label>
        <q-item-label caption class="md-body-medium">
          {{ des }}
        </q-item-label>
        <q-item-label class="md-body-medium md-card__supporting">
          {{ email }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <!-- Container roles instead of brand colours -- see CardProfile.vue. -->
        <q-item-label>
          <q-btn size="sm" flat round icon="fab fa-facebook" class="md-social md-social--primary" aria-label="Facebook"/>
        </q-item-label>
        <q-item-label>
          <q-btn size="sm" flat round icon="fab fa-twitter" class="md-social md-social--secondary" aria-label="Twitter"/>
        </q-item-label>

      </q-item-section>
    </q-item>

    <q-separator></q-separator>
    <q-card-section>
      <div class="q-pa-sm md-body-medium md-card__supporting">
        Intro : At vero eos et accusamus et iusto
        odio dignissimos ducimus qui blanditiis atque corrupti quos dolores
        et...
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "DirectoryCard",
  props: ['avatar', 'name', 'des', 'email']
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

/* `size="sm"` drops the hit area to ~31px; rule 3 wants 48. */
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
</style>
