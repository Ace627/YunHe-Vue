import { CacheConstant } from '@/common'
import { CacheUtil } from '../cache.util'

/** 设置组件大小的缓存值 */
export function setComponentSize(size: ComponentSize): void {
  CacheUtil.set(CacheConstant.COMPONENT_SIZE, size)
}

/** 获取组件大小的缓存值 */
export function getComponentSize(): ComponentSize {
  return CacheUtil.get(CacheConstant.COMPONENT_SIZE) || 'default'
}

/** 删除组件大小的缓存值 */
export function removeComponentSize(): void {
  CacheUtil.del(CacheConstant.COMPONENT_SIZE)
}
