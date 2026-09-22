<template>
  <q-page class="md-page">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row items-center q-pa-lg">
        <span class="md-title-medium">
          © 2020 Workflow, Inc. All rights reserved.
        </span>
        <q-space></q-space>
        <!-- No `color` prop on these: a flat QBtn draws its icon from
             currentColor, which is already the card's on-surface role and so
             follows the light/dark toggle for free. -->
        <q-btn icon="fab fa-github" flat dense aria-label="GitHub"></q-btn>
        <q-btn icon="fab fa-facebook" flat dense aria-label="Facebook"></q-btn>
        <q-btn icon="fab fa-twitter" flat dense aria-label="Twitter"></q-btn>
        <q-btn icon="fab fa-instagram" flat dense aria-label="Instagram"></q-btn>
      </q-card-section>
    </q-card>


    <q-card class="q-mt-md row no-shadow" bordered>
      <q-card-section class="col-12 text-center q-pa-lg">

        <q-btn icon="fab fa-github" flat dense aria-label="GitHub"></q-btn>
        <q-btn icon="fab fa-facebook" flat dense aria-label="Facebook"></q-btn>
        <q-btn icon="fab fa-twitter" flat dense aria-label="Twitter"></q-btn>
        <q-btn icon="fab fa-instagram" flat dense aria-label="Instagram"></q-btn>
        <br/>

        <div class="md-title-medium q-mt-sm">
          © 2020 Workflow, Inc. All rights reserved.
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md row no-shadow" bordered>
      <q-card-section class="col-12 row text-center q-pa-lg">
        <div class="col-12 q-col-gutter-x-lg">
          <a class="md-footer-link md-label-large md-label-large--emphasized" href="#">About Us</a>
          <a class="md-footer-link md-label-large md-label-large--emphasized" href="#">Blog</a>
          <a class="md-footer-link md-label-large md-label-large--emphasized" href="#">News</a>
          <a class="md-footer-link md-label-large md-label-large--emphasized" href="#">Jobs</a>
          <a class="md-footer-link md-label-large md-label-large--emphasized" href="#">Press</a>
        </div>
        <br/>
        <div class="md-title-medium col-12 q-mt-sm">
          © 2020 Workflow, Inc. All rights reserved.
        </div>
        <br/>
        <div class="col-12">
          <q-btn icon="fab fa-github" flat dense aria-label="GitHub"></q-btn>
          <q-btn icon="fab fa-facebook" flat dense aria-label="Facebook"></q-btn>
          <q-btn icon="fab fa-twitter" flat dense aria-label="Twitter"></q-btn>
          <q-btn icon="fab fa-instagram" flat dense aria-label="Instagram"></q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }

/* `text-decoration: none` used to be an inline style on all five links. */
.md-footer-link {
  color: var(--md-sys-color-primary);
  text-decoration: none;
}

.md-footer-link:hover,
.md-footer-link:focus-visible {
  text-decoration: underline;
}
</style>
