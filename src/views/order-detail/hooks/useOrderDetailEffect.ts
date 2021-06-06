import { reactive, Ref, ref } from '@vue/reactivity'
import { FullOrderStatus, OrderDetail } from 'src/apis/order/model/orderModel'
import { reqModifyOrderStatus, reqOrderById } from 'src/apis/order/order'
import { ApiStatusCode } from 'src/common/enums/ApiStatusCode.enum'
import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { CurrentTime } from '@vant/use/dist/types/useCountDown'
import { CountDown } from 'src/utils/cookies'
import { nextTick, watch } from '@vue/runtime-core'
import InitValue from 'src/constant/init-value'

export interface StateModel {
  showNoticeBar: boolean
  showOrderProcess: boolean
  order: OrderDetail
  time: number
  totalPrice: number
  // countDownRef: null | Ref<any>
}

const defaultOrder: OrderDetail = {
  id: 2,
  orderNumber: '',
  name: '',
  price: 0,
  mobile: '',
  address: '',
  createTime: '',
  status: '' as any,
  remarks: '',
  orderFoods: []
}

export function useOrderDetailEffect() {
  const route = useRoute()
  const router = useRouter()
  const id = route.params.id ? parseInt(route.params.id as string) : -1
  const countDownRef = ref<any>(null)

  const state = reactive<StateModel>({
    showNoticeBar: false,
    order: { ...defaultOrder },
    showOrderProcess: false,
    time: CountDown.getCurrentTimeByOid(id) || InitValue.orderCountDownTime,
    totalPrice: 0
  })

  const getOrderInfoById = () => {
    Toast.loading({
      message: '加载中...',
      loadingType: 'spinner',
      forbidClick: true,
      duration: 0
    })
    return reqOrderById(id)
      .then(res => {
        if (res.data.code === ApiStatusCode.OK) {
          state.order = res.data.data
        }
      })
      .finally(() => {
        Toast.clear()
      })
  }

  const handleCountDownChange = (currentTime: CurrentTime) => {
    console.log(currentTime.total)
    CountDown.setCurrentTimeByOid(id, currentTime.total)
  }

  const handleCountDownFinish = () => {
    CountDown.removeCurrentTimeByOid(id)
  }

  const handleClickBack = () => {
    const backPath = route.query.backPath as string
    if (backPath) {
      router.replace(backPath)
    } else {
      router.back()
    }
  }

  const cancelOrder = () => {
    reqModifyOrderStatus(id, FullOrderStatus.cancelled).then(() => {
      Toast.success({
        message: '取消订单成功',
        duration: 600,
        onClose: () => {
          router.push({
            path: `/redirect/orderDetail/${id}`
          })
        }
      })
    })
  }

  const handleGoPayment = () => {
    router.push({
      path: '/pay',
      query: {
        totalPrice: state.totalPrice,
        id
      }
    })
  }

  // 监听当前订单状态是否为 未支付开启倒计时
  watch(
    () => state.order,
    newOrder => {
      if (newOrder.status === FullOrderStatus.unPaid) {
        state.showNoticeBar = true
        nextTick(() => {
          console.log(countDownRef.value, '====')
          // countDownRef.value.start()
        })
      } else {
        state.showNoticeBar = false
      }
      state.totalPrice = newOrder.price
    }
  )

  return {
    state,
    countDownRef,
    getOrderInfoById,
    handleCountDownChange,
    handleCountDownFinish,
    handleClickBack,
    cancelOrder,
    handleGoPayment
  }
}
