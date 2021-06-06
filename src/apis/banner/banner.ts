import request, { AxiosResultData } from 'utils/request'
import { BannerList } from './model/bannerModel'

/* eslint-disable */
export enum ApiUrls {
  loadBannerList = '/banners/list'
}

/**
 * 加载轮播图列表
 */
export function reqBannerList<T = AxiosResultData<BannerList>>() {
  return request<T>({
    method: 'get',
    url: ApiUrls.loadBannerList
  })
}
