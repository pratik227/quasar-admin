<template>
  <!--
    Renders outside MainLayout, so nothing above it sets a surface: the page has
    to paint its own. It used to be `bg-blue text-white`, which meant the dark
    toggle never reached it and it stayed a glaring blue block.
  -->
  <div class="fullscreen md-error text-center q-pa-md flex flex-center">
    <div>
      <div class="md-error__code">
        404
      </div>

      <!-- Was `text-h2` at opacity .4 -- a tenth of a contrast ratio short in
           light mode and worse in dark. on-surface-variant is the role for
           exactly this: present, receded, still legible. -->
      <div class="md-headline-medium md-error__hint">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl md-filled-button"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404'
})
</script>

<style scoped>
.md-error {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

/*
 * 30vh is far past the top of the type scale, so it stays a raw size -- but the
 * weight and colour come from the system. primary keeps the numeral as the
 * loudest thing on the page in both schemes.
 */
.md-error__code {
  font-family: var(--md-sys-typescale-brand-font);
  font-size: 30vh;
  font-weight: 500;
  line-height: 1;
  color: var(--md-sys-color-primary);
}

.md-error__hint { color: var(--md-sys-color-on-surface-variant); }

/* Quasar's filled `color` prop hardcodes `text-white`, unreadable on the
   dark-scheme primary. The role pair lives here instead. */
</style>
