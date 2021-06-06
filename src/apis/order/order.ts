import { PageModel } from 'common/model/pageModel'
import request, { AxiosResultData } from 'utils/request'
import {
  OrderModel,
  LoadOrderListModel,
  OrderList,
  FullOrderStatus,
  OrderDetail
} from './model/orderModel'

/** api url */
enum ApiUrls {
  loadOrderList = '/orders/list',
  loadOrderById = '/orders',
  insertOrder = '/orders/add',
  deleteOrderById = '/orders',
  modifyOrderStatus = '/orders'
}

/**
 * 请求订单列表数据
 * @param {*} params
 */
export function reqOrderList<T = AxiosResultData<OrderList>>(
  filterQuery: LoadOrderListModel,
  page: PageModel
) {
  const params = { ...filterQuery, pageSize: page.limit, pageNumber: page.page }
  return request<T>({
    url: ApiUrls.loadOrderList,
    method: 'get',
    params
  })
}

/**
 * 根据id获取订单
 * @param {*} id
 */
export function reqOrderById<T = AxiosResultData<OrderDetail>>(id: number) {
  return request<T>({
    method: 'get',
    url: `${ApiUrls.loadOrderById}/${id}`
  })
}

/**
 * 创建订单
 */
export function reqCreateOrder<T = AxiosResultData>(data: OrderModel) {
  return request<T>({
    url: ApiUrls.insertOrder,
    method: 'post',
    data
  })
}

/**
 * 根据id修改订单状态
 * @param {*} id
 * @param {*} status
 */
export function reqModifyOrderStatus(id: number, status: FullOrderStatus) {
  return request({
    url: `${ApiUrls.modifyOrderStatus}/${id}`,
    method: 'put',
    data: { status }
  })
}

/**
 * 根据id删除订单
 * @param {*} params
 */
export function reqDelOrderById(id: number) {
  return request({
    method: 'delete',
    url: `${ApiUrls.deleteOrderById}/${id}`
  })
}
