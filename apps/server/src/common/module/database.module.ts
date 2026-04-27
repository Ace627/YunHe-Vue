import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigConstant } from '../constant/config.constant'

/**
 * @link https://www.typeorm.net/connection-options
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          // 数据库类型：此处指定为 MySQL，支持 oracle/sqlite/mongodb 等
          type: 'mysql',
          // 数据库服务器地址：从配置中读取，默认 127.0.0.1
          host: configService.get<string>(ConfigConstant.DATABASE_HOST, '127.0.0.1'),
          // 数据库服务器端口：从配置中读取，默认 MySQL 默认端口 3306
          port: configService.get<number>(ConfigConstant.DATABASE_PORT, 3306),
          // 数据库登录用户名：从配置中读取，默认 root
          username: configService.get<string>(ConfigConstant.DATABASE_USERNAME, 'root'),
          // 数据库登录密码：从配置中读取，默认 123456
          password: configService.get<string>(ConfigConstant.DATABASE_PASSWORD, '123456'),
          // 要连接的数据库名称：从配置中读取，默认 nestdb
          database: configService.get<string>(ConfigConstant.DATABASE_DATABASE, 'nestdb'),
          // 自动同步数据表结构：开发环境可开启，生产环境必须关闭（避免数据丢失）
          // 兜底值为 false，保障生产环境安全
          synchronize: configService.get<boolean>(ConfigConstant.DATABASE_SYNCHRONIZE, false),
          // 是否自动加载所有实体（无需手动在 entities 数组中注册）
          autoLoadEntities: true,
          // 时区配置：东八区（+08:00），解决数据库时间与本地时间不一致问题
          timezone: '+08:00',
          // 启用自动重连：数据库连接断开后自动尝试重连，提升服务稳定性
          reconnect: true,
          // 连接重试延迟时间：5000 毫秒（5秒），默认 3000 毫秒
          retryDelay: 5 * 1000,
          // 慢查询阈值：3000 毫秒（3秒），超过该时间的查询会被记录为慢查询
          maxQueryExecutionTime: 3 * 1000,
          // 最大连接重试次数：10 次，默认 10 次，失败后停止重试
          retryAttempts: 10,
          // 数据库连接池大小：10 个连接，优化并发查询性能
          poolSize: 10,
          // 数据库字符集与排序规则：utf8mb4 支持 emoji 表情，unicode_ci 大小写不敏感
          charset: configService.get<string>(ConfigConstant.DATABASE_CHARSET, 'utf8mb4_unicode_ci'),
          // logging: true,
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
