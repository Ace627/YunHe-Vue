import { resolve } from 'node:path'
import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { ConfigService } from '@nestjs/config'
import { EmailController } from './email.controller'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter'
import { ConfigConstant } from '@/common'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isDev = process.env.NODE_ENV === 'development'
        // 邮件模板目录
        const TEMPLATE_DIR = isDev ? 'public/template' : 'template'

        return {
          transport: {
            // 邮件传输配置
            host: configService.get<string>(ConfigConstant.EMAIL_HOST, 'smtp.qq.com'), // SMTP 服务器地址
            port: configService.get<number>(ConfigConstant.EMAIL_PORT, 465), // SMTP 服务器端口
            secure: configService.get<boolean>(ConfigConstant.EMAIL_SECURE, true), // 是否使用安全连接
            auth: {
              user: configService.get<string>(ConfigConstant.EMAIL_FROM), // 发件邮箱账号
              pass: configService.get<string>(ConfigConstant.EMAIL_CODE), // 邮箱授权码
            },
          },
          defaults: {
            // 默认配置
            from: configService.get<string>(ConfigConstant.EMAIL_FROM), // 默认发件邮箱
          },
          template: {
            // 邮件模板配置
            dir: resolve(process.cwd(), TEMPLATE_DIR), // 模板文件目录
            adapter: new HandlebarsAdapter(), // 模板渲染适配器
          },
        }
      },
      inject: [ConfigService],
    }),
  ],

  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
