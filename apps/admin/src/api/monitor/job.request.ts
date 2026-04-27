import { request } from '@/utils/request'
import type { ChangeJobStatus, JobEntity, JobQueryParams, RunJobDto } from '@/types'

export abstract class JobRequest {
  /** 新增定时任务调度 */
  static create(data: JobEntity): Promise<string> {
    return request.post('/monitor/job/create', data)
  }

  /** 修改定时任务调度 */
  static update(data: JobEntity): Promise<string> {
    return request.put('/monitor/job/update', data)
  }

  /** 删除定时任务调度 */
  static delete(params: { ids: string }): Promise<string> {
    return request.delete('/monitor/job/delete', { params })
  }

  /** 任务状态修改 */
  static changeStatus(data: ChangeJobStatus): Promise<string> {
    return request.put('/monitor/job/changeStatus', data)
  }

  /** 查询定时任务调度列表 */
  static findList(params: JobQueryParams): Promise<PaginationResponse<JobEntity>> {
    return request.get('/monitor/job/list', { params })
  }

  /** 查询定时任务调度详情 */
  static findOneById(params: { id: string }): Promise<JobEntity> {
    return request.get('/monitor/job/detail', { params })
  }

  /** 运行定时任务 */
  static run(data: RunJobDto): Promise<string> {
    return request.put('/monitor/job/run', data)
  }
}
