/** 轮播图列表项数据模型定义 */
export interface BannerListItem {
  id?: number
  image: string
  remarks?: string
  createTime?: string
}

/** 轮播图数据列表类型定义 */
export type BannerList = BannerListItem[]

/** 创建or更新轮播图数据模型 */
export interface BannerModel extends Omit<BannerListItem, 'id' | 'createTime'> {}
