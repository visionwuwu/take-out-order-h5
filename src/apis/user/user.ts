import request, { AxiosResultData } from 'utils/request'
import { LoginModel, LoginResponseData, UserInfo, RegisterModel } from './model/userModel'

/** api url */
/* eslint-disable */
enum ApiUrls {
  authLogin = 'auth/login',
  authRegister = 'auth/register',
  loadUserInfo = 'auth/userinfo',
  modifyUserPassword = '/users/resetPwd',
  updateUserInfo = '/users/update/currentUserInfo'
}

/**
 * 系统用户登录
 * @param {*} params
 */
export function reqLogin<T = AxiosResultData<LoginResponseData>>(model: LoginModel) {
  return request<T>({
    url: ApiUrls.authLogin,
    method: 'post',
    data: model
  })
}

/**
 * 系统用户登录
 * @param {*} params
 */
export function reqRegister<T = AxiosResultData>(model: RegisterModel) {
  return request<T>({
    url: ApiUrls.authRegister,
    method: 'post',
    data: model
  })
}

/**
 * 获取当前用户信息
 * @param {*} params
 */
export function reqUserInfo<T = AxiosResultData<UserInfo>>() {
  return request<T>({
    url: ApiUrls.loadUserInfo,
    method: 'get'
  })
}

/**
 * 更新当前用户信息
 * @param {*} params
 */
export function reqUpdateUserInfo(data: UserInfo) {
  return request({
    url: ApiUrls.updateUserInfo,
    method: 'put',
    data
  })
}

/**
 * 根据id修改用户密码
 * @param {*} id
 * @param {*} status
 */
export function modifyUserPassword(id: number, password: string) {
  return request({
    url: `${ApiUrls.modifyUserPassword}/${id}`,
    method: 'patch',
    data: { password }
  })
}
