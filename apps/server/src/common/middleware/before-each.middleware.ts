import { randomUUID } from '@/utils'
import { UserContext } from '../context/user.context'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { CommonConstant } from '../constant/common.constant'

@Injectable()
export class BeforeEachMiddleware implements NestMiddleware {
  use(request: ExpressRequest, response: ExpressResponse, next: ExpressNextFunction): void {
    // 1. 生成请求唯一ID，绑定到请求对象并返回响应头
    const requestId = randomUUID()
    request[CommonConstant.REQUEST_ID_KEY] = requestId
    response.setHeader(CommonConstant.REQUEST_ID_HEADER, requestId)

    // 2. 从请求中获取用户信息，设置到当前请求上下文
    const user = request[CommonConstant.JWT_PAYLOAD] ?? ({} as AuthType.JwtPayload)
    UserContext.setCurrentUser(user.username ?? 'admin')

    // 3. 继续执行后续中间件/路由
    next()
  }
}
