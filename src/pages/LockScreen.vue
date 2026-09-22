<template>
  <!--
    Full-screen page outside MainLayout. The photographic backdrop stays -- it
    is artwork, not colour -- but it now sits under a scrim built from
    --md-sys-color-scrim so the card reads at any image brightness, and the card
    itself is a surface role rather than Quasar's default white.
  -->
  <q-layout class="md-lock" v-cloak>
    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        <q-card flat class="md-lock__card">
          <q-card-section>
            <q-avatar size="74px" class="absolute-center md-lock__avatar">
              <img width="74" height="74" src="profile.svg" alt="">
            </q-avatar>
          </q-card-section>
          <q-card-section class="q-mt-md">
            <div class="md-title-large text-center">
              Pratik Patel
            </div>
            <q-input v-model="password" :type="isPwd ? 'password' : 'text'" placeholder="Enter Password">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn unelevated label="Unlock" class="text-capitalize md-filled-button"></q-btn>
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>

import {defineComponent} from 'vue'
import {ref} from 'vue'

export default defineComponent({
  name: "LockScreen",

  setup() {
    return {
      password: ref(''),
      isPwd: ref('password')
    }
  }

})
</script>

<style scoped>
.md-lock {
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/*
 * Scrim over the photo. M3 uses this role precisely so content laid over an
 * image keeps its contrast without the image having to be re-shot; 40% is the
 * spec's value for a scrim that still shows the artwork.
 */
.md-lock::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--md-sys-color-scrim);
  opacity: 0.4;
  pointer-events: none;
}

/*
 * Was an inline `{'width': $q.platform.is.mobile ? '60%' : '20%'}` -- 20% of a
 * wide desktop window is a 300px card on a 1500px screen and a 90px one on a
 * phone in portrait. A single clamp gives the M3 dialog width at every size and
 * removes the platform branch.
 */
.md-lock__card {
  position: relative;
  z-index: 1; /* above the scrim pseudo-element */
  inline-size: min(100%, 360px);
  background: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-extra-large);
}

/* Optical roundness: the avatar sits inside a 28px corner, so it keeps its own
   full radius but gains a ring in the surface colour to separate it. */
.md-lock__avatar {
  box-shadow: 0 0 0 4px var(--md-sys-color-surface-container-high);
}


[v-cloak] {
  display: none !important;
}
</style>
