import { SetMetadata } from '@nestjs/common'
import { BusinessType } from '../constant/operalog.constant'
import { DecoratorConstant } from '../constant/decorator.constant'

export class OperLogOption {
  /* 操作模块 */
  title: string

  /* 操作类型 */
  businessType?: BusinessType = BusinessType.OTHER
}

export function OperLog(logOption: OperLogOption) {
  const option = Object.assign(new OperLogOption(), logOption)
  return SetMetadata(DecoratorConstant.OPERLOG, option)
}
