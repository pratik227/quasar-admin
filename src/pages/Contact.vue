<template>
  <q-page class="q-pa-sm bg-white">
    <q-resize-observer @resize="onResize"/>

    <div class="row" v-if="!$q.screen.lt.sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card class="no-border no-border">
          <q-tab-panels v-model="tab" animated class="bg-white">
            <q-tab-panel name="all" class="q-pa-none full-height" :style="{'height':size['height']-80+'px !important'}">
              <q-list class="">

                <q-item-label class="text-center q-pa-sm">
                  <q-input dense rounded outlined v-model="search">
                    <template v-slot:append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </q-item-label>
                <q-item-label header class="text-center">{{contacts_list.length}} CONTACTS</q-item-label>

                <q-item
                  v-for="(contact, index) in contacts_list" 
                  :key="index"
                  @click="selected_contact=contact">
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="contact.avatar">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{contact.name}}</q-item-label>
                    <q-item-label caption lines="2">
                      <span class="text-weight-bold">{{contact.position}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="favorites" class="q-pa-none" :style="{'height':size['height']-80+'px !important'}">
              <q-list class="">

                <q-item-label class="text-center q-pa-sm">
                  <q-input dense rounded outlined v-model="search">
                    <template v-slot:append>
                      <q-icon name="search"/>
                    </template>
                  </q-input>
                </q-item-label>
                <q-item-label header class="text-center">{{favorites_list.length}} Favorites</q-item-label>

                <q-item
                  v-for="(favorite, index) in favorites_list"
                  :key="index"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="favorite.avatar">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{favorite.name}}</q-item-label>
                    <q-item-label caption lines="2">
                      <span class="text-weight-bold">{{favorite.position}}</span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

          </q-tab-panels>

          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-3"
            align="justify"
          >
            <q-tab name="all" icon="person" class="text-capitalize" label="All"></q-tab>
            <q-tab name="favorites" icon="star" class="text-capitalize" label="Favorites"></q-tab>
          </q-tabs>
        </q-card>
      </div>
      <div class="col-lg-8 q-pl-xs col-md-8 col-sm-12 col-xs-12">
        <q-card class="no-border no-border" :style="{'height':size['height']-24+'px !important'}">
          <q-toolbar class="text-black ">
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img :src="selected_contact.avatar">
              </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label lines="1">{{selected_contact.name}}</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold">{{selected_contact.position}}</span>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-space/>

            <q-btn round flat icon="star_outline" color="yellow">
            </q-btn>
            <q-btn round flat icon="edit"/>

          </q-toolbar>
          <q-separator></q-separator>
          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="phone" color="grey-2" text-color="blue"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.phone}}</q-item-label>
              <q-item-label caption class="text-grey-8">Phone</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="phone_iphone" color="grey-2" text-color="orange"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.secondary_phone}}</q-item-label>
              <q-item-label caption class="text-grey-8">Secondary Phone</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="mail" color="grey-2" text-color="grey-8"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.email}}</q-item-label>
              <q-item-label caption class="text-grey-8">Personal Email</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="business_center" color="grey-2" text-color="grey-8"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.company_email}}</q-item-label>
              <q-item-label caption class="text-grey-8">Company Email</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="location_on" color="grey-2" text-color="grey-8"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.address}}</q-item-label>
              <q-item-label caption class="text-grey-8">Address</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="home_work" color="grey-2" text-color="grey-8"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.website}}</q-item-label>
              <q-item-label caption class="text-grey-8">Website</q-item-label>
            </q-item-section>

          </q-item>
        </q-card>
      </div>
    </div>

    <div v-else>
      <div v-if="Object.keys(selected_contact).length==0">
        <q-tab-panels v-model="tab" animated class="bg-white">
          <q-tab-panel name="all" class="q-pa-none full-height" :style="{'height':size['height']-100+'px !important'}">
            <q-list class="">

              <q-item-label class="text-center q-pa-sm">
                <q-input dense rounded outlined v-model="search">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label header class="text-center">{{contacts_list.length}} CONTACTS</q-item-label>

              <q-item
                v-for="(contact, index) in contacts_list"
                :key="index"
                @click="selected_contact=contact"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="contact.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{contact.name}}</q-item-label>
                  <q-item-label caption lines="2">
                    <span class="text-weight-bold">{{contact.position}}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="favorites" class="q-pa-none" :style="{'height':size['height']-80+'px !important'}">
            <q-list class="">

              <q-item-label class="text-center q-pa-sm">
                <q-input dense rounded outlined v-model="search">
                  <template v-slot:append>
                    <q-icon name="search"/>
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label header class="text-center">{{favorites_list.length}} Favorites</q-item-label>

              <q-item
                v-for="(favorite, index) in favorites_list"
                :key="index"
                clickable
                v-ripple 
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="favorite.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{favorite.name}}</q-item-label>
                  <q-item-label caption lines="2">
                    <span class="text-weight-bold">{{favorite.position}}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

        </q-tab-panels>
        <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3"
          align="justify"
        >
          <q-tab name="all" icon="person" class="text-capitalize" label="All"></q-tab>
          <q-tab name="favorites" icon="star" class="text-capitalize" label="Favorites"></q-tab>
        </q-tabs>
      </div>
      <transition v-else
                  appear
                  enter-active-class="animated bounceInRight"
      >
        <q-card class="no-border no-border"
                :style="{'height':size['height']-100+'px !important'}">
          <q-toolbar class="text-black ">
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img :src="selected_contact.avatar">
              </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label lines="1">{{selected_contact.name}}</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold">{{selected_contact.position}}</span>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-space/>

            <q-btn round flat icon="star_outline" color="yellow">
            </q-btn>
            <q-btn round flat icon="edit"/>
            <q-btn round flat icon="keyboard_backspace" @click="selected_contact={}"/>

          </q-toolbar>
          <q-separator></q-separator>
          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="phone" color="grey-2" text-color="blue"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.phone}}</q-item-label>
              <q-item-label caption class="text-grey-8">Phone</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="phone_iphone" color="grey-2" text-color="orange"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.secondary_phone}}</q-item-label>
              <q-item-label caption class="text-grey-8">Secondary Phone</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="mail" color="grey-2" text-color="grey-8"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.email}}</q-item-label>
              <q-item-label caption class="text-grey-8">Personal Email</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="business_center" color="grey-2" text-color="grey-8"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.company_email}}</q-item-label>
              <q-item-label caption class="text-grey-8">Company Email</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="location_on" color="grey-2" text-color="grey-8"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.address}}</q-item-label>
              <q-item-label caption class="text-grey-8">Address</q-item-label>
            </q-item-section>

          </q-item>
          <q-separator inset="item"></q-separator>

          <q-item clickable v-ripple>
            <q-item-section avatar top>
              <q-avatar icon="home_work" color="grey-2" text-color="grey-8"/>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{selected_contact.website}}</q-item-label>
              <q-item-label caption class="text-grey-8">Website</q-item-label>
            </q-item-section>

          </q-item>
        </q-card>
      </transition>
    </div>
  </q-page>
