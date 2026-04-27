import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { JobService } from './job.service'
import { type RedisOptions } from 'ioredis'
import { ConfigService } from '@nestjs/config'
import { DiscoveryModule } from '@nestjs/core'
import { JobProcessor } from './job.processor'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JobController } from './job.controller'
import { BullConstant, ConfigConstant, JobEntity, JobLogEntity } from '@/common'

@Module({
  imports: [
    DiscoveryModule,
    TypeOrmModule.forFeature([JobEntity, JobLogEntity]),
    /** 注册一个定时任务队列 */
    BullModule.registerQueueAsync({
      name: BullConstant.QUEUE_NAME,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisConfig = configService.get<RedisOptions>(ConfigConstant.REDIS_CONFIG, {})
        return { redis: { ...redisConfig } }
      },
    }),
  ],
  controllers: [JobController],
  providers: [JobService, JobProcessor],
})
export class JobModule {}
