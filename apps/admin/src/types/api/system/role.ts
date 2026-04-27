import type { MenuEntity } from './menu'

/** 角色分页查询参数 */
export interface RoleQueryParams extends PaginationParams {
  /** 角色编码 */
  roleCode?: string
  /** 角色名称 */
  roleName?: string
  /** 状态 */
  status?: string
}

/** 角色信息 */
export interface RoleEntity extends BaseEntity {
  /** 角色ID */
  id: string
  /** 角色编码 */
  roleCode: string
  /** 角色名称 */
  roleName: string
  /** 角色排序 */
  roleSort: number
  /** 状态 */
  status: string
  /** 备注 */
  remark: string
  /** 菜单列表 */
  menus: MenuEntity[]
}

export interface AuthPermission {
  /** 角色ID */
  roleId: string
  /** 菜单ID列表 */
  menuIds: string[]
}
