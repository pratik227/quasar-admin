<template>
  <q-page class="md-page">
    <card-social icon_position="right"/>

    <q-card class="no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="primary" name="fas fa-chart-line" size="44px"/>
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Product Sales Stats</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar class="md-series-fill-1 md-series-1" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="md-headline-small md-headline-small--emphasized md-series-1">4321</q-item-label>
                  <q-item-label caption>Fashions</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar class="md-series-fill-2 md-series-2" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="md-headline-small md-headline-small--emphasized md-series-2">9876</q-item-label>
                  <q-item-label caption>Electronics</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar class="md-series-fill-3 md-series-3" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="md-headline-small md-headline-small--emphasized md-series-3">345</q-item-label>
                  <q-item-label caption>Toys</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar class="md-series-fill-4 md-series-4" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="md-headline-small md-headline-small--emphasized md-series-4">1021</q-item-label>
                  <q-item-label caption>Vouchers</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div>
            <ECharts :theme="chartTheme" :option="sales_options"
                     class="q-mt-md"
                     :resizable="true"
                     autoresize style="height: 250px;"
            />
          </div>
        </div>
        <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="primary" name="fas fa-gift" class="q-pl-md" size="24px"/>
            </q-item-section>

            <q-item-section>
              <div class="text-h6">TODAY SALES</div>
            </q-item-section>
          </q-item>
          <div>
            <ECharts :theme="chartTheme" :option="pie_options"
                     class="q-mt-md"
                     :resizable="true"
                     autoresize style="height: 250px;"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="primary" name="fa fa-shopping-cart" size="44px"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <div class="text-h6">Latest Sales</div>
            </q-item-label>
            <q-item-label caption class="md-on-surface-variant">
              Monitoring Your products. Tracking sales, and shipping status here.
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="q-pa-none q-ma-none">
        <q-table class="no-shadow no-border" :rows="sales_data" :columns="sales_column" hide-bottom>
          <template v-slot:body-cell-Products="props">
            <q-td :props="props">
              <q-item>
                <q-item-section>
                  <q-avatar square>
                    <img width="40" height="40" :src="props.row.prod_img" alt=""/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ props.row.code }}</q-item-label>
                  <q-item-label>{{ props.row.product_name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
          <template v-slot:body-cell-Name="props">
            <q-td :props="props">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img width="40" height="40" :src="props.row.avatar" alt=""/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ props.row.name }}</q-item-label>
                  <q-item-label caption class="">Purchased date: <br/>{{ props.row.date }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
          <template v-slot:body-cell-Status="props">
            <q-td :props="props" class="text-left">
              <q-chip class="text-capitalize md-chip" :class="getChipClass(props.row.status)" :label="props.row.status"></q-chip>
            </q-td>
          </template>
          <template v-slot:body-cell-Stock="props">
            <q-td :props="props">
              <q-item>
                <q-item-section>
                  <q-item-label>
                    <span class="md-issue">
                      <q-icon name="bug_report" color="primary" size="20px" v-if="props.row.type == 'error'"></q-icon>
                      <q-icon name="settings" color="primary" size="20px" v-if="props.row.type == 'info'"></q-icon>
                      <q-icon name="flag" color="primary" size="20px" v-if="props.row.type == 'success'"></q-icon>
                      <q-icon name="fireplace" color="primary" size="20px" v-if="props.row.type == 'warning'"></q-icon>
                      {{ props.row.stock }}
                    </span>
                    <q-chip class="text-capitalize md-chip md-chip--positive" :label="props.row.type"
                            v-if="props.row.type == 'success'"></q-chip>
                    <q-chip class="text-capitalize md-chip md-chip--info" :label="props.row.type"
                            v-if="props.row.type == 'info'"></q-chip>
                    <q-chip class="text-capitalize md-chip md-chip--warning" :label="props.row.type"
                            v-if="props.row.type == 'warning'"></q-chip>
                    <q-chip class="text-capitalize md-chip md-chip--negative" :label="props.row.type"
                            v-if="props.row.type == 'error'"></q-chip>
                  </q-item-label>
                  <q-item-label caption class="">
                    <q-linear-progress class="md-progress" :class="getColor(props.row.Progress)" :value="props.row.Progress / 100"/>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-md md-equal-row">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="no-shadow" bordered>
          <q-tabs v-model="tab" dense class="md-on-surface-variant" active-color="primary" indicator-color="primary"
                  align="justify">
            <q-tab name="contact" icon="contacts" label="Contact"/>
            <q-tab name="message" icon="comment" label="Message">
              <q-badge color="negative" floating>{{ messages.length }}</q-badge>
            </q-tab>
            <q-tab name="notification" icon="notifications"
                   label="Notification">
              <q-badge color="negative" floating>4</q-badge>
            </q-tab>
          </q-tabs>

          <q-separator/>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="contact" class="q-pa-sm">
              <q-list class="rounded-borders" separator>
                <q-item v-for="(contact, index) in contacts" :key="index">
                  <q-item-section avatar>
                    <q-avatar>
                      <img width="40" height="40" :src="contact.avatar" alt=""/>
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{ contact.name }}</q-item-label>
                    <q-item-label caption lines="2">
                      <span class="text-weight-bold">{{ contact.position }}</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <div class="md-on-surface-variant q-gutter-xs">
                      <q-btn class="gt-xs" size="md" flat color="primary" dense round icon="comment"/>
                      <q-btn class="gt-xs" size="md" flat color="secondary" dense round icon="email"/>
                      <q-btn size="md" flat dense round color="accent" icon="phone"/>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="message" class="q-pa-sm">
              <q-item v-for="msg in messages" :key="msg.id" clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <img width="40" height="40" :src="msg.avatar" alt=""/>
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ msg.name }}</q-item-label>
                  <q-item-label caption lines="1">{{ msg.msg }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  {{ msg.time }}
                </q-item-section>
              </q-item>
            </q-tab-panel>

            <q-tab-panel name="notification" class="q-pa-sm">
              <q-list>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar class="md-avatar-tonal" icon="info"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar class="md-avatar-tonal" icon="report"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar class="md-avatar-tonal" icon="remove"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar class="md-avatar-tonal" icon="remove_circle_outline"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-carousel animated v-model="slide" infinite height="360px" arrows transition-prev="slide-right"
                    transition-next="slide-left">
          <q-carousel-slide :name="1" class="q-pa-none">
            <q-scroll-area class="fit">
              <q-card class="my-card">
                <img width="500" height="334" class="md-slide__img" src="../assets/coding.jpeg" alt="Close-up of PHP source code on a dark editor screen"/>

                <q-card-section>
                  <div class="text-h6">Work with something that you like, like…</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-card-actions align="left">
                  <q-btn label="Share" dense color="primary" outline no-caps/>
                  <q-btn label="Learn More" dense color="primary" outline no-caps/>
                </q-card-actions>
              </q-card>
            </q-scroll-area>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="q-pa-none">
            <q-scroll-area class="fit">
              <q-card class="my-card">
                <img width="500" height="333" class="md-slide__img" src="../assets/lookgood.jpeg" alt="The words &quot;You look good.&quot; printed inside a pink gift box"/>

                <q-card-section>
                  <div class="text-h6">Keep your schedule in the right time</div>
                  <div class="text-subtitle2">
                    Aenean facilisis vitae purus facilisis semper.
                  </div>
                </q-card-section>

                <q-card-actions align="left">
                  <q-btn label="Share" dense color="primary" outline no-caps/>
                  <q-btn label="Learn More" dense color="primary" outline no-caps/>
                </q-card-actions>
              </q-card>
            </q-scroll-area>
          </q-carousel-slide>
          <q-carousel-slide :name="3" class="q-pa-none">
            <q-scroll-area class="fit">
              <q-card class="my-card">
                <img width="500" height="375" class="md-slide__img" src="../assets/trawel.jpeg" alt="Aerial view of a road winding through autumn woodland"/>

                <q-card-section>
                  <div class="text-h6">Travel everytime that you have a chance</div>
                  <div class="text-subtitle2">Curabitur egestas consequat lorem, vel fermentum augue porta id.</div>
                </q-card-section>

                <q-card-actions align="left">
                  <q-btn label="Share" dense color="primary" outline no-caps/>
                  <q-btn label="Learn More" dense color="primary" outline no-caps/>
                </q-card-actions>
              </q-card>
            </q-scroll-area>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';
import '@/utils/echarts.js'
import { chartTheme } from '@/utils/echarts-theme.js'
import ECharts from "vue-echarts";

/*
 * Statically imported, for the same reason Dashboard.vue imports its widgets
 * statically: this row IS the top of the page. Code-splitting it bought a chunk
 * round-trip and nothing else, and because it rendered nothing until that chunk
 * arrived, the KPI tiles popped in and pushed the rest of the page down --
 * measured at CLS 0.104, over Google's 0.1 "good" threshold. Loading it with the
 * page puts it back to 0.
 */
import CardSocial from "@/components/cards/CardSocial.vue";

const messages = [
  {
    id: 5,
    name: "Pratik Patel",
    msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
    avatar: "https://avatars2.githubusercontent.com/u/34883558?s=96&v=4",
    time: "10:42 PM"
  },
  {
    id: 6,
    name: "Winfield Stapforth",
    msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
    avatar: "/img/avatar6.jpg",
    time: "11:17 AM"
  },
  {
    id: 1,
    name: "Boy",
    msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
    avatar: "/img/boy-avatar.jpg",
    time: "5:17 AM"
  },
  {
    id: 2,
    name: "Jordan Lee",
    msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
    avatar: "https://avatars2.githubusercontent.com/u/34883558?s=96&v=4",
    time: "5:17 AM"
  },
  {
    id: 3,
    name: "Razvan Stoenescu",
    msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
    avatar: "/img/team/razvan_stoenescu.jpeg",
    time: "5:17 AM"
  }
];
const contacts = [
  {
    name: "Pratik Patel",
    position: "Developer",
    avatar: "https://avatars2.githubusercontent.com/u/34883558?s=96&v=4"
  },
  {
    name: "Razvan Stoenescu",
    position: "Developer",
    avatar: "/img/team/razvan_stoenescu.jpeg"
  },
  {
    name: "Jordan Lee",
    position: "Developer",
    avatar: "https://avatars2.githubusercontent.com/u/34883558?s=96&v=4"
  },
  {
    name: "Brunhilde Panswick",
    position: "Administrator",
    avatar: "/img/avatar2.jpg"
  },
  {
    name: "Winfield Stapforth",
    position: "Administrator",
    avatar: "/img/avatar6.jpg"
  }
];
const sales_data = [
  {
    name: "Pratik Patel",
    Progress: 70,
    status: "Canceled",
    stock: "14 / 30",
    date: "23 Oct 2018",
    avatar: "https://avatars3.githubusercontent.com/u/34883558?s=96&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4",
    product_name: "Woman Bag",
    total: "$300,00",
    code: "QWE123",
    prod_img: new URL("../assets/bag.jpg", import.meta.url).href
  },
  {
    name: "Alex Morgan",
    Progress: 60,
    status: "Sent",
    date: "11 Nov 2018",
    stock: "25 / 70",
    avatar: "https://avatars2.githubusercontent.com/u/34883558?s=96&v=4",
    product_name: "Laptop",
    total: "$230,00",
    code: "ABC890",
    prod_img: new URL("../assets/laptop.jpg", import.meta.url).href
  },
  {
    name: "Sam Rivera",
    Progress: 30,
    status: "Pending",
    stock: "35 / 50",
    avatar: "https://avatars2.githubusercontent.com/u/34883558?s=96&v=4",
    product_name: "Pinapple Jam",
    total: "$34,00",
    date: "19 Sept 2020",
    code: "GHI556",
    prod_img: new URL("../assets/jam.jpg", import.meta.url).href
  },
  {
    name: "Jordan Lee",
    Progress: 100,
    status: "Paid",
    stock: "18 / 33",
    avatar: "https://avatars1.githubusercontent.com/u/10262924?s=96&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4",
    product_name: "Action Figure",
    total: "$208,00",
    date: "19 Sept 2020",
    code: "JKL345",
    prod_img: new URL("../assets/action.jpg", import.meta.url).href
  }
];
const sales_column = [
  {
    name: "Products",
    label: "Products",
    field: "Products",
    sortable: true,
    align: "left"
  },
  {name: "Name", label: "Buyer", field: "name", sortable: true, align: "left"},
  {
    name: "Total",
    label: "Total",
    field: "total",
    sortable: true,
    align: "right",
    classes: "text-bold"
  },
  {
    name: "Status",
    label: "Status",
    field: "status",
    sortable: true,
    align: "left",
    classes: "text-bold"
  },
  {name: "Stock", label: "Stock", field: "task", sortable: true, align: "left"}
];

export default defineComponent({
  name: "Dashboard2",
  components: {
    CardSocial,
    ECharts
  },
  setup() {
    return {
      slide: ref(1),
      chartTheme,
      tab: ref("contact"),
      messages,
      contacts,
      sales_data,
      sales_column,
      sales_options:{
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Coordinate axis indicator, coordinate axis trigger is valid
            type: "shadow" // The default is a straight line, optional:'line' |'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "2%",
          top: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "Fashions",
            type: "bar",
            data: [40, 45, 27, 50, 32, 50, 70, 30, 30, 40, 67, 29]
          },
          {
            name: "Electronics",
            type: "bar",
            data: [124, 100, 20, 120, 117, 70, 110, 90, 50, 90, 20, 50]
          },
          {
            name: "Toys",
            type: "bar",
            data: [17, 2, 0, 29, 20, 10, 23, 0, 8, 20, 11, 30]
          },
          {
            name: "Vouchers",
            type: "bar",
            data: [20, 100, 80, 14, 90, 86, 100, 70, 120, 50, 30, 60]
          }
        ]
      },
      pie_options:{
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["Fashions", "Electronics", "Toys", "Vouchers"]
        },
        series: [
          {
            name: "Sales",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 335,
                name: "Fashions"
              },
              {
                value: 310,
                name: "Electronics"
              },
              {
                value: 234,
                name: "Toys"
              },
              {
                value: 135,
                name: "Vouchers"
              }
            ]
          }
        ]
      },
      sales_chart:null,
      pie_chart:null,

      /*
       * Both of these used to return a Quasar colour name for a `color=` prop.
       * They return a class now for the same reason the chips changed shape:
       * QLinearProgress and a filled QChip both pair the colour with a
       * hardcoded white label, which is unreadable once `primary` is a light
       * tone in dark mode. A class carries the role PAIR instead.
       *
       * The thresholds and the status names are untouched.
       */
      getColor(val) {
        if (val > 70 && val <= 100) {
          return "md-progress--high";
        } else if (val > 50 && val <= 70) {
          return "md-progress--mid";
        }
        return "md-progress--low";
      },
      getChipClass(status) {
        if (status == "Canceled") {
          return "md-chip--negative";
        } else if (status == "Sent") {
          return "md-chip--positive";
        } else if (status == "Pending") {
          return "md-chip--warning";
        } else if (status == "Paid") {
          return "md-chip--info";
        }
        return "md-chip--neutral";
      }
    }
  },
})
</script>

