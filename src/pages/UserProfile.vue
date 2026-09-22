<template>
  <q-page class="md-page">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-8">
        <q-card class="md-panel no-shadow" bordered>
          <q-card-section>
            <div class="md-title-large md-title-large--emphasized">Edit Profile</div>
            <div class="md-body-medium md-supporting">Complete your profile</div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-12">
                <q-item-section side>
                  <q-avatar size="100px">
                    <img width="100" height="100" src="/img/boy-avatar.jpg" alt="">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-btn label="Add Photo" unelevated class="text-capitalize md-filled-button md-photo-btn"
                         rounded></q-btn>
                </q-item-section>
              </q-item>

              <q-item class="col-12 col-sm-6">
                <q-item-section>
                  <q-input dense v-model="user_details.user_name" label="User Name"/>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6">
                <q-item-section>
                  <q-input dense v-model="user_details.email" label="Email Address"/>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6">
                <q-item-section>
                  <q-input dense v-model="user_details.first_name" label="First Name"/>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6">
                <q-item-section>
                  <q-input dense v-model="user_details.last_name" label="Last Name"/>
                </q-item-section>
              </q-item>
              <q-item class="col-12">
                <q-item-section>
                  <q-input autogrow dense v-model="user_details.address" label="Address"/>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6">
                <q-item-section>
                  <q-input dense v-model="user_details.city" label="City"/>
                </q-item-section>
              </q-item>
              <q-item class="col-12 col-sm-6">
                <q-item-section>
                  <q-input dense v-model="user_details.post_code" label="Postal Code"/>
                </q-item-section>
              </q-item>
              <q-item class="col-12">
                <q-item-section>
                  <q-input type="textarea" dense v-model="user_details.about" label="About"/>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn unelevated class="text-capitalize md-filled-button">Update User Info</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-12 col-md-4">

        <q-card class="md-panel no-shadow" bordered>
          <q-card-section class="text-center">
            <q-avatar size="100px" class="shadow-10">
              <img width="100" height="100" src="profile.svg" alt="">
            </q-avatar>
            <div class="md-body-medium md-supporting q-mt-lg">by Pratik Patel</div>
            <div class="md-title-large md-title-large--emphasized q-mt-md">Pratik Patel</div>
          </q-card-section>
          <q-card-section>
            <div class="md-body-medium text-justify md-measure">
              My name is Pratik Patel (also known as @pratik227). I noticed myself pulling into programming since 2013,
              and then determined myself to become a skilled and knowledgeable programmer. My passion for my programming
              increases as I started working for Incentius (where I am currently working in).
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-8">
        <q-card class="md-panel no-shadow" bordered>
          <q-card-section class="q-pa-sm">
            <div class="md-title-large md-title-large--emphasized">Change Password</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-12 col-sm-4">
              <q-item-section>
                Current Password
              </q-item-section>
            </q-item>
            <q-item class="col-12 col-sm-8">
              <q-item-section>
                <q-input type="password" dense outlined round
                         v-model="password_dict.current_password"
                         label="Current Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-12 col-sm-4">
              <q-item-section>
                New Password
              </q-item-section>
            </q-item>
            <q-item class="col-12 col-sm-8">
              <q-item-section>
                <q-input type="password" dense outlined round v-model="password_dict.new_password"
                         label="New Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-12 col-sm-4">
              <q-item-section>
                Confirm New Password
              </q-item-section>
            </q-item>
            <q-item class="col-12 col-sm-8">
              <q-item-section>
                <q-input type="password" dense outlined round
                         v-model="password_dict.confirm_new_password"
                         label="Confirm New Password"/>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn unelevated class="text-capitalize md-filled-button">Change Password</q-btn>
          </q-card-actions>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "UserProfile",
  setup() {
    return {
      user_details: {},
      password_dict: {}
    }
  }
})
</script>

<style scoped>
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }

/*
 * These three panels used to be a hardcoded navy (#162b4d) with `text-white`
 * and `dark` inputs -- a fixed dark card that only read correctly because the
 * page behind it was white, and which lost all separation once the page itself
 * went dark. Elevation in M3 is surface tone, so the panel simply steps one
 * container off the page and takes the matching on- role.
 */
.md-panel {
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-large);
}

.md-supporting { color: var(--md-sys-color-on-surface-variant); }

/*
 * Quasar pairs a filled `color` with a hardcoded `text-white`, unreadable on
 * the dark-scheme primary. The role pair lives on the class instead.
 */

/* Was an inline `max-width: 120px`. */
.md-photo-btn { max-inline-size: 120px; }
</style>
