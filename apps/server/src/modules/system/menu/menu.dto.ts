import { PaginationDto } from '@/common'
import { Exclude } from 'class-transformer'
import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateMenuDto {
  @IsOptional()
  parentId: string

  @IsNotEmpty({ message: '参数 $property 不能为空' })
  menuName: string

  @IsOptional()
  menuSort: number

  @IsOptional()
  path: string

  @IsOptional()
  component: string

  @IsNotEmpty({ message: '参数 $property 不能为空' })
  menuType: string

  @IsOptional()
  visible: string

  @IsOptional()
  status: string

  @IsOptional()
  permission: string

  @IsOptional()
  icon: string

  @IsOptional()
  isCache: string

  @IsOptional()
  remark: string
}

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  id: string

  @IsNotEmpty({ message: '参数 $property 不能为空' })
  menuType: string

  @Exclude()
  createBy: string
}

export class QueryMenuDto {
  @IsOptional()
  menuName: string

  @IsOptional()
  menuType: string

  @IsOptional()
  status: string
}
