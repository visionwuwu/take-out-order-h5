import { reactive, ref } from '@vue/reactivity'
import { computed, nextTick, watch } from '@vue/runtime-core'
import { FullOrderStatus } from 'src/apis/order/model/orderModel'
import { reqModifyOrderStatus } from 'src/apis/order/order'
import { ApiStatusCode } from 'src/common/enums/ApiStatusCode.enum'
import { Dialog, Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'

export interface StateModel {
  payMode: 'alipay' | 'wechat-pay'
  showKeyboard: boolean
  showPayPopup: boolean
  password: string
  totalPrice: string
}

export function usePayEffect() {
  const route = useRoute()
  const router = useRouter()
  const id = route.query.id ? parseInt(route.query.id as string) : -1
  const price = route.query.totalPrice as string
  const nKeyboard = ref()

  const state = reactive<StateModel>({
    payMode: 'alipay',
    showKeyboard: true,
    showPayPopup: false,
    password: '',
    totalPrice: computed(() => price).value
  })

  const handleClickPayPopupCloseIcon = () => {
    Dialog.confirm({
      message: '是否放弃本次支付',
      cancelButtonText: '取消',
      confirmButtonText: '继续支付'
    }).catch(() => {
      router.replace({
        path: `/orderDetail/${id}`,
        query: {
          backPath: '/kind'
        }
      })
      console.log(111)
    })
  }

  const handleSurePassword = () => {
    Toast.loading({
      message: '支付中...',
      duration: 0,
      forbidClick: true,
      loadingType: 'spinner'
    })

    // 密码校验TODO...
    if (state.password !== '123456') {
      setTimeout(() => {
        Toast.fail('密码错误')
        Toast.clear()
      }, 500)
      return
    }

    reqModifyOrderStatus(id, FullOrderStatus.paid)
      .then(res => {
        if (res.data.code === ApiStatusCode.OK) {
          Toast.success('支付成功')
          router.push({
            path: `/orderDetail/${id}`,
            query: {
              backPath: '/kind'
            }
          })
        }
      })
      .finally(() => {
        Toast.clear()
      })
  }

  watch(
    () => state.showPayPopup,
    newVal => {
      nextTick(() => {
        const el = document.querySelector('.pay-popup .van-key--blue')
        if (!el) return
        const handler = (e: Event) => {
          handleSurePassword()
        }
        if (newVal) {
          el.addEventListener('touchstart', handler)
        } else {
          el.removeEventListener('touchstart', handler)
        }
      })
    }
  )

  return {
    state,
    nKeyboard,
    handleClickPayPopupCloseIcon,
    handleSurePassword
  }
}
