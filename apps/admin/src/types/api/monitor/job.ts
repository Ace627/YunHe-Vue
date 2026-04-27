/** 定时任务分页查询参数 */
export interface JobQueryParams extends PaginationParams {
  /** 任务名称 */
  jobName?: string
  /** 任务组名 */
  jobGroup?: string
  /** 任务状态 */
  status?: string
}

/** 定时任务实体 */
export interface JobEntity extends BaseEntity {
  /** 任务编号 */
  id: string
  /** 任务名称 */
  jobName?: string
  /** 任务组名 */
  jobGroup?: string
  /** 调用目标字符串 */
  invokeTarget?: string
  /** 执行表达式 */
  cronExpression?: string
  /** 下次执行时间 */
  nextValidTime?: Date
  /** 计划策略 */
  misfirePolicy?: string
  /** 并发执行（1允许 0禁止） */
  concurrent?: string
  /** 状态（1正常 0停用） */
  status?: string
}

export type ChangeJobStatus = Pick<JobEntity, 'id' | 'status'>

export interface RunJobDto {
  /** 任务编号 */
  jobId: string
  /** 任务组名 */
  jobGroup: string
}
