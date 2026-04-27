import pkg from '../../../package.json' // 导入 package.json 文件，获取应用的名称

/** 缓存键的前缀 */
const CACHE_PREFIX = pkg.name.toUpperCase() // 使用应用的名称作为缓存键的前缀，转为大写

export const CacheConstant = {
  /** 定义用户的访问令牌缓存键 */
  ACCESS_TOKEN: `${CACHE_PREFIX}:ACCESS:TOKEN`,

  /** 定义刷新令牌的缓存键 */
  REFRESH_TOKEN: `${CACHE_PREFIX}:REFRESH:TOKEN`,

  /** 定义侧边栏的折叠/展开状态缓存键 */
  SIDEBAR_STATUS: `${CACHE_PREFIX}:SIDEBAR:STATUS`,

  /** 定义保存用户登录信息的缓存键 */
  REMEMBER_PASSWORD: `${CACHE_PREFIX}:REMEMBER:PASSWORD`,

  /** 多标签模式 历史记录 */
  VISITED_VIEWS: `${CACHE_PREFIX}:TAGSVIEW:VISITED`,

  /** 多标签模式 缓存记录 */
  CACHED_VIEWS: `${CACHE_PREFIX}:TAGSVIEW:CACHED`,

  /** 应用布局主体配置等的缓存键 */
  SYSTEM_SETTING: `${CACHE_PREFIX}:SYSTEM:SETTING`,

  /** 组件大小缓存键 */
  COMPONENT_SIZE: `${CACHE_PREFIX}:COMPONENT:SIZE`,
} as const
