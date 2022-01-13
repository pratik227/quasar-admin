<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card style="border-radius: 20px">
          <!--  <img> garis hijau -->
          <q-card-section class="text-right">
            <img class="imgPst" src="../img/rcijo.png" alt="" />
          </q-card-section>
          <!--  <h1> cpns -->
          <q-card-section class="text-center">
            <h1 class="ttlFnt">CPNS</h1>
          </q-card-section>
          <!--  <q-linear-progress> progress bar -->
          <q-card-section class="text-center">
            <q-linear-progress rounded indeterminate class="lpPst" />
          </q-card-section>
          <!--  <img> garis hijau 2 -->
          <q-card-section class="text-left">
            <img class="imgPst2" src="../img/rcijo2.png" alt="" />
          </q-card-section>
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
    };
  },
});
</script>

<style>

.imgPst {
  width: 100px;
  margin-top: -12px;
  text-align: right;
  margin-right: -4px;
}

.ttlFnt {
  font-family: poppins-bold;
  font-size: 64px;
  color: #000000;
  margin: -85px 60px 0px 60px;
}

.lpPst {
  color: #89f1cb;
  width: 60%;
  margin: -30px 60px 0px 60px;
}

.imgPst2 {
  width: 100px;
  text-align: left;
  margin-top: -60px;
  margin-left: -14px;
  margin-bottom: -32px;
}

.bg-image {
  background-image: linear-gradient(to top right, #333533, #2a7c79, #f2d7bc);
}
</style>
