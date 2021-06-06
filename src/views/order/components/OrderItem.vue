<template>
  <div class="order-list-item van-hairline--bottom" @click="goDetail">
    <div class="order-list-item__header van-hairline--bottom">
      <span class="van-ellipsis">
        <van-icon name="shop-collect-o" />
        三舞餐厅
      </span>
      <van-tag type="warning">{{ statusText }}</van-tag>
    </div>
    <div class="order-list-item__body">
      <card-goods-list :goods-list="goodsList" />
      <div class="total-price">总价：{{ Number(item.price).toFixed(2) }}</div>
    </div>
    <div class="order-list-item__footer">
      <van-button
        v-orderStatus="{
          status: item.status,
          allows: [FullOrderStatus.unPaid]
        }"
        @click.stop="handleCancelOrderById(item)"
        size="mini"
        >取消订单</van-button
      >
      <van-button
        size="mini"
        v-orderStatus="{
          status: item.status,
          allows: [FullOrderStatus.cancelled, FullOrderStatus.delivered, FullOrderStatus.evaluated]
        }"
        @click.stop="handleDeleteOrderById(item)"
        >删除订单</van-button
      >
      <van-button
        v-orderStatus="{
          status: item.status,
          allows: [FullOrderStatus.unPaid]
        }"
        size="mini"
        @click.stop="handleGoPay(item)"
        >去支付</van-button
      >
      <van-button
        v-orderStatus="{
          status: item.status,
          allows: [FullOrderStatus.delivered]
        }"
        size="mini"
        @click.stop="$router.push(`/orderComment/${item.id}`)"
        >去评价</van-button
      >
      <van-button
        v-orderStatus="{
          status: item.status,
          allows: [FullOrderStatus.sendGoods]
        }"
        size="mini"
        @click.stop="handleDeliveredOrderById(item)"
        >确认送达</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, toRefs } from 'vue'
import { FullOrderStatus, OrderListItem } from 'src/apis/order/model/orderModel'
import { Dialog, Notify } from 'vant'
import { fullOrderStatus, useOrderListEffect } from '../hooks/useOrderListEffect'
import { useOrderItemEffect } from '../hooks/useOrderItemEffect'

import { EmitData, emitter } from '../mitt'
import { useRouter } from 'vue-router'
import CardGoodsList, { CardGoodsItem } from 'comps/CardGoodsList/index.vue'

export default defineComponent({
  name: 'OrderItem',
  components: {
    CardGoodsList
  },
  props: {
    item: {
      type: Object as PropType<OrderListItem>,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const { deleteOrderById } = useOrderListEffect()
    const { modifyOrderStatusById } = useOrderItemEffect()

    const data = reactive({
      statusText: computed(() => {
        return (fullOrderStatus as any)[props.item.status]
      }),
      goodsList: computed(() => {
        return props.item.orderFoods.map(item => {
          return {
            id: item.id,
            num: item.number,
            price: item.food.price.toFixed(2),
            title: item.food.name,
            thumb: item.food.image
          } as CardGoodsItem
        })
      })
    })

    const methods = reactive({
      handleDeleteOrderById: (item: OrderListItem) => {
        Dialog.confirm({
          title: '删除订单',
          message: '确认删除吗？删除后不可恢复哦~'
        })
          .then(() => {
            deleteOrderById(item.id).then(() => {
              Notify({ type: 'success', message: '删除成功' })
              emitter.emit('refresh-list', { type: 'delete', value: item.id } as EmitData)
            })
          })
          .catch(() => {})
      },
      handleCancelOrderById: (item: OrderListItem) => {
        Dialog.confirm({
          title: '取消订单',
          message: '确认取消该订单吗？'
        })
          .then(() => {
            modifyOrderStatusById(item.id, FullOrderStatus.cancelled).then(() => {
              Notify({ type: 'success', message: '取消成功' })
              emitter.emit('refresh-list', {
                type: 'cancelled',
                value: {
                  id: item.id,
                  status: FullOrderStatus.cancelled
                }
              } as EmitData)
            })
          })
          .catch(() => {})
      },
      handleDeliveredOrderById: (item: OrderListItem) => {
        Dialog.confirm({
          title: '确认订单',
          message: '确认该订单已送达？'
        })
          .then(() => {
            modifyOrderStatusById(item.id, FullOrderStatus.delivered).then(() => {
              Notify({ type: 'success', message: '确认成功' })
              emitter.emit('refresh-list', {
                type: 'delivered',
                value: {
                  id: item.id,
                  status: FullOrderStatus.delivered
                }
              } as EmitData)
            })
          })
          .catch(() => {})
      },
      goDetail: () => {
        router.push(`/orderDetail/${props.item.id}`)
      },
      handleGoPay: (item: OrderListItem) => {
        router.push({
          path: '/pay',
          query: {
            totalPrice: item.price,
            id: item.id
          }
        })
      }
    })

    return {
      ...toRefs(data),
      ...toRefs(methods),
      FullOrderStatus
    }
  }
})
</script>

<style scoped lang="less">
.order-list-item {
  background: #fff;
  margin: 10px 12px;
  border-radius: 8px;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.09);
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 10px;
    > :first-child {
      display: flex;
      align-items: center;
      > .van-icon {
        margin-right: 5px;
      }
    }
  }

  &__body {
    .total-price {
      font-size: 14px;
      text-align: right;
      padding: 6px 10px;
    }
  }

  &__footer {
    text-align: right;
    padding: 5px 10px 10px;
  }
}
</style>
