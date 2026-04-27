import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { DictModule } from './dict/dict.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [UserModule, DictModule, RoleModule, MenuModule],
  exports: [UserModule],
})
export class SystemModule {}
