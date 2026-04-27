import { listToTree } from '@/utils'
import { Injectable } from '@nestjs/common'
import { Equal, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateMenuDto, QueryMenuDto, UpdateMenuDto } from './menu.dto'
import { BusinessException, CommonConstant, MenuEntity } from '@/common'

@Injectable()
export class MenuService {
  constructor(@InjectRepository(MenuEntity) private readonly menuRepository: Repository<MenuEntity>) {}

  /** 新增菜单 */
  public async create(createDto: CreateMenuDto): Promise<string> {
    const { path, permission, menuType, parentId } = createDto
    await this.checkParentMenuType(parentId, menuType)
    menuType === 'F' ? await this.checkPermissionExists(permission) : await this.checkPathExists(path)
    const entity = new MenuEntity()
    Object.assign(entity, createDto)
    this.cleanMenuFields(entity, menuType)
    await this.menuRepository.save(entity)
    return '添加成功'
  }

  /** 批量删除菜单 */
  public async delete(menuId: string): Promise<string> {
    const queryBuilder = this.menuRepository.createQueryBuilder('menu')
    const hasChild = await queryBuilder.where('menu.parentId = :menuId', { menuId }).getMany()
    if (hasChild.length) throw new BusinessException('存在子菜单，无法删除')
    await this.menuRepository.delete(menuId)
    return '删除成功'
  }

  /** 更新菜单 */
  public async update(updateDto: UpdateMenuDto): Promise<string> {
    const { id, path, permission, menuType, parentId } = updateDto
    const entity = await this.menuRepository.findOneBy({ id: Equal(id) })
    if (!entity) throw new BusinessException('菜单不存在或已被删除')
    await this.checkParentMenuType(parentId, menuType, id)
    menuType === 'F' ? await this.checkPermissionExists(permission, id) : await this.checkPathExists(path, id)
    Object.assign(entity, updateDto)
    this.cleanMenuFields(entity, menuType)
    await this.menuRepository.save(entity)
    return '修改成功'
  }

  /** 查询菜单列表（树形） */
  public async findList(queryParams: QueryMenuDto) {
    const { status, menuName, menuType } = queryParams
    const queryBuilder = this.menuRepository.createQueryBuilder('menu')
    if (menuName) queryBuilder.andWhere('menu.menuName LIKE :menuName', { menuName: `%${menuName}%` })
    if (menuType) queryBuilder.andWhere('menu.menuType = :menuType', { menuType })
    if (status) queryBuilder.andWhere('menu.status = :status', { status })
    queryBuilder.orderBy('menu.menuSort', 'ASC')
    const records = await queryBuilder.getMany()
    return listToTree(records)
  }

  /** 根据 ID 查询菜单详情 */
  public async findOneById(menuId: string): Promise<MenuEntity> {
    const queryBuilder = this.menuRepository.createQueryBuilder('menu')
    queryBuilder.where('menu.id = :id', { id: menuId })
    const record = await queryBuilder.getOne()
    if (!record) throw new BusinessException('菜单不存在或已被删除')
    return record
  }

  /** 查询父级菜单下拉列表 */
  public async findParentList() {
    const queryBuilder = this.menuRepository.createQueryBuilder('menu')
    queryBuilder.andWhere('menu.status = :status', { status: CommonConstant.STATUS_NORMAL })
    queryBuilder.andWhere('menu.menuType != :menuType', { menuType: 'F' })
    queryBuilder.orderBy('menu.menuSort', 'ASC')
    const records = await queryBuilder.getMany()
    return [{ parentId: CommonConstant.DEFAULT_PARENT_ID, id: '0', menuName: '主类目', children: listToTree(records) }]
  }

  /** 根据菜单 ID 组查询菜单及按钮权限 */
  public async findManyByIds(menuIds: string[]) {
    const queryBuilder = this.menuRepository.createQueryBuilder('menu')
    queryBuilder.where('menu.id IN (:...menuIds)', { menuIds })
    queryBuilder.andWhere('menu.status = :status', { status: CommonConstant.STATUS_NORMAL })
    queryBuilder.orderBy('menu.menuSort', 'ASC')
    return queryBuilder.getMany()
  }

