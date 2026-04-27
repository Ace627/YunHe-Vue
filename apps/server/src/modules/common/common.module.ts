import { Global, Module } from '@nestjs/common'
import { EmailModule } from './email/email.module'
import { UploadModule } from './upload/upload.module'
import { ExcelModule } from './excel/excel.module'

@Global()
@Module({
  imports: [UploadModule, EmailModule, ExcelModule],
  exports: [UploadModule, EmailModule, ExcelModule],
})
export class CommonModule {}
