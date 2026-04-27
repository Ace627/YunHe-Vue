import type { RoleEntity } from './role'

/** 用户分页查询参数 */
export interface UserQueryParams extends PaginationParams {
  /** 用户名称 */
  username?: string
  /** 手机号码 */
  phone?: string
  /** 状态（0正常 1停用） */
  status?: string
}

/** 用户信息 */
export interface UserEntity extends BaseEntity {
  /** 用户ID */
  id: string
  /** 部门ID */
  // deptId?: number
  /** 用户账号 */
  username: string
  /** 用户昵称 */
  nickname: string
  /** 用户邮箱 */
  email: string
  /** 手机号码 */
  phone: string
  /** 用户性别 */
  gender: string
  /** 用户头像 */
  avatar: string
  /** 密码 */
  password: string
  /** 账号状态 */
  status: string
  /** 备注信息 */
  remark: string
  /** 角色组 */
  roleIds: string[]
  /** 角色对象 */
  roles: RoleEntity[]

  /** 岗位组 */
  // postIds?: number[];
}

/** 重置密码参数 */
export interface ResetPasswordParams {
  /** 用户账号 */
  username: string
  /** 新密码 */
  password: string
}

/** 修改密码参数 */
export interface UpdatePasswordParams {
  /** 旧密码 */
  oldPassword: string
  /** 新密码 */
  newPassword: string
  /** 确认新密码 */
  repeatPassword: string
}

export interface UserProfile extends Pick<UserEntity, 'nickname' | 'gender' | 'phone' | 'email' | 'createTime'> {
  roleGroup: string[]
}

export interface AssignRoleParams {
  /** 用户ID */
  userId: string
  /** 角色ID列表 */
  roleIds: string[]
}
