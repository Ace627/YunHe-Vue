import { request } from '@/utils/request'
import type { OnlineEntity, OnlineQueryParams } from '@/types'

export abstract class OnlineRequest {
  /** 查询在线用户列表 */
  static findList(params: OnlineQueryParams): PaginationResponse<OnlineEntity> {
    return request.get(`/monitor/online/list`, { params })
  }

  /** 强退用户 */
  static forceLogout(params: { userId: string }): Promise<string> {
    return request.delete(`/monitor/online/forceLogout`, { params })
  }
}