  /** 根据角色 ID 查询其所有的菜单 */
  public async findMenusByRoleId(roleId: string) {
    const isAdmin = roleId === CommonConstant.ADMIN_ROLE_ID
    const queryBuilder = this.menuRepository.createQueryBuilder('menu')
    queryBuilder.orderBy('menu.menuSort', 'ASC')
    if (isAdmin) return queryBuilder.getMany()
    queryBuilder.innerJoin('menu.roles', 'role').where('role.id = :roleId', { roleId })
    return queryBuilder.getMany()
  }

  /** 根据角色 ID 组获取其所有的菜单路由 */
  public async findRoutesByRoleIds(roleIds: string[], isAdmin: boolean) {
    const queryBuilder = this.menuRepository.createQueryBuilder('menu')
    queryBuilder.where('menu.menuType != :menuType', { menuType: 'F' })
    if (!isAdmin) {
      queryBuilder.innerJoin('menu.roles', 'role')
      queryBuilder.andWhere('role.id IN (:...roleIds)', { roleIds })
    }
    queryBuilder.distinct(true)
    queryBuilder.orderBy('menu.menuSort', 'ASC')
    return queryBuilder.getMany()
  }

  /** 根据角色 ID 组获取其所有的按钮权限 */
  public async findPermissionsByRoleIds(roleIds: string[], isAdmin: boolean): Promise<string[]> {
    const queryBuilder = this.menuRepository.createQueryBuilder('menu')
    queryBuilder.where('menu.menuType = :menuType', { menuType: 'F' })
    if (!isAdmin) {
      queryBuilder.innerJoin('menu.roles', 'role')
      queryBuilder.andWhere('role.id IN (:...roleIds)', { roleIds })
    }
    queryBuilder.distinct(true)
    const permissionMenuList = await queryBuilder.getMany()
    return permissionMenuList.map((menu) => menu.permission)
  }

  /* -------------------------------------------------------------------------- */
  /*                               Private Handler                              */
  /* -------------------------------------------------------------------------- */

  /** 根据菜单类型清理不需要的字段 */
  private cleanMenuFields(entity: MenuEntity, menuType: string): void {
    const delKeyList: string[] = []
    if (menuType === 'M' || menuType === 'C') delKeyList.push('permission')
    if (menuType === 'F') delKeyList.push('icon', 'component', 'path', 'isCache')
    if (menuType === 'M') delKeyList.push('component')
    delKeyList.forEach((key) => delete entity[key])
  }

  /** 校验路由 path 是否重复（排除指定ID） */
  private async checkPathExists(path?: string, excludeId?: string): Promise<void> {
    if (!path) throw new BusinessException('路由地址不能为空')
    const queryBuilder = this.menuRepository.createQueryBuilder('menu')
    queryBuilder.andWhere('menu.path = :path', { path })
    if (excludeId) queryBuilder.andWhere('menu.id != :id', { id: excludeId })
    const exists = await queryBuilder.getExists()
    if (exists) throw new BusinessException(`路由 ${path} 已存在`)
  }

  /** 校验权限标识 permission 是否重复（排除指定ID） */
  private async checkPermissionExists(permission?: string, excludeId?: string): Promise<void> {
    if (!permission) throw new BusinessException('按钮权限标识不能为空')
    const queryBuilder = this.menuRepository.createQueryBuilder('menu')
    queryBuilder.andWhere('menu.permission = :permission', { permission })
    if (excludeId) queryBuilder.andWhere('menu.id != :id', { id: excludeId })
    const exists = await queryBuilder.getExists()
    if (exists) throw new BusinessException(`按钮权限 ${permission} 已存在`)
  }

  /** 校验父级菜单类型：菜单的子级不能是菜单 */
  private async checkParentMenuType(parentId?: string, menuType?: string, excludeId?: string): Promise<void> {
    if (!parentId || parentId === '0' || menuType === 'F') return
    const parentMenu = await this.menuRepository.findOneBy({ id: Equal(parentId) })
    if (!parentMenu) return
    if (excludeId && parentMenu.id === excludeId) return
    if (parentMenu.menuType === 'C') {
      throw new BusinessException('菜单的子级不能是菜单')
    }
  }
}
