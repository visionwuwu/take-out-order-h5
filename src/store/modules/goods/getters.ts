import { GetterTree } from 'vuex'
import { GoodsState } from './state'
import { RootState } from 'store/index'

export type Getters<S = GoodsState> = {
  getTotalGoods(state: S): number
  getTotalPrice(state: S): number
  cartHasActive(state: S, getters: Getters): boolean
  getSelectedFoodCountByKindId(state: S): (id: number) => number
}

export const getters: GetterTree<GoodsState, RootState> & Getters = {
  getTotalGoods(state) {
    return state.goodsList.length
  },
  getTotalPrice(state) {
    const price = state.goodsList.reduce((prev, next) => {
      const price = next.count * next.price
      return prev + price
    }, 0)
    return price
  },
  cartHasActive(state, getters) {
    return (getters.getTotalGoods as any) === 0 ? false : true
  },
  getSelectedFoodCountByKindId(state) {
    return (id: number) => {
      return state.goodsList.reduce((prev, next) => {
        if (next.kindId === id) {
          return prev + next.count
        }
        return prev
      }, 0)
    }
  }
}
