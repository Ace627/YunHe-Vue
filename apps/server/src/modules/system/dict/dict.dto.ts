import { PaginationDto } from '@/common'
import { Exclude } from 'class-transformer'
import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsOptional } from 'class-validator'

/* -------------------------------------------------------------------------- */
/*                              Dict Type Dto                                 */
/* -------------------------------------------------------------------------- */

export class CreateDictTypeDto {
  @IsNotEmpty({ message: '参数 $property  不能为空' })
  dictName: string

  @IsNotEmpty({ message: '参数 $property  不能为空' })
  dictType: string

  @IsOptional()
  status: string

  @IsOptional()
  remark: string
}

export class UpdateDictTypeDto extends PartialType(CreateDictTypeDto) {
  @IsNotEmpty({ message: '参数 $property  不能为空' })
  id: string

  @Exclude()
  createBy: string
}

export class QueryDictTypeDto extends PaginationDto {
  @IsOptional()
  dictName: string

  @IsOptional()
  dictType: string

  @IsOptional()
  status: string
}

/* -------------------------------------------------------------------------- */
/*                              Dict Data DTO                                 */
/* -------------------------------------------------------------------------- */

export class CreateDictDataDto {
  @IsNotEmpty({ message: '参数 $property  不能为空' })
  dictLabel: string

  @IsNotEmpty({ message: '参数 $property  不能为空' })
  dictValue: string

  @IsNotEmpty({ message: '参数 $property  不能为空' })
  dictType: string

  @IsOptional()
  dictSort: number

  @IsOptional()
  listClass: string

  @IsOptional()
  status: string

  @IsOptional()
  remark: string
}

export class UpdateDictDataDto extends PartialType(CreateDictDataDto) {
  @IsNotEmpty({ message: '参数 $property  不能为空' })
  id: string

  @Exclude()
  createBy: string
}

export class QueryDictDataDto extends PaginationDto {
  @IsOptional()
  dictLabel: string

  @IsOptional()
  dictValue: string

  @IsOptional()
  dictType: string

  @IsOptional()
  status: string
}

/** 根据字典类型查询（前端下拉专用） */
export class QueryDictByTypeDto {
  @IsNotEmpty({ message: '参数 $property  不能为空' })
  dictType: string
}
