import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { LogModule } from '../monitor/log/log.module'
import { UserModule } from '../system/user/user.module'
import { MenuModule } from '../system/menu/menu.module'

@Module({
  imports: [UserModule, LogModule, MenuModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
