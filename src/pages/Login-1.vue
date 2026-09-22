<template>
  <q-layout>
    <q-page-container>
      <!--
        Renders outside MainLayout. The gradient backdrop (#7028e4 -> #e5b2ca)
        was fixed in both schemes and the card on top was Quasar's default
        white; both are surface roles now, so the screen follows the theme.
      -->
      <q-page class="flex md-login flex-center q-pa-md">
        <q-card flat class="md-login__card">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center md-login__avatar">
              <img width="103" height="103" src="profile.svg" alt="">
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col md-headline-small ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                outlined
                dense
                v-model="username"
                label="Username"
                lazy-rules
              />

              <q-input
                type="password"
                outlined
                dense
                v-model="password"
                label="Password"
                lazy-rules

              />

              <div>
                <q-btn label="Login" to="/" type="button" unelevated class="md-filled-button"/>
              </div>
            </q-form>
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
  setup() {
    return {
      username: ref('Pratik'),
      password: ref('12345')
    }
  },
})
</script>

<style scoped>
.md-login {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

/*
 * Was an inline `{'width': $q.screen.lt.sm ? '80%' : '30%'}`. A clamp holds the
 * M3 dialog width at every breakpoint without a screen-size branch, and the
 * container tone is what separates the card from the page now that neither is
 * painted a fixed colour.
 */
.md-login__card {
  inline-size: min(100%, 400px);
  background: var(--md-sys-color-surface-container-high);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-extra-large);
}

.md-login__avatar {
  box-shadow: 0 0 0 4px var(--md-sys-color-surface-container-high);
}

/* Quasar's filled `color` prop hardcodes `text-white`, which the dark-scheme
   primary cannot carry. */
</style>
