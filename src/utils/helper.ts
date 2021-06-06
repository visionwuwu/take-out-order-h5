/**
 * 混合对象实现
 * @param to 目标值
 * @param from 当前值
 * @returns 混合对象
 */
/* eslint-disable */
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

/**
 * 判断当前值是否为普通对象
 * @param val
 * @returns
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

/**
 * 转换购物车商品总价
 * @param totalPrice
 * @param unit
 * @returns
 */
export function formatCartTotalPrice(totalPrice: number | any, unit: 'yuan' | 'fen') {
  return unit === 'yuan' ? totalPrice.toFixed(2) : totalPrice * 100
}
