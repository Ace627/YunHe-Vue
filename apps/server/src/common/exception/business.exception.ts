import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 自定义 API 异常类，继承自 NestJS 内置的 HttpException
 * 用于统一处理业务逻辑异常，支持自定义错误码和错误消息
 * 与全局异常过滤器配合使用，返回标准化的错误响应
 */
export class BusinessException extends HttpException {
  /** 业务错误码（区别于 HTTP 状态码，用于更精细的错误分类） */
  private code: number

  /**
   * 构造函数：创建自定义异常实例
   * @param message 错误提示消息（将返回给客户端）
   * @param code 业务错误码（默认：500 服务器内部错误）
   */
  constructor(message: string, code?: number) {
    // 权限问题一律使用 401 错误码
    if (code && code === HttpStatus.UNAUTHORIZED) {
      super(message, HttpStatus.OK) // HTTP 状态码设为 200（前端可统一处理 JSON 中的错误信息）
      this.code = HttpStatus.UNAUTHORIZED // 业务错误码保留 401，用于前端判断具体错误类型
    }
    // 其他业务异常：HTTP 状态码默认 200，业务错误码一律使用 500 错误码
    else {
      super(message, code ?? HttpStatus.OK)
      this.code = code ?? HttpStatus.INTERNAL_SERVER_ERROR
    }
  }

  getCode(): number {
    return this.code
  }
}
