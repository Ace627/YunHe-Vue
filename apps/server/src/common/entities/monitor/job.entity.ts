import { CommonConstant } from '@/common/constant/common.constant'
import { BaseEntity } from '../base.entity'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('sys_job')
export class JobEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'job_name', comment: '任务名称', default: null, length: 64 })
  jobName: string

  @Column({ name: 'job_group', comment: '任务组名', default: 'DEFAULT', length: 64 })
  jobGroup: string

  // （1立即执行 2执行一次 3放弃执行）
  @Column({ name: 'misfire_policy', comment: '计划执行错误策略', default: '3', length: 20 })
  misfirePolicy: string

  /* 是否并发执行（1允许 0禁止） */
  @Column({ comment: '是否并发执行', default: CommonConstant.STATUS_DISABLE, type: 'char', length: 1 })
  concurrent: string

  @Column({ name: 'invoke_target', comment: '调用目标字符串', default: null, length: 225 })
  invokeTarget: string

  @Column({ name: 'cron_expression', comment: 'cron执行表达式', default: null, length: 225 })
  cronExpression: string

  @Column({ name: 'status', comment: '状态', default: CommonConstant.STATUS_NORMAL, type: 'char', length: 1 })
  status: string
}
