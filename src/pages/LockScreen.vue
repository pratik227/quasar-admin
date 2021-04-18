<template>
  <q-layout class="bg-image" v-cloak>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="login-form" v-bind:style="$q.platform.is.mobile?{'width': '60%'}:{'width':'20%'}">
          <q-card-section>
            <q-avatar size="74px" class="absolute-center shadow-10">
              <img src="profile.svg">
            </q-avatar>
          </q-card-section>
          <q-card-section class="q-mt-md">
            <div class="text-h6 text-center">
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
            <q-btn push label="Unlock" class="text-capitalize" color="primary"></q-btn>
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

<style>
.bg-image {
  background-image: url("~assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

[v-cloak] {
  display: none !important;
}
</style>
