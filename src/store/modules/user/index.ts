import { CommitOptions, DispatchOptions, Module, Store } from 'vuex'
import { RootState } from 'store/index'
import type { UserState } from './state'
import { state } from './state'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'

export { UserState }

/** 当前用户模块的Store类型定义 */
/* eslint-disable */
export type UserStore<S = UserState> = Omit<Store<S>, 'commit' | 'getters' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store: Module<UserState, RootState> = {
  state,
  mutations,
  actions
}
