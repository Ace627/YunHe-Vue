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
  static clear() {
    localStorage.clear()
  }

  /**
   * 获取所有缓存键
   * @returns {string[]} 缓存键数组
   */
  static keys(): string[] {
    return Object.keys(localStorage)
  }

  /**
   * 检查缓存是否存在且未过期
   * @param {string} key 缓存键
   * @returns {boolean} 是否存在有效缓存
   */
  static exists(key: string): boolean {
    return this.get(key) !== null
  }
}
