<template>
  <CommonCard
    class="order-status-card"
    :border="false"
    :radiusSize="4"
    :bodyStyle="{ padding: '20px 10px' }"
  >
    <template #header>
      <van-cell style="padding: 0" :title="title"></van-cell>
    </template>
    <div>
      <p v-if="status !== FullOrderStatus.unPaid">该订单，{{ title }}</p>
      <van-row v-if="status === FullOrderStatus.unPaid" type="flex" align="center">
        <van-col align="center" :span="8">
          <van-button size="mini" icon="paid" @click="handleGoPay">去支付</van-button>
        </van-col>
        <van-col align="center" :span="8">
          <van-button size="mini" icon="edit">修改订单</van-button>
        </van-col>
        <van-col align="center" :span="8">
          <van-button size="mini" icon="close" @click="handleCancelOrder">取消订单</van-button>
        </van-col>
      </van-row>
    </div>
  </CommonCard>
</template>

<script lang="ts">
import { FullOrderStatus } from 'src/apis/order/model/orderModel'
import { fullOrderStatus } from 'src/views/order/hooks/useOrderListEffect'
import { Dialog } from 'vant'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'OrderStatusCard',
  props: {
    status: {
      type: String as PropType<FullOrderStatus>,
      required: true
    },
    cancelOrder: {
      type: Function as PropType<() => any>,
      required: true
    },
    paymentOrder: {
      type: Function as PropType<() => any>,
      required: true
    }
  },
  setup(props) {
    const title = computed(() => fullOrderStatus[props.status])

    const statusText = computed(() => {})

    const handleCancelOrder = () => {
      Dialog.confirm({
        message: '您，确认要取消订单吗？'
      })
        .then(() => {
          props.cancelOrder()
        })
        .catch(() => {})
    }

    const handleGoPay = () => {
      props.paymentOrder()
    }

    return {
      title,
      statusText,
      FullOrderStatus,
      handleCancelOrder,
      handleGoPay
    }
  }
})
</script>

<style scoped lang="less">
.order-status-card {
  margin-top: 9px !important;
  p {
    font-size: 15px;
  }
}
</style>
