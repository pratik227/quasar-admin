<template>
  <q-layout view="lHh lpr lFf" class="md-auth">
    <q-page-container>
      <q-page class="md-auth__page">
        <!--
          Centred single-column auth card, the shape shadcn's signup block uses.
          Capped at 400px rather than left to the grid: Material asks for 40-60
          characters per line, and a form stretched across a desktop window puts
          the label and its field at opposite ends of the screen.
        -->
        <q-card flat bordered class="md-auth__card">
          <q-card-section class="md-auth__head">
            <h1 class="md-headline-small q-my-none">Create an account</h1>
            <p class="md-body-medium md-auth__muted q-mt-sm q-mb-none">
              Enter your information below to create your account
            </p>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <!--
              A real QForm with rules, not a decorative mock. The template is
              read as a reference implementation, so a signup page that accepts
              "a" as a password teaches the wrong thing.
            -->
            <q-form ref="form" greedy @submit.prevent="onSubmit">
              <q-input
                v-model="fullName"
                outlined
                dense
                label="Full Name"
                autocomplete="name"
                lazy-rules
                :rules="[ v => !!v && v.trim().length > 1 || 'Please enter your name' ]"
              />

              <q-input
                v-model="email"
                outlined
                dense
                type="email"
                label="Email"
                autocomplete="email"
                lazy-rules
                hint="We'll use this to contact you. We will not share your email with anyone else."
                :rules="[ v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '') || 'Enter a valid email address' ]"
              />

              <q-input
                v-model="password"
                outlined
                dense
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                autocomplete="new-password"
                lazy-rules
                hint="Must be at least 8 characters long."
                :rules="[ v => (v || '').length >= 8 || 'Use at least 8 characters' ]"
              >
                <template #append>
                  <q-btn
                    flat
                    dense
                    round
                    :icon="showPassword ? 'visibility_off' : 'visibility'"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>

              <q-input
                v-model="confirmPassword"
                outlined
                dense
                :type="showPassword ? 'text' : 'password'"
                label="Confirm Password"
                autocomplete="new-password"
                lazy-rules
                hint="Please confirm your password."
                :rules="[ v => v === password || 'Passwords do not match' ]"
              />

              <q-btn
                type="submit"
                unelevated
                no-caps
                class="md-filled-button full-width q-mt-md md-auth__cta"
                label="Create Account"
              />
            </q-form>

            <!-- Divider with a label, as in the reference. A bare <hr> loses
                 the "or" that tells you the two routes are alternatives. -->
            <div class="md-auth__divider md-label-medium">
              <span>Or continue with</span>
            </div>

            <q-btn
              outline
              no-caps
              class="full-width md-auth__oauth"
              icon="fab fa-google"
              label="Sign up with Google"
              @click="onOAuth"
            />
          </q-card-section>

          <q-card-section class="text-center q-pt-none">
            <span class="md-body-medium md-auth__muted">Already have an account?</span>
            <q-btn flat dense no-caps to="/Login-1" label="Sign in" class="md-auth__link" />
          </q-card-section>
        </q-card>

        <p class="md-body-small md-auth__terms md-measure">
          By creating an account you agree to our Terms of Service and Privacy Policy.
        </p>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SignUpPage',

  setup () {
    const $q = useQuasar()
    const form = ref(null)

    return {
      form,
      fullName: ref(''),
      email: ref(''),
      password: ref(''),
      confirmPassword: ref(''),
      showPassword: ref(false),

      /*
       * The template ships no backend, so this validates and reports rather
       * than pretending to register anyone -- a submit button that silently
       * does nothing reads as a bug.
       */
      onSubmit () {
        $q.notify({
          message: 'Account details are valid. Connect your API to finish sign-up.',
          color: 'primary',
          textColor: 'white',
          icon: 'check_circle',
          position: 'top'
        })
      },

      onOAuth () {
        $q.notify({
          message: 'Wire this button to your OAuth provider.',
          color: 'primary',
          textColor: 'white',
          icon: 'info',
          position: 'top'
        })
      }
    }
  }
})
</script>

<style scoped>
.md-auth,
.md-auth__page {
  background: var(--md-sys-color-surface);
  color: var(--md-sys-color-on-surface);
}

.md-auth__page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--md-sys-space-300);
  padding: var(--md-layout-margin);
  min-height: 100vh;
}

.md-auth__card {
  inline-size: min(100%, 400px);
  border-radius: var(--md-sys-shape-corner-extra-large);
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
}

.md-auth__head { padding-block-end: var(--md-sys-space-100); }

.md-auth__muted { color: var(--md-sys-color-on-surface-variant); }

/*
 * Quasar absolutely positions the hint/error row and reserves exactly one line
 * for it, so the two-line email hint overlapped the field below. Putting it
 * back in flow lets a wrapped hint push the form down instead of colliding.
 */
.md-auth__card :deep(.q-field__bottom) {
  position: static;
  padding-block: var(--md-sys-space-50) 0;
}

.md-auth__card :deep(.q-field) {
  margin-block-end: var(--md-sys-space-150);
}

.md-auth__cta {
  min-block-size: var(--md-sys-target-min);
  border-radius: var(--md-sys-shape-corner-full);
}

.md-auth__oauth {
  min-block-size: var(--md-sys-target-min);
  border-radius: var(--md-sys-shape-corner-full);
  color: var(--md-sys-color-on-surface);
}

/*
 * Rule either side of the label, drawn with the outline role so it follows the
 * scheme. Flex rather than a background-image gradient so the gap around the
 * text is exact at any width.
 */
.md-auth__divider {
  display: flex;
  align-items: center;
  gap: var(--md-sys-space-150);
  margin-block: var(--md-sys-space-300);
  color: var(--md-sys-color-on-surface-variant);
}

.md-auth__divider::before,
.md-auth__divider::after {
  content: "";
  flex: 1;
  block-size: 1px;
  background: var(--md-sys-color-outline-variant);
}

.md-auth__link { color: var(--md-sys-color-primary); }

.md-auth__terms {
  color: var(--md-sys-color-on-surface-variant);
  text-align: center;
}
</style>
