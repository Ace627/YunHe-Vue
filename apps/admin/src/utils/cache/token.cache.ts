import { CacheConstant } from '@/common'
import { CacheUtil } from '../cache.util'

/** 设置 Access Token */
export function setAccessToken(accessToken: string): void {
  CacheUtil.set(CacheConstant.ACCESS_TOKEN, accessToken)
}

/** 获取 Access Token */
export function getAccessToken(): string | null {
  return CacheUtil.get(CacheConstant.ACCESS_TOKEN)
}

/** 移除 Access Token */
export function removeAccessToken(): void {
  CacheUtil.del(CacheConstant.ACCESS_TOKEN)
}

/** 设置 Refresh Token */
export function setRefreshToken(refreshToken: string): void {
  CacheUtil.set(CacheConstant.REFRESH_TOKEN, refreshToken)
}

/** 获取 Refresh Token */
export function getRefreshToken(): string | null {
  return CacheUtil.get(CacheConstant.REFRESH_TOKEN)
}

/** 移除 Refresh Token */
export function removeRefreshToken(): void {
  CacheUtil.del(CacheConstant.REFRESH_TOKEN)
}
