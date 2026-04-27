import { Reflector } from '@nestjs/core'
import { RedisService } from '@/shared/redis.service'
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common'
import { BusinessException, CommonConstant, DecoratorConstant, RedisConstant } from '@/common'

@Injectable()
export class PermissionAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // 获取权限元数据（方法优先于类）
      const targets = [context.getHandler(), context.getClass()]
      const permissions = this.reflector.getAllAndOverride<string[]>(DecoratorConstant.PERMISSIONS, targets)

      // 无需权限 → 直接放行
      if (!permissions) return true
      const request = context.switchToHttp().getRequest<ExpressRequest>()

      // 获取请求用户信息
      const user: AuthType.JwtPayload = request[CommonConstant.JWT_PAYLOAD]
      if (!user || !user.userId) throw new Error('用户未登录或登录已过期')

      // 从 Redis 获取用户权限缓存
      const cachePermissions = await this.getCachePermissions(user.userId)

      // 权限校验（只要拥有其中一个权限即可通过）
      const hasPermission = permissions.some((perm) => cachePermissions.includes(perm))
      if (!hasPermission) throw new Error('暂无权限访问，请联系管理员')

      return true
    } catch (error: any) {
      throw new BusinessException(error.message, HttpStatus.FORBIDDEN)
    }
  }

  /** 从 Redis 获取用户权限缓存 */
  private async getCachePermissions(userId: string): Promise<string[]> {
    try {
      if (!userId) return []
      const jsonStr = await this.redisService.get(`${RedisConstant.ADMIN_USER_PERMISSIONS}:${userId}`)
      return jsonStr ? JSON.parse(jsonStr) : []
    } catch (error: any) {
      return []
    }
  }
}
