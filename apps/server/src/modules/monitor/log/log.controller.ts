import { LogService } from './log.service'
import { QueryLoginLogDto, QueryOperLogDto } from './log.dto'
import { BusinessType, PaginationPipe, OperLog, SkipTransform, RequirePermissions } from '@/common'
import { Controller, Delete, Get, ParseArrayPipe, Post, Query } from '@nestjs/common'

@Controller('monitor/log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  /* -------------------------------------------------------------------------- */
  /*                                  Login Log                                 */
  /* -------------------------------------------------------------------------- */

  /** 查询登录日志列表 */
  @Get('logininfor/list')
  @RequirePermissions(['monitor:logininfor:query'])
  public findLogininfoList(@Query(PaginationPipe) queryParams: QueryLoginLogDto) {
    return this.logService.findLogininfoList(queryParams)
  }

  /** 导出登录日志 */
  @SkipTransform()
  @Post('logininfor/export')
  @RequirePermissions(['monitor:logininfor:export'])
  @OperLog({ title: '登录日志', businessType: BusinessType.EXPORT })
  public exportLogininfo() {
    return this.logService.exportLogininfo()
  }

  /** 删除登录日志 */
  @Delete('logininfor/delete')
  @RequirePermissions(['monitor:logininfor:delete'])
  @OperLog({ title: '登录日志', businessType: BusinessType.DELETE })
  public deleteLogininfo(@Query('ids', new ParseArrayPipe()) ids: string[]) {
    return this.logService.deleteLogininfo(ids)
  }

  /** 清空登录日志 */
  @Delete('logininfor/clear')
  @RequirePermissions(['monitor:logininfor:clear'])
  @OperLog({ title: '登录日志', businessType: BusinessType.CLEAR })
  public clearLogininfo() {
    return this.logService.clearLogininfo()
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Oper Log                                  */
  /* -------------------------------------------------------------------------- */

  /** 查询操作日志列表 */
  @Get('operlog/list')
  @RequirePermissions(['monitor:operlog:query'])
  public findOperLogList(@Query(PaginationPipe) queryParams: QueryOperLogDto) {
    return this.logService.findOperLogList(queryParams)
  }

  /** 导出操作日志 */
  @SkipTransform()
  @Post('operlog/export')
  @RequirePermissions(['monitor:operlog:export'])
  @OperLog({ title: '操作日志', businessType: BusinessType.EXPORT })
  public exportOperLog() {
    return this.logService.exportOperLog()
  }

  /** 删除操作日志 */
  @Delete('operlog/delete')
  @RequirePermissions(['monitor:operlog:delete'])
  @OperLog({ title: '操作日志', businessType: BusinessType.DELETE })
  public deleteOperinfo(@Query('ids', new ParseArrayPipe()) ids: string[]) {
    return this.logService.deleteOperinfo(ids)
  }

  /** 清空操作日志 */
  @Delete('operlog/clear')
  @RequirePermissions(['monitor:operlog:clear'])
  @OperLog({ title: '操作日志', businessType: BusinessType.CLEAR })
  public clearOperinfo() {
    return this.logService.clearOperinfo()
  }
}
