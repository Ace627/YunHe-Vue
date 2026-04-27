/**
 * 判断链接是否为外部链接
 * @param value - 待判断的链接/路径
 * @returns boolean
 */
export function isExternal(value: unknown): value is string {
  if (typeof value !== 'string') return false
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
export function isStringNumber(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const trimmedValue = value.trim()
  if (trimmedValue === '') return false
  return /^-?\d+(\.\d+)?$/.test(trimmedValue) // 匹配整数或浮点数
}

/**
 * 判断字符串是否为有效的 JSON 格式
 * @param value - 待判断的值
 * @returns boolean
 */
export function isJsonString(value: unknown): value is string {
  try {
    if (typeof value !== 'string') return false
    const trimmedValue = value.trim()
    if (trimmedValue === '') return false
    if (trimmedValue[0] !== '{' && trimmedValue[0] !== '[') return false
    JSON.parse(trimmedValue)
    return true
  } catch {
    return false
  }
}
