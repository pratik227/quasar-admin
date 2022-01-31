<template>
  <q-layout class="flex bg-image flex-center">
    <div
      style="background-color: #f4f4f4; width: 60vh; height: 90vh"
      v-bind:class="{
        'justify-center': $q.screen.sm || $q.screen.sm || $q.screen.xs,
      }"
      class="flex flex-center"
    >
      <q-card
        v-bind:style="$q.screen.lt.xl ? { width: '80%' } : { width: '50%' }"
        style="border-radius: 20px"
        class="text-center"
      >
        <!--  <img> garis hijau -->
        <q-card-section style="background-color: #e1e1e1" class="text-right">
          <div class="row">
            <div class="col">
              <h2 class="ttlSptFnt">Hi Master</h2>
            </div>
            <div class="col">
              <img class="imgPst" src="../img/rcijo.png" alt="" />
            </div>
          </div>
        </q-card-section>

        <q-card-section style="background-color: #f2f2f2; " class="text-left">
          <h1 class="ttlFnt">Register</h1>
        </q-card-section>
        <!--  <q-linear-progress> progress bar -->
        <q-card-section style="background-color: #a9a9a9" class="text-center">
          <q-form ref="form">
            <q-input
              style="margin-top:-10px"
              rounded
              outlined
              v-model="username"
              label="Email"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />
            <q-input
              style="margin-top:-15px"
              rounded
              outlined
              v-model="password"
              name="password"
              type="password"
              label="Password"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />
            <q-input
            style="margin-top:-15px"
              rounded
              outlined
              v-model="password"
              name="password"
              type="password"
              label="Password"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />
            <q-input
            style="margin-top:-15px"
              rounded
              outlined
              v-model="password"
              name="password"
              type="password"
              label="Password"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />
            <div class="row" style="background-color: #f2f2f2; margin-top:-15px">
              <div class="col-12 col-md">
                <q-btn-dropdown
                  class="lddPst ddPst"
                  split
                  rounded
                  outline
                  label="Default Role"
                  Lazy-rules
                  to="/start/pick-quasar-flavour"
                  color="primary"
                  
                >
                  <q-list>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>None</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Normal User</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Administrator</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
              <div class="col-12 col-md">
                <q-btn-dropdown
                  class="rddPst ddPst"
                  split
                  rounded
                  outline
                  label="Locale"
                  Lazy-rules
                  to="/start/pick-quasar-flavour"
                  color="primary"
                >
                  <q-list>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>al</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>am</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>ar</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>bg</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>ca</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>cs</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>de</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>el</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>en</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>es</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>fa</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>fi</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>fr</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>gl</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>id</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>it</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>ja</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>ku</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>nl</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>pl</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>pt</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>pt_br</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>ro</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>ru</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>sv</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>tr</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>uk</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>vi</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>zh_CN</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>zh_TW</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
            <q-btn
              class="self-center full-width"
              unelevated
              rounded
              color="primary"
              label="Lets Start!"
            />
          </q-form>
        </q-card-section>
        <!--  <img> garis hijau 2 -->
        <q-card-section style="background-color: #ff2f2f" class="text-left">
          <img class="imgPst2" src="../img/rcijo2.png" alt="" />
        </q-card-section>
      </q-card>
    </div>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
      left: true,
      right: false,
    };
  },
});
</script>

<style>
.imgPst {
  width: 100px;
  margin: -25px 0px -35px 0px;
}

/* css <h2> hi master */
.ttlSptFnt {
  font-family: poppins-regular;
  font-size: 24px;
  color: #000000;
  margin: 0px 0px 0px 15px;
}

.ttlFnt {
  font-family: poppins-bold;
  font-size: 64px;
  color: #000000;
  margin: -25px 0px -20px 0px;
}

.lpPst {
  color: #89f1cb;
  width: 60%;
  margin: 0px 0px 0px 0px;
}

.imgPst2 {
  width: 100px;
  margin: -15px 0px -30px 0px;
}

.bg-image {
  background-image: linear-gradient(to top right, #333533, #2a7c79, #f2d7bc);
}
</style>
