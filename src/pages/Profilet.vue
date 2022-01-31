<template>
  <q-layout class="flex bg-image flex-center">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>CPNS</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState || drawerClick"
      @click.capture="drawerClick"
      mini-width="72.5"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-img style="width: 40px" src="../img/profile.png" :ratio="1" />
          </q-item-section>

          <q-item-section> Profile </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-img
              style="width: 40px"
              src="../img/ic_dashboard.png"
              :ratio="1"
            />
          </q-item-section>

          <q-item-section> Dashboard </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-img style="width: 40px" src="../img/ic_user.png" :ratio="1" />
          </q-item-section>

          <q-item-section> Users </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-img
              style="width: 40px"
              src="../img/ic_location.png"
              :ratio="1"
            />
          </q-item-section>

          <q-item-section> Location </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-img style="width: 40px" src="../img/ic_package.png" :ratio="1" />
          </q-item-section>

          <q-item-section> Package </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-img
              style="width: 40px"
              src="../img/ic_management.png"
              :ratio="1"
            />
          </q-item-section>

          <q-item-section> Management </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-img style="width: 40px" src="../img/ic_tryout.png" :ratio="1" />
          </q-item-section>

          <q-item-section> Tryout </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-img style="width: 40px" src="../img/ic_off.png" :ratio="1" />
          </q-item-section>

          <q-item-section> Logoff </q-item-section>
        </q-item>
      </q-list>

      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="primary"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>
    <div
      style="background-color: #f4f4f4; width: 60vh; height: 80vh"
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
              <h2 class="ttlSptFnt">Profile</h2>
            </div>
            <div class="col">
              <img class="imgPst" src="../img/profile.png" alt="" />
            </div>
          </div>
        </q-card-section>

        <q-card-section style="background-color: #f2f2f2" class="text-left">
          <h1 class="ttlFnt">Register</h1>
        </q-card-section>
        <!--  <q-linear-progress> progress bar -->
        <q-card-section style="background-color: #a9a9a9" class="text-center">
          <q-form ref="form">
            <q-input
              style="margin-top: -10px"
              rounded
              outlined
              v-model="username"
              label="Email"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />
            <q-input
              style="margin-top: -15px"
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
              style="margin-top: -15px"
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
              style="margin-top: -15px"
              rounded
              outlined
              v-model="password"
              name="password"
              type="password"
              label="Password"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />
            <div
              class="row"
              style="background-color: #f2f2f2; margin-top: -15px"
            >
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
      sizes: ["xs", "sm", "md", "lg", "xl"],
      icons: [
        "navigation",
        "add_a_photo",
        "camera",
        "camera_front",
        "my_location",
      ],
      setup() {
        return {
          text: ref(""),
          ph: ref(""),
          dense: ref(false),
        };
      },
    };
  },
  setup() {
    const miniState = ref(false);

    return {
      drawer: ref(false),
      miniState,

      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
    };
  },
});
</script>

<style>
.imgPst {
  width: 100px;
}

.ttlFnt {
  font-family: poppins-bold;
  font-size: 64px;
  color: #000000;
  margin: 0px 0px 0px 0px;
}

.bg-image {
  background-image: linear-gradient(to top right, #333533, #2a7c79, #f2d7bc);
}
</style>
