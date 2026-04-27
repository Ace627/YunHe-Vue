import { RedisConstant } from '@/common'
import { Injectable } from '@nestjs/common'
import { RedisService } from '@/shared/redis.service'
import { QueryOnlineDto, ForceLogoutDto } from './online.dto'

@Injectable()
export class OnlineService {
  constructor(private readonly redisService: RedisService) {}

  /**分页列表查询 */
  public async findList(queryParams: QueryOnlineDto) {
    const { take = 10, skip = 0, username = '', location = '', ip = '' } = queryParams
    // 获取所有匹配的 token 键
    const tokenKeyList = await this.redisService.keys(`${RedisConstant.ACCESS_TOKEN_KEY}:*`)
    const userIds = tokenKeyList.map((item) => item.replace(`${RedisConstant.ACCESS_TOKEN_KEY}:`, ''))
    // 计算总记录数（在过滤前）
    const total = userIds.length
    // 计算需要获取的页数
    const totalPages = Math.ceil(total / take)
    const currentPage = Math.floor(skip / take) + 1
    // 如果请求的页数超出范围，直接返回空结果
    if (currentPage > totalPages) return { total, records: [] }
    // 批量获取用户在线数据（按分页偏移量）
    const paginatedUserIds = userIds.slice(skip, skip + take)
    // 并行获取当前页的数据（性能优化）
    const recordPromises = paginatedUserIds.map((userId) => this.redisService.get(`${RedisConstant.ADMIN_USER_ONLINE_KEY}:${userId}`))
    let temps = await Promise.all(recordPromises)
    let records: Record<string, any>[] = temps.map((item) => JSON.parse(item!))
    if (username) records = records.filter((item) => item.username.includes(username))
    if (location) records = records.filter((item) => item.location.includes(location))
    if (ip) records = records.filter((item) => item.ip.includes(ip))
    return { total, records }
  }

  /** 查询在线用户数量 */
  public async findCount() {
    const tokenKeyList = await this.redisService.keys(`${RedisConstant.ACCESS_TOKEN_KEY}:*`)
    return tokenKeyList.length
  }

  /** 强制用户退出登录，清除与该用户相关的所有 Redis 缓存 */
  public async forceLogout(data: ForceLogoutDto) {
    const keys = await this.redisService.keys(`*${data.userId}*`)
    if (keys.length) await this.redisService.del(keys)
    return '强退成功'
  }
}
