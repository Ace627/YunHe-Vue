import { Module } from '@nestjs/common'
import { ServerModule } from './server/server.module'
import { LogModule } from './log/log.module'
import { OnlineModule } from './online/online.module'
import { CacheModule } from './cache/cache.module'
import { JobModule } from './job/job.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ServerModule, LogModule, OnlineModule, CacheModule, JobModule, HealthModule],
  exports: [ServerModule, LogModule, OnlineModule, CacheModule],
})
export class MonitorModule {}
