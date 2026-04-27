import { CacheConstant } from '@/common'
import { CacheUtil } from '../cache.util'
import type { RouteLocationNormalizedGeneric } from 'vue-router'

export type TagView = Partial<RouteLocationNormalizedGeneric>
export type TagViewKey = keyof TagView

export function setVisitedViews(views: TagView[]): void {
  // 删除不必要的属性，防止 JSON.stringify 处理到循环引用
  const delKeys: TagViewKey[] = ['matched', 'redirectedFrom']
  for (const view of views) delKeys.forEach((key) => delete view[key])
  CacheUtil.set(CacheConstant.VISITED_VIEWS, views)
}

export function getVisitedViews(): TagView[] {
  return CacheUtil.get(CacheConstant.VISITED_VIEWS) ?? []
}

export function setCachedViews(views: string[]): void {
  CacheUtil.set(CacheConstant.CACHED_VIEWS, views)
}

export function getCachedViews(): string[] {
  return CacheUtil.get(CacheConstant.CACHED_VIEWS) ?? []
}
