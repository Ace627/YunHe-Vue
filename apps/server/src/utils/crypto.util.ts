import crypto from 'node:crypto'

/**
 * 生成 RFC4122 标准 UUID v4
 * @returns 全局唯一标识符
 */
export function randomUUID() {
  return crypto.randomUUID()
}

/**
 * 生成 MD5 哈希（支持字符串、Buffer、二进制）
 * @param content 字符串或文件Buffer
 * @returns 32位小写MD5
 */
export function createMd5Hash(content: string | Buffer): string {
  return crypto.createHash('md5').update(content).digest('hex')
}

/**
 * 将字符串生成 16位 MD5 短哈希值
 * @param content 待哈希的字符串
 * @returns 16位 MD5 结果
 */
export function createMd5ShortHash(content: string | Buffer): string {
  return createMd5Hash(content).slice(8, 24)
}

/**
 * 生成 SHA256 哈希（密码、签名必用，比 MD5 安全）
 * @param content 字符串
 * @returns sha256 哈希
 */
export function createSha256(content: string | Buffer): string {
  return crypto.createHash('sha256').update(content).digest('hex')
}

/**
 * 生成随机字符串（验证码、token、盐值）
 * @param length 长度 默认 32
 * @returns 随机字符串
 */
export function createRandomString(length = 32): string {
  return crypto.randomBytes(length).toString('hex').slice(0, length)
}

/**
 * HMAC-SHA256 签名（接口签名、API 鉴权）
 * @param content 签名内容
 * @param secret 密钥
 * @returns 签名字符串
 */
export function createHmacSha256(content: string | Buffer, secret: string | Buffer): string {
  return crypto.createHmac('sha256', secret).update(content).digest('hex')
}

/**
 * 字符串 转 Base64 编码
 * @param text 原始字符串
 * @returns Base64 字符串
 */
export function stringToBase64(text: string): string {
  return Buffer.from(text, 'utf8').toString('base64')
}

/**
 * Base64 解码 回 原始字符串
 * @param base64 Base64编码字符串
 * @returns 解码后的原始字符串
 */
export function base64ToString(base64: string): string {
  return Buffer.from(base64, 'base64').toString('utf8')
}
