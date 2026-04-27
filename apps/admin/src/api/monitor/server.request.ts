import { request } from '@/utils/request'
import type { ServerEntity } from '@/types'

export class ServerRequest {
  static getServer(): Promise<ServerEntity> {
    return request.get('/monitor/server')
  }
}
