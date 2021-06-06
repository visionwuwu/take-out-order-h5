import { reactive } from '@vue/reactivity'
import { OrderList, OrderStatus, FullOrderStatus } from 'src/apis/order/model/orderModel'
import { reqOrderList, reqDelOrderById } from 'src/apis/order/order'

export const fullOrderStatusItems = [
  { label: '已发货', value: FullOrderStatus.sendGoods },
  { label: '未发货', value: FullOrderStatus.unSendGoods },
  { label: '未付款', value: FullOrderStatus.unPaid },
  { label: '已付款', value: FullOrderStatus.paid },
  { label: '已送达', value: FullOrderStatus.delivered },
  { label: '已取消', value: FullOrderStatus.cancelled },
  { label: '已评价', value: FullOrderStatus.evaluated }
]

export const fullOrderStatus = {
  [FullOrderStatus.sendGoods]: '已发货',
  [FullOrderStatus.unSendGoods]: '未发货',
  [FullOrderStatus.unPaid]: '未付款',
  [FullOrderStatus.paid]: '已付款',
  [FullOrderStatus.delivered]: '已送达',
  [FullOrderStatus.cancelled]: '已取消',
  [FullOrderStatus.evaluated]: '已评价'
}

export enum OrderTabType {
  all = 'all',
  unPaid = 'unPaid',
  unEvaluated = 'unEvaluated',
  refund = 'refund'
}

export interface OrderTabPanel {
  loading: boolean
  finished: boolean
  finishedText: string
  page: number
  limit: number
  list: OrderList
}

export interface OrderTabs {
  [OrderTabType.all]: OrderTabPanel
  [OrderTabType.unPaid]: OrderTabPanel
  [OrderTabType.unEvaluated]: OrderTabPanel
  [OrderTabType.refund]: OrderTabPanel
}

export interface TabItem {
  title: string
  type: OrderTabType
  data: OrderTabPanel
}

export interface StateModel {
  tabList: TabItem[]
  tabIndex: OrderTabType
}

export function useOrderListEffect() {
  const state = reactive<StateModel>({
    tabList: [
      {
        title: '全部订单',
        type: OrderTabType.all,
        data: {
          loading: false,
          finished: false,
          finishedText: '没有更多了',
          page: 1,
          limit: 10,
          list: []
        }
      },
      {
        title: '未付款',
        type: OrderTabType.unPaid,
        data: {
          loading: false,
          finished: false,
          finishedText: '没有更多了',
          page: 1,
          limit: 10,
          list: []
        }
      },
      {
        title: '待评价',
        type: OrderTabType.unEvaluated,
        data: {
          loading: false,
          finished: false,
          finishedText: '没有更多了',
          page: 1,
          limit: 10,
          list: []
        }
      },
      {
        title: '退款',
        type: OrderTabType.refund,
        data: {
          loading: false,
          finished: false,
          finishedText: '没有更多了',
          page: 1,
          limit: 10,
          list: []
        }
      }
    ],
    tabIndex: OrderTabType.all
  })

  const getOrderList = (item: TabItem) => {
    return reqOrderList(
      { status: OrderStatus[item.type] },
      {
        page: item.data.page,
        limit: item.data.limit
      }
    )
  }

  const deleteOrderById = (id: number) => {
    return reqDelOrderById(id)
  }

  return {
    state,
    getOrderList,
    deleteOrderById
  }
}
