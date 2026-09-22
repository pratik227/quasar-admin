<template>
  <q-page class="md-page">
    <q-card class="no-shadow" bordered>
      <q-card-section class="row">
        <div class="md-title-large md-title-large--emphasized">
          Friends
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-list :disabled="true">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img width="40" height="40" src="/img/avatar2.jpg" alt="">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Brunch this weekend?</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">Janet</span>
              -- I'll be in your neighborhood doing errands this
              weekend. Do you want to grab brunch?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            1 min ago
          </q-item-section>
        </q-item>

        <q-separator inset="item"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img width="40" height="40" src="/img/avatar4.jpg" alt="">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Linear Project</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">John</span>
              -- Can we schedule a call for tomorrow?
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <q-card class="q-mt-md no-shadow" bordered>
      <q-card-section class="row">
        <div class="md-title-large md-title-large--emphasized">
          Friends
        </div>
        <q-space></q-space>
        <q-btn class="text-capitalize" outline label="Add Friend" color="primary"></q-btn>
      </q-card-section>
      <q-separator></q-separator>
      <q-list :disabled="true">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img width="40" height="40" src="/img/avatar2.jpg" alt="">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Brunch this weekend?</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">Janet</span>
              -- I'll be in your neighborhood doing errands this
              weekend. Do you want to grab brunch?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            1 min ago
          </q-item-section>
        </q-item>

        <q-separator inset="item"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img width="40" height="40" src="/img/avatar4.jpg" alt="">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Linear Project</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">John</span>
              -- Can we schedule a call for tomorrow?
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <q-card class="q-mt-md no-shadow" bordered>
      <q-card-section class="row q-pa-sm">
        <q-item class="full-width">
          <q-item-section>
            <q-item-label class="md-title-large md-title-large--emphasized" lines="1">Friend List</q-item-label>
            <q-item-label caption>
              Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn class="text-capitalize" outline label="Add Friend" color="primary"></q-btn>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator></q-separator>
      <q-list :disabled="true">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img width="40" height="40" src="/img/avatar2.jpg" alt="">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Brunch this weekend?</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">Janet</span>
              -- I'll be in your neighborhood doing errands this
              weekend. Do you want to grab brunch?
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            1 min ago
          </q-item-section>
        </q-item>

        <q-separator inset="item"/>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img width="40" height="40" src="/img/avatar4.jpg" alt="">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Linear Project</q-item-label>
            <q-item-label caption lines="2">
              <span class="text-weight-bold">John</span>
              -- Can we schedule a call for tomorrow?
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "CardHeader"
}
</script>

<style scoped>
/* M3 window margin -- 16dp on compact, 24dp from 600px up. */
.md-page { padding: var(--md-layout-margin); }
</style>
