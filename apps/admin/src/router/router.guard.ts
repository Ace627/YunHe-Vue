import { router } from '.'
import { RouterConstant } from '@/common'
import { getAccessToken } from '@/utils'
import { isWhiteList } from './router.helper'
import type { RouteLocationNormalized } from 'vue-router'

const NProgress = useProgress({ show: import.meta.env.VITE_ROUTER_NPROGRESS !== 'false' })

export async function globalRouterBeforeGuard(to: RouteLocationNormalized, from: RouteLocationNormalized) {
  // 仅在启用进度条且不是同路由跳转时启动（避免重复触发）
  if (from.fullPath !== to.fullPath) NProgress.start()
  const accessToken = getAccessToken()
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  // 已登录但要进入登录页 → 重定向到主页（把「已登录访问登录页」的逻辑提到最前面（避免被白名单拦截））
  if (accessToken && to.path.toLowerCase() === RouterConstant.LOGIN_PAGE_URL.toLowerCase()) {
    return { path: RouterConstant.HOME_PAGE_URL, replace: true }
  }

  // 如果在免登录的白名单中，直接放行
  if (isWhiteList(to)) {
    return
  }

  // 无 Token + 不在白名单 → 重定向到登录页（携带回跳地址）
  if (!accessToken) {
    return { path: RouterConstant.LOGIN_PAGE_URL, query: { redirect: to.fullPath } }
  }

  try {
    // 已有角色权限，直接放行
    if (userStore.roles && userStore.roles.length > 0) return
    // 未获取用户信息 → 拉取信息并生成动态路由
    await userStore.getInfo()
    await permissionStore.getRoutes()
    // 添加动态路由
    for (const route of permissionStore.dynamicRouteList) {
      router.addRoute(RouterConstant.LAYOUT_NAME, route)
    }
    // 动态路由添加后，重新导航到目标路由（replace: true 避免历史记录）
    return { ...to, replace: true }
  } catch (error: any) {
    console.error('路由守卫异常: ', error.menu ?? error)
    await userStore.logout()
    return { path: RouterConstant.LOGIN_PAGE_URL, query: { redirect: to.fullPath }, replace: true }
  }
}

export async function globalRouterAfterGuard() {
  NProgress.done()
}
