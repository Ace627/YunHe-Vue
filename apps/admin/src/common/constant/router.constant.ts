export const RouterConstant = {
  /** 布局路由名称 */
  LAYOUT_NAME: 'Layout',

  /** 登录页地址 */
  LOGIN_PAGE_URL: '/login',

  /** 主页地址 */
  HOME_PAGE_URL: '/dashboard',

  /** 主页路由名称 */
  HOME_PAGE_NAME: 'Dashboard',

  /** 重定向页地址 */
  REDIRECT_PAGE_URL: '/redirect',

  /** 基础路由路径 */
  BASE_ROUTE_PATH: import.meta.env.VITE_PUBLIC_PATH ?? '/',

  /** 路由模式 */
  ROUTER_MODE: import.meta.env.VITE_ROUTER_MODE ?? 'hash',

  /** 白名单路由路径 */
  PATH_WHITE_LIST: ['/login', '/register'],
}
