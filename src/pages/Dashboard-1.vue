<template>
  <q-layout>
    
    <q-page-container>
      <q-page class="flex bg-image ">
        <!-- Sidebar -->
        <q-card style="border-radius: 20px; background-color: rgba(0, 0, 0, 0); box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0)">
          <!-- icon Profile -->
          <q-card-section>
            <q-btn padding="lg" style="background-color:#E1E1E1; border-radius:10px; ">
              <!-- <q-icon name="eco"></q-icon> -->
              <q-img src="../img/ic_dashboard.png" style="width: 40px; margin:-20px;"></q-img>
            </q-btn>
          </q-card-section>
          <!-- icon Dashboard -->
          <q-card-section>
            <q-btn padding="lg" style="background-color:#E1E1E1; border-radius:10px;">
              <!-- <q-icon name="eco"></q-icon> -->
              <q-img src="../img/ic_location.png" style="width: 40px; margin:-20px;"></q-img>
            </q-btn>
          </q-card-section>
          <!-- icon Location -->
          <q-card-section>
            <q-btn padding="lg" style="background-color:#E1E1E1; border-radius:10px;">
              <!-- <q-icon name="eco"></q-icon> -->
              <q-img src="../img/ic_package.png" style="width: 40px; margin:-20px;"></q-img>
            </q-btn>
          </q-card-section>
          <!-- icon Package -->
          <q-card-section>
            <q-btn padding="lg" style="background-color:#E1E1E1; border-radius:10px;">
              <!-- <q-icon name="eco"></q-icon> -->
              <q-img src="../img/ic_management.png" style="width: 40px; margin:-20px;"></q-img>
            </q-btn>
          </q-card-section>
          <!-- icon Management -->
          <q-card-section>
            <q-btn padding="lg" style="background-color:#E1E1E1; border-radius:10px;">
              <!-- <q-icon name="eco"></q-icon> -->
              <q-img src="../img/ic_tryout.png" style="width: 40px; margin:-20px;"></q-img>
            </q-btn>
          </q-card-section>
          <!-- icon Tryout -->
          <q-card-section>
            <q-btn padding="lg" style="background-color:#E1E1E1; border-radius:10px;">
              <!-- <q-icon name="eco"></q-icon> -->
              <q-img src="../img/ic_tryout.png" style="width: 40px; margin:-20px;"></q-img>
            </q-btn>
          </q-card-section>
          <!-- icon Logoff -->
          <q-card-section>
            <q-btn padding="lg" style="background-color:#E1E1E1; border-radius:10px;">
              <!-- <q-icon name="eco"></q-icon> -->
              <q-img src="../img/ic_tryout.png" style="width: 40px; margin:-20px;"></q-img>
            </q-btn>
          </q-card-section>
          <q-card-section>
            <q-btn padding="lg" style="background-color:#E1E1E1; border-radius:10px;">
              <!-- <q-icon name="eco"></q-icon> -->
              <q-img src="../img/ic_tryout.png" style="width: 40px; margin:-20px;"></q-img>
            </q-btn>
          </q-card-section>
        </q-card>
        <!-- Mainbar -->
        <q-card class=" " style="border-radius: 20px; margin: 16px 0px 16px 0px; width: 93%; background-color: rgba(0, 0, 0, 0.4);">
          <!-- Navigation -->
          <q-card-section>
            <q-btn padding="lg" style="background-color: rgba(255, 255, 255, 0.25); border-radius:10px; ">
              <p style="margin: -20px">mkaan bang</p>
            </q-btn>
          </q-card-section>
          <!-- Mainbar -->
          <q-card-section>
            <q-btn padding="lg" style="background-color: rgba(255, 255, 255, 0.25); border-radius:10px; ">
              <p style="margin: -20px">mkaan bang</p>
            </q-btn>
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
      sizes: ["xs", "sm", "md", "lg", "xl"],
      icons: [
        "navigation",
        "add_a_photo",
        "camera",
        "camera_front",
        "my_location",
      ],
    };
  },
},);
</script>

<style>
.bg-image {
  background-image: linear-gradient(to top right, #333533, #2a7c79, #f2d7bc);
}
</style>
