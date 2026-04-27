export class CacheUtil {
  /**
   * 设置缓存
   * @param {string} key 缓存键
   * @param {*} value 缓存值
   * @param {number} ttl 过期时间（单位：秒），-1 表示永不过期
   */
  static set(key: string, value: any, ttl: number = -1) {
    const data = { value, ttl: ttl === -1 ? ttl : Date.now() + ttl * 1000 }
    localStorage.setItem(key, JSON.stringify(data))
  }

  /**
   * 获取缓存
   * @param {string} key 缓存键
   * @param defaultValue 缓存不存在或过期时的默认值
   * @returns 缓存值或默认值
   */
  static get<T = any>(key: string, defaultValue: T | null = null): T | null {
    const jsonStr = localStorage.getItem(key)
    if (!jsonStr) return defaultValue
    const data = JSON.parse(jsonStr)
    if (Date.now() <= data.ttl || data.ttl === -1) return data.value
    localStorage.removeItem(key)
    return defaultValue
  }

  /**
   * 删除缓存
   * @param {string} key 缓存键
   */
  static del(key: string) {
    localStorage.removeItem(key)
  }

  /**
   * 清除所有缓存
   */
  static flushall() {
    localStorage.clear()
  }

  /**
   * 获取所有缓存键
   * @returns {string[]} 缓存键数组
   */
  static keys(pattern: string = '*'): string[] {
    const allKeys = Object.keys(localStorage)
    const regexPattern = pattern.replace(/\*/g, '.*')
    const regex = new RegExp(`^${regexPattern}$`)
    return allKeys.filter((key) => regex.test(key))
  }

  /**
   * 检查缓存是否存在且未过期
   * @param {string} key 缓存键
   * @returns {boolean} 是否存在有效缓存
   */
  static exists(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * 获取缓存剩余过期时间（秒）
   * -1 = 永久有效
   * -2 = 已过期/不存在
   */
  static ttl(key: string): number {
    try {
      const item = localStorage.getItem(key)
      if (!item) return -2
      const data = JSON.parse(item)
      if (data.ttl === -1) return -1
      const remaining = data.ttl - Date.now()
      return remaining > 0 ? Math.floor(remaining / 1000) : -2
    } catch {
      return -2 // 解析失败，视为无效缓存
    }
  }

  /**
   * 动态设置缓存过期时间
   * @param key 缓存键
   * @param ttl 过期时间（秒）
   * @returns 是否设置成功
   */
  static expire(key: string, ttl: number): boolean {
    const value = this.get(key)
    if (value === null) return false
    this.set(key, value, ttl)
    return true
  }
}
