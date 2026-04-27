import { RedisConstant } from '@/common'
import { Injectable } from '@nestjs/common'
import { RedisService } from '@/shared/redis.service'

@Injectable()
export class CacheService {
  constructor(private readonly redisService: RedisService) {}

  private readonly caches = [
    { prefix: RedisConstant.CAPTCHA_KEY, key: '', value: '', remark: '验证码' },
    { prefix: RedisConstant.ACCESS_TOKEN_KEY, key: '', value: '', remark: '用户信息' },
    { prefix: RedisConstant.DICTTYPE_KEY, key: '', value: '', remark: '数据字典' },
    { prefix: RedisConstant.THROTTLE_LIMIT, key: '', value: '', remark: '限流处理' },
    { prefix: RedisConstant.RESPONSE_CACHE, key: '', value: '', remark: '响应缓存' },
  ]

  /** 刷新缓存名称列表 */
  public async getNames() {
    return this.caches
  }

  /** 清除指定分类下的所有缓存 */
  public async clearCacheName(name: string) {
    if (!name) return '缓存分类名称不能为空'
    const keys = await this.redisService.keys(`${name}:*`)
    if (keys.length) await this.redisService.del(keys)
    return `成功清理了 ${keys.length} 条数据`
  }

  /** 获取缓存键名列表 */
  public async getKeys(name: string) {
    if (!name) return []
    return this.redisService.keys(`${name}:*`)
  }

  /** 删除对应 key 的缓存数据 */
  public async clearCacheKey(key: string): Promise<string> {
    if (!key) return '缓存键名不能为空'
    await this.redisService.del(key)
    return '删除成功'
  }

  /** 获取对应 key 的缓存数据 */
  public getValue(key: string) {
    if (!key) return '缓存键名不能为空'
    return this.redisService.get(key)
  }

  /** 缓存监控 */
  public async getInfo() {
    const dbsize = await this.redisService.dbsize()
    const info = await this.redisService.getInfo()
    const commandstats = await this.redisService.commandstats()
    return { dbsize, info, commandstats }
  }
}
