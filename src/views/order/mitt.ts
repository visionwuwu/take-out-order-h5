import mitt from 'mitt'
// 实例化 mitt
export const emitter = mitt()

export type EmitType = 'delete' | 'cancelled' | 'delivered' | 'add'

export interface EmitData {
  type: EmitType
  value: any
}
