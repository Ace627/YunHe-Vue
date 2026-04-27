import { CommonConstant } from '@/common'
import { BaseEntity } from '../base.entity'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'sys_dict_data' })
export class DictDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ comment: '字典标签', name: 'dict_label', length: 20, nullable: false, type: 'varchar' })
  dictLabel: string

  @Column({ comment: '字典值', name: 'dict_value', length: 20, nullable: false, type: 'varchar' })
  dictValue: string

  @Column({ comment: '排序', default: 1, type: 'int', name: 'dict_sort' })
  dictSort: number

  @Column({ comment: '字典类型', name: 'dict_type' })
  dictType: string

  @Column({ name: 'list_class', length: '100', default: null, comment: '表格回显样式' })
  listClass: string

  @Column({ default: CommonConstant.STATUS_NORMAL, type: 'char', length: 1 })
  status: string

  @Column({ comment: '备注', nullable: true })
  remark: string

  @Column({ name: 'dict_type_id', nullable: false, type: 'varchar', length: 36, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  dictTypeId: string
}
