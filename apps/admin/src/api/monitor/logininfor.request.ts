import { request } from '@/utils/request'
import type { LogininfoEntity, LogininforQueryParams } from '@/types'

export abstract class LogininforRequest {
  /** 查询登录日志列表 */
  static findList(params: LogininforQueryParams): PaginationResponse<LogininfoEntity> {
    return request.get(`/monitor/log/logininfor/list`, { params })
  }

  /** 清空登录日志 */
  static clear(): Promise<string> {
    return request.delete(`/monitor/log/logininfor/clear`)
  }

  /** 删除登录日志 */
  static delete(params: { ids: string }): Promise<string> {
    return request.delete('/monitor/log/logininfor/delete', { params })
  }

  /** 导出登录日志 */
  static export() {
    return request.post('/monitor/log/logininfor/export', {}, { responseType: 'blob' })
  }
}
