<template>
  <q-page class="q-pa-sm">
    <card-social icon_position="right"/>

    <q-card class="q-mt-sm">
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="fas fa-chart-line" size="44px"/>
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
                  <q-avatar color="blue" text-color="white" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-blue text-bold">4321</q-item-label>
                  <q-item-label caption>Fashions</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="grey-8" text-color="white" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-grey-8 text-bold">9876</q-item-label>
                  <q-item-label caption>Electronics</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="green-6" text-color="white" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-green-6 text-bold">345</q-item-label>
                  <q-item-label caption>Toys</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="orange-8" text-color="white" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-orange-8 text-bold">1021</q-item-label>
                  <q-item-label caption>Vouchers</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div>
            <div ref="saleschart" id="saleschart" style="height: 250px;"></div>
            <!--            <IEcharts style="height: 250px" :option="getSalesOptions" :resizable="true" />-->
          </div>
        </div>
        <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="blue" name="fas fa-gift" class="q-pl-md" size="24px"/>
            </q-item-section>

            <q-item-section>
              <div class="text-h6">TODAY SALES</div>
            </q-item-section>
          </q-item>
          <div>
            <div ref="piechart" id="piechart" style="height: 250px;"></div>
            <!--            <IEcharts style="height: 250px" :option="getPieOptions" :resizable="true" />-->
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-mt-sm">
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="fa fa-shopping-cart" size="44px"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <div class="text-h6">Latest Sales</div>
            </q-item-label>
            <q-item-label caption class="text-black">
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
                    <img :src="props.row.prod_img"/>
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
                    <img :src="props.row.avatar"/>
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
              <q-chip class="text-white text-capitalize" :label="props.row.status"
                      :color="getChipColor(props.row.status)"></q-chip>
            </q-td>
          </template>
          <template v-slot:body-cell-Stock="props">
            <q-td :props="props">
              <q-item>
                <q-item-section>
                  <q-item-label>
                    <span class="text-blue">
                      <q-icon name="bug_report" color="blue" size="20px" v-if="props.row.type == 'error'"></q-icon>
                      <q-icon name="settings" color="blue" size="20px" v-if="props.row.type == 'info'"></q-icon>
                      <q-icon name="flag" color="blue" size="20px" v-if="props.row.type == 'success'"></q-icon>
                      <q-icon name="fireplace" color="blue" size="20px" v-if="props.row.type == 'warning'"></q-icon>
                      {{ props.row.stock }}
                    </span>
                    <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="positive"
                            v-if="props.row.type == 'success'"></q-chip>
                    <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="info"
                            v-if="props.row.type == 'info'"></q-chip>
                    <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="warning"
                            v-if="props.row.type == 'warning'"></q-chip>
                    <q-chip class="float-right text-white text-capitalize" :label="props.row.type" color="negative"
                            v-if="props.row.type == 'error'"></q-chip>
                  </q-item-label>
                  <q-item-label caption class="">
                    <q-linear-progress dark :color="getColor(props.row.Progress)" :value="props.row.Progress / 100"/>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-sm  q-py-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary"
                  align="justify">
            <q-tab name="contact" :class="tab == 'contact' ? 'text-blue' : ''" icon="contacts" label="Contact"/>
            <q-tab name="message" :class="tab == 'message' ? 'text-blue' : ''" icon="comment" label="Message">
              <q-badge color="red" floating>{{ messages.length }}</q-badge>
            </q-tab>
            <q-tab name="notification" :class="tab == 'notification' ? 'text-blue' : ''" icon="notifications"
                   label="Notification">
              <q-badge color="red" floating>4</q-badge>
            </q-tab>
          </q-tabs>

          <q-separator/>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="contact" class="q-pa-sm">
              <q-list class="rounded-borders" separator>
                <q-item v-for="(contact, index) in contacts" :key="index">
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="contact.avatar"/>
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">{{ contact.name }}</q-item-label>
                    <q-item-label caption lines="2">
                      <span class="text-weight-bold">{{ contact.position }}</span>
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <div class="text-grey-8 q-gutter-xs">
                      <q-btn class="gt-xs" size="md" flat color="blue" dense round icon="comment"/>
                      <q-btn class="gt-xs" size="md" flat color="red" dense round icon="email"/>
                      <q-btn size="md" flat dense round color="green" icon="phone"/>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="message" class="q-pa-sm">
              <q-item v-for="msg in messages" :key="msg.id" clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="msg.avatar"/>
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
                    <q-avatar color="teal" text-color="white" icon="info"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar color="teal" text-color="white" icon="report"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar color="teal" text-color="white" icon="remove"/>
                  </q-item-section>

                  <q-item-section>Avatar-type icon</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar color="teal" text-color="white" icon="remove_circle_outline"/>
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
                <img :src="require('src/assets/coding.jpeg')"/>

                <q-card-section>
                  <div class="text-h6">Work with something that you like, like…</div>
                  <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-card-actions align="left">
                  <q-btn label="Share" dense color="primary" text-color="blue" outline/>
                  <q-btn label="Learn More" dense color="primary" text-color="blue" outline/>
                </q-card-actions>
              </q-card>
            </q-scroll-area>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="q-pa-none">
            <q-scroll-area class="fit">
              <q-card class="my-card">
                <img :src="require('src/assets/lookgood.jpeg')"/>

                <q-card-section>
                  <div class="text-h6">Keep your schedule in the right time</div>
                  <div class="text-subtitle2">
                    Aenean facilisis vitae purus facilisis semper.
                  </div>
                </q-card-section>

                <q-card-actions align="left">
                  <q-btn label="Share" dense color="primary" text-color="blue" outline/>
                  <q-btn label="Learn More" dense color="primary" text-color="blue" outline/>
                </q-card-actions>
              </q-card>
            </q-scroll-area>
          </q-carousel-slide>
          <q-carousel-slide :name="3" class="q-pa-none">
            <q-scroll-area class="fit">
              <q-card class="my-card">
                <img :src="require('src/assets/trawel.jpeg')"/>

                <q-card-section>
                  <div class="text-h6">Travel everytime that you have a chance</div>
                  <div class="text-subtitle2">Curabitur egestas consequat lorem, vel fermentum augue porta id.</div>
                </q-card-section>

                <q-card-actions align="left">
                  <q-btn label="Share" dense color="primary" text-color="blue" outline/>
                  <q-btn label="Learn More" dense color="primary" text-color="blue" outline/>
                </q-card-actions>
              </q-card>
            </q-scroll-area>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div><q-resize-observer @resize="onResize"/>
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent, ref} from 'vue'

