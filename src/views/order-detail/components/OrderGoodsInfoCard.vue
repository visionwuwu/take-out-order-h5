<template>
  <CommonCard class="goods-info-card" :border="false" :radiusSize="4" :bodyStyle="{ padding: 0 }">
    <template #header>
      <div class="goods-info-card__header">
        <div class="goods-info-card__header-title">
          <van-icon name="shop-collect-o" />
          <span class="van-ellipsis"> 老四川餐厅 </span>
        </div>
        <div style="padding: 8px 0">
          <card-goods-list :goods-list="goodsList" />
          <div
            align="right"
            style="color: orange; font-size: 14px; margin: 8px 0"
            class="sub-total"
          >
            小计：<span>&yen; {{ totalPrice }}</span>
          </div>
        </div>
      </div>
    </template>
    <div class="goods-info-card__content">
      <van-cell-group :border="false">
        <van-cell
          style="padding: 8px 12px"
          :border="false"
          title="姓名"
          :value="order.name"
        ></van-cell>
        <van-cell
          style="padding: 8px 12px"
          :border="false"
          title="手机号"
          :value="order.mobile"
        ></van-cell>
        <van-cell
          style="padding: 8px 12px"
          :border="false"
          title="收货地址"
          :value="order.address"
        ></van-cell>
        <van-cell
          style="padding: 8px 12px"
          :border="false"
          title="备注"
          :value="order.remarks"
        ></van-cell>
        <van-cell
          style="padding: 8px 12px"
          :border="false"
          title="订单号码"
          :value="order.orderNumber"
        ></van-cell>
        <van-cell
          style="padding: 8px 12px"
          :border="false"
          title="配送方式"
          value="商家配送"
        ></van-cell>
        <van-cell
          style="padding: 8px 12px"
          :border="false"
          title="支付方式"
          value="在线支付"
        ></van-cell>
        <van-cell
          style="padding: 8px 12px"
          :border="false"
          title="下单时间"
          :value="order.createTime"
        ></van-cell>
      </van-cell-group>
    </div>
  </CommonCard>
</template>

<script lang="ts">
import { OrderDetail } from 'src/apis/order/model/orderModel'
import CardGoodsList, { CardGoodsItem } from 'src/components/CardGoodsList/index.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'OrderGoodsInfoCard',
  components: {
    CardGoodsList
  },
  props: {
    goodsList: {
      type: Array as PropType<CardGoodsItem[]>,
      default: () => []
    },
    order: {
      type: Object as PropType<OrderDetail>,
      required: true
    },
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  setup() {}
})
</script>

<style scoped lang="less">
.goods-info-card {
  margin-top: 0;

  &__header-title {
    display: flex;
    align-items: center;
    font-size: 14px;
    span {
      margin-left: 6px;
    }
  }

  &__content {
  }
}
</style>
