<template>
  <q-layout class="bg-image">
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

    <q-page-container>
      <q-page class="flex">
        <!-- Mainbar -->
        <q-card
          class=""
          style="
            border-radius: 20px;
            margin: 16px 16px 16px 16px;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.4);
          "
        >
          <!-- Navigation -->
          <div
            style="
              width: 10%;
              background-color: rgba(255, 255, 255, 0.25);
              border-radius: 20px;
              margin: 14px 0px 0px 24px;
            "
          >
            <q-breadcrumbs style="font-size: 16px">
              <q-breadcrumbs-el
                label="Home"
                icon="home"
                style="margin: -8px 0px 0px 8px; padding: px 2px 2px 2px"
              />
            </q-breadcrumbs>
          </div>

          <!-- View Profile -->
          <div class="row" style="witdh: 100%">
            <div class="col text-center">
              <img class="" style="height: 75%" src="../img/line.png" alt="" />
            </div>
            <div class="col-8">
              <q-card
                class="absolute-center"
                style="border-radius: 20px; width: 65%; height: 75%"
              >
                <!-- Title Edit Profile & rcijo -->
                <q-card-section>
                  <div class="row">
                    <div class="col q-mt-md q-mx-md">
                      <h2 class="ttlFnt">Edit User</h2>
                    </div>
                    <div class="col text-right q-mt-md q-mx-md">
                      <img
                        src="../img/rcijo.png"
                        style="width: 120px; margin-top: -15px"
                      />
                    </div>
                  </div>
                </q-card-section>
                <!-- Input Username & Icon Profile -->
                <q-card-section style="margin-top: -40px">
                  <div class="row">
                    <div class="col q-mx-md">
                      <p
                        style="
                          font-size: 16px;
                          margin-top: -18px;
                          color: #b0b0b0;
                        "
                      >
                        Username
                      </p>
                      <q-input
                        style="margin-top: -15px"
                        v-model="username"
                        label="Username"
                        rounded
                        outlined
                        lazy-rules
                        :rules="[(val) => (val && val.length > 0) || '']"
                      />
                    </div>
                    <div class="col text-center q-mx-md">
                      <img
                        src="../img/rcijo.png"
                        style="
                          width: 120px;
                          margin-top: -15px;
                          margin-right: -5px;
                        "
                      />
                    </div>
                  </div>
                </q-card-section>
                <!-- Input Emali & Input Additional Roles -->
                <q-card-section style="margin-top: -35px">
                  <div class="row">
                    <div class="col q-mx-md">
                      <p
                        style="
                          font-size: 16px;
                          margin-top: -18px;
                          color: #b0b0b0;
                        "
                      >
                        Email
                      </p>
                      <q-input
                        style="margin-top: -15px"
                        v-model="username"
                        label="Email"
                        rounded
                        outlined
                        lazy-rules
                        :rules="[(val) => (val && val.length > 0) || '']"
                      />
                    </div>
                    <div class="col text-right q-mx-md">
                      <p
                        class="text-left"
                        style="
                          font-size: 16px;
                          margin-top: -18px;
                          color: #b0b0b0;
                        "
                      >
                        Additional Roles
                      </p>
                      <q-input
                        style="margin-top: -15px"
                        v-model="username"
                        label="Additional Roles"
                        rounded
                        outlined
                        lazy-rules
                        :rules="[(val) => (val && val.length > 0) || '']"
                      />
                    </div>
                  </div>
                </q-card-section>
                <!-- Input Password & Dropdown Roles & Locale -->
                <q-card-section style="margin-top: -5px">
                  <div class="row">
                    <div class="col-6">
                      <p
                        class="q-mx-md"
                        style="
                          font-size: 16px;
                          margin-top: -18px;
                          color: #b0b0b0;
                        "
                      >
                        Password
                      </p>
                      <q-input
                        class="q-mx-md"
                        style="margin-top: -15px"
                        v-model="username"
                        label="Password"
                        rounded
                        outlined
                        lazy-rules
                        :rules="[(val) => (val && val.length > 0) || '']"
                      />
                    </div>
                    <div class="col-6">
                      <div class="row">
                        <div class="col-6">
                          <p class="q-ml-md" style="margin-top: -18px">
                            Locale
                          </p>
                          <q-btn-dropdown
                            class="text-center q-mx-md"
                            style="margin-top: -15px; width: 80%; height: 100%"
                            label="Locale"
                            split
                            rounded
                            outline
                            disable
                            lazy-rules
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
                        <div class="col-6">
                          <p class="q-mx-md" style="margin-top: -18px">
                            Locale
                          </p>
                          <q-btn-dropdown
                            class="text-center q-mx-md"
                            style="margin-top: -15px; width: 80%; height: 100%"
                            label="Locale"
                            split
                            rounded
                            outline
                            disable
                            lazy-rules
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
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <!-- Locale & View Locale & Register -->
                <q-card-section>
                  <div class="row">
                    <div class="col"></div>
                    <div class="col text-center">
                      <q-btn
                        style="margin-top: -15px; width: 100%; height: 50px"
                        class=""
                        unelevated
                        rounded
                        color="primary"
                        label="Edit"
                      />
                    </div>
                    <div class="col"></div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col text-center">
              <img class="" style="height: 75%" src="../img/line.png" alt="" />
            </div>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
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
