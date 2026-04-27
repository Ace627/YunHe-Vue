import { RouterConstant } from '@/common'
import Layout from '@/layout/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export const STATIC_ROUTE_LIST: RouteRecordRaw[] = [
  {
    path: RouterConstant.REDIRECT_PAGE_URL,
    name: 'Redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect.vue'),
      },
    ],
  },
  {
    path: RouterConstant.LOGIN_PAGE_URL,
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: { hidden: true, title: '登录' },
  },
  {
    path: '',
    name: RouterConstant.LAYOUT_NAME,
    redirect: RouterConstant.HOME_PAGE_URL,
    component: Layout,
    children: [
      {
        path: RouterConstant.HOME_PAGE_URL,
        name: RouterConstant.HOME_PAGE_NAME,
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'Home', affix: true },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/404',
    meta: { hidden: true },
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index.vue'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'User' },
      },
    ],
  },
  {
    path: '/system/dict/data',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '',
        component: () => import('@/views/system/dict/data.vue'),
        name: 'DictData',
        meta: { title: '字典数据', icon: 'Dict', activeMenu: '/system/dict' },
      },
    ],
  },
  {
    path: '/monitor/job/log',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '',
        name: 'JobLog',
        component: () => import('@/views/monitor/job/log.vue'),
        meta: { title: '调度日志', icon: 'Log', activeMenu: '/monitor/job' },
      },
    ],
  },

  // Temp
  // {
  //   path: '/system',
  //   name: 'System',
  //   component: Layout,
  //   redirect: '/404',
  //   meta: { title: '系统管理', icon: 'Setting', alwaysShow: true },
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'User',
  //       component: () => import('@/views/system/user/index.vue'),
  //       meta: { title: '用户管理', icon: 'User' },
  //     },
  //     {
  //       path: 'role',
  //       name: 'Role',
  //       component: () => import('@/views/system/role/index.vue'),
  //       meta: { title: '角色管理', icon: 'Role' },
  //     },
  //     {
  //       path: 'menu',
  //       name: 'Menu',
  //       component: () => import('@/views/system/menu/index.vue'),
  //       meta: { title: '菜单管理', icon: 'Menu' },
  //     },
  //     {
  //       path: 'dict/type',
  //       name: 'DictType',
  //       component: () => import('@/views/system/dict/index.vue'),
  //       meta: { title: '字典管理', icon: 'Dict' },
  //     },
  //     {
  //       path: 'dict/data',
  //       name: 'DictData',
  //       component: () => import('@/views/system/dict/data.vue'),
  //       meta: { title: '字典数据', icon: 'Dict', hidden: true, activeMenu: '/system/dict/type' },
  //     },
  //     {
  //       path: 'icon',
  //       name: 'Icon',
  //       component: () => import('@/views/system/icon/index.vue'),
  //       meta: { title: '图标管理', icon: 'Image' },
  //     },
  //   ],
  // },
  // {
  //   path: '/monitor',
  //   name: 'Monitor',
  //   component: Layout,
  //   redirect: '/404',
  //   meta: { title: '系统监控', icon: 'Monitor', alwaysShow: true },
  //   children: [
  //     {
  //       path: 'online',
  //       name: 'Online',
  //       component: () => import('@/views/monitor/online/index.vue'),
  //       meta: { title: '在线用户', icon: 'Online' },
  //     },
  //     {
  //       path: 'cache',
  //       name: 'Cache',
  //       component: () => import('@/views/monitor/cache/index.vue'),
  //       meta: { title: '缓存监控', icon: 'Cache' },
  //     },
  //     {
  //       path: 'cache/list',
  //       name: 'CacheList',
  //       component: () => import('@/views/monitor/cache/list.vue'),
  //       meta: { title: '缓存列表', icon: 'CacheList' },
  //     },
  //     {
  //       path: 'server',
  //       name: 'Server',
  //       component: () => import('@/views/monitor/server/index.vue'),
  //       meta: { title: '服务监控', icon: 'Server' },
  //     },
  //     {
  //       path: 'operlog',
  //       name: 'Operlog',
  //       component: () => import('@/views/monitor/operlog/index.vue'),
  //       meta: { title: '操作日志', icon: 'Operation' },
  //     },
  //     {
  //       path: 'logininfor',
  //       name: 'Logininfor',
  //       component: () => import('@/views/monitor/logininfor/index.vue'),
  //       meta: { title: '登录日志', icon: 'Logininfor' },
  //     },
  //   ],
  // },
  //     },
  //     {
  //       path: 'cache',
  //       name: 'Cache',
  //       component: () => import('@/views/monitor/cache/index.vue'),
  //       meta: { title: '缓存监控', icon: 'Cache' },
  //     },
  //     {
  //       path: 'cache/list',
  //       name: 'CacheList',
  //       component: () => import('@/views/monitor/cache/list.vue'),
  //       meta: { title: '缓存列表', icon: 'CacheList' },
  //     },
  //     {
  //       path: 'server',
  //       name: 'Server',
  //       component: () => import('@/views/monitor/server/index.vue'),
  //       meta: { title: '服务监控', icon: 'Server' },
  //     },
  //     {
  //       path: 'operlog',
  //       name: 'Operlog',
  //       component: () => import('@/views/monitor/operlog/index.vue'),
  //       meta: { title: '操作日志', icon: 'Operation' },
  //     },
  //     {
  //       path: 'logininfor',
  //       name: 'Logininfor',
  //       component: () => import('@/views/monitor/logininfor/index.vue'),
  //       meta: { title: '登录日志', icon: 'Logininfor' },
  //     },
  //   ],
  // },

  // {
  //   path: '/example',
  //   name: 'Example',
  //   component: Layout,
  //   redirect: '/404',
  //   meta: { title: '示例页面', icon: 'Poem', alwaysShow: true },
  //   children: [
  //     {
  //       path: 'taichi',
  //       name: 'TaiChi',
  //       component: () => import('@/views/example/TaiChi.vue'),
  //       meta: { title: '旋转太极图', icon: 'TaiChi' },
  //     },
  //     {
  //       path: 'lazyimage',
  //       name: 'LazyImage',
  //       component: () => import('@/views/example/ImageLazyLoad.vue'),
  //       meta: { title: '图片懒加载', icon: 'Image' },
  //     },
  //   ],
  // },

  // 404页面（必须放在最后）
  {
    path: '/:pathMatch(.*)*', // The not found page must be placed last
    component: () => import('@/views/error/404.vue'),
    meta: { hidden: true },
  },
]
