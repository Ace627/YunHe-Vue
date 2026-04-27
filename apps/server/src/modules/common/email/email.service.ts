import { Injectable, Logger } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)

  constructor(private readonly mailerService: MailerService) {}

  /**
   * 基础发送方法（统一收口，所有发邮件都走这里）
   */
  async sendMail(options: { to: string; subject: string; html?: string; text?: string; from?: string }) {
    const { to, subject, html, text } = options
    await this.mailerService.sendMail({ to, subject, html, text })
    this.logger.log(`✅ 邮件发送成功 → ${to}（主题：${subject}）`)
    return true
  }

  /**
   * 发送验证码（最常用）
   */
  async sendCaptcha(to: string, code: string, expiresIn = 5) {
    const subject = '账号安全验证'
    const template = 'email/captcha' // 验证码模板在模板目录的路径，例如：email/captcha.hbs
    const context = { code, expiresIn }
    return this.mailerService.sendMail({ to, subject, template, context })
  }

  /**
   * 发送系统公告通知
   */
  async sendSystemNotice(to: string, title: string, content: string) {
    const subject = `【系统通知】${title}`
    const template = 'email/notice' // 系统公告模板在模板目录的路径，例如：email/notice.hbs
    const context = { title, content }
    return this.mailerService.sendMail({ to, subject, template, context })
  }

  /**
   * 发送异常告警（给运维/管理员）
   */
  async sendAdminAlert(to: string, errorMessage: string) {
    const subject = '⚠️ 系统异常告警'
    const template = 'email/alert' // 异常告警模板在模板目录的路径，例如：email/alert.hbs
    const context = { errorMessage }
    return this.mailerService.sendMail({ to, subject, template, context })
  }
}
