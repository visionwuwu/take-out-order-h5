<template>
  <div class="order-list">
    <order-item v-for="item in orderList" :key="item.id" :item="item"></order-item>
  </div>
</template>

<script lang="ts">
import { OrderList } from 'src/apis/order/model/orderModel'
import { defineComponent, PropType } from 'vue'
import OrderItem from './OrderItem.vue'

export default defineComponent({
  name: 'OrderList',
  props: {
    orderList: {
      type: Array as PropType<OrderList>,
      required: true,
      default: () => []
    }
  },
  components: {
    OrderItem
  },
  setup() {}
})
</script>

<style scoped></style>
