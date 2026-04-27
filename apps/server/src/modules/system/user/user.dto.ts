import { PaginationDto } from '@/common'
import { Exclude } from 'class-transformer'
import { PartialType, PickType } from '@nestjs/mapped-types'
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({ message: '参数 $property  不能为空' })
  username: string

  @IsNotEmpty({ message: '参数 $property  不能为空' })
  password: string

  @IsArray()
  @IsNotEmpty({ message: '参数 $property 不可为空' })
  roleIds: string[]

  @IsOptional()
  nickname: string

  @IsOptional()
  age: number

  @IsOptional()
  status: string

  @IsOptional()
  email: string

  @IsOptional()
  phone: string

  @IsOptional()
  gender: string

  @IsOptional()
  remark: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty({ message: '参数 $property  不能为空' })
  id: string

  @IsNotEmpty({ message: '参数 $property 不可为空' })
  roleIds: string[]

  @Exclude()
  username: string

  @Exclude()
  password: string

  @Exclude()
  createBy: string
}

export class QueryUserDto extends PaginationDto {
  @IsOptional()
  username: string

  @IsOptional()
  nickname: string

  @IsOptional()
  email: string

  @IsOptional()
  phone: string

  @IsOptional()
  status: string
}

export class UpdateUserPwdDto {
  @IsNotEmpty({ message: '参数 $property 不可为空' })
  oldPassword: string

  @IsNotEmpty({ message: '参数 $property 不可为空' })
  newPassword: string

  @IsNotEmpty({ message: '参数 $property 不可为空' })
  repeatPassword: string
}

export class ResetUserPwdDto extends PickType(CreateUserDto, ['username', 'password']) {}

export class UpdateProfileDto {
  @IsOptional()
  nickname: string

  @IsOptional()
  phone: string

  @IsOptional()
  age: number

  @IsOptional()
  email: string

  @IsOptional()
  gender: string
}
