<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card style="border-radius: 20px">
          <!--  <h2> hi master & <img> garis hijau & <h1> log in -->
          <q-card-section>
            <div class="row" style="margin-bottom: -72px">
              <div class="col">
                <h2 class="ttlSptFnt">Hi Master</h2>
              </div>
              <div class="col">
                <img class="imgPst" src="../img/rcijo.png" alt="" />
              </div>
            </div>
            <h1 class="ttlFnt">Log in</h1>
          </q-card-section>
          <!-- <q-input> input email, <q-input> password & <q-checkbox> rememberme & <p> register, <p> ______ & <q-button> let's start -->
          <q-form ref="form">
            <q-input
              class="q-mx-md q-mt-sm"
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

            <div class="row" style="margin-top: -15px">
              <div class="col">
                <q-checkbox
                  class="q-gutter-xs q-mx-sm cbPst"
                  v-model="right"
                  label="Remember Me"
                />
              </div>
              <div class="col">
                <p class="q-mr-lg rgPst">Register</p>
                <p class="q-mr-lg ulPst">________</p>
              </div>
            </div>

            <div
              style="margin-top: -15px; margin-bottom: 15px; text-align: center"
            >
              <q-btn
                class="btnPst self-center q-mt-sm"
                unelevated
                rounded
                color="primary"
                label="Lets Start!"
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
.imgPst {
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

/* css <h1> log in */
.ttlFnt {
  font-family: poppins-bold;
  font-size: 64px;
  color: #000000;
  margin: -40px 155px 0px 12px;
}

/* css q-input */
.iptPst {
  margin-top: -10px;
}

/* css q-input email */
.inputEmail {
  align-content: center;
  font-size: 24px;
  color: #000000;
  margin: 25px 12px 0px 12px;
}

/* css q-input password */
.inputPassword {
  align-content: center;
  font-size: 24px;
  color: #000000;
  margin: -15px 12px 0px 12px;
}

/* css <p> register */
.rgPst {
  font-family: poppins-regular;
  color: #89f1cb;

  letter-spacing: -1px;
  text-align: right;
  margin-top: 10px;
}

/* css <p> register underline */
.ulPst {
  font-family: poppins-regular;
  color: #89f1cb;

  letter-spacing: -3.5px;
  text-align: right;
  margin-top: -37px;
}

/* css q-btn lets start */
.btnPst {
  width: 88%;
  height: 55px;
  align-self: center;
}

/* css q-page */
.bg-image {
  background-image: linear-gradient(to top right, #333533, #2a7c79, #f2d7bc);
}
</style>
