import { PageModel } from 'src/common/model/pageModel'
import request, { AxiosResultData } from 'utils/request'
import {
  CommentList,
  CommentListItem,
  CommentModel,
  LoadCommentListModel
} from './model/commentModel'

/** api接口请求地址 */
export enum ApiUrls {
  loadCommentList = '/comments/list',
  loadCommentById = '/comments',
  insertComment = '/comments/add',
  updateCommentById = '/comments',
  shopReplyContentById = '/comments/reply',
  deleteCommentById = '/comments'
}

/**
 * 加载评论列表
 * @param filterQuery
 * @param page
 */
export function reqCommentList<T = AxiosResultData<CommentList>>(page: PageModel) {
  const params = { pageSize: page.limit, pageNumber: page.page }
  return request<T>({
    method: 'get',
    url: ApiUrls.loadCommentList,
    params
  })
}

/**
 * 根据id获取评论信息
 * @param id
 */
export function reqCommentById<T = AxiosResultData<CommentListItem>>(id: number) {
  return request<T>({
    method: 'get',
    url: `${ApiUrls.loadCommentById}/${id}`
  })
}

/**
 * 创建评论
 * @param data
 * @returns
 */
export function reqCreateComment<T = AxiosResultData>(data: CommentModel) {
  return request<T>({
    method: 'post',
    url: ApiUrls.insertComment,
    data
  })
}

/**
 * 根据id更新评论
 * @param id
 * @param data
 * @returns
 */
export function reqUpdateComment<T = AxiosResultData>(id: number, data: CommentModel) {
  return request<T>({
    method: 'put',
    url: `${ApiUrls.updateCommentById}/${id}`,
    data
  })
}

/**
 * 商家回复
 * @param id
 * @param shopReplyContent
 * @returns
 */
export function reqShopReply<T = AxiosResultData>(id: number, shopReplyContent: string) {
  return request<T>({
    method: 'put',
    url: `${ApiUrls.shopReplyContentById}/${id}`,
    data: {
      shopReplyContent
    }
  })
}

/**
 * 根据id删除菜品种类
 * @param id
 */
export function reqDeleteCommentById<T = AxiosResultData>(id: number) {
  return request<T>({
    method: 'delete',
    url: `${ApiUrls.deleteCommentById}/${id}`
  })
}
