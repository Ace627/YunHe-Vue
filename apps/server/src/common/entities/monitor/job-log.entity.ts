import { CommonConstant, Excel } from '@/common'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('sys_job_log')
export class JobLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Excel({ name: '任务名称', width: 30 })
  @Column({ name: 'job_name', comment: '任务名称', default: null, length: 64 })
  jobName: string

  @Excel({ name: '任务组名' })
  @Column({ name: 'job_group', comment: '任务组名', default: 'DEFAULT', length: 64 })
  jobGroup: string

  @Excel({ name: '调用目标', width: 30 })
  @Column({ name: 'invoke_target', comment: '调用目标字符串', default: null, length: 225 })
  invokeTarget: string

  @Excel({ name: '日志信息', width: 40 })
  @Column({ name: 'job_message', comment: '日志信息', length: 500, default: null })
  jobMessage: string

  @Excel({ name: '状态', dictType: 'sys_common_status' })
  @Column({ name: 'status', comment: '状态', default: CommonConstant.STATUS_NORMAL, type: 'char', length: 1 })
  status: string

  @Excel({ name: '创建时间', width: 25 })
  @Column({ name: 'create_time', comment: '创建时间', update: false })
  createTime: string
}
