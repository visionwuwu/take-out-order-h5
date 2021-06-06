import { RootState } from 'store/index'
import { CommitOptions, Module, Store } from 'vuex'
import { Getters, getters } from './getters'
import { mutations, Mutations } from './mutations'
import { state } from 'store/modules/goods/state'
import type { GoodsState } from './state'

export { GoodsState }

export type GoodsStore<S = GoodsState> = Omit<Store<S>, 'getters' | 'commit'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    k: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  getters: Getters
}

export const store: Module<GoodsState, RootState> = {
  state,
  getters,
  mutations
}
