import dayjs from 'dayjs'

/**
 * 格式化时间
 * @description 使用 dayjs 将日期对象/时间戳/字符串格式化为指定格式的日期字符串
 * @param date - 待格式化的时间，支持时间戳、Date对象、日期字符串，默认为当前时间
 * @param format - 日期格式化模板，默认为 YYYY-MM-DD HH:mm:ss
 * @returns 格式化后的日期字符串
 */
export function formatTime(date: dayjs.ConfigType = dayjs(), format: string = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}

/**
 * 根据当前时间生成问候语
 * @example 上午好 / 中午好 / 下午好 / 晚上好
 * @param date 可选参数，指定时间，默认当前系统时间
 */
export function getTimeGreeting(date?: Date) {
  const hour = date ? new Date(date).getHours() : new Date().getHours()
  if (hour >= 0 && hour < 6) return '凌晨好'
  if (hour >= 6 && hour < 12) return '上午好'
  if (hour >= 12 && hour < 14) return '中午好'
  if (hour >= 14 && hour < 18) return '下午好'
  return '晚上好'
}
