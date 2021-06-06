<template>
  <div class="pay-container">
    <van-cell style="font-size: 17px">
      <template #title>支付金额</template>
      <template #right-icon>
        <div class="payment-amount">&yen;{{ totalPrice }}</div>
      </template>
    </van-cell>

    <CommonDivider />

    <h2>选择支付方式</h2>

    <van-radio-group v-model="payMode">
      <van-cell-group>
        <van-cell clickable @click="payMode = 'alipay'">
          <template #title>
            <div class="cell-item-title">
              <van-icon size="25" name="alipay" color="#188FE3" />
              <div class="cell-item-title__content">
                <h3>支付宝支付</h3>
                <p>推荐有支付宝账号用户支付</p>
              </div>
            </div>
          </template>
          <template #right-icon>
            <van-radio name="alipay" />
          </template>
        </van-cell>
        <van-cell clickable @click="payMode = 'wechat-pay'">
          <template #title>
            <div class="cell-item-title">
              <van-icon size="25" name="wechat-pay" color="#41B035" />
              <div class="cell-item-title__content">
                <h3>微信支付</h3>
                <p>推荐有微信账号用户支付</p>
              </div>
            </div>
          </template>
          <template #right-icon>
            <van-radio name="wechat-pay" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div style="margin: 20px 10px">
      <van-button @click="showPayPopup = true" type="primary" block>确认支付</van-button>
    </div>

    <van-popup
      v-model:show="showPayPopup"
      :style="{ height: '60%' }"
      :close-on-click-overlay="false"
      class="pay-popup"
      position="bottom"
    >
      <van-icon @click="handleClickPayPopupCloseIcon" class="pay-popup__close-icon" name="cross" />
      <h1 class="amount">&yen;{{ totalPrice }}</h1>
      <van-password-input class="pay-password-input" :value="password" />
      <van-number-keyboard
        v-model="password"
        :show="showKeyboard"
        :safe-area-inset-bottom="false"
        theme="custom"
        close-button-text="确认"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { usePayEffect } from './hooks/usePayEffect'
import { reqOrderById } from 'apis/order/order'
import { Toast } from 'vant'
import { ApiStatusCode } from 'src/common/enums/ApiStatusCode.enum'

export default defineComponent({
  name: 'Pay',
  beforeRouteEnter(to, from, next) {
    const id = to.query.id ? parseInt(to.query.id as string) : -1
    const orderErrorCallback = () => {
      Toast('订单不存在')
      return next('/')
    }
    if (id === -1) {
      orderErrorCallback()
    }
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
      loadingType: 'spinner'
    })
    reqOrderById(id)
      .then(res => {
        if (res.data.code === ApiStatusCode.OK) {
          next()
        } else {
          orderErrorCallback()
        }
      })
      .catch(() => {
        orderErrorCallback()
      })
      .finally(() => {
        Toast.clear()
      })
  },
  setup() {
    const { state, handleClickPayPopupCloseIcon, handleSurePassword } = usePayEffect()

    return {
      ...toRefs(state),
      handleClickPayPopupCloseIcon,
      handleSurePassword
    }
  }
})
</script>

<style scoped lang="less">
.pay-container {
  h2 {
    text-align: center;
    font-size: 18px;
    margin: 40px auto 40px;
  }
  .payment-amount {
    color: orange;
  }
  .cell-item-title {
    display: flex;
    justify-content: center;
    align-items: center;
    .van-icon {
      flex-shrink: 0;
    }
    &__content {
      margin-left: 12px;
      flex: 1;
      h3 {
        font-weight: 600;
      }
      p {
        font-size: 13px;
        color: rgba(69, 90, 100, 0.6);
      }
    }
  }

  :deep(.pay-popup) {
    padding-top: 25px !important;
    .amount {
      font-size: 30px;
      text-align: center;
    }
    .pay-password-input {
      margin-top: 15px;
    }
    &__close-icon {
      position: absolute;
      top: 4.267vw;
      right: 4.267vw;
      z-index: 1;
      color: #c8c9cc;
      font-size: 5.867vw;
      cursor: pointer;
    }
  }
}
</style>
