import { reqModifyOrderStatus } from 'apis/order/order'
import { reqCreateComment } from 'src/apis/comment/comment'
import { CommentModel } from 'src/apis/comment/model/commentModel'
import { FullOrderStatus } from 'src/apis/order/model/orderModel'

export function useOrderItemEffect() {
  const modifyOrderStatusById = (id: number, status: FullOrderStatus) => {
    return reqModifyOrderStatus(id, status)
  }

  const createComment = (data: CommentModel) => {
    return reqCreateComment(data)
  }

  return {
    modifyOrderStatusById,
    createComment
  }
}
