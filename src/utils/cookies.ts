/*
 * @Description: cookies封装
 * @Author: Visionwuwu
 * @Date: 2021-05-10 23:00:00
 * @LastEditors: Visionwuwu
 * @LastEditTime: 2021-05-21 23:19:00
 */
import Keys from 'src/constant/key'
import Cookies from 'js-cookie'
import { GoodsItem } from 'src/store/modules/goods/state'
import { AddressEditInfo } from 'vant'

export const getToken = () => Cookies.get(Keys.tokenKey)
export const setToken = (token: string) => Cookies.set(Keys.tokenKey, token)
export const removeToken = () => Cookies.remove(Keys.tokenKey)

export const addGoods = (uid: number, goods: GoodsItem) => {
  // 从cookie中取出所有用户的购物车数据
  const userCarts = Cookies.getJSON(Keys.userCarts) || {}
  // 获取当前用户的购物车数据
  const currentUserCart: GoodsItem[] = userCarts[uid] || []

  // 查找当前goodsId对应的商品
  const index = currentUserCart.findIndex(item => item.id === goods.id)

  // 数量增加
  if (index > -1) {
    currentUserCart[index].count += 1
  } else {
    // 添加到购物车
    currentUserCart.push(goods)
  }

  // 更新购物车
  userCarts[uid] = currentUserCart

  console.log(userCarts)

  // 再次保存到cookie
  Cookies.set(Keys.userCarts, userCarts)
}
export const removeGoods = (uid: number, goodsId: number) => {
  // 从cookie中取出所有用户的购物车数据
  const userCarts = Cookies.getJSON(Keys.userCarts) || {}
  // 获取当前用户的购物车数据
  const currentUserCart: GoodsItem[] = userCarts[uid] || []
  // 查找当前goodsId对应的商品
  const index = currentUserCart.findIndex(item => item.id === goodsId)
  // 不存在直接返回
  if (index === -1) return

  const item = currentUserCart[index]

  // 数量减一
  item.count -= 1

  // 为零移除
  if (item.count <= 0) {
    currentUserCart.splice(index, 1)
  }

  // 更新购物车
  userCarts[uid] = currentUserCart

  // 再次保存到cookie
  Cookies.set(Keys.userCarts, userCarts)
}
export const getCartsByUid = (uid: number) => {
  const userCarts = Cookies.getJSON(Keys.userCarts) || {}
  const currentUserCart: GoodsItem[] = userCarts[uid] || []
  return currentUserCart
}
export const emptyGoods = (uid: number) => {
  // 从cookie中取出所有用户的购物车数据
  const userCarts = Cookies.getJSON(Keys.userCarts) || {}
  // 删除
  delete userCarts[uid]
  // 再次保存到cookie
  Cookies.set(Keys.userCarts, userCarts)
}

// 收货地址interface定义
export type AddressInfo = Omit<AddressEditInfo, 'country' | 'postalCode'> & {
  id: number
}

export type AddressList = AddressInfo[]
/**
 * 收货地址Cookies模块
 */
export class Address {
  static getAddressByUid(uid: number) {
    const usersAddress = Cookies.getJSON(Keys.addressKey) || {}
    const currentUserAddress: AddressList = usersAddress[uid] || []
    return {
      usersAddress,
      currentUserAddress
    }
  }

  static addAddress(uid: number, address: AddressInfo) {
    let { usersAddress, currentUserAddress } = Address.getAddressByUid(uid)

    if (address.isDefault) {
      currentUserAddress = currentUserAddress.map(item => {
        if (item.isDefault) {
          item.isDefault = false
        }
        return item
      })
    }

    usersAddress[uid] = currentUserAddress.concat(address)
    Cookies.set(Keys.addressKey, usersAddress)
  }

  static removeAddress(uid: number, id: number) {
    const { usersAddress, currentUserAddress } = Address.getAddressByUid(uid)

    const index = currentUserAddress.findIndex(item => item.id === id)

    if (index === -1) return

    currentUserAddress.splice(index, 1)

    usersAddress[uid] = currentUserAddress

    Cookies.set(Keys.addressKey, usersAddress)
  }

  static modifyAddress(uid: number, id: number, addressInfo: AddressInfo) {
    let { usersAddress, currentUserAddress } = Address.getAddressByUid(uid)

    const index = currentUserAddress.findIndex(item => item.id === id)

    if (index === -1) return

    if (addressInfo.isDefault) {
      currentUserAddress = currentUserAddress.map(item => {
        if (item.isDefault) {
          item.isDefault = false
        }
        return item
      })
    }
    currentUserAddress.splice(index, 1, addressInfo)

    usersAddress[uid] = currentUserAddress

    Cookies.set(Keys.addressKey, usersAddress)
  }

  static loadAddressList(uid: number) {
    const { currentUserAddress } = Address.getAddressByUid(uid)

    return currentUserAddress
  }

  static loadDefaultAddressInfoByUid(uid: number) {
    const { currentUserAddress } = Address.getAddressByUid(uid)
    return currentUserAddress.find(item => item.isDefault)
  }

  static loadAddressById(uid: number, id: number) {
    const { currentUserAddress } = Address.getAddressByUid(uid)

    const index = currentUserAddress.findIndex(item => item.id === id)

    if (index === -1) return

    return currentUserAddress[index]
  }
}

/** 缓存用户选中地址模块 */
export class SelectedAddressIds {
  static getSelectedData() {
    return Cookies.getJSON(Keys.addressSelectedKey) || {}
  }

  static setSelectedAddressId(uid: number, id: number) {
    const model = SelectedAddressIds.getSelectedData()
    model[uid] = id
    Cookies.set(Keys.addressSelectedKey, model)
  }

  static getSelectedAddressId(uid: number) {
    const model = SelectedAddressIds.getSelectedData()
    return model[uid]
  }

  static removeSelectedAddressId(uid: number) {
    const model = SelectedAddressIds.getSelectedData()
    delete model[uid]
    Cookies.set(Keys.addressSelectedKey, model)
  }
}

/** 倒计时缓存模块 */
export class CountDown {
  static getCurrentTimeByOid(oid: number) {
    const data = Cookies.getJSON(Keys.orderCountDownKey)
    return data ? data[oid] : 0
  }

  static setCurrentTimeByOid(oid: number, timestamp: number) {
    const data = Cookies.getJSON(Keys.orderCountDownKey) || {}
    if (!data) return
    data[oid] = timestamp
    Cookies.set(Keys.orderCountDownKey, data)
  }

  static removeCurrentTimeByOid(oid: number) {
    const data = Cookies.getJSON(Keys.orderCountDownKey)
    if (!data) return
    delete data[oid]
    Cookies.set(Keys.orderCountDownKey, data)
  }
}
