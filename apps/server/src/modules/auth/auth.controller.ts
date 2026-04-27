import { LoginDto } from './auth.dto'
import { AuthService } from './auth.service'
import { CommonConstant, CurrentUser, Public } from '@/common'
import { Body, Controller, Get, Post, Req, Headers } from '@nestjs/common'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** 获取图片验证码 */
  @Public()
  @Get('captcha')
  public getCaptcha() {
    return this.authService.getCaptcha()
  }

  /** 用户登录 */
  @Public()
  @Post('login')
  public login(@Body() loginDto: LoginDto, @Req() request: ExpressRequest) {
    return this.authService.login(loginDto, request)
  }

  /* 获取登录用户信息 */
  @Get('getInfo')
  public getInfo(@CurrentUser('userId') userId: string) {
    return this.authService.getInfo(userId)
  }

  /** 获取登录账号的路由表信息 */
  @Get('getRoutes')
  public getRoutes(@CurrentUser('userId') userId: string) {
    return this.authService.getRoutes(userId)
  }

  /* 退出登录 */
  @Public()
  @Post('logout')
  public logout(@Headers(CommonConstant.AUTHORIZATION) authorization: string) {
    if (!authorization) return '退出成功'
    const token = authorization.split(' ')[1]
    return this.authService.logout(token)
  }
}
