import { JobService } from './job.service'
import { BusinessType, OperLog, PaginationPipe, RequirePermissions } from '@/common'
import { Body, Controller, Delete, Get, ParseArrayPipe, Post, Put, Query } from '@nestjs/common'
import { ChangeJobStatusDto, CreateJobDto, QueryJobDto, QueryJobLogDto, RunJobDto, UpdateJobDto } from './job.dto'

@Controller('monitor/job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // @Public()
  // @Get()
  // test() {
  //   const data = new CreateJobDto()
  //   data.jobName = 'test'
  //   data.jobGroup = 'test'
  //   data.invokeTarget = 'UserService.test("dfd")'
  //   data.cronExpression = CronExpression.EVERY_SECOND
  //   data.misfirePolicy = '1'
  //   data.status = '1'
  //   return this.jobService.createJob(data)
  //   // return this.jobService.analysisinvokeTarget({ invokeTarget: 'UserService.test("dfd")' })
  // }

  /** 新增任务 */
  @Post('create')
  @RequirePermissions(['monitor:job:create'])
  @OperLog({ title: '定时任务', businessType: BusinessType.INSERT })
  createJob(@Body() createDto: CreateJobDto) {
    return this.jobService.createJob(createDto)
  }

  /** 编辑任务 */
  @Put('update')
  @RequirePermissions(['monitor:job:update'])
  @OperLog({ title: '定时任务', businessType: BusinessType.UPDATE })
  updateJob(@Body() updateDto: UpdateJobDto) {
    return this.jobService.updateJob(updateDto)
  }

  /** 查询任务分页列表 */
  @Get('list')
  @RequirePermissions(['monitor:job:query'])
  findList(@Query(new PaginationPipe()) queryParams: QueryJobDto) {
    return this.jobService.findJobList(queryParams)
  }

  /** 根据任务 ID 查询任务 */
  @Get('detail')
  @RequirePermissions(['monitor:job:query'])
  findJobById(@Query('id') jobId: string) {
    return this.jobService.findJobById(jobId)
  }

  /** 修改任务状态 */
  @Put('changeStatus')
  @RequirePermissions(['monitor:job:update'])
  @OperLog({ title: '定时任务', businessType: BusinessType.UPDATE })
  changeJobStatus(@Body() changeDto: ChangeJobStatusDto) {
    return this.jobService.changeJobStatus(changeDto)
  }

  /** 执行一次 */
  @Put('run')
  @RequirePermissions(['monitor:job:update'])
  @OperLog({ title: '定时任务', businessType: BusinessType.UPDATE })
  runJob(@Body() runDto: RunJobDto) {
    return this.jobService.runJob(runDto)
  }

  /** 删除任务 */
  @Delete('delete')
  @RequirePermissions(['monitor:job:delete'])
  @OperLog({ title: '定时任务', businessType: BusinessType.DELETE })
  deleteJob(@Query('ids', new ParseArrayPipe()) ids: string[]) {
    return this.jobService.deleteJob(ids)
  }

  /* -------------------------------------------------------------------------- */
  /*                              Schedule Job Log                              */
  /* -------------------------------------------------------------------------- */

  /** 查询任务调度日志分页列表 */
  @Get('log/list')
  @RequirePermissions(['monitor:job:query'])
  findJobLogList(@Query(new PaginationPipe()) queryParams: QueryJobLogDto) {
    return this.jobService.findJobLogList(queryParams)
  }

  /** 删除任务日志 */
  @Delete('log/delete')
  @RequirePermissions(['monitor:job:delete'])
  @OperLog({ title: '定时任务日志', businessType: BusinessType.DELETE })
  deleteJobLog(@Query('ids', new ParseArrayPipe()) ids: string[]) {
    return this.jobService.deleteJobLog(ids)
  }

  /** 清空调度日志 */
  @Delete('log/clear')
  @RequirePermissions(['monitor:job:clear'])
  @OperLog({ title: '定时任务日志', businessType: BusinessType.CLEAR })
  clearJobLog() {
    return this.jobService.clearJobLog()
  }
}
