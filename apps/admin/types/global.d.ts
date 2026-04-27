/** 组件尺寸 */
type ComponentSize = 'small' | 'default' | 'large'

/** 分页查询参数 */
interface PaginationParams {
  /** 页码 */
  pageNo: number
  /** 每页数量 */
  pageSize: number
}

/** API 响应类型*/
type ApiResponse<T> = Promise<T>

/** 分页响应类型 */
type PaginationResponse<T> = Promise<{
  /** 总记录数 */
  total: number
  /** 数据列表 */
  records: T[]
}>

/** Entity基类 */
interface BaseEntity {
  /** 创建者 */
  createBy: string
  /** 创建时间 */
  createTime: string
  /** 更新者 */
  updateBy: string
  /** 更新时间 */
  updateTime: string
}
