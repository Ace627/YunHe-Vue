import { request } from '@/utils/request'
import type { MenuEntity, MenuQueryParams, MenuTreeEntity } from '@/types'

export abstract class MenuRequest {
  /** 创建菜单 */
  static create(data: MenuEntity): Promise<string> {
    return request.post('/system/menu/create', data)
  }

  /** 更新菜单 */
  static update(data: MenuEntity): Promise<string> {
    return request.put('/system/menu/update', data)
  }

  /** 查询菜单列表 */
  static findList(params: MenuQueryParams): Promise<Array<MenuEntity>> {
    return request.get('/system/menu/list', { params })
  }

  /** 获取父级菜单列表 */
  static findParentList(): Promise<MenuTreeEntity[]> {
    return request.get(`/system/menu/list/parent`)
  }

  /** 根据角色 ID 组查询其所有的菜单路由 */
  static findListByRoleId(params: { roleId: string }): Promise<Array<MenuEntity>> {
    return request.get('/system/menu/list/role', { params })
  }

  /** 查询菜单详情 */
  static findOneById(params: { id: string }): Promise<MenuEntity> {
    return request.get('/system/menu/detail', { params })
  }

  /** 删除菜单 */
  static delete(params: { id: string }): Promise<string> {
    return request.delete('/system/menu/delete', { params })
  }
}
