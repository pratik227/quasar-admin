<template>
  <q-page class="q-pa-sm">
    <div>
      <q-card class="no-border no-shadow bg-transparent">
        <q-card-section class="q-pa-sm">
          <q-input rounded v-model="search" outlined placeholder="Search Product">
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search"/>
              <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-sm ">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="item,item_index in data">
        <q-card class="">
          <q-img :src="item.img" height="220px">
            <q-chip v-if="item.chip" :class="item.chip_class" :color="item.chip_color" :label="item.chip"></q-chip>
          </q-img>

          <q-card-section>
            <q-btn
              fab
              color="teal-7"
              icon="fas fa-cart-plus" padding="sm"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />
          </q-card-section>

          <q-card-section>
            <div class="text-h6">
              {{item.title}}
            </div>
            <div class="text-subtitle1 text-justify q-mt-sm">
              {{item.caption}}
            </div>
            <div>
              <q-rating
                v-model="item.rating"
                max="5"
                size="1.5em"
                color="yellow"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half" readonly
                no-dimming
              />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="col-12">
              <span class="text-h6">{{item.amount}}</span>
              <span class="text-h6 float-right">
                <q-btn label="See Details" rounded color="secondary" outline></q-btn>
              </span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
    export default {
        name: "ProductCatalogues",
        data() {
            return {
                search: '',
                data: [
                    {
                        title: 'Our Changing Planet',
                        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        rating: 2,
                        amount: '$30',
                        img: require('../assets/products/c-d-x-PDX_a_82obo-unsplash.jpg'),
                        chip: 'Discount 90%',
                        chip_color: 'grey-4',
                        chip_class: 'text-blue absolute-top-right'
                    },
                    {
                        title: 'Our Changing Planet',
                        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        rating: 4,
                        amount: '$15',
                        img: require('../assets/products/frankie-valentine-VghbBAYqUJ0-unsplash.jpg'),
                    },
                    {
                        title: 'Our Changing Planet',
                        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        rating: 1,
                        amount: '$50',
                        img: require('../assets/products/giorgio-trovato-K62u25Jk6vo-unsplash.jpg'),
                        chip: 'Sold Out',
                        chip_color: 'grey-8',
                        chip_class: 'text-white absolute-top-right'
                    },
                    {
                        title: 'Our Changing Planet',
                        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        rating: 5,
                        amount: '$70',
                        img: require('../assets/products/jeroen-den-otter-iKmm0okt6Q4-unsplash.jpg'),
                        chip: 'Discount 50%',
                        chip_color: 'grey-4',
                        chip_class: 'text-blue absolute-top-right'
                    },
                    {
                        title: 'Our Changing Planet',
                        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        rating: 2,
                        amount: '$50',
                        img: require('../assets/products/john-fornander-m2WpKnlLcEc-unsplash .jpg'),
                    },
                    {
                        title: 'Our Changing Planet',
                        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        rating: 4,
                        amount: '$30',
                        img: require('../assets/products/marek-szturc-0iIV1goIodE-unsplash.jpg'),
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
