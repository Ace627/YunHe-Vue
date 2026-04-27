import { PaginationDto } from '@/common'
import { Exclude } from 'class-transformer'
import { PartialType } from '@nestjs/mapped-types'
import { ArrayNotEmpty, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateRoleDto {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  roleName: string

  @IsNotEmpty({ message: '参数 $property 不能为空' })
  roleCode: string

  @IsOptional()
  roleSort: number

  @IsOptional()
  status: string

  @IsOptional()
  remark: string
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  id: string

  @Exclude()
  createBy: string
}

export class QueryRoleDto extends PaginationDto {
  @IsOptional()
  roleName: string

  @IsOptional()
  roleCode: string

  @IsOptional()
  status: string
}

export class ChangeRoleStatusDto {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  id: string

  @IsNotEmpty({ message: '参数 $property 不能为空' })
  status: string
}

export class AuthRolePermissionDto {
  @IsNotEmpty({ message: '角色 id 不可为空' })
  roleId: string

  @ArrayNotEmpty({ message: '菜单 id 组不可为空' })
  @IsNotEmpty({ message: '参数 $property 不可为空' })
  menuIds: string[]
}
