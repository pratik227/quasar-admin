<template>
  <q-card flat bordered class="md-card">
    <q-img :src="data.img" :alt="data.title" height="220px">
      <!--
        chip_class / chip_color are supplied by ProductCatalogues.vue and are
        still Quasar palette names; they stay bound so the page keeps its API.
      -->
      <q-chip v-if="data.chip" :class="data.chip_class" :color="data.chip_color" :label="data.chip"></q-chip>
    </q-img>

    <q-card-section>
      <!--
        A FAB is one of the few components M3 still gives real elevation to --
        it floats over the media edge. Colour is the primary-container pair,
        which is the M3 FAB default, and the offset uses logical properties so
        it flips with the writing direction.
      -->
      <q-btn
        fab
        icon="add_shopping_cart" padding="sm"
        aria-label="Add to cart"
        class="absolute md-fab"
      />
    </q-card-section>

    <q-card-section>
      <div class="md-title-large md-title-large--emphasized">
        {{ data.title }}
      </div>
      <div class="md-body-medium text-justify q-mt-sm md-card__supporting">
        {{ data.caption }}
      </div>
      <div>
        <!--
          M3 has no amber "rating" role. `accent` is the Quasar brand slot the
          bridge points at md-sys-color-tertiary, so it reads as a highlight
          without claiming a meaning -- error/warning would imply the product is
          in trouble. (Quasar has no `tertiary` colour name; the accent slot is
          how that role is reached from a prop.)
        -->
        <q-rating
          v-model="data.rating"
          max="5"
          size="1.5em"
          color="accent"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half" readonly
          no-dimming
        />
      </div>
    </q-card-section>
    <q-card-section>
      <!-- `float-right` does not flip under RTL; a flex row does. -->
      <div class="col-12 md-price-row">
        <span class="md-title-large md-title-large--emphasized">{{ data.amount }}</span>
        <span>
          <q-btn label="See Details" rounded color="secondary" outline></q-btn>
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CardProduct",

  props: ['data']
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

.md-price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--md-sys-space-200);
}

.md-fab {
  inset-block-start: 0;
  inset-inline-end: var(--md-sys-space-150);
  transform: translateY(-50%);
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}
</style>