<style scoped>
/*
 * The page IS the section stack -- q-page is made a flex column rather than
 * wrapping the sections in an extra div, which would have meant re-indenting
 * ~300 lines of template for no structural gain.
 *
 * The gutter rules below are the same fix as Dashboard.vue: q-col-gutter-*
 * spaces columns by padding them and pulling the row up with an equal negative
 * margin, which cancels a flex `gap` exactly. Switching the vertical half off
 * and using row-gap instead makes the two mechanisms independent.
 */
.md-page {
  padding: var(--md-layout-margin);
  display: flex;
  flex-direction: column;
  gap: var(--md-sys-space-200);
}

.md-page > .row[class*="q-col-gutter"],
.md-page > :deep(.row[class*="q-col-gutter"]) {
  margin-top: 0;
  row-gap: var(--md-sys-space-200);
}

.md-page > .row[class*="q-col-gutter"] > *,
.md-page > :deep(.row[class*="q-col-gutter"] > *) {
  padding-top: 0;
}

/*
 * Side-by-side cards match heights. Done with flex rather than height:100%,
 * which is circular inside a stretched flex column -- see CardSocial.vue.
 */
.md-equal-row > [class*="col-"] {
  display: flex;
}

/*
 * Every direct child, not just .q-card -- the second column holds a QCarousel
 * rather than a card, and with the column turned into a flex container an
 * unflexed child collapses to nothing. That emptied the column outright.
 */
