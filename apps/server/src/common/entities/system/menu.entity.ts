import { CommonConstant, RoleEntity } from '@/common'
import { BaseEntity } from '../base.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('sys_menu')
export class MenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'parent_id', comment: '上级菜单', default: CommonConstant.DEFAULT_PARENT_ID, type: 'varchar', length: 36 })
  parentId: string

  @Column({ comment: '路由地址', default: null })
  path: string

  @Column({ comment: '组件路径', default: null })
  component: string

  @Column({ comment: '类型（M目录 C菜单 F按钮）', default: 'M', type: 'char', name: 'menu_type' })
  menuType: string

  @Column({ comment: '菜单图标', default: null, length: 16 })
  icon: string

  @Column({ name: 'menu_name', comment: '菜单名称', default: null })
  menuName: string

  @Column({ comment: '菜单是否可见', default: CommonConstant.STATUS_NORMAL, type: 'char' })
  visible: string

  @Column({ comment: '权限字符', default: null })
  permission: string

  @Column({ type: 'char', comment: '数据状态', default: CommonConstant.STATUS_NORMAL })
  status: string

  @Column({ comment: '显示顺序', type: 'int', default: 1, name: 'menu_sort' })
  menuSort: number

  @Column({ length: 200, comment: '备注', type: 'varchar', nullable: true })
  remark: string

  @Column({ comment: '是否缓存组件', default: CommonConstant.STATUS_DISABLE, type: 'char', name: 'is_cache' })
  isCache: string

  @ManyToMany(() => RoleEntity, (role) => role.menus, { onDelete: 'CASCADE' })
  roles: RoleEntity[]
}
