import { request } from '@/utils/request'
import type { OperlogQueryParams, OperLogEntity } from '@/types'

export class OperateinfoRequest {
  /** 查询操作日志列表 */
  static findList(params: OperlogQueryParams): PaginationResponse<OperLogEntity> {
    return request.get(`/monitor/log/operlog/list`, { params })
  }

  /** 清空操作日志 */
  static clear(): Promise<string> {
    return request.delete(`/monitor/log/operlog/clear`)
  }

  /** 删除操作日志 */
  static delete(params: { ids: string }): Promise<string> {
    return request.delete('/monitor/log/operlog/delete', { params })
  }

  /** 导出操作日志 */
  static export() {
    return request.post('/monitor/log/operlog/export', {}, { responseType: 'blob' })
  }
}
