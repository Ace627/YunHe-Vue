import { SharedModule } from './shared/shared.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { configuration } from '@/utils'
import { SystemModule } from './modules/system/system.module'
import { MonitorModule } from './modules/monitor/monitor.module'
import { CommonModule } from './modules/common/common.module'
import { AllExceptionsFilter } from '@/common'
import { BeforeEachMiddleware } from '@/common'
import { TokenModule, DatabaseModule } from '@/common'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common'
import { JwtAuthGuard, ThrottlerLimitGuard, DemoEnvironmentGuard, PermissionAuthGuard } from '@/common'
import { ReponseTransformInterceptor, ResponseCacheInterceptor, OperationLogInterceptor } from '@/common'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], ignoreEnvFile: false, isGlobal: true, cache: true }), // 加载配置文件
    DatabaseModule, // 数据库模块
    TokenModule, // 令牌模块
    CommonModule, // 公共模块（Upload、Excel 等通用功能）
    SharedModule, // 共享模块
    AuthModule, // 认证模块
    SystemModule, // 系统管理模块
    MonitorModule, // 系统监控模块
  ],

  providers: [
    // 限制接口请求频率，防止滥用
    { provide: APP_GUARD, useClass: ThrottlerLimitGuard },
    // 资源访问 Token 凭证权限校验守卫
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    // 接口访问权限守卫 | 检查用户是否有权限访问当前接口
    { provide: APP_GUARD, useClass: PermissionAuthGuard },
    // 演示环境操作守卫
    { provide: APP_GUARD, useClass: DemoEnvironmentGuard },
    // 配置全局验证管道，用于验证请求参数和响应数据
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true, transform: true, stopAtFirstError: true }) },
    // 全局异常过滤器，用于处理所有未捕获的异常
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    // 操作日志拦截器，用于记录所有接口请求和响应
    { provide: APP_INTERCEPTOR, useClass: OperationLogInterceptor },
    // 该拦截器会对应用中指定接口的响应进行缓存处理（如命中缓存直接返回、未命中则写入缓存）
    { provide: APP_INTERCEPTOR, useClass: ResponseCacheInterceptor },
    // 该拦截器会对应用中所有接口的响应进行统一处理（如包装响应格式、添加耗时统计）
    { provide: APP_INTERCEPTOR, useClass: ReponseTransformInterceptor },
  ],
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer): Promise<void> {
    // 所有接口都应用用户上下文中间件，用于从请求中获取登录用户信息并存入全局上下文
    consumer.apply(BeforeEachMiddleware).forRoutes('')
  }
}
