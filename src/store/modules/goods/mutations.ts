import { MutationTree } from 'vuex'
import { GoodsMutationTypes } from './mutation-types'
import { removeGoods, addGoods, emptyGoods, getCartsByUid } from 'utils/cookies'
import { GoodsItem, GoodsState } from './state'
import { getUserId } from 'src/utils/user'
/* eslint-disable */
export type Mutations<S = GoodsState> = {
  [GoodsMutationTypes.ADD_GOODS](state: S, goods: GoodsItem): void
  [GoodsMutationTypes.REMOVE_GOODS](state: S, id: number): void
  [GoodsMutationTypes.EMPTY_CART](state: S): void
  [GoodsMutationTypes.INIT_CART](state: S): void
}

export const mutations: MutationTree<GoodsState> & Mutations = {
  [GoodsMutationTypes.ADD_GOODS](state, goods) {
    const uid = getUserId()
    const item = state.goodsList.find(item => item.id === goods.id)
    // 数量加一
    if (item) {
      item.count += 1
      addGoods(uid, item)
    } else {
      // 添加到购物车
      addGoods(uid, { ...goods, count: 1 })
      state.goodsList.push({ ...goods, count: 1 })
    }
  },
  [GoodsMutationTypes.REMOVE_GOODS](state, id) {
    // 从store中获取用户的id
    const uid = getUserId()

    const index = state.goodsList.findIndex(goods => goods.id === id)
    if (index === -1) return

    const item = state.goodsList[index]

    item.count -= 1
    // 数量减少
    removeGoods(uid, item.id)

    if (item.count <= 0) {
      state.goodsList.splice(index, 1)
      // 删除当前商品
      removeGoods(uid, item.id)
    }
  },
  [GoodsMutationTypes.EMPTY_CART](state) {
    // 从store中获取用户的id
    const uid = getUserId()
    state.goodsList = []
    emptyGoods(uid)
  },
  [GoodsMutationTypes.INIT_CART](state) {
    const uid = getUserId()
    console.log(uid)
    state.goodsList = getCartsByUid(uid)
  }
}
