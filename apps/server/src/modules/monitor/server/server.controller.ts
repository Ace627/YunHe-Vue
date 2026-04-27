import { ResponseCache } from '@/common'
import { Controller, Get } from '@nestjs/common'
import { ServerService } from './server.service'

@Controller('monitor/server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  /* 获取监控数据 */
  @Get()
  @ResponseCache({ ttl: 180 })
  public async getServer() {
    const methods = ['getCpuInfo', 'getMemoryInfo', 'getServerInfo', 'getDiskInfo']
    const promises = methods.map((method) => this.serverService[method]())
    const [cpu, memory, server, disks] = await Promise.all(promises)
    return { cpu, memory, server, disks }
  }
}
