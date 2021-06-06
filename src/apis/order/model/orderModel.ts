import { UserModel } from 'apis/user/model/userModel'
import { KindListItem } from 'apis/kind/model/kindModel'

/** 菜品筛选数据模型 */
export interface LoadFoodListModel {
  name?: string
}

/** 菜品列表项数据模型 */
export interface FoodListItem {
  id?: number
  name: string
  image: string
  price: number
  kind?: KindListItem
  remarks?: string
  createTime?: string
}

/** 菜品列表数据模型 */
export type FoodList = FoodListItem[]

/** 订单状态 */
/** 外卖订单筛选 */
export enum OrderStatus {
  /** 全部订单 */
  all = '0',
  /** 未付款 */
  unPaid = '3',
  /** 待评价 */
  unEvaluated = '4',
  /** 退款 */
  refund = '8'
}

/** 订单状态 */
export enum FullOrderStatus {
  /** 未发货 */
  unSendGoods = '0',
  /** 已发货 */
  sendGoods = '1',
  /** 已付款 */
  paid = '2',
  /** 未付款 */
  unPaid = '3',
  /** 已送达 */
  delivered = '4',
  /** 已取消 */
  cancelled = '5',
  /** 已评价 */
  evaluated = '6'
}

// export enum OrderStatus {
//   /** 未发货 */
//   unSendGoods = '0',
//   /** 已发货 */
//   sendGoods = '1',
//   /** 已付款 */
//   paid = '2',
//   /** 未付款 */
//   unPaid = '3',
//   /** 已送达 */
//   delivered = '4',
//   /** 已取消 */
//   cancelled = '5',
//   /** 待评价 */
//   unEvaluated = '6',
//   /** 已评价 */
//   evaluated = '7',
// }

/** 订单筛选数据模型 */
export interface LoadOrderListModel {
  status: OrderStatus
}

/** 订单食物的数据模型 */
export interface OrderFood {
  id: number
  number: number
  food: FoodListItem
}

/** 订单列表项数据模型定义 */
export interface OrderListItem {
  id: number
  orderNumber: string
  price: number
  name: string
  mobile: string
  address: string
  createTime?: string
  status: OrderStatus
  remarks?: string
  user: UserModel
  orderFoods: OrderFood[]
}

/** 订单数据列表类型定义 */
export type OrderList = OrderListItem[]

/** 创建or更新订单数据模型 */
export interface OrderModel
  extends Omit<OrderListItem, 'id' | 'createTime' | 'orderNumber' | 'orderFoods'> {
  foods: string
}

export interface OrderDetail extends Omit<OrderListItem, 'user' | 'status'> {
  status: FullOrderStatus
}