.md-equal-row > [class*="col-"] > * {
  flex: 1;
  min-width: 0;
}

/*
 * The slide media is 334px inside a 360px carousel, which left ~26px for the
 * headline, byline and two buttons -- so they were pushed into the QScrollArea
 * and the caption rendered sliced through the middle of a line. Capping the
 * displayed height lets the whole slide fit without scrolling.
 *
 * The intrinsic width/height attributes stay on the <img>: they are what lets
 * the browser reserve the right box before the image loads, and removing them
 * would reintroduce layout shift.
 */
.md-slide__img {
  display: block;
  inline-size: 100%;
  block-size: 190px;
  object-fit: cover;
}

.md-on-surface-variant { color: var(--md-sys-color-on-surface-variant); }
.md-issue { color: var(--md-sys-color-primary); }

/* Tonal avatar: the hue mixed into the surface rather than used at full
   strength, so a column of them reads as quiet metadata. */
.md-avatar-tonal {
  background: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}

/*
 * Tonal chips. M3 defines no success/info/warning roles, so those three keep
 * the bridged Quasar hues but are mixed into the surface and labelled with
 * on-surface -- the old solid fill plus text-white was under-contrast in light
 * mode and unreadable in dark. Only `negative` uses error-container, because
 * only it actually means failure.
 */
