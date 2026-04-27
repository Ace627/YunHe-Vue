import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { CronRepeatOptions, Queue } from 'bull'
import { InjectRepository } from '@nestjs/typeorm'
import { formatTime, isJsonString } from '@/utils'
import { ModuleRef, DiscoveryService } from '@nestjs/core'
import { Equal, FindOptionsWhere, In, Like, Not, Repository } from 'typeorm'
import { BullConstant, BusinessException, CommonConstant, JobEntity, JobLogEntity } from '@/common'
import { AnalysisInvokeTargetDto, ChangeJobStatusDto, CreateJobDto, QueryJobDto, QueryJobLogDto, RunJobDto, UpdateJobDto } from './job.dto'

@Injectable()
export class JobService {
  public readonly serviceMap = new Map<string, Function>()

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly discovery: DiscoveryService,
    @InjectQueue(BullConstant.QUEUE_NAME) private jobQueue: Queue,
    @InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>,
    @InjectRepository(JobLogEntity) private readonly jobLogRepository: Repository<JobLogEntity>,
  ) {}

  async onModuleInit() {
    this.loadBusinessServices()
    await this.initJob()
  }

  test() {
    console.log('test', formatTime())
  }

  /* -------------------------------------------------------------------------- */
  /*                                Schedule Job                                */
  /* -------------------------------------------------------------------------- */

  /** 新增任务 */
  public async createJob(createDto: CreateJobDto) {
    // 1. 名称去重
    const exists = await this.jobRepository.exists({ where: { jobName: createDto.jobName } })
    if (exists) throw new BusinessException(`任务名称 ${createDto.jobName} 已存在`)
    // 2. 验证调用格式
    await this.analysisinvokeTarget(createDto)
    // 3. 保存
    const entity = new JobEntity()
    Object.assign(entity, createDto)
    const job = await this.jobRepository.save(entity)
    // 4. 启动
    if (job.status === CommonConstant.STATUS_NORMAL) await this.start(job)
    return '添加成功'
  }

  /** 编辑任务 */
  public async updateJob(updateDto: UpdateJobDto) {
    // 1. 查询任务是否存在
    const job = await this.jobRepository.findOne({ where: { id: updateDto.id } })
    if (!job) throw new BusinessException(`任务不存在`)
    // 2. 名称重复校验（排除自身）
    const exists = await this.jobRepository.existsBy({ jobName: updateDto.jobName, id: Not(updateDto.id) })
    if (exists) throw new BusinessException(`任务名称 ${updateDto.jobName} 已存在`)
    // 3. 重新校验调用格式（非常重要）
    await this.analysisinvokeTarget(updateDto)
    // 4. 停止旧任务（🔥 超级重要）
    await this.stop(job.id)
    // 5. 覆盖数据
    Object.assign(job, updateDto)
    // 6. 保存
    await this.jobRepository.save(job)
    // 7. 如果状态正常，重新启动
    if (job.status === CommonConstant.STATUS_NORMAL) await this.start(job)
    return '更新成功'
  }

  /** 执行一次 */
  public async runJob(runDto: RunJobDto) {
    const where: FindOptionsWhere<JobEntity> = {}
    where.id = Equal(runDto.jobId)
    where.jobGroup = Equal(runDto.jobGroup)
    const job = await this.jobRepository.findOne({ where })
    if (!job) throw new BusinessException(`任务不存在`)
    await this.analysisinvokeTarget(job)
    await this.once(job)
    return '执行一次成功'
  }

  /** 删除任务 */
  public async deleteJob(jobIds: string[]) {
    if (!jobIds || jobIds.length === 0) throw new BusinessException('请选择要删除的任务')
    const jobList = await this.jobRepository.findBy({ id: In(jobIds) })
    if (jobList.length === 0) return '删除成功'
    // 停止 Redis 里的定时任务
    for (const job of jobList) await this.jobQueue.removeRepeatableByKey(job.id)
    await this.jobRepository.delete(jobIds)
    return '删除成功'
  }

  /** 查询任务列表 */
  public async findJobList(queryParams: QueryJobDto) {
    const { jobName, jobGroup, status, skip, take } = queryParams
    const queryBuilder = this.jobRepository.createQueryBuilder('job')
    const where: FindOptionsWhere<JobEntity> = {}
    if (jobName) where.jobName = Like(`%${jobName}%`)
    if (jobGroup) where.jobGroup = Like(`%${jobGroup}%`)
    if (status) where.status = Equal(status)
    queryBuilder.where(where)
    queryBuilder.orderBy('job.createTime', 'ASC') // 排序
    queryBuilder.skip(skip).take(take) // 分页
    const [records, total] = await queryBuilder.getManyAndCount()
    return { total, records }
  }

  /** 根据任务 ID 查询任务 */
  public findJobById(jobId: string) {
    return this.jobRepository.findOne({ where: { id: jobId } })
  }

  /** 根据任务 ID 列表查询任务列表 */
  public findManyJobByIds(jobIds: string[]) {
    return this.jobRepository.find({ where: { id: In(jobIds) } })
  }

  /** 修改任务状态 */
  public async changeJobStatus(changeDto: ChangeJobStatusDto) {
    const job = await this.jobRepository.findOne({ where: { id: changeDto.id } })
    if (!job) throw new BusinessException('任务不存在')
    if (job.status === changeDto.status) return '状态未变更'
    await this.stop(job.id)
    await this.jobRepository.update(changeDto.id, { status: changeDto.status })
    if (changeDto.status === CommonConstant.STATUS_NORMAL) await this.start(job)
    return '状态修改成功'
  }

  /* 解析类和方法和参数  "A.cc(22,true,'0')" */
  async analysisinvokeTarget(options: AnalysisInvokeTargetDto) {
    const { invokeTarget } = options
    // 1. 拆分 类名.方法名(参数)
    const splitArr = invokeTarget.split('.')
    if (splitArr.length !== 2) throw new BusinessException('调用方法格式错误')
    const serviceName = splitArr[0]
    const methodPart = splitArr[1]
    // 2. 验证格式是否包含 ()
    if (!methodPart.includes('(') || !methodPart.includes(')')) throw new BusinessException('调用方法格式错误')
    // 3. 提取方法名
    const funNameMatch = methodPart.match(/^([^()]+)\(/)
    if (!funNameMatch || !funNameMatch[1]) throw new BusinessException('调用方法格式错误')
    const funName = funNameMatch[1].trim()
    // 4. 提取参数内容（安全解析，不使用 eval）
    const argsMatch = methodPart.match(/\((.*)\)/)
    if (!argsMatch) throw new BusinessException('调用方法格式错误')
    const argsStr = argsMatch[1].trim()
    let argumentsArray: any[] = []
    if (argsStr) {
      // 把单引号转成双引号（支持 'xxx' → "xxx"）
      const formattedArgs = argsStr.replace(/'/g, '"')
      const jsonStr = `[${formattedArgs}]`
      if (!isJsonString(jsonStr)) throw new BusinessException('参数格式错误，请使用合法JSON格式')
      argumentsArray = JSON.parse(jsonStr)
    }

    // 【自身调用兼容逻辑】
    // console.log('serviceName === this.constructor.name: ', serviceName === this.constructor.name)
    // if (serviceName === this.constructor.name) {
    //   // 调用自己 → 直接检查 this 上有没有方法
    //   console.log('this[funName]: ', this[funName])
    //   console.log('typeof this[funName]: ', typeof this[funName])
    //   if (typeof this[funName] !== 'function') throw new BusinessException(`方法 ${funName} 不存在`)
    //   return { serviceName, funName, argumentsArray }
    // }

    // 5. 验证服务是否存在（你原来的逻辑保留）
    try {
      const serviceClass = this.serviceMap.get(serviceName)
      if (!serviceClass) throw new Error('服务不存在')
      const service = this.moduleRef.get(serviceClass)
      if (!service || !(funName in service)) throw new Error()
    } catch (error: any) {
      throw new BusinessException('调用方法未找到')
    }
    // 6. 返回解析结果
    return { serviceName, funName, argumentsArray }
  }

  /* -------------------------------------------------------------------------- */
  /*                              Schedule Job Log                              */
  /* -------------------------------------------------------------------------- */

  /* 添加任务日志记录 */
  public async createJobLog(createDto: JobLogEntity) {
    await this.jobLogRepository.save(createDto)
    return '添加成功'
  }

  /** 分页查询任务调度日志列表 */
  public async findJobLogList(queryParams: QueryJobLogDto) {
    const { jobName, jobGroup, status, skip, take } = queryParams
    const queryBuilder = this.jobLogRepository.createQueryBuilder('jobLog')
    const where: FindOptionsWhere<JobLogEntity> = {}
    if (jobName) where.jobName = Like(`%${jobName}%`)
    if (jobGroup) where.jobGroup = Like(`%${jobGroup}%`)
    if (status) where.status = Equal(status)
    queryBuilder.where(where)
    queryBuilder.orderBy('jobLog.createTime', 'ASC') // 排序
    queryBuilder.skip(skip).take(take) // 分页
    const [records, total] = await queryBuilder.getManyAndCount()
    return { total, records }
  }

  /** 删除任务日志 */
  public async deleteJobLog(logIds: string[]) {
    if (!logIds || logIds.length === 0) throw new BusinessException('请选择要删除的日志')
    await this.jobLogRepository.delete(logIds)
    return '删除成功'
  }

  /** 清空调度日志 */
  public async clearJobLog() {
    await this.jobLogRepository.createQueryBuilder('jobLog').delete().execute()
    return '清空成功'
  }

  /* -------------------------------------------------------------------------- */
  /*                               Private Handler                              */
  /* -------------------------------------------------------------------------- */

  /** 初始化定时任务 */
  private async initJob() {
    // 停止所有的任务
    const jobObjArr = await this.jobQueue.getRepeatableJobs()
    await Promise.all(jobObjArr.map(async (item) => await this.jobQueue.removeRepeatableByKey(item.key)))
    await this.jobQueue.empty()
    // 查找执行错误的任务,并且执行错误策略后，清空错误情况
    const failJobArr = await this.jobQueue.getFailed()
    await this.misfirePolicy(failJobArr.map((item) => item.data))
    await this.jobQueue.clean(0, 'failed') // 清空错误记录
    // 查找需要执行的任务，并执行
    const queryParams = new QueryJobDto()
    queryParams.status = CommonConstant.STATUS_NORMAL
    const { records } = await this.findJobList(queryParams)
    await Promise.all(records.map((job) => this.start(job)))
  }

  /** 任务错误策略 */
  private async misfirePolicy(jobs: JobEntity[]) {
    //查询所有数据库还在的任务
    jobs = await this.findManyJobByIds(jobs.map((item) => item.id))
    // 立即执行的
    const immediately: JobEntity[] = []
    // 执行一次的
    const executeOnce: JobEntity[] = []
    for (const job of jobs) {
      if (job.misfirePolicy == '1') {
        immediately.push(job)
      }
      if (job.misfirePolicy == '2' && !executeOnce.find((job2) => job.id == job2.id)) {
        executeOnce.push(job)
      }
    }
    await Promise.all([...immediately, ...executeOnce].map(async (job) => await this.once(job)))
  }

  /** 启动定时任务 */
  private async start(job: JobEntity) {
    const repeat: CronRepeatOptions = { cron: job.cronExpression }
    await this.jobQueue.add(job, { jobId: job.id, removeOnComplete: true, removeOnFail: false, repeat: repeat })
  }

  /** 停止定时任务 */
  private async stop(jobId: string) {
    const jobObjArr = await this.jobQueue.getRepeatableJobs()
    const hasObj = jobObjArr.find((item) => item.id == jobId)
    if (hasObj) await this.jobQueue.removeRepeatableByKey(hasObj.key)
  }

  /** 直接执行一次 */
  private async once(job: JobEntity) {
    await this.jobQueue.add(job, { jobId: job.id, removeOnComplete: true, removeOnFail: false })
  }

  /** 加载所有业务 Service（自动过滤非业务类） */
  private loadBusinessServices() {
    const providers = this.discovery.getProviders()
    for (const wrapper of providers) {
      const { metatype } = wrapper
      if (!metatype || !metatype.name.endsWith('Service')) continue
      this.serviceMap.set(metatype.name, metatype)
    }
  }
}
