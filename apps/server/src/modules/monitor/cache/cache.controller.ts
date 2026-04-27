import { CacheService } from './cache.service'
import { OperLog, BusinessType } from '@/common'
import { Controller, Delete, Get, Query } from '@nestjs/common'

@Controller('monitor/cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  /** 缓存监控 */
  @Get()
  public getInfo() {
    return this.cacheService.getInfo()
  }

  /** 获取所有缓存分类名称 */
  @Get('names')
  public getNames() {
    return this.cacheService.getNames()
  }

  /** 清除指定分类下的所有缓存 */
  @Delete('names/delete')
  @OperLog({ title: '缓存列表', businessType: BusinessType.CLEAR })
  public clearCacheName(@Query('name') name: string) {
    return this.cacheService.clearCacheName(name)
  }

  /** 缓存键名列表 */
  @Get('keys')
  public getKeys(@Query('name') name: string) {
    return this.cacheService.getKeys(name)
  }

  /** 获取对应 key 的缓存数据 */
  @Get('keys/detail')
  public getValue(@Query('key') key: string) {
    return this.cacheService.getValue(key)
  }

  /** 删除对应 key 的缓存数据 */
  @Delete('keys/delete')
  @OperLog({ title: '缓存列表', businessType: BusinessType.DELETE })
  public clearCacheKey(@Query('key') key: string) {
    return this.cacheService.clearCacheKey(key)
  }
}
