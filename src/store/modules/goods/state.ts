export interface GoodsItem {
  id: number
  name: string
  image: string
  count: number
  price: number
  remarks: string
  kindId: number
}

export interface GoodsState {
  goodsList: GoodsItem[]
}

export const state: GoodsState = {
  goodsList: []
}
