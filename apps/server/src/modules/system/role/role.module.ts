import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity, UserEntity } from '@/common'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { MenuModule } from '../menu/menu.module'

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity]), MenuModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
