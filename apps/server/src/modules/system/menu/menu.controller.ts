import { MenuService } from './menu.service'
import { OperLog, BusinessType, RequirePermissions } from '@/common'
import { CreateMenuDto, QueryMenuDto, UpdateMenuDto } from './menu.dto'
import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'

@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /** 新增菜单 */
  @Post('create')
  @RequirePermissions(['system:menu:create'])
  @OperLog({ title: '菜单管理', businessType: BusinessType.INSERT })
  create(@Body() createDto: CreateMenuDto) {
    return this.menuService.create(createDto)
  }

  /** 根据菜单 ID 删除单条数据 */
  @Delete('delete')
  @RequirePermissions(['system:menu:delete'])
  @OperLog({ title: '菜单管理', businessType: BusinessType.DELETE })
  delete(@Query('id') id: string) {
    return this.menuService.delete(id)
  }

  /** 更新菜单 */
  @Put('update')
  @RequirePermissions(['system:menu:update'])
  @OperLog({ title: '菜单管理', businessType: BusinessType.UPDATE })
  update(@Body() updateDto: UpdateMenuDto) {
    return this.menuService.update(updateDto)
  }

  /** 查询菜单列表 */
  @Get('list')
  @RequirePermissions(['system:menu:query'])
  findList(@Query() queryParams: QueryMenuDto) {
    return this.menuService.findList(queryParams)
  }

  /** 查询父级菜单下拉列表 */
  @Get('list/parent')
  @RequirePermissions(['system:menu:query'])
  findParentList() {
    return this.menuService.findParentList()
  }

  /** 根据 id 查询单条菜单数据 */
  @Get('detail')
  @RequirePermissions(['system:menu:query'])
  findOneById(@Query('id') id: string) {
    return this.menuService.findOneById(id)
  }

  /** 根据角色 ID 组查询其所有的菜单路由 */
  @Get('list/role')
  @RequirePermissions(['system:menu:query'])
  findMenusByRoleId(@Query('roleId') roleId: string) {
    return this.menuService.findMenusByRoleId(roleId)
  }
}
