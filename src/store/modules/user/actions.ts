import { ActionContext, ActionTree } from 'vuex'
import { RootState } from 'store/index'
import { reqLogin, reqUserInfo } from 'apis/user/user'
import { LoginModel, UserInfo } from 'apis/user/model/userModel'
import { ApiStatusCode } from 'common/enums/ApiStatusCode.enum'
import { removeToken, setToken } from 'utils/cookies'
import { UserMutationTypes } from './mutation-types'
import { UserSex, UserState } from './state'
import { Mutations } from './mutations'
import { UserActionTypes } from './action-types'
import { GoodsMutationTypes } from '../goods/mutation-types'
import { store } from '../../index'

/** 增强的操作上下文 */
/* eslint-disable */
export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

/** 当前模块的Actions */
export interface Actions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    loginInfo: LoginModel
  ): Promise<any>
  [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): void
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): Promise<void>
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): Promise<void>
  [UserActionTypes.ACTION_SET_USER_INFO](
    { commit }: AugmentedActionContext,
    userInfo: UserInfo
  ): void
}

/**
 * 接口泛型:
 *  1. 第一个表示 当前模块的State
 *  2. 第二个表示 更模块的State
 */
export const actions: ActionTree<UserState, RootState> & Actions = {
  async [UserActionTypes.ACTION_LOGIN]({ commit, dispatch }, loginInfo) {
    const res = await reqLogin(loginInfo)
    if (res && res.data.code === ApiStatusCode.OK) {
      const { token, ...userInfo } = res.data.data
      commit(UserMutationTypes.SET_TOKEN, token)
      setToken(token)
      dispatch(UserActionTypes.ACTION_SET_USER_INFO, userInfo)
    }
    return res
  },
  async [UserActionTypes.ACTION_GET_USER_INFO]({ dispatch }) {
    const { data: res } = await reqUserInfo()
    const { code, data } = res
    if (code === ApiStatusCode.OK) {
      dispatch(UserActionTypes.ACTION_SET_USER_INFO, data)
    }
  },
  async [UserActionTypes.ACTION_LOGIN_OUT]({ commit, dispatch }) {
    await dispatch(UserActionTypes.ACTION_RESET_TOKEN)
    removeToken()
    return Promise.resolve()
  },
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }) {
    commit(UserMutationTypes.SET_TOKEN, '')
    setToken('')
    return Promise.resolve()
  },
  [UserActionTypes.ACTION_SET_USER_INFO]({ commit }, userInfo) {
    commit(UserMutationTypes.SET_USER_ID, userInfo.id)
    commit(UserMutationTypes.SET_USERNAME, userInfo.username)
    commit(UserMutationTypes.SET_AVATAR, userInfo.avatar as string)
    commit(UserMutationTypes.SET_EMAIL, userInfo.email as string)
    commit(UserMutationTypes.SET_MOBILE, userInfo.mobile as string)
    commit(UserMutationTypes.SET_SEX, userInfo.sex as UserSex)
    commit(UserMutationTypes.SET_REMARKS, userInfo.remarks as string)
    store.commit(GoodsMutationTypes.INIT_CART)
  }
}
