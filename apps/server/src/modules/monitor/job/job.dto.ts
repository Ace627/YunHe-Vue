import { PickType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '@/common'

export class CreateJobDto {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  jobName: string

  @IsNotEmpty({ message: '参数 $property 不能为空' })
  invokeTarget: string

  @IsNotEmpty({ message: '参数 $property 不能为空' })
  cronExpression: string

  @IsOptional()
  jobGroup: string

  @IsOptional()
  misfirePolicy: string

  @IsOptional()
  concurrent: string

  @IsOptional()
  status: string
}

export class UpdateJobDto extends PickType(CreateJobDto, ['jobName', 'invokeTarget', 'cronExpression', 'jobGroup', 'misfirePolicy', 'concurrent', 'status']) {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  id: string
}

export class ChangeJobStatusDto extends PickType(UpdateJobDto, ['id']) {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  status: string
}

export class RunJobDto {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  jobId: string

  @IsNotEmpty({ message: '参数 $property 不能为空' })
  jobGroup: string
}

export class QueryJobDto extends PaginationDto {
  @IsOptional()
  jobName: string

  @IsOptional()
  jobGroup: string

  @IsOptional()
  status: string
}

export class AnalysisInvokeTargetDto {
  @IsString()
  invokeTarget: string
}

/* -------------------------------------------------------------------------- */
/*                              Schedule Job Log                              */
/* -------------------------------------------------------------------------- */

export class QueryJobLogDto extends PaginationDto {
  @IsOptional()
  jobName: string

  @IsOptional()
  jobGroup: string

  @IsOptional()
  status: string
}
