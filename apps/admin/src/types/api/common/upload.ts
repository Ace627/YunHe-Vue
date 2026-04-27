/** 秒传 + 断点续传检查参数 */
export interface CheckFileParams {
  /** 文件哈希值 */
  fileHash: string
}

/** 秒传 + 断点续传检查响应 */
export interface CheckFileResponse {
  /** 文件是否已存在（秒传） */
  isExist: boolean
  /** 已上传的分片哈希列表 */
  uploadedChunks: string[]
}

/** 合并分片参数 */
export interface MergeChunkParams {
  /** 文件哈希值 */
  fileHash: string
  /** 文件名 */
  fileName: string
}

/** 清理分片参数 */
export interface ClearChunkParams {
  /** 文件哈希值 */
  fileHash: string
}
