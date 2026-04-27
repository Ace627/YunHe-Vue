/** 验证码响应数据 */
export interface CaptchaResponse {
  /** 验证码唯一标识 */
  uuid: string
  /** 验证码图片 */
  captcha: string
}

/** 登录请求参数 */
export interface LoginDto {
  /** 登录账号 */
  username: string
  /** 登录密码 */
  password: string
  /** 验证码 */
  captcha: string
  /** 验证码唯一标识 */
  uuid: string
}

/** 登录响应数据 */
export interface LoginResponse {
  /** 访问令牌 */
  accessToken: string
  /** 过期时间 */
  expiresIn: number
}

/** 用户信息 */
export interface AuthInfo {
  /** 用户 */
  user: any
  /** 角色编码列表 */
  roles: string[]
  /** 权限编码列表 */
  permissions: string[]
}
