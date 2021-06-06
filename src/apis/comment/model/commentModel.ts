import { UserInfo } from 'src/apis/user/model/userModel'

/** 菜品种类筛选数据模型 */
export interface LoadCommentListModel {
  content?: string
}

/** 菜品种类列表项数据模型 */
export interface CommentListItem {
  id?: number
  images?: string
  content?: string
  shopReplyContent?: string
  createTime?: string
  user: UserInfo
  order?: number
}

/** 菜品种类列表数据模型 */
export type CommentList = CommentListItem[]

/** 创建or更新菜品种类数据模型 */
export interface CommentModel extends Omit<CommentListItem, 'id' | 'createTime'> {}
