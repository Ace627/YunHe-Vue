import { Excel } from '@/common/decorator/excel.decorator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BusinessType } from '@/common/constant/operalog.constant'
import { CommonConstant } from '@/common/constant/common.constant'

@Entity({ name: 'sys_oper_log' })
export class OperLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Excel({ name: '模块标题' })
  @Column({ comment: '模块标题', default: null })
  title: string

  @Excel({ name: '操作人员' })
  @Column({ comment: '操作人员', default: null })
  username: string

  @Excel({ name: '方法名称', width: 32 })
  @Column({ comment: '方法名称', default: null })
  method: string

  @Excel({ name: '请求方式' })
  @Column({ comment: '请求方式', name: 'request_method', default: null })
  requestMethod: string

  @Column({ comment: '请求参数', default: null, type: 'text' })
  params: string

  @Excel({ name: '请求接口', width: 40 })
  @Column({ comment: '请求接口', default: null })
  url: string

  @Excel({ name: '请求IP' })
  @Column({ comment: '请求IP', default: null })
  ip: string

  @Excel({ name: '请求地址' })
  @Column({ comment: '请求地址', default: null })
  location: string

  @Excel({ name: '操作类型', dictType: 'sys_oper_type' })
  @Column({ comment: '操作类型', type: 'char', default: BusinessType.OTHER })
  businessType: BusinessType

  @Excel({ name: '操作状态', dictType: 'sys_common_status' })
  @Column({ comment: '操作状态', type: 'char', default: CommonConstant.STATUS_NORMAL })
  status: string

  @Excel({ name: '请求时间', width: 25 })
  @Column({ comment: '请求时间', name: 'oper_time' })
  operTime: string

  @Excel({ name: '请求耗时（毫秒）', width: 20 })
  @Column({ comment: '请求耗时', default: null })
  duration: number

  @Excel({ name: '请求标识', width: 40 })
  @Column({ comment: '请求唯一标识', type: 'varchar', length: 64, default: null, name: 'request_id' })
  requestId: string
}
