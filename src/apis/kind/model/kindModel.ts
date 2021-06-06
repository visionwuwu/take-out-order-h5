/** 菜品种类列表项数据模型 */
export interface KindListItem {
  id: number
  name: string
  image: string
  createTime?: string
}

/** 菜品种类列表数据模型 */
export type KindList = KindListItem[]

/** 菜品列表项数据模型 */
export interface Food {
  id: number
  name: string
  image: string
  price: number
  remarks: string
  createTime: string
}

export interface KindFoods extends KindListItem {
  foods: Food[]
}

export type KindFoodsList = KindFoods[]
