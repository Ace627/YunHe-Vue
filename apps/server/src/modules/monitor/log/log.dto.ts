import { PaginationDto } from '@/common'
import { IsOptional, IsString } from 'class-validator'

export class QueryLoginLogDto extends PaginationDto {
  @IsOptional()
  @IsString()
  ip: string

  @IsOptional()
  @IsString()
  username: string

  @IsOptional()
  @IsString()
  location: string

  @IsOptional()
  @IsString()
  status: string
}

export class QueryOperLogDto extends PaginationDto {
  @IsOptional()
  @IsString()
  ip: string

  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  username: string

  @IsOptional()
  @IsString()
  location: string

  @IsOptional()
  @IsString()
  status: string
}
