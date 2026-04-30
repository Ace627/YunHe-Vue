import { Module } from '@nestjs/common'
import { JobService } from './job.service'
import { BullModule } from '@nestjs/bullmq'
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
        return {
          forceDisconnectOnShutdown: true,
          connection: { ...configService.get<RedisOptions>(ConfigConstant.REDIS_CONFIG, {}) },
        }
      },
    }),
  ],
  controllers: [JobController],
  providers: [JobService, JobProcessor],
})
export class JobModule {}
