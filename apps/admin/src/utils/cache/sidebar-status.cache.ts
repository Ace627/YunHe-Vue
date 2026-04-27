import { isBoolean } from 'lodash-es'
import { CacheConstant } from '@/common'
import { CacheUtil } from '../cache.util'

/** 设置侧边栏状态 */
export function setSidebarStatus(value: boolean): void {
  CacheUtil.set(CacheConstant.SIDEBAR_STATUS, value)
}

/** 获取侧边栏状态 */
export function getSidebarStatus(defaultValue = false): boolean {
  const value = CacheUtil.get<boolean>(CacheConstant.SIDEBAR_STATUS)
  return isBoolean(value) ? value : defaultValue
}

/** 移除侧边栏状态 */
export function removeSidebarStatus(): void {
  CacheUtil.del(CacheConstant.SIDEBAR_STATUS)
}
