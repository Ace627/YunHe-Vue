import { request } from '@/utils/request'
import type { JobLogEntity, JobLogQueryParams } from '@/types'

export abstract class JobLogRequest {
  /** 分页查询定时任务日志 */
  static findList(params: JobLogQueryParams): PaginationResponse<JobLogEntity> {
    return request.get('/monitor/job/log/list', { params })
  }

  /** 删除任务日志 */
  static delete(params: { ids: string }): Promise<string> {
    return request.delete(`/monitor/job/log/delete`, { params })
  }

  /** 清空调度日志 */
  static clear(): Promise<string> {
    return request.delete(`/monitor/job/log/clear`)
  }

  /** 导出任务调度日志 */
  static export() {
    return request.post('/monitor/job/log/export', {}, { responseType: 'blob' })
  }
}
