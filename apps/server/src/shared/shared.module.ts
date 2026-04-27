import { Global, Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { CaptchaService } from './captcha.service'

const services = [RedisService, CaptchaService]

@Global()
@Module({
  providers: services,
  exports: services,
})
export class SharedModule {}
