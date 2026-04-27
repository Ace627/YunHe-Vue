import { request } from '@/utils/request'
import type { UserEntity, UserQueryParams, ResetPasswordParams, UpdatePasswordParams, UserProfile, AssignRoleParams } from '@/types'

export abstract class UserRequest {
  /** 创建用户 */
  static create(data: UserEntity): Promise<string> {
    return request.post('/system/user/create', data)
  }

  /** 更新用户信息 */
  static update(data: UserEntity): Promise<string> {
    return request.put('/system/user/update', data)
  }

  /** 查询用户的分页列表 */
  static findList(params: UserQueryParams): PaginationResponse<UserEntity> {
    return request.get('/system/user/list', { params })
  }

  /** 根据用户 ID 查找用户信息 */
  static findOneById(params: { id: string }): Promise<UserEntity> {
    return request.get('/system/user/detail', { params })
  }

  /** 删除单个或者多个用户 */
  static delete(params: { ids: string }): Promise<string> {
    return request.delete('/system/user/delete', { params })
  }

  /** 重置密码 */
  static resetPassword(data: ResetPasswordParams): Promise<string> {
    return request.put(`/system/user/resetPassword`, data)
  }

  /** 修改密码 */
  static updatePassword(data: UpdatePasswordParams): Promise<string> {
    return request.put(`/system/user/updatePassword`, data)
  }

  /** 查询用户个人信息 */
  static getProfile(): Promise<UserProfile> {
    return request.get(`/system/user/profile`)
  }

  /** 修改用户个人信息 */
  static updateProfile(data: UserProfile): Promise<string> {
    return request.put(`/system/user/profile/update`, data)
  }

  /** 分配角色给用户 */
  static assignRoles(data: AssignRoleParams): Promise<string> {
    return request.put(`/system/user/assignRoles`, data)
  }
}
