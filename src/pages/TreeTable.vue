<template>
  <q-page class="md-page">
    <q-card class="no-shadow" bordered>
      <q-card-section>
        <div class="md-title-large md-title-large--emphasized text-primary">
          Tree Table
        </div>
        <div class="md-body-medium md-supporting">
          A simple Tree Collapsed/Expanded Table
        </div>
      </q-card-section>

      <q-separator></q-separator>
      <q-card-section class="q-pa-none">
        <simple-hierarchy></simple-hierarchy>
      </q-card-section>
    </q-card>

    <q-card class="no-shadow" bordered>
      <q-card-section>
        <div class="md-title-large md-title-large--emphasized text-primary">
          Custom Icon with Chip
        </div>
        <div class="md-body-medium md-supporting">
          A simple Tree Collapsed/Expanded Table
        </div>
      </q-card-section>
      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <custom-hierarchy></custom-hierarchy>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent} from 'vue'

export default defineComponent({
  name: "TreeTable",
  components: {
    SimpleHierarchy: defineAsyncComponent(() => import('@/components/tree-table/SimpleHierarchy.vue')),
    CustomHierarchy: defineAsyncComponent(() => import('@/components/tree-table/CustomHierarchy.vue'))
  }
})
</script>

<style scoped>
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page {
  padding: var(--md-layout-margin);
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-space-200);
}

/*
 * The hierarchy tables run edge to edge inside their card, and QHierarchy is
 * rendered `square` so its own corners stay flat. Without clipping, those flat
 * corners paint over the card's 12px radius -- the coloured header squared off
 * the top and the last row squared off the bottom, so the card only looked
 * rounded where no table touched it.
 *
 * Clipping on the card is the right side to fix it: the table keeps its square
 * corners (correct, it is not a standalone surface) and the card keeps its
 * shape. Safe here because nothing in these cards floats outside their bounds.
 */
.md-page > .q-card {
  overflow: hidden;
}

/* Supporting text sits one step back from the title without dropping opacity,
   which would cost contrast in both schemes. */
.md-supporting { color: var(--md-sys-color-on-surface-variant); }
</style>
