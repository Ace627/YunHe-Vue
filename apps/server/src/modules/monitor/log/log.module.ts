import { Module } from '@nestjs/common'
import { LogService } from './log.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LogController } from './log.controller'
import { LogininforEntity, OperLogEntity } from '@/common'

@Module({
  imports: [TypeOrmModule.forFeature([LogininforEntity, OperLogEntity])],
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