const messages = [
  {
    id: 5,
    name: "Pratik Patel",
    msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
    avatar: "https://avatars2.githubusercontent.com/u/34883558?s=400&v=4",
    time: "10:42 PM"
  },
  {
    id: 6,
    name: "Winfield Stapforth",
    msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
    avatar: "https://cdn.quasar.dev/img/avatar6.jpg",
    time: "11:17 AM"
  },
  {
    id: 1,
    name: "Boy",
    msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
    avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
    time: "5:17 AM"
  },
  {
    id: 2,
    name: "Jeff Galbraith",
    msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
    avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg",
    time: "5:17 AM"
  },
  {
    id: 3,
    name: "Razvan Stoenescu",
    msg: " -- I'll be in your neighborhood doing errands this\n" + "            weekend. Do you want to grab brunch?",
    avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
    time: "5:17 AM"
  }
];
const contacts = [
  {
    name: "Pratik Patel",
    position: "Developer",
    avatar: "https://avatars2.githubusercontent.com/u/34883558?s=400&v=4"
  },
  {
    name: "Razvan Stoenescu",
    position: "Developer",
    avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg"
  },
  {
    name: "Jeff Galbraith",
    position: "Developer",
    avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg"
  },
  {
    name: "Brunhilde Panswick",
    position: "Administrator",
    avatar: "https://cdn.quasar.dev/img/avatar2.jpg"
  },
  {
    name: "Winfield Stapforth",
    position: "Administrator",
    avatar: "https://cdn.quasar.dev/img/avatar6.jpg"
  }
];
const sales_data = [
  {
    name: "Pratik Patel",
    Progress: 70,
    status: "Canceled",
    stock: "14 / 30",
    date: "23 Oct 2018",
    avatar: "https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4",
    product_name: "Woman Bag",
    total: "$300,00",
    code: "QWE123",
    prod_img: require("src/assets/bag.jpg")
  },
  {
    name: "Mayank Patel",
    Progress: 60,
    status: "Sent",
    date: "11 Nov 2018",
    stock: "25 / 70",
    avatar: "https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4",
    product_name: "Laptop",
    total: "$230,00",
    code: "ABC890",
    prod_img: require("src/assets/laptop.jpg")
  },
  {
    name: "Mayur Patel",
    Progress: 30,
    status: "Pending",
    stock: "35 / 50",
    avatar: "https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4",
    product_name: "Pinapple Jam",
    total: "$34,00",
    date: "19 Sept 2020",
    code: "GHI556",
    prod_img: require("src/assets/jam.jpg")
  },
  {
    name: "Jeff Galbraith",
    Progress: 100,
    status: "Paid",
    stock: "18 / 33",
    avatar: "https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4",
    product_name: "Action Figure",
    total: "$208,00",
    date: "19 Sept 2020",
    code: "JKL345",
    prod_img: require("src/assets/action.jpg")
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
    CardSocial: defineAsyncComponent(() => import("components/cards/CardSocial"))
  },
  setup() {
    return {
      slide: 1,
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
            data: [40, 45, 27, 50, 32, 50, 70, 30, 30, 40, 67, 29],
            color: "#546bfa"
          },
          {
            name: "Electronics",
            type: "bar",
            data: [124, 100, 20, 120, 117, 70, 110, 90, 50, 90, 20, 50],
            color: "#3a9688"
          },
          {
            name: "Toys",
            type: "bar",
            data: [17, 2, 0, 29, 20, 10, 23, 0, 8, 20, 11, 30],
            color: "#02a9f4"
          },
          {
            name: "Vouchers",
            type: "bar",
            data: [20, 100, 80, 14, 90, 86, 100, 70, 120, 50, 30, 60],
            color: "#f88c2b"
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
                name: "Fashions",
                itemStyle: {
                  color: "#546bfa"
                }
              },
              {
                value: 310,
                name: "Electronics",
                itemStyle: {
                  color: "#3a9688"
                }
              },
              {
                value: 234,
                name: "Toys",
                itemStyle: {
                  color: "#02a9f4"
                }
              },
              {
                value: 135,
                name: "Vouchers",
                itemStyle: {
                  color: "#f88c2b"
                }
              }
            ]
          }
        ]
      },
      sales_chart:null,
      pie_chart:null,

      getColor(val) {
        if (val > 70 && val <= 100) {
          return "green";
        } else if (val > 50 && val <= 70) {
          return "blue";
        }
        return "red";
      },
      getChipColor(status) {
        if (status == "Canceled") {
          return "negative";
        } else if (status == "Sent") {
          return "positive";
        } else if (status == "Pending") {
          return "warning";
        } else if (status == "Paid") {
          return "info";
        } else {
          return "dark";
        }
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let salesChart = document.getElementById('saleschart');
      echarts.dispose(salesChart);
      this.sales_chart = echarts.init(salesChart, 'light');
      this.sales_chart.setOption(this.sales_options);


      let piechart = document.getElementById('piechart');
      echarts.dispose(piechart);
      this.pie_chart = echarts.init(piechart, 'light');
      this.pie_chart.setOption(this.pie_options)

    },
    onResize() {
      if (this.sales_chart) {
        this.sales_chart.resize();
      }
      if (this.pie_chart) {
        this.pie_chart.resize();
      }
    }
  }
})
</script>

<style scoped></style>
