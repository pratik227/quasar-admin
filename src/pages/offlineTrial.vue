<template>
  <q-layout class="flex bg-image flex-center">
    <div
      style="width: 50vh; height: 50vh; background-color: #000000"
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
        <!--  <h1> cpns -->
        <q-card-section style="background-color: #f2f2f2" class="text-center">
          <h1 class="ttlFnt">CPNS</h1>
        </q-card-section>
        <!--  <q-linear-progress> progress bar -->
        <q-card-section style="background-color: #a9a9a9; margin-top: -20px" >
          <q-linear-progress rounded indeterminate class="lpPst full-width q-mx-xl" />
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
  margin-top: 0px;
  margin-right: 0px;
}

.ttlFnt {
  font-family: poppins-bold;
  font-size: 64px;
  color: #000000;
  margin: 0px 0px 0px 0px;
}

.lpPst {
  color: #18C1EE;
  margin: 0px 0px 0px 0px;
}

.imgPst2 {
  width: 100px;
  margin-top: 0px;
  margin-left: 0px;
  margin-bottom: 0px;
}

.bg-image {
  background-image: #f0f2f9;
}
</style>
