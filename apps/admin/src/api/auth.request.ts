import { request } from '@/utils/request'
import type { AuthInfo, CaptchaResponse, LoginDto, LoginResponse, MenuEntity } from '@/types'

export abstract class AuthRequest {
  /** 获取验证码 */
  static getCaptcha(): Promise<CaptchaResponse> {
    return request.get(`/captcha`)
  }

  /** 登录 */
  static login(data: LoginDto): Promise<LoginResponse> {
    return request.post(`/login`, data)
  }

  /** 获取用户信息 */
  static getInfo(): Promise<AuthInfo> {
    return request.get(`/getInfo`)
  }

  /** 获取当前用户可访问的路由菜单接口 */
  static getRoutes(): Promise<MenuEntity[]> {
    return request.get('/getRoutes')
  }

  /** 退出登录 */
  static logout(): Promise<string> {
    return request.post(`/logout`)
  }
}
