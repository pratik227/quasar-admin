<template>
  <q-layout>

    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card style="border-radius: 20px;">
          <!--  <h2> hi master & <img> garis hijau & <h1> register -->
          <q-card-section>
            <div class="row" style="margin-bottom: -72px">
              <div class="col">
                <h2 class="ttlSptFnt">Hi Master</h2>
              </div>
              <div class="col">
                <img class="imgPst" src="../img/rcijo.png" alt="">
              </div>
            </div>
            
            <h1 class="ttlFnt" >Register</h1>
            <!-- <h1 class="ttlDcr" >.</h1> -->
          </q-card-section>
          <!-- <q-input> input name, <q-input> email, <q-input> password, <q-input> addtional roles & <q-dropdown> roles, <q-dropdown> locale & <q-button> Register -->
          <q-form ref="form">
            <q-input
              class="q-mx-md q-mt-sm"
              rounded
              outlined
              v-model="username"
              label="Name"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />
            <q-input
              class="q-mx-md iptPst"
              rounded
              outlined
              v-model="username"
              label="Email"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />
            <q-input
              class="q-mx-md iptPst"
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
              class="q-mx-md iptPst"
              rounded
              outlined
              v-model="username"
              label="Additional Roles"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || '']"
            />

            <div class="row" style="margin-top: -15px">
              <div class="col">
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
              <div class="col">
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

            <div style="margin-top: -15px; margin-bottom:15px; text-align: center">
              <q-btn
                class="btnPst self-center q-mt-sm"
                unelevated
                rounded
                color="primary"
                label="Register"
              />
            </div>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

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
/* css <img> garis hijau */
.imgPst{
  margin-top: -10px;
  margin-left: 78px;
  width: 100px;
}

/* css <h2> hi master */
.ttlSptFnt {
  font-family: poppins-regular;
  font-size: 24px;
  color: #000000;
  margin: 0px 0px 0px 15px;
}

/* css <h1> register */
.ttlFnt {
  font-family: poppins-bold;
  font-size: 64px;
  color: #000000;
  margin: -40px 75px 0px 12px;
}

/* css <q-input> */
.iptPst {
  margin-top: -10px;
}

.inputEmail {
  align-content: center;
  font-size: 24px;
  color: #000000;
  margin: 25px 12px 0px 12px;
}

.inputPassword {
  align-content: center;
  font-size: 24px;
  color: #000000;
  margin: -15px 12px 0px 12px;
}

.lddPst{
  width: 170px;
  margin-left: 18px;
}

.rddPst{
  width: 170px;
  margin-left: 4px;
}

.ddPst{
  margin-top: 4px;
}

.ulPst{
  font-family: poppins-regular;
  color: #89F1CB;

  letter-spacing: -3.5px;
  text-align: right;
  margin-top: -37px;
}

.btnPst {
  margin-top: 22px;
  width: 90%;
  height: 55px;
  align-self: center;
}

.bg-image {
  background-image: linear-gradient(to top right, #333533, #2a7c79, #f2d7bc);
}
</style>
