import { CommonConstant } from '@/common'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('sys_job_log')
export class JobLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'job_name', comment: '任务名称', default: null, length: 64 })
  jobName: string

  @Column({ name: 'job_group', comment: '任务组名', default: 'DEFAULT', length: 64 })
  jobGroup: string

  @Column({ name: 'invoke_target', comment: '调用目标字符串', default: null, length: 225 })
  invokeTarget: string

  @Column({ name: 'job_message', comment: '日志信息', length: 500, default: null })
  jobMessage: string

  @Column({ name: 'status', comment: '状态', default: CommonConstant.STATUS_NORMAL, type: 'char', length: 1 })
  status: string

  @Column({ name: 'create_time', comment: '创建时间', update: false })
  createTime: string
}
