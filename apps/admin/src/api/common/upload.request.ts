import { request } from '@/utils/request'
import type { CheckFileParams, CheckFileResponse, ClearChunkParams, MergeChunkParams } from '@/types'

export abstract class uploadRequest {
  /** 单文件上传 */
  static uploadFile(data: FormData): Promise<string> {
    return request.post('/common/upload/file', data, { headers: { 'Content-Type': 'multipart/form-data' } })
  }

  /** 秒传 + 断点续传检查 */
  static checkFile(data: CheckFileParams): Promise<CheckFileResponse> {
    return request.post('/common/upload/check', data)
  }

  /** 上传单个分片 */
  static uploadChunk(data: FormData): Promise<string> {
    return request.post('/common/upload/chunk', data)
  }

  /** 合并所有分片 */
  static mergeChunks(data: MergeChunkParams): Promise<string> {
    return request.post('/common/upload/chunk/merge', data)
  }

  /** 清理分片 */
  static clearChunk(data: ClearChunkParams): Promise<string> {
    return request.post('/common/upload/chunk/clear', data)
  }
}
