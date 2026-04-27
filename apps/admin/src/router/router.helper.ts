import { CommonConstant, RouterConstant } from '@/common'
import Layout from '@/layout/index.vue'
import InnerLink from '@/components/InnerLink/index.vue'
import ParentView from '@/components/ParentView/index.vue'
import type { DefineComponent } from 'vue'
import { camelCase, upperFirst } from 'lodash-es'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import type { MenuEntity } from '@/types'
import { isExternal } from '@/utils'

/** 首先把你需要动态路由的组件地址全部获取 [vue2 中可以直接用拼接的方式，但是 vue3 中必须用这种方式] */
const views = import.meta.glob<{ default: DefineComponent }>('@/views/**/*.vue', { eager: false }) // 显式声明懒加载（默认）

export function isWhiteList(to: RouteLocationNormalized): boolean {
  return RouterConstant.PATH_WHITE_LIST.includes(to.path)
}

/**
 * 动态加载路由组件 + 自动设置组件 name
 * @param componentPath 菜单对应的组件路径（如：system/user）
 * @returns 路由懒加载组件（自动绑定 name）
 */
export function loadView(componentPath: string) {
  if (componentPath === 'Layout') return Layout
  if (componentPath === 'InnerLink') return InnerLink
  if (componentPath === 'ParentView') return ParentView
  for (const path in views) {
    const viewRelativePath = path.split('views/')[1].split('.vue')[0]
    if (viewRelativePath !== componentPath) continue
    const componentName = upperFirst(camelCase(componentPath.replace('index', '')))
    const component = views[path]
    return () => component().then((comp) => ((comp.default.name = componentName), comp))
  }
  console.error(`组件不存在：src/views/${componentPath}.vue`)
}

export function generateRouteName(menu: MenuEntity) {
  return menu.component ? upperFirst(camelCase(menu.component.replace('index', ''))) : upperFirst(camelCase(menu.path))
}
export function generateRoutePath(menu: MenuEntity) {
  return menu.parentId === '0' ? `/${menu.path}` : menu.path
}
export function generateRoutes(backRoutes: MenuEntity[], parentId: string = '0') {
  const routes: RouteRecordRaw[] = []
  for (const backRoute of backRoutes) {
    if (backRoute.parentId !== parentId) continue
    const route = {} as RouteRecordRaw
    route.name = generateRouteName(backRoute)
    route.path = generateRoutePath(backRoute)
    route.redirect = backRoute.parentId === '0' && backRoute.menuType === 'M' ? '/404' : undefined
    if (backRoute.component) route.component = loadView(backRoute.component)
    route.meta = {}
    route.meta.hidden = backRoute.visible === CommonConstant.STATUS_DISABLE
    route.meta.keepAlive = backRoute.isCache === CommonConstant.STATUS_NORMAL
    route.meta.alwaysShow = backRoute.menuType === 'M'
    route.meta.title = backRoute.menuName
    route.meta.icon = backRoute.icon
    const childrenRoutes = generateRoutes(backRoutes, backRoute.id)
    if (childrenRoutes.length > 0) route.children = childrenRoutes
    routes.push(route)
  }
  return routes
}

export function normalizePath(path: string): string {
  return path ? path.replace(/\/+/g, '/').replace(/\/$/, '') : path
}

export function resolvePath(routePath: string, basePath: string): string {
  if (isExternal(routePath)) return routePath
  if (isExternal(basePath)) return basePath
  return normalizePath(basePath + '/' + routePath)
}
