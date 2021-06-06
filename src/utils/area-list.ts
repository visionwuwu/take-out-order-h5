import { areaList } from '@vant/area-data'

/**
 * 获取地区编码
 * @param province 省
 * @param city 市
 * @param county 区
 * @returns {string}
 */
export function getAreaCode(province: string, city: string, county: string): string {
  const { province_list, city_list, county_list } = areaList
  let provinceCode = '00'
  let cityCode = '00'
  let countyCode = '00'

  if (province) {
    const index = Object.values(province_list).findIndex(item => item === province)
    if (index > -1) {
      provinceCode = Object.values(province_list)[index].slice(0, 2)
    }
  }

  if (city) {
    const index = Object.values(city_list).findIndex(item => item === province)
    if (index > -1) {
      cityCode = Object.values(city_list)[index].slice(2, 4)
    }
  }

  if (county) {
    const index = Object.values(county_list).findIndex(item => item === province)
    if (index > -1) {
      countyCode = Object.values(county_list)[index].slice(4, 6)
    }
  }

  return provinceCode + cityCode + countyCode
}
