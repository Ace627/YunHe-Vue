import { isString } from 'lodash-es'

/**
 * 判断链接是否为外部链接
 * @param value - 待判断的链接/路径
 * @returns boolean
 */
export function isExternal(value: any): boolean {
  if (!isString(value)) return false
  const trimmedValue = value.trim()
  if (trimmedValue === '') return false
  return /^(https?:|ftp:|sftp:|mailto:|tel:|file:|\/\/)/i.test(trimmedValue)
}

/**
 * 判断字符串是否为有效的数字格式
 * 支持整数、小数、负数和科学计数法
 * @param value - 待判断的值
 * @returns boolean
 */
export function isStringNumber(value: any): value is string {
  if (!isString(value)) return false
  const trimmedValue = value.trim()
  if (trimmedValue === '') return false
  return /^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(trimmedValue)
}

/**
 * 判断字符串是否为有效的 JSON 格式
 * @param value - 待判断的值
 * @returns boolean
 */
export function isJsonString(value: any): value is string {
  if (!isString(value)) return false
  const trimmedValue = value.trim()
  if (trimmedValue === '') return false
  try {
    JSON.parse(trimmedValue)
    return true
  } catch {
    return false
  }
}
