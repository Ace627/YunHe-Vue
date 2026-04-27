import argon2 from 'argon2'
import { isString } from 'lodash'

/**
 * 判断密码是否已为 Argon2 加密格式
 * - 尝试用任意字符串验证，若不抛出格式异常则说明是有效哈希
 * - 这样可以避免误判以 "$argon2" 开头的明文密码
 *
 * @param {string} password - 待检查的密码字符串
 * @returns {Promise<boolean>} 是否已加密
 */
async function isPasswordHashed(password: string): Promise<boolean> {
  try {
    if (!password || !isString(password)) return false
    await argon2.verify(password, 'dummy')
    return true
  } catch (error: any) {
    return false
  }
}

/**
 * 使用 Argon2 算法加密密码
 * - 自动判断是否已加密，避免重复加密
 * - 采用内存硬化算法，抗彩虹表攻击和 GPU 暴力破解
 * - 自动生成随机盐值，无需额外存储
 *
 * @param {string} password - 原始明文密码或已加密的哈希值
 * @returns {Promise<string>} 加密后的密码哈希值
 * @example
 * // 加密明文密码
 * const hashed = await encryptPassword('user123456')
 * // 直接返回已加密的密码（不重复加密）
 * const same = await encryptPassword(hashed)
 */
export async function encryptPassword(password: string): Promise<string> {
  const alreadyHashed = await isPasswordHashed(password)
  return alreadyHashed ? password : argon2.hash(password)
}

/**
 * 验证密码是否匹配
 * - 安全比较算法，防止时序攻击
 * - 即使输入无效也返回 false 而非抛出异常
 *
 * @param {string} plainPassword - 待验证的明文密码
 * @param {string} hashedPassword - 存储的加密密码哈希值
 * @returns {Promise<boolean>} 密码是否匹配
 * @example
 * // 验证登录密码
 * const isValid = await verifyPassword('user123456', hashedPassword)
 * // 匹配返回 true，不匹配返回 false
 */
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    if (!plainPassword || !hashedPassword) return false
    return await argon2.verify(hashedPassword, plainPassword)
  } catch {
    return false
  }
}
