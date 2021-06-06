/* eslint-disable */
// 自定义api响应状态码
export enum ApiStatusCode {
  /** 请求成功 */
  OK = 20000,
  /** 用户名错误 */
  USERNAME_ERROR = 60204,
  /** 密码错误 */
  PASSWORD_ERROR = 60203,
  /** 请求失败 */
  BAD_REQUEST = 40000,
  /** 暂无权限 */
  UNAUTHORIZED = 40001,
  /** 用户被禁用 */
  USER_DISABLED = 40002,
  /** 不是超级管理员 */
  NOT_ADMIN = 40003,
  /** 非法token */
  ILLEGAL_UNAUTHORIZED = 50008,
  /** 其他客户端登录 */
  OTHER_CLIENT_LOGIN = 50012,
  /** token失效了 */
  TOKEN_EXPIRED = 50014,
  /** 服务器内部错误 */
  INTERNAL_SERVER_ERROR = 50000,
  /** 用户名已存在 */
  USERNAME_UNIQUE = 50001,
  /** 自定义错误码 */
  ERROR_CODE = -1,
  /** 自定义成功码 */
  SUCCESS_CODE = 1
}
