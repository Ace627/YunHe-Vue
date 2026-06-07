import { isJsonString } from '@yunhe/utils'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

/** 正在请求中的 key 集合 */
const pendingMap = new Set<string>()

/**
 * 稳定序列化
 * - 保证相同数据生成相同字符串
 * - 支持对象排序 / FormData / File / 循环引用
 */
function stableStringify(value: any, seen = new WeakSet()): string {
  // 1. 处理 null 和 undefined（保证输出合法 JSON）
  if (value === null || value === undefined) return 'null'
  // 2. 处理 BigInt（因为原生 JSON.stringify 不支持）
  if (typeof value === 'bigint') return JSON.stringify(value.toString())
  // 3. 处理 Date，加上 JSON.stringify 以获得双引号字符串
  if (value instanceof Date) return JSON.stringify(value.toISOString())
  // 4. 处理 FormData
  if (value instanceof FormData) {
    const obj: Record<string, any> = {}
    value.forEach((v, k) => {
      const currentValue = v instanceof File ? { name: v.name, size: v.size, type: v.type, lastModified: v.lastModified } : v
      obj[k] = k in obj ? (Array.isArray(obj[k]) ? [...obj[k], currentValue] : [obj[k], currentValue]) : currentValue
    })
    return stableStringify(obj, seen)
  }
  // 5. 基础类型（除了 object 和 bigint）
  if (typeof value === 'function' || typeof value === 'symbol') return 'null'
  // 6. 所有非 object 类型（确保不会再往下走到 WeakSet）
  if (typeof value !== 'object' || value === null) return JSON.stringify(value)
  // 7. 防止 seen 参数被外部篡改
  if (!(seen instanceof WeakSet)) seen = new WeakSet()
  // 8. 循环引用检测（此时 value 必然是对象）
  if (seen.has(value)) return '"[Circular]"'
  seen.add(value)
  // 9. 数组
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item, seen)).join(',')}]`
  // 10. 普通对象（按键排序）
  const keys = Object.keys(value).sort()
  return `{${keys
    .filter((key) => value[key] !== undefined)
    .map((key) => `"${key}":${stableStringify(value[key], seen)}`)
    .join(',')}}`
}

/** 生成请求唯一 key */
function getPendingKey(config: AxiosRequestConfig) {
  const { url, method, params = {} } = config
  const data = isJsonString(config.data) ? JSON.parse(config.data) : config.data
  return [method, url, stableStringify(params), stableStringify(data)].join('&')
}

/**
 * 防重复提交拦截器
 * 对 POST / PUT / DELETE 请求基于 url + method + params + data 生成唯一 key，
 * 重复请求直接拒绝，防止短时间内多次提交
 * @param instance Axios 实例
 */
export function repeatSubmitInterceptor(instance: AxiosInstance) {
  // 请求拦截
  instance.interceptors.request.use((config) => {
    const method = config.method?.toUpperCase() || ''
    // 只拦截提交类请求
    if (!['POST', 'PUT', 'DELETE'].includes(method)) return config
    const key = getPendingKey(config)
    // 存在重复请求
    if (pendingMap.has(key)) return Promise.reject(new Error('请求正在处理中，请勿重复提交'))
    // 记录请求
    pendingMap.add(key)
    return config
  })

  // 响应拦截
  instance.interceptors.response.use(
    (response) => {
      const config = response.config
      // 请求完成后移除
      if (config?.url) {
        const key = getPendingKey(config)
        pendingMap.delete(key)
      }
      return response
    },
    (error) => {
      const config = error?.config
      // 请求异常后移除
      if (config?.url) {
        const key = getPendingKey(config)
        pendingMap.delete(key)
      }

      return Promise.reject(error)
    },
  )
}
