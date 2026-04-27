import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MenuService } from '@/modules/system/menu/menu.service'
import { Equal, FindOptionsWhere, In, Like, Not, Repository } from 'typeorm'
import { BusinessException, CommonConstant, RoleEntity, UserEntity } from '@/common'
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto, ChangeRoleStatusDto, AuthRolePermissionDto } from './role.dto'

@Injectable()
export class RoleService {
  constructor(
    private readonly menuService: MenuService,
    @InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  /** 创建角色 */
  public async create(createDto: CreateRoleDto) {
    const { roleCode } = createDto
    const exists = await this.roleRepository.existsBy({ roleCode: Equal(roleCode) })
    if (exists) throw new BusinessException('角色编码已存在')
    const entity = new RoleEntity()
    Object.assign(entity, createDto)
    await this.roleRepository.save(entity)
    return '添加成功'
  }

  /** 批量删除角色 */
  public async delete(ids: string[]) {
    const roleList = await this.roleRepository.findBy({ id: In(ids) })
    if (!roleList.length) throw new BusinessException('角色不存在')
    const isAdminRole = roleList.some((item) => item.id === CommonConstant.ADMIN_ROLE_ID)
    if (isAdminRole) throw new BusinessException('系统管理员角色禁止删除')
    await this.userRepository.createQueryBuilder().delete().from('sys_user_role').where('role_id IN (:...ids)', { ids }).execute()
    await this.roleRepository.delete(ids)
    return '删除成功'
  }

  /** 更新角色 */
  public async update(updateDto: UpdateRoleDto) {
    const { id, roleCode } = updateDto
    const record = await this.roleRepository.findOneBy({ id: Equal(id) })
    if (!record) throw new BusinessException('角色不存在')
    const hasRoleCode = roleCode && (await this.roleRepository.existsBy({ roleCode: Equal(roleCode), id: Not(id) }))
    if (hasRoleCode) throw new BusinessException('角色编码已存在')
    if (record.id === CommonConstant.ADMIN_ROLE_ID && roleCode !== record.roleCode) throw new BusinessException('系统管理员角色编码禁止修改')
    const entity = new RoleEntity()
    Object.assign(entity, updateDto)
    await this.roleRepository.update(id, entity)
    return '修改成功'
  }

  /** 查询角色列表（分页） */
  public async findList(queryParams: QueryRoleDto) {
    const { skip, take, roleName, roleCode, status } = queryParams
    const queryBuilder = this.roleRepository.createQueryBuilder('role')
    const where: FindOptionsWhere<RoleEntity> = {}
    if (roleName) where.roleName = Like(`%${roleName}%`)
    if (roleCode) where.roleCode = Equal(roleCode)
    if (status) where.status = Equal(status)
    queryBuilder.where(where)
    queryBuilder.orderBy('role.roleSort', 'ASC')
    queryBuilder.addOrderBy('role.createTime', 'DESC')
    queryBuilder.skip(skip).take(take)
    const [records, total] = await queryBuilder.getManyAndCount()
    return { total, records }
  }

  /** 查询角色不分页列表 */
  public async findAll() {
    const where: FindOptionsWhere<RoleEntity> = { status: CommonConstant.STATUS_NORMAL }
    return this.roleRepository.find({ where, order: { createTime: 'ASC' } })
  }

  /** 查询角色详情 */
  public async findOneById(id: string) {
    const data = await this.roleRepository.findOneBy({ id: Equal(id) })
    if (!data) throw new BusinessException('角色不存在')
    return data
  }

  /** 修改角色状态 */
  public async changeStatus(changeRoleStatusDto: ChangeRoleStatusDto) {
    const { id, status } = changeRoleStatusDto
    if (id === CommonConstant.ADMIN_ROLE_ID) throw new BusinessException('系统管理员角色状态禁止修改')
    const exist = await this.roleRepository.findOneBy({ id: Equal(id) })
    if (!exist) throw new BusinessException('角色不存在')
    await this.roleRepository.update(id, { status })
    return '状态修改成功'
  }

  /** 授权角色菜单权限 */
  public async authPermission(authDto: AuthRolePermissionDto) {
    const role = await this.findOneById(authDto.roleId)
    role.menus = await this.menuService.findManyByIds(authDto.menuIds)
    await this.roleRepository.save(role)
    return '授权成功'
  }
}
