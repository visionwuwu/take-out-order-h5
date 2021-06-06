<template>
  <div class="order-process">
    <van-popup
      :show="show"
      :style="{ height: '50%' }"
      round
      closeable
      position="bottom"
      @update:show="handleUpdateShow"
    >
      <h2>订单进度</h2>
      <van-steps direction="vertical" :active="0">
        <van-step>
          <h3>【城市】物流状态1</h3>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>【城市】物流状态2</h3>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
        </van-step>
      </van-steps>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { FullOrderStatus } from 'src/apis/order/model/orderModel'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'OrderProcess',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    status: {
      type: String as PropType<FullOrderStatus>,
      default: ''
    }
  },
  emits: ['update:show'],
  setup(props, { emit }) {
    const handleUpdateShow = ($event: boolean) => {
      emit('update:show', $event)
    }

    return {
      handleUpdateShow
    }
  }
})
</script>

<style scoped lang="less">
.order-process {
  h2 {
    font-size: 18px;
    text-align: center;
    margin: 20px 0;
  }
}
</style>
