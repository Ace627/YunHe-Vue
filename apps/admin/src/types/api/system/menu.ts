/** 菜单查询参数 */
export interface MenuQueryParams {
  /** 菜单名称 */
  menuName?: string
  /** 状态 */
  status?: string
}

/** 菜单信息 */
export interface MenuEntity extends BaseEntity {
  /** 菜单编号 */
  id: string
  /** 父菜单ID */
  parentId: string
  /** 菜单名称 */
  menuName: string
  /** 路由地址 */
  path: string
  /** 组件路径 */
  component: string
  /** 类型（M目录 C菜单 F按钮） */
  menuType: string
  /** 菜单图标 */
  icon: string
  /** 显示状态 */
  visible: string
  /** 权限字符串 */
  permission: string
  /** 状态*/
  status: string
  /** 显示顺序 */
  menuSort: number
  /** 是否缓存 */
  isCache: string
  /** 备注 */
  remark: string
}

export interface MenuTreeEntity extends MenuEntity {
  /** 子菜单列表 */
  children: MenuTreeEntity[]
}
