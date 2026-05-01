import { LoginDto } from './auth.dto'
import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { formatTime, verifyPassword } from '@/utils'
import { RedisService } from '@/shared/redis.service'
import { CaptchaService } from '@/shared/captcha.service'
import { UserService } from '../system/user/user.service'
import { LogService } from '../monitor/log/log.service'
import { MenuService } from '../system/menu/menu.service'
import { BusinessException, CommonConstant, ConfigConstant, RedisConstant } from '@/common'

@Injectable()
export class AuthService {
  constructor(
    private readonly logService: LogService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly menuService: MenuService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly captchaService: CaptchaService,
  ) {}

  /** 获取验证码 */
  public async getCaptcha() {
    return this.captchaService.create()
  }

  /** 用户登录 */
  public async login(loginDto: LoginDto, request: ExpressRequest) {
    try {
      const { username, password, uuid, captcha } = loginDto
      // 1. 校验验证码是否正确
      await this.captchaService.validate(uuid, captcha)
      // 2. 查询用户
      const user = await this.userService.getRepository().findOneBy({ username, status: CommonConstant.STATUS_NORMAL })
      if (!user) throw new BusinessException(`该账号不存在或已停用`)
      const { id: userId, password: hashPassword } = user
      // 3. 校验密码是否正确
      if (!(await verifyPassword(password, hashPassword))) throw new BusinessException('账号或密码错误')
      // 4. 生成 Token
      const { accessTokenKey, accessToken } = await this.generateAccessToken(user)
      // 5. 更新登录时间
      this.userService.getRepository().update(userId, { loginTime: formatTime() })
      this.logService.createLoginLog(request, '登录成功', accessTokenKey)
      // 6. 记录日志
      return { accessToken, expiresIn: this.expiresIn }
    } catch (error) {
      this.logService.createLoginLog(request, error.message || '登录失败')
      return Promise.reject(error)
    }
  }

  /** 获取登录用户信息 */
  public async getInfo(userId: string) {
    // 1. 查询用户信息
    const user = await this.userService.findOneById(userId)
    // 3. 提取角色编码和角色 ID
    const roleCodeList: string[] = []
    const roleIds: string[] = []
    for (const role of user.roles) {
      roleIds.push(role.id)
      roleCodeList.push(role.roleCode)
    }
    // 4. 判断是否为管理员
    const isAdmin = roleCodeList.includes(CommonConstant.ADMIN_ROLE_CODE)
    // 5. 获取权限列表
    const permissions = await this.menuService.findPermissionsByRoleIds(roleIds, isAdmin) // 根据角色 id 组获取其所有的按钮权限
    // 7. 缓存角色和权限信息到 Redis（过期时间 30 分钟）
    await Promise.all([
      this.redisService.set(`${RedisConstant.ADMIN_USER_ROLES}:${userId}`, JSON.stringify(roleCodeList), 'EX', this.expiresIn),
      this.redisService.set(`${RedisConstant.ADMIN_USER_PERMISSIONS}:${userId}`, JSON.stringify(permissions), 'EX', this.expiresIn),
    ])
    // 8. 返回结果
    return { user, roles: roleCodeList, permissions }
  }

  /** 获取登录账号的路由表信息 */
  public async getRoutes(userId: string) {
    const data = await this.userService.findOneById(userId)
    const roleIds = data.roles.map((role) => role.id)
    const isAdmin = roleIds.includes(CommonConstant.ADMIN_ROLE_ID)
    return this.menuService.findRoutesByRoleIds(roleIds, isAdmin)
  }

  /** 退出登录 */
  public async logout(token: string) {
    try {
      const payload: AuthType.JwtPayload = this.jwtService.verify(token)
      const keys = await this.redisService.keys(`*${payload.userId}*`)
      if (!keys.length) await this.redisService.del(keys)
    } catch (error) {}
    return `退出登录成功`
  }

  /* -------------------------------------------------------------------------- */
  /*                              Private Property                              */
  /* -------------------------------------------------------------------------- */

  /** 获取 AccessToken 的过期时间 */
  private get expiresIn() {
    return this.configService.get<number>(ConfigConstant.JWT_EXPIRES_IN, 1800)
  }

  /* -------------------------------------------------------------------------- */
  /*                               Private Handler                              */
  /* -------------------------------------------------------------------------- */

  /** 生成 AccessToken 并存入 Redis */
  private async generateAccessToken(user: any) {
    const { id: userId, username } = user
    const accessTokenKey = `${RedisConstant.ACCESS_TOKEN_KEY}:${userId}`
    const accessToken = this.jwtService.sign({ userId, username })
    await this.redisService.set(accessTokenKey, accessToken, 'EX', this.expiresIn)
    return { accessToken, accessTokenKey }
  }
}
