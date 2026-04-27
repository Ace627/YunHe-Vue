export const CommonConstant = {
  /**
   * JWT 令牌前缀
   * 配合Authorization请求头使用，标识令牌类型，格式为「Bearer + 令牌字符串」
   */
  TOKEN_PREFIX: 'Bearer',

  /**
   * HTTP 授权请求头字段名
   * 前端传递JWT令牌的请求头关键字，用于接口鉴权时提取令牌信息
   */
  AUTHORIZATION: 'Authorization',

  /**
   * 全局通用状态：正常/启用
   * 所有业务表的 status 字段通用，值为 '1'
   */
  STATUS_NORMAL: '1',

  /**
   * 全局通用状态：禁用/停用
   * 所有业务表的 status 字段通用，值为 '0'
   */
  STATUS_DISABLE: '0',
} as const
