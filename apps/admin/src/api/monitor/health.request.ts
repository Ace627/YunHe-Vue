import { request } from '@/utils/request'
import type { HealthCheckData } from '@/types'

export abstract class HealthRequest {
  /** 检查所有健康状态 */
  static checkAll(): Promise<HealthCheckData> {
    return request.get('/monitor/health')
  }

  /** 检查网络健康状态 */
  static checkNetwork(): Promise<HealthCheckData> {
    return request.get('/monitor/health/network')
  }

  /** 检查数据库健康状态 */
  static checkDatabase(): Promise<HealthCheckData> {
    return request.get('/monitor/health/database')
  }

  /** 检查内存堆健康状态 */
  static checkMemory(): Promise<HealthCheckData> {
    return request.get('/monitor/health/memory')
  }

  /** 检查内存 RSS 健康状态 */
  static checkRss(): Promise<HealthCheckData> {
    return request.get('/monitor/health/rss')
  }

  /** 检查磁盘健康状态 */
  static checkStorage(): Promise<HealthCheckData> {
    return request.get('/monitor/health/storage')
  }
}
