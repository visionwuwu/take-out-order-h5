<template>
  <div class="order-detail">
    <van-nav-bar
      class="order-detail__navbar"
      title="订单详细"
      left-arrow
      @click-left="handleClickBack"
      :border="false"
    />
    <div class="order-detail__float-layer">
      <!-- 圆角背景 -->
      <div class="order-detail__float-layer-bg"></div>

      <div class="order-detail__float-layer-content">
        <van-sticky @click="showOrderProcess = true">
          <order-status-title
            ref="countDownRef"
            :status="order.status"
            :time="time"
            :onCountDownChange="handleCountDownChange"
            :onCountDownFinish="handleCountDownFinish"
          />
        </van-sticky>

        <order-notice-bar v-model:showNoticeBar="showNoticeBar" />

        <order-status-card
          :status="order.status"
          :cancel-order="cancelOrder"
          :payment-order="handleGoPayment"
        />

        <CommonDivider />

        <order-goods-info-card :goods-list="cardList" :order="order" :total-price="totalPrice" />
      </div>
    </div>

    <!-- 订单进度 -->
    <order-process v-model:show="showOrderProcess" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { CardGoodsItem } from 'comps/CardGoodsList/index.vue'
import OrderStatusTitle from './components/OrderStatusTitle.vue'
import OrderProcess from './components/OrderProcess.vue'
import OrderNoticeBar from './components/OrderNoticeBar.vue'
import OrderStatusCard from './components/OrderStatusCard.vue'
import OrderGoodsInfoCard from './components/OrderGoodsInfoCard.vue'
import { useOrderDetailEffect } from './hooks/useOrderDetailEffect'
import { FullOrderStatus } from 'src/apis/order/model/orderModel'
import variables from 'styles/variables.module.less'

export default defineComponent({
  name: 'OrderDetail',
  components: {
    OrderProcess,
    OrderStatusTitle,
    OrderNoticeBar,
    OrderStatusCard,
    OrderGoodsInfoCard
  },
  setup() {
    const {
      state,
      countDownRef,
      getOrderInfoById,
      handleCountDownChange,
      handleCountDownFinish,
      handleClickBack,
      cancelOrder,
      handleGoPayment
    } = useOrderDetailEffect()

    // 获取订单详情
    getOrderInfoById()

    const cardList = computed(() => {
      return state.order.orderFoods.map(item => {
        return {
          id: item.id,
          num: item.number,
          price: (item.food.price * item.number).toFixed(2),
          desc: item.food.remarks,
          title: item.food.name,
          thumb: item.food.image
        } as CardGoodsItem
      })
    })

    return {
      ...toRefs(state),
      countDownRef,
      cardList,
      FullOrderStatus,
      themeColor: variables.themeColor,
      handleCountDownChange,
      handleCountDownFinish,
      handleClickBack,
      cancelOrder,
      handleGoPayment
    }
  }
})
</script>

<style scoped lang="less">
@import 'styles/variables.module.less';
.order-detail {
  :deep(.van-nav-bar) {
    background: v-bind(themeColor) !important;
    .van-icon,
    &__title {
      color: #fff !important;
    }
  }

  &__float-layer {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  &__float-layer-content {
    padding-bottom: 15px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &__float-layer-bg {
    background: @theme-color;
    height: 140px;
    border-radius: 100% 100% 100% 100% / 0% 0% 16% 16%;
  }
}
</style>
