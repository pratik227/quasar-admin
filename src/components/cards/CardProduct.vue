<template>
  <q-card class="no-shadow" bordered>
    <q-img :src="data.img" height="220px">
      <q-chip v-if="data.chip" :class="data.chip_class" :color="data.chip_color" :label="data.chip"></q-chip>
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
        {{ data.title }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        {{ data.caption }}
      </div>
      <div class="list-container">
        <ol>
          <li>Item 1 description</li>
          <li>Item 2 description</li>
          <li>Item 3 description</li>
          <li>Item 4 description</li>
        </ol>
        <ol>
          <li>Item 5 description</li>
          <li>Item 6 description</li>
          <li>Item 7 description</li>
          <li>Item 8 description</li>
        </ol>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col-12">
        <span class="text-h6">{{ data.size }}: {{ data.amount }}</span>
      </div>
      <div class="col-12">
        <span class="text-h6">{{ data.sizeOne }}: {{ data.amountLarge }}</span>
        <span class="text-h6 float-right">
          <q-btn icon="remove" round color="red" @click="removeItem"></q-btn>
          <q-btn label="Qty: 0" outline style="margin: 0 10px;"></q-btn>
          <q-btn icon="add" round color="green" @click="addItem"></q-btn>
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CardProduct',

  props: ['data'],

  setup() {
    const quantity = ref(0);

    const addItem = () => {
      quantity.value += 1;
    };

    const removeItem = () => {
      if (quantity.value > 0) {
        quantity.value -= 1;
      }
    };

    return { quantity, addItem, removeItem };
  },
});
</script>

<style scoped>
.list-container {
  display: flex;
  justify-content: space-between;
}

.list-container ol {
  width: 48%;
}
</style>
