<template>
  <div class="order-confirm">
    <CommonCard :border="false" :borderRadius="false" :bodyStyle="{ padding: '8px 0' }">
      <address-card @click="handleAddressCardClick" :address-info="addressInfo" :type="type" />
    </CommonCard>
    <CommonCard
      header="商品清单"
      :border="false"
      :borderRadius="false"
      :bodyStyle="{ padding: '10px' }"
    >
      <card-goods-list :goods-list="cardGoodsList" :thumb-size="45" background-color="#FAFAFA" />
      <template #footer>
        <div class="sub-total">
          小计：<span>&yen; {{ totalPrice }}</span>
        </div>
      </template>
    </CommonCard>
    <CommonCard :border="false" :borderRadius="false">
      <template #header>
        <van-cell style="padding: 0" center title="号码保护">
          <template #right-icon>
            <van-switch v-model="checked" size="24" />
          </template>
        </van-cell>
      </template>
      <p style="font-size: 12px; margin: 5px 0">对商家、骑手隐藏您的真实手机号，保护您的隐私</p>
      <p style="color: orange; font-size: 12px; margin: 5px 0">
        为保障服务质量，开启号码保护的订单通话可能会被录音
      </p>
    </CommonCard>
    <CommonCard :border="false" :borderRadius="false" :bodyStyle="{ padding: 0 }">
      <van-cell title="支付方式" value="在线支付"></van-cell>
      <van-cell
        @click="show = !show"
        title="备注"
        :value="remarks || '口味、偏好等要求'"
        is-link
      ></van-cell>
      <van-cell title="发票" value="本店不支持发票"></van-cell>
    </CommonCard>

    <van-submit-bar
      :price="formatCartTotalPrice(totalPrice, 'fen')"
      button-text="提交订单"
      @submit="onSubmit"
      :loading="loading"
    />

    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
      <van-cell>
        <template #title>
          <span @click="handleCancelRemarks" class="custom-title">取消</span>
        </template>
        <template #right-icon>
          <span @click="show = false">完成</span>
        </template>
      </van-cell>
      <div class="van-hairline--bottom">
        <van-field
          v-model="remarks"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入订单备注"
          show-word-limit
          clearable
        />
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddressCard, { AddressInfo, AddressCardType } from './components/AddressCard.vue'
import { Address, AddressInfo as AInfo } from 'utils/cookies'
import { getUserId } from 'src/utils/user'
import useCardModel from '../kind/hooks/useCartModel'
import { formatCartTotalPrice } from 'utils/helper'
import { useOrderConfirm } from './hooks/useOrderConfirmEffect'
import { Toast } from 'vant'
import { OrderModel, OrderStatus } from 'src/apis/order/model/orderModel'
import { ApiStatusCode } from 'src/common/enums/ApiStatusCode.enum'
import CardGoodsList, { CardGoodsItem } from 'comps/CardGoodsList/index.vue'

const initAddressInfo: AddressInfo = {
  name: '',
  mobile: '',
  address: ''
}

interface StateModel {
  type: AddressCardType
  addressInfo: AddressInfo
  checked: boolean
  show: boolean
  remarks: string
  loading: boolean
}

export default defineComponent({
  name: 'OrderConfirm',
  components: {
    AddressCard,
    CardGoodsList
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      const addressInfo: any = vm.loadAddressInfo()
      vm.type = !addressInfo ? 'add' : 'edit'
      vm.addressInfo = addressInfo || initAddressInfo
    })
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const id = parseInt(route.query.id as string)
    const uid = getUserId()
    const data = reactive<StateModel>({
      type: 'add',
      addressInfo: {
        name: 'Visionwuwu',
        mobile: '13767679894',
        address: '江西省抚州式南城县'
      },
      checked: false,
      show: false,
      remarks: '',
      loading: false
    })
    const { createOrder } = useOrderConfirm()

    const { goodsList, totalPrice, commitEmptyCart } = useCardModel()

    const cardGoodsList = goodsList.value.map(item => {
      return {
        id: item.id,
        num: item.count,
        price: (item.price * item.count).toFixed(2),
        desc: item.remarks,
        title: item.name,
        thumb: item.image
      } as CardGoodsItem
    })

    const methods = reactive({
      handleAddressCardClick: () => {
        router.push({
          path: '/address-list',
          query: { id }
        })
      },
      loadAddressInfo() {
        let addressInfo: AInfo | undefined
        if (!id) {
          // 加载默认地址
          addressInfo = Address.loadDefaultAddressInfoByUid(uid)
        } else {
          // 加载选中的地址
          addressInfo = Address.loadAddressById(uid, id)
        }
        if (addressInfo) {
          const address =
            addressInfo.province + addressInfo.city + addressInfo.county + addressInfo.addressDetail
          return { name: addressInfo.name, mobile: addressInfo.tel, address }
        }
        return undefined
      },
      onSubmit: () => {
        // 校验收货地址，下单商品为零
        if (!methods.vertifyHasSubmitOrder()) return

        // 启用loading
        data.loading = true

        // 将下单食物以id为键，count为值放置foods对象中
        const foods = goodsList.value.reduce((prev, next) => {
          prev[next.id] = next.count
          return prev
        }, {} as { [key: string]: number })

        // 生成订单的数据
        const order: OrderModel = {
          ...data.addressInfo,
          user: uid as any,
          price: formatCartTotalPrice(totalPrice.value, 'yuan'),
          status: OrderStatus.unPaid,
          remarks: data.remarks,
          foods: JSON.stringify(foods)
        }

        // 校验通过，调用接口下单
        createOrder(order)
          .then(res => {
            if (res && res.data.code === ApiStatusCode.OK) {
              Toast({
                type: 'success',
                message: '下单成功，去支付',
                duration: 500,
                onClose: () => {
                  router.push({
                    path: '/pay',
                    query: {
                      totalPrice: order.price,
                      id: res.data.data
                    }
                  })
                  // 清空购物车
                  commitEmptyCart()
                }
              })
            }
          })
          .finally(() => {
            data.loading = false
          })
      },
      handleCancelRemarks: () => {
        data.show = false
        data.remarks = ''
      },
      vertifyHasSubmitOrder: () => {
        // 未填写收货地址
        if (!data.addressInfo.address) {
          Toast('未填写收货地址')
          return false
        }
        // 未点商品
        if (goodsList.value.length === 0) {
          Toast('未点商品')
          return false
        }
        return true
      }
    })

    return {
      ...toRefs(data),
      ...toRefs(methods),
      cardGoodsList,
      totalPrice,
      formatCartTotalPrice
    }
  }
})
</script>

<style scoped lang="less">
@import 'styles/variables.module.less';
.order-confirm {
  padding-bottom: 63px;
  .sub-total {
    margin: 5px 0;
    text-align: right;
    font-size: 15px;
    span {
      color: red;
    }
  }
  :deep(.van-card) {
    &__thumb {
      width: 45px;
      height: 45px;
    }
    &__content {
      min-height: auto;
    }
  }
}
</style>
