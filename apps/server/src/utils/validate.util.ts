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

export function isStringNumber(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const trimmedValue = value.trim()
  if (trimmedValue === '') return false
  return /^-?\d+(\.\d+)?$/.test(trimmedValue) // 匹配整数或浮点数
}
