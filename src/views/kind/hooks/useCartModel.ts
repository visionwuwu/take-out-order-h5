import { reactive, toRefs } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { useAppStore } from 'src/store'
import { GoodsMutationTypes } from 'src/store/modules/goods/mutation-types'
import { GoodsItem } from 'src/store/modules/goods/state'

export default function useCartActions() {
  const store = useAppStore()

  const state = reactive({
    totalGoods: computed(() => store.getters.getTotalGoods),
    totalPrice: computed(() => store.getters.getTotalPrice),
    goodsList: computed(() => store.state.goods.goodsList),
    cartHasActive: computed(() => store.getters.cartHasActive)
  })

  const commitAddGoods = (goods: GoodsItem) => {
    store.commit(GoodsMutationTypes.ADD_GOODS, goods)
  }

  const commitRemoveGoods = (id: number) => {
    store.commit(GoodsMutationTypes.REMOVE_GOODS, id)
  }

  const commitEmptyCart = () => {
    store.commit(GoodsMutationTypes.EMPTY_CART)
  }

  const commitInitCart = () => {
    store.commit(GoodsMutationTypes.INIT_CART)
  }

  return {
    commitAddGoods,
    commitRemoveGoods,
    commitEmptyCart,
    commitInitCart,
    ...toRefs(state)
  }
}
