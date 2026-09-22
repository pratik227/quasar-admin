<template>
  <!--
    Full-screen page outside MainLayout. The old gradient (#7028e4 -> #e5b2ca)
    with `text-white`, `dark` inputs and a `bg-blue-5` button was built for one
    fixed backdrop; it is now a tertiary-container surface whose on- pair does
    the contrast work in both schemes.
  -->
  <q-layout class="md-lock" v-cloak>
    <q-page-container>
      <q-page class="flex flex-center q-pa-md">
        <q-card v-if="!$q.screen.lt.sm" flat class="md-lock__card">
          <q-item>
            <q-item-section avatar>
              <q-avatar size="130px" class="md-lock__avatar">
                <img width="130" height="130" src="profile.svg" alt="">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="md-title-large">Pratik Patel</q-item-label>
              <q-item-label caption>
                <!-- No `dark` / `color="white"`: the control now inherits the
                     scheme, so it is correct whichever one is active. -->
                <q-input v-model="password" color="primary" :type="isPwd ? 'password' : 'text'"
                         placeholder="Enter Password">
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />

                  </template>
                </q-input>
              </q-item-label>
              <q-item-label></q-item-label>
            </q-item-section>
            <q-item-section side center>
              <q-btn to="/" round unelevated class="q-mt-lg md-filled-button" icon="arrow_right_alt"
                     aria-label="Unlock"></q-btn>
            </q-item-section>
          </q-item>
        </q-card>
        <q-card v-if="$q.screen.lt.sm" flat class="md-lock__card">
          <q-card-section class="text-center">
            <q-avatar size="130px" class="md-lock__avatar">
              <img width="130" height="130" src="profile.svg" alt="">
            </q-avatar>
          </q-card-section>
          <q-card-section class="text-center">
            <div class="md-title-large">Pratik Patel</div>
            <q-input v-model="password" color="primary" :type="isPwd ? 'password' : 'text'"
                     placeholder="Enter Password">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />

              </template>
            </q-input>
            <q-btn to="/" round unelevated class="q-mt-lg md-filled-button" icon="arrow_right_alt"
                   aria-label="Unlock"></q-btn>
          </q-card-section>
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
  background: var(--md-sys-color-tertiary-container);
  color: var(--md-sys-color-on-tertiary-container);
}

/*
 * Transparent, as it was before -- the card only groups the block. Keeping it
 * transparent means the single tertiary-container/on-tertiary-container pair
 * governs the whole screen, which is what makes it safe in dark mode.
 */
.md-lock__card {
  background: transparent;
  color: inherit;
  inline-size: min(100%, 480px);
}

.md-lock__avatar {
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--md-sys-color-on-tertiary-container) 12%, transparent);
}

/*
 * Was `round flat color="white" class="bg-blue-5"`. A filled `color` prop would
 * bring Quasar's hardcoded `text-white` with it, which the dark-scheme primary
 * cannot carry, so the pair is set here.
 */

[v-cloak] {
  display: none !important;
}
</style>
