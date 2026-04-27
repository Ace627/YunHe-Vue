/** 字典分页查询参数 */
export interface DictTypeQueryParams extends PaginationParams {
  /** 字典名称 */
  dictName?: string
  /** 字典类型 */
  dictType?: string
  /** 状态 */
  status?: string
}

/** 字典数据查询参数 */
export interface DictDataQueryParams extends PaginationParams {
  /** 字典名称 */
  dictName?: string
  /** 字典标签 */
  dictLabel?: string
  /** 字典类型 */
  dictType?: string
  /** 状态 */
  status?: string
}

/** 字典类型信息 */
export interface DictTypeEntity extends BaseEntity {
  /** 字典编号 */
  id: string
  /** 字典名称 */
  dictName: string
  /** 字典类型 */
  dictType: string
  /** 状态（0正常 1停用） */
  status: string
  /** 备注 */
  remark: string
}

/** 字典数据信息 */
export interface DictDataEntity extends BaseEntity {
  /** 字典编码 */
  id: string
  /** 字典标签 */
  dictLabel: string
  /** 字典键值 */
  dictValue: string
  /** 字典类型 */
  dictType: string
  /** 字典排序 */
  dictSort: number
  /** 回显样式 */
  listClass: 'primary' | 'success' | 'info' | 'warning' | 'danger' | undefined
  /** 状态（0正常 1停用） */
  status: string
  /** 备注 */
  remark: string
}

export interface DictSelectItem extends DictDataEntity {
  /** 字典标签 */
  label: string
  /** 字典键值 */
  value: string
}
