import { ref } from '@vue/reactivity'
import { BannerList } from 'apis/banner/model/bannerModel'
import { reqBannerList } from 'src/apis/banner/banner'

/* eslint-disable */
export const useBannerEffect = () => {
  const bannerList = ref<BannerList>([])

  const getBannerList = async () => {
    const res = await reqBannerList()
    bannerList.value = res.data.data
  }

  return {
    bannerList,
    getBannerList
  }
}
