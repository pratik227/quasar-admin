<template>
  <!--
    A full-screen page outside MainLayout. The old `linear-gradient(135deg,
    #7028e4, #e5b2ca)` with `text-white` on top ignored the theme entirely and
    was the same violent purple in both schemes; the whole page is now a
    primary-container surface, so its foreground is guaranteed against it.
  -->
  <q-layout class="md-maintenance" v-cloak>
    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        <q-card flat class="md-maintenance__card">
          <div class="row items-center full-width justify-center q-gutter-lg">
            <q-icon name="settings" size="5rem"></q-icon>
            <!-- `warnings` is not a Material Icons name and rendered as an
                 empty box; `warning` is the intended glyph. -->
            <q-icon name="warning" size="5rem"></q-icon>
          </div>
          <div class="row full-width">
            <div class="col-12">
              <div>
                <div class="md-display-small text-center q-mt-lg">
                  Under Maintenance
                </div>
                <div class="md-title-medium text-center q-mt-sm">
                  Our site is Under Maintenance. We will be back shortly.
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Maintenance"
})
</script>


<style scoped>
.md-maintenance {
  background: var(--md-sys-color-primary-container);
  color: var(--md-sys-color-on-primary-container);
}

/* Transparent so the page surface shows through -- the card is only here to
   group the block, and a second filled container on top of the first would
   flatten the composition. */
.md-maintenance__card {
  background: transparent;
  color: inherit;
  max-inline-size: 40rem;
}

[v-cloak] {
  display: none !important;
}
</style>
