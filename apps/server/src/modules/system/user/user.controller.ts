import { UserService } from './user.service'
import { Body, Controller, Delete, Get, ParseArrayPipe, Post, Put, Query } from '@nestjs/common'
import { OperLog, BusinessType, PaginationPipe, CurrentUser, RequirePermissions } from '@/common'
import { CreateUserDto, UpdateUserDto, QueryUserDto, UpdateUserPwdDto, ResetUserPwdDto, UpdateProfileDto } from './user.dto'

@Controller('system/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 新建用户 */
  @Post('create')
  @RequirePermissions(['system:user:create'])
  @OperLog({ title: '用户管理', businessType: BusinessType.INSERT })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  /** 根据传入 id 组删除单个或者多个数据 */
  @Delete('delete')
  @RequirePermissions(['system:user:delete'])
  @OperLog({ title: '用户管理', businessType: BusinessType.DELETE })
  public delete(@Query('ids', new ParseArrayPipe()) ids: string[]) {
    return this.userService.delete(ids)
  }

  /** 编辑用户 */
  @Put('update')
  @RequirePermissions(['system:user:update'])
  @OperLog({ title: '用户管理', businessType: BusinessType.UPDATE })
  update(@Body() updateDto: UpdateUserDto) {
    return this.userService.update(updateDto)
  }

  /** 重置密码 */
  @Put('resetPassword')
  @RequirePermissions(['system:user:update'])
  @OperLog({ title: '用户管理', businessType: BusinessType.UPDATE })
  public resetPassword(@Body() updateDto: ResetUserPwdDto) {
    return this.userService.resetPassword(updateDto)
  }

  /** 修改密码 */
  @Put('updatePassword')
  @OperLog({ title: '用户管理', businessType: BusinessType.UPDATE })
  @RequirePermissions(['system:user:update'])
  public updatePassword(@CurrentUser('userId') userId: string, @Body() updateDto: UpdateUserPwdDto) {
    return this.userService.updatePassword(userId, updateDto)
  }

  /** 查询用户分页列表 */
  @Get('list')
  @RequirePermissions(['system:user:query'])
  public findList(@Query(PaginationPipe) queryParams: QueryUserDto) {
    return this.userService.findList(queryParams)
  }

  /** 根据用户 ID 查找用户信息 */
  @Get('detail')
  @RequirePermissions(['system:user:query'])
  public findOneById(@Query('id') id: string) {
    return this.userService.findOneById(id)
  }

  /** 查找用户个人资料 */
  @Get('profile')
  @RequirePermissions(['system:user:query'])
  public getProfile(@CurrentUser('userId') userId: string) {
    return this.userService.getProfile(userId)
  }

  /** 修改用户个人资料 */
  @Put('profile/update')
  @RequirePermissions(['system:user:update'])
  @OperLog({ title: '用户管理', businessType: BusinessType.UPDATE })
  public updateProfile(@CurrentUser('userId') userId: string, @Body() updateDto: UpdateProfileDto) {
    return this.userService.updateProfile(userId, updateDto)
  }
}
