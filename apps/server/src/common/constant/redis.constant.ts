/**
 * Redis 常量对象
 * @description 统一管理 Redis 相关常量，确保 Redis 键名规范统一，便于维护与排查 Redis 相关问题
 */
export const RedisConstant = {
  /**
   * 验证码缓存键
   * 用于存储验证码信息的 Redis 键，值为 'captcha:img'
   */
  CAPTCHA_KEY: 'captcha:img',

  /**
   * 访问令牌缓存键
   * 用于存储访问令牌的 Redis 键，值为 'token:access'
   */
  ACCESS_TOKEN_KEY: 'token:access',

  /**
   * 用户在线状态缓存 Key 前缀
   * 拼接用户 ID/用户名形成唯一缓存 Key，格式为「admin:user:online:userId」，用于记录用户在线状态
   */
  ADMIN_USER_ONLINE_KEY: 'admin:user:online',

  /**
   * 用户角色缓存 Key 前缀
   * 拼接用户 ID 形成唯一缓存 Key，格式为「admin:user:roles:userId」，用于缓存用户关联的角色信息
   */
  ADMIN_USER_ROLES: `admin:user:roles`,

  /**
   * 用户权限缓存 Key 前缀
   * 拼接用户 ID 形成唯一缓存 Key，格式为「admin:user:permissions:userId」，用于缓存用户关联的权限信息
   */
  ADMIN_USER_PERMISSIONS: `admin:user:permissions`,

  /**
   * 字典缓存 Key 前缀
   * 拼接字典类型编码形成唯一缓存 Key，格式为「system:dict:dictTypeCode」，用于缓存系统字典数据
   */
  DICTTYPE_KEY: 'system:dict',

  /**
   * 响应缓存键前缀
   * 用于存储响应缓存的 Redis 键前缀，值为 'response:cache'
   */
  RESPONSE_CACHE: 'response:cache',

  /**
   * 限流键前缀
   * 用于存储限流信息的 Redis 键前缀，值为 'throttle:limit'
   */
  THROTTLE_LIMIT: 'throttle:limit',
} as const