</template>

<script>

    export default {
        name: "Contact",
        data() {
            return {
                tab: 'all',
                size: {},
                search: '',
                contacts_list: [
                    {
                        name: 'Pratik Patel',
                        position: 'Developer',
                        avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
                        email: 'pratikpatelpp802@gmail.com',
                        company_email: 'pratikpatelpp802@gmail.com',
                        website: 'www.test.com',
                        phone: '+9910101010',
                        secondary_phone: '+9910101010',
                        address: 'BB 101 Om Sai Residency Palsana'
                    },
                    {
                        name: 'Razvan Stoenescu',
                        position: 'Developer',
                        avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
                        email: 'mailto:razvan@quasar.dev',
                        company_email: 'mailto:razvan@quasar.dev',
                        website: 'https://github.com/rstoenescu',
                        phone: '+1-004-658-0042',
                        secondary_phone: '(331) 009-4655 x3147',
                        address: '92290 Lisa Cove'
                    },
                    {
                        name: 'Jeff Galbraith',
                        position: 'Developer',
                        avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
                        email: 'mailto:jeff@quasar.dev',
                        company_email: 'mailto:jeff@quasar.dev',
                        website: 'http://jeffgalbraith.dev/',
                        phone: '175.718.4633 x878',
                        secondary_phone: '175.718.4633 x878',
                        address: 'Calgary, Canada'
                    },
                    {
                        name: 'Brunhilde Panswick',
                        position: 'Administrator',
                        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
                        email: 'test.@quasar.dev',
                        company_email: 'test.@quasar.dev',
                        website: 'http://test1.dev/',
                        phone: '175.718.4633 x878',
                        secondary_phone: '175.718.4633 x878',
                        address: 'Calgary, Canada'
                    },
                    {
                        name: 'Winfield Stapforth',
                        position: 'Administrator',
                        avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
                        email: 'test2.@quasar.dev',
                        company_email: 'test.@quasar.dev',
                        website: 'http://test2.dev/',
                        phone: '175.718.4633 x878',
                        secondary_phone: '175.718.4633 x878',
                        address: 'Calgary, Canada'
                    },

                ],
                favorites_list: [
                    {
                        name: 'Pratik Patel',
                        position: 'Developer',
                        avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4'
                    },
                    {
                        name: 'Razvan Stoenescu',
                        position: 'Developer',
                        avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg'
                    },
                    {
                        name: 'Jeff Galbraith',
                        position: 'Developer',
                        avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg'
                    },
                ],
                selected_contact: {}
            }
        },
        methods: {
            onResize(size) {
                this.size = size
            },
        },
        created() {
            if (!this.$q.screen.lt.sm) {
                this.selected_contact = this.contacts_list[0];
            }
        }
    }
</script>

<style scoped>

</style>
