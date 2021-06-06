import { reqCreateOrder } from 'apis/order/order'
import { OrderModel } from 'src/apis/order/model/orderModel'

export function useOrderConfirm() {
  const createOrder = (order: OrderModel) => {
    return reqCreateOrder(order)
  }

  return {
    createOrder
  }
}
