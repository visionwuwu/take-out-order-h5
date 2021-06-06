/**
 * @Description 订单状态指令
 * @Author Visionwuwu
 * @Date 2021-05-13 15:13:00
 * @LastEditor Visionwuwu
 * @LastEditTime 2021-05-13 15:14:00
 */
import { Directive, DirectiveBinding } from 'vue'
import { FullOrderStatus } from 'apis/order/model/orderModel'
import { isPlainObject } from 'utils/helper'

function matchStatus(el: any, binding: DirectiveBinding) {
  const { value } = binding
  if (value && isPlainObject(value)) {
    const { status, allows } = value
    let isShow = false
    if (allows && Array.isArray(allows)) {
      isShow = allows.includes(status)
    }
    if (!isShow) {
      el.style.display = 'none'
    } else {
      el.style.display = 'inline-block'
    }
  } else {
    throw new Error(`需要一个值 是这个数组中的 ${Object.values(FullOrderStatus)}中的一个`)
  }
}

export const orderStatus: Directive = {
  mounted: (el, binding) => {
    matchStatus(el, binding)
  },
  updated: (el, binding) => {
    matchStatus(el, binding)
  }
}
