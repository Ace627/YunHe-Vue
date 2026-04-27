import { defaultDbFile, newWithFileOnly } from 'ip2region-ts'

// 初始化 Searcher 实例
const searcher = newWithFileOnly(defaultDbFile)

/**
 * 企业级标准：获取客户端真实 IP
 * - 兼容 Nginx / Caddy / 阿里云 / 腾讯云 / K8s 等反向代理环境
 * @param {ExpressRequest} request - Express 请求对象
 * @returns {string} 客户端真实 IP 地址
 * @example
 * // 正常请求
 * getRequestIp(req) // 返回客户端 IP
 * // 反向代理请求
 * getRequestIp(req) // 返回原始客户端 IP
 */
export function getRequestIp(request: ExpressRequest): string {
  const xForwardedFor = request.headers['x-forwarded-for']
  const xRealIp = request.headers['x-real-ip']
  const remoteIp = request.socket.remoteAddress
  let ip = ''
  if (xForwardedFor) {
    ip = Array.isArray(xForwardedFor) ? xForwardedFor[0] : xForwardedFor
    ip = ip.split(',')[0]?.trim() || ''
  } else if (xRealIp) {
    ip = Array.isArray(xRealIp) ? xRealIp[0] : xRealIp
    ip = ip.trim()
  } else if (remoteIp) {
    ip = remoteIp
  }
  return ip.replace('::ffff:', '').replace('::1', '127.0.0.1').trim()
}

/**
 * 判断是否为内网 IP 地址
 * - 支持 IPv4 内网地址段：127.0.0.0/8、10.0.0.0/8、172.16.0.0/12、192.168.0.0/16
 * @param {string} ip - IP 地址字符串
 * @returns {boolean} 是否为内网 IP
 * @example
 * // 内网 IP
 * isInternalIp('192.168.1.1') // 返回 true
 * // 外网 IP
 * isInternalIp('8.8.8.8') // 返回 false
 */
export function isInternalIp(ip: string): boolean {
  if (!ip) return false
  const regex = /^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.)/
  return regex.test(ip.trim())
}

/**
 * 根据 IP 地址获取位置信息
 * @param ip - IP 地址字符串
 * @returns {Promise<string>} 位置信息字符串
 */
export async function getLocationByIP(ip: string): Promise<string> {
  try {
    if (!ip) return '未知位置'
    if (isInternalIp(ip)) return '内网IP'
    const data = await searcher.search(ip)
    const region = data?.region || ''
    if (!region) return '未知位置'
    const [country, _, province, city, isp] = region.split('|')
    const location = `${province || ''} ${city || ''}`.trim()
    return location || '未知位置'
  } catch (error) {
    return '未知位置'
  }
}
