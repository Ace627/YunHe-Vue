import { Job } from 'bullmq'
import { formatTime } from '@/utils'
import { Logger } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { JobService } from './job.service'
import { Processor, OnWorkerEvent, WorkerHost } from '@nestjs/bullmq'
import { BullConstant, BusinessException, CommonConstant, JobEntity, JobLogEntity } from '@/common'

@Processor(BullConstant.QUEUE_NAME) // 对应你的队列名
export class JobProcessor extends WorkerHost {
  private readonly logger = new Logger(JobProcessor.name)

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly jobService: JobService,
  ) {
    super()
  }

  public async process(job: Job<JobEntity>) {
    try {
      const task = job.data
      this.logger.log(`执行定时任务：${task.invokeTarget}`)
      const { serviceName, funName, argumentsArray } = await this.jobService.analysisinvokeTarget(task)
      const serviceClass = this.jobService.serviceMap.get(serviceName)
      if (!serviceClass) throw new Error('服务不存在')
      const service = this.moduleRef.get(serviceClass, { strict: false })
      const func = service[funName]
      if (task.concurrent === CommonConstant.STATUS_NORMAL) {
        func(...argumentsArray).catch((error: any) => {
          this.logger.error(`执行定时任务 ${job.data.invokeTarget} 失败：${error.message || '执行定时任务失败'}`)
          job.moveToFailed(error, job.token || '', true)
        })
      } else {
        await func(...argumentsArray)
      }
    } catch (error: any) {
      this.logger.error(`执行定时任务 ${job.data.invokeTarget} 失败：${error.message || '执行定时任务失败'}`)
      throw new BusinessException(error.message || '执行定时任务失败')
    }
  }

  @OnWorkerEvent(BullConstant.JOB_COMPLETED)
  async onCompleted(job: Job<JobEntity>) {
    const entity = job.data
    entity.status = CommonConstant.STATUS_NORMAL
    await this.createJobLog(entity, '执行成功')
  }

  @OnWorkerEvent(BullConstant.JOB_FAILED)
  async onFailed(job: Job<JobEntity>, error: any) {
    const entity = job.data
    entity.status = CommonConstant.STATUS_DISABLE
    await this.createJobLog(entity, error.message || '执行定时任务执行失败')
  }

  private async createJobLog(data: JobEntity, message: string = '执行成功') {
    const jobLog = new JobLogEntity()
    jobLog.jobName = data.jobName
    jobLog.jobGroup = data.jobGroup
    jobLog.invokeTarget = data.invokeTarget
    jobLog.jobMessage = message
    jobLog.status = data.status
    jobLog.createTime = formatTime()
    await this.jobService.createJobLog(jobLog)
  }
}
