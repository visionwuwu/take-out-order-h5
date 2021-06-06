import request, { AxiosResultData } from 'utils/request'
import { KindFoodsList, KindList } from './model/kindModel'

/** api接口请求地址 */
/* eslint-disable */
export enum ApiUrls {
  loadKindList = '/kinds/list',
  loadkindAndFoods = '/kinds/kindAndFoods'
}

/**
 * 加载菜品种类列表
 */
export function reqKindList<T = AxiosResultData<KindList>>() {
  return request<T>({
    method: 'get',
    url: ApiUrls.loadKindList
  })
}

/**
 * 加载菜品种类列表
 */
export function reqkindAndFoodsList<T = AxiosResultData<KindFoodsList>>() {
  return request<T>({
    method: 'get',
    url: ApiUrls.loadkindAndFoods
  })
}
