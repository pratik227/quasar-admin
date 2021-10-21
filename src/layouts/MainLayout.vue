<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <q-space/>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                 @click="$q.fullscreen.toggle()"
                 v-if="$q.screen.gt.sm">
          </q-btn>
          <q-btn round dense flat color="white" icon="fab fa-github" type="a" href="https://github.com/pratik227/quasar-admin" target="_blank">
          </q-btn>
          <q-btn round dense flat icon="fas fa-heart" style="color:#9d4182 !important;" type="a" href="https://github.com/sponsors/pratik227" target="_blank">
          </q-btn>
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              5
            </q-badge>
            <q-menu
            >
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="View All" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <q-item to="/" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Dashboard2" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>CRM Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="pages"
          label="Pages"
        >
          <q-list class="q-pl-lg">
            <q-item to="/Login-1" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="email"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Login-1</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Lock" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="lock"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Lock-2" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="lock"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Lock Screen - 2</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Pricing" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="list"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Pricing</q-item-label>
              </q-item-section>
            </q-item>
            <q-item-label header class="text-weight-bolder text-white">Generic</q-item-label>
            <q-item to="/Profile" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="person"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>User Profile</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Maintenance" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="settings"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Maintenance</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-expansion-item
          icon="map"
          label="Maps"
        >
          <q-list class="q-pl-lg">
            <q-item to="/Map" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="map"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Map</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/MapMarker" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="location_on"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Map Marker</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/StreetView" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="streetview"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Street View</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>

        <q-item to="/Mail" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="email"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Mail</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/directory" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="card_giftcard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Directory</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/TreeTable" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="list"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>TreeTable</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Charts" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="insert_chart"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Charts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Footer" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="info"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Footer</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/CardHeader" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="card_giftcard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Card Header</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Cards" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="card_giftcard"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Cards</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Tables" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="table_chart"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Tables</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Contact" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="person"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Contact</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Checkout" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="check_circle_outline"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Checkout</q-item-label>
          </q-item-section>
        </q-item>

        <!--        not completed-->
        <q-item to="/Calendar" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Calendar</q-item-label>
          </q-item-section>
        </q-item>

<!--        not completed-->
<!--        <q-item to="/Taskboard" active-class="q-item-no-link-highlighting">-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="done"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>-->
<!--            <q-item-label>Taskboard</q-item-label>-->
<!--          </q-item-section>-->
<!--        </q-item>-->

        <q-item to="/Pagination" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="date_range"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Pagination</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/Ecommerce" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="shopping_cart"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Product Catalogues</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          icon="menu_open"
          label="Menu Levels"
        >
          <q-item class="q-ml-xl" active-class="q-item-no-link-highlighting">
            <q-item-section>
              <q-item-label>Level 1</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item
            :header-inset-level="0.85"
            label="Level 2"
          >
            <q-item class="q-ml-xl" style="margin-left: 55px  !important;" active-class="q-item-no-link-highlighting">
              <q-item-section>
                <q-item-label>Level 2.1</q-item-label>
              </q-item-section>
            </q-item>
            <q-expansion-item
              :header-inset-level="1"
              label="Level 2.2"
            >
              <q-item style="margin-left: 65px  !important;" active-class="q-item-no-link-highlighting">
                <q-item-section>
                  <q-item-label>Level 2.2.1</q-item-label>
                </q-item-section>
              </q-item>
              <q-item style="margin-left: 65px  !important;" active-class="q-item-no-link-highlighting">
                <q-item-section>
                  <q-item-label>Level 2.2.2</q-item-label>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-expansion-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Messages from "./Messages";

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
