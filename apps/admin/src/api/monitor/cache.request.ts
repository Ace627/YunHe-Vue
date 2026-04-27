import { request } from '@/utils/request'
import type { CacheInfo, CacheName } from '@/types'

export class CacheRequest {
  static getInfo(): Promise<CacheInfo> {
    return request.get(`/monitor/cache`)
  }

  static getNames(): Promise<CacheName[]> {
    return request.get(`/monitor/cache/names`)
  }

  /** 删除指定分类下的所有缓存 */
  static clearNames(params: { name: string }): Promise<string> {
    return request.delete(`/monitor/cache/names/delete`, { params })
  }

  /** 获取缓存键名列表 */
  static getKeys(params: { name: string }): Promise<string[]> {
    return request.get(`/monitor/cache/keys`, { params })
  }

  /** 获取对应 key 的缓存数据 */
  static getValue(params: { key: string }): Promise<string> {
    return request.get(`/monitor/cache/keys/detail`, { params })
  }

  /** 删除对应 key 的缓存数据 */
  static clearKeys(params: { key: string }): Promise<string> {
    return request.delete(`/monitor/cache/keys/delete`, { params })
  }
}
