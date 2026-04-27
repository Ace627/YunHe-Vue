import { RoleService } from './role.service'
import { ParseArrayPipe } from '@nestjs/common'
import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { OperLog, BusinessType, PaginationPipe, RequirePermissions } from '@/common'
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto, ChangeRoleStatusDto, AuthRolePermissionDto } from './role.dto'

@Controller('system/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /** 创建角色 */
  @Post('create')
  @RequirePermissions(['system:role:create'])
  @OperLog({ title: '角色管理', businessType: BusinessType.INSERT })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  /** 批量删除角色 */
  @Delete('delete')
  @RequirePermissions(['system:role:delete'])
  @OperLog({ title: '角色管理', businessType: BusinessType.DELETE })
  delete(@Query('ids', new ParseArrayPipe()) ids: string[]) {
    return this.roleService.delete(ids)
  }

  /** 更新角色 */
  @Put('update')
  @RequirePermissions(['system:role:update'])
  @OperLog({ title: '角色管理', businessType: BusinessType.UPDATE })
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto)
  }

  /** 查询角色分页列表 */
  @Get('list')
  @RequirePermissions(['system:role:query'])
  findList(@Query(PaginationPipe) queryParams: QueryRoleDto) {
    return this.roleService.findList(queryParams)
  }

  /** 查询角色不分页列表 */
  @Get('list/all')
  @RequirePermissions(['system:role:query'])
  public findAll() {
    return this.roleService.findAll()
  }

  /** 查询角色详情 */
  @Get('detail')
  @RequirePermissions(['system:role:query'])
  findOneById(@Query('id') id: string) {
    return this.roleService.findOneById(id)
  }

  /** 修改角色状态 */
  @Put('changeStatus')
  @RequirePermissions(['system:role:update'])
  @OperLog({ title: '角色管理', businessType: BusinessType.UPDATE })
  changeStatus(@Body() changeRoleStatusDto: ChangeRoleStatusDto) {
    return this.roleService.changeStatus(changeRoleStatusDto)
  }

  /** 授权角色菜单权限 */
  @Post('authPermission')
  @RequirePermissions(['system:role:update'])
  @OperLog({ title: '角色管理', businessType: BusinessType.UPDATE })
  public authPermission(@Body() authDto: AuthRolePermissionDto) {
    return this.roleService.authPermission(authDto)
  }
}
