import mitt, { Emitter } from 'mitt'

export type UpdateActionType = 'increment' | 'decrement' | 'empty'

export interface UpdateGoodsCount {
  type: UpdateActionType
  value: any
}

export const emitter: Emitter = mitt()