.md-chip {
  color: var(--md-sys-color-on-surface);
  border-radius: var(--md-sys-shape-corner-small);
}

.md-chip--negative {
  background: var(--md-sys-color-error-container);
  color: var(--md-sys-color-on-error-container);
}

.md-chip--positive { background: color-mix(in srgb, var(--q-positive) 24%, var(--md-sys-color-surface-container-low)); }
.md-chip--warning  { background: color-mix(in srgb, var(--q-warning) 24%, var(--md-sys-color-surface-container-low)); }
.md-chip--info     { background: color-mix(in srgb, var(--q-info) 24%, var(--md-sys-color-surface-container-low)); }
.md-chip--neutral  { background: var(--md-sys-color-surface-container-highest); }

/*
 * QLinearProgress draws its bar from currentColor, so setting `color` themes it
 * from the token layer. The track replaces Quasar's fixed rgba(0,0,0,.26),
 * which disappears on a dark surface.
 */
.md-progress { color: var(--q-info); }
.md-progress--high { color: var(--q-positive); }
.md-progress--mid  { color: var(--md-sys-color-primary); }
.md-progress--low  { color: var(--md-sys-color-error); }

.md-progress :deep(.q-linear-progress__track) {
  background: color-mix(in srgb, currentColor 24%, transparent);
  opacity: 1;
}
</style>
