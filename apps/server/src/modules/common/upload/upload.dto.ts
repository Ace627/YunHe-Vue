import { IsNotEmpty } from 'class-validator'

export class CheckFileDto {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  fileHash: string
}

export class UploadChunkDto {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  fileHash: string

  @IsNotEmpty({ message: '参数 $property 不能为空' })
  chunkHash: string
}

export class MergeChunkDto {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  fileHash: string

  @IsNotEmpty({ message: '参数 $property 不能为空' })
  fileName: string
}

export class ClearChunkDto {
  @IsNotEmpty({ message: '参数 $property 不能为空' })
  fileHash: string
}
