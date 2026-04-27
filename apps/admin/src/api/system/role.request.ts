import { request } from '@/utils/request'
import type { RoleEntity, RoleQueryParams, AuthPermission } from '@/types'

export abstract class RoleRequest {
  /** 创建角色 */
  static create(data: RoleEntity): Promise<string> {
    return request.post('/system/role/create', data)
  }

  /** 更新角色 */
  static update(data: RoleEntity): Promise<string> {
    return request.put('/system/role/update', data)
  }

  /** 查询角色分页列表 */
  static findList(params: RoleQueryParams): PaginationResponse<RoleEntity> {
    return request.get('/system/role/list', { params })
  }

  /** 查询角色不分页列表 */
  static findAll(): Promise<Array<RoleEntity>> {
    return request.get('/system/role/list/all')
  }

  /** 查询角色详情 */
  static findOneById(params: { id: string }): Promise<RoleEntity> {
    return request.get('/system/role/detail', { params })
  }

  /** 删除角色 */
  static delete(params: { ids: string }): Promise<string> {
    return request.delete('/system/role/delete', { params })
  }

  /** 修改角色状态 */
  static changeStatus(data: { id: string; status: string }): Promise<string> {
    return request.put('/system/role/changeStatus', data)
  }

  /** 授权角色菜单权限 */
  static authPermission(authDto: AuthPermission): Promise<string> {
    return request.post(`/system/role/authPermission`, authDto)
  }
}
