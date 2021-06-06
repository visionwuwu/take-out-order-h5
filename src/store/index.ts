import { createStore, createLogger } from 'vuex'
import { store as user, UserState, UserStore } from 'store/modules/user'
import { store as goods, GoodsState, GoodsStore } from './modules/goods'

/** 所有模块的状态集 */
export interface ModulesState {
  user: UserState
  goods: GoodsState
}

/** 当前应用的状态类型定义 */
export type RootState = ModulesState

/** 自定义应用Store类型 */
export type Store = UserStore<Pick<RootState, 'user'>> & GoodsStore<Pick<RootState, 'goods'>>

// 在开发环境中使用插件记录器
const debug = import.meta.env.MODE !== 'production'
const plugins = debug ? [createLogger({})] : []

export const store = createStore({
  plugins,
  modules: {
    user,
    goods
  }
})

export function useAppStore() {
  return store as Store
}

export default store
