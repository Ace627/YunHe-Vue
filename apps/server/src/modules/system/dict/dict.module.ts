import { Module } from '@nestjs/common'
import { DictService } from './dict.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DictController } from './dict.controller'
import { DictDataEntity, DictTypeEntity } from '@/common'

@Module({
  imports: [TypeOrmModule.forFeature([DictDataEntity, DictTypeEntity])],
  controllers: [DictController],
  providers: [DictService],
  exports: [DictService],
})
export class DictModule {}
