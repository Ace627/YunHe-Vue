/**
 * 配置常量类
 * - 说明：定义项目中配置文件相关的常量，如服务器、JWT、Redis、OpenAI 等配置路径
 * - 用途：在项目中统一使用，通过 ConfigService 获取配置时避免硬编码字符串
 */
export const ConfigConstant = {
  /**
   * 服务器配置
   * 配置文件中服务器相关配置的命名空间，包含端口、全局路由前缀等
   */
  SERVER_CONFIG: 'server',

  /**
   * 服务器端口
   * 应用监听的端口号，用于启动 HTTP 服务
   */
  SERVER_PORT: 'server.port',

  /**
   * 全局路由前缀
   * 所有接口路径的统一前缀，如设置为 api 则接口路径为 /api/xxx
   */
  SERVER_GLOBAL_PREFIX: 'server.globalPrefix',

  /**
   * 是否演示环境
   * 是否为演示环境，如是否开启演示模式、是否使用演示数据等
   */
  SERVER_IS_DEMO: 'server.isDemo',

  /**
   * 数据库配置
   * 配置文件中数据库相关配置的命名空间，包含主机、端口、用户名、密码、数据库名等
   */
  DATABASE_CONFIG: 'database',

  /**
   * 数据库主机
   * 数据库服务器的主机地址
   */
  DATABASE_HOST: 'database.host',

  /**
   * 数据库端口
   * 数据库服务器的监听端口
   */
  DATABASE_PORT: 'database.port',

  /**
   * 数据库用户名
   * 数据库连接的用户名
   */
  DATABASE_USERNAME: 'database.username',

  /**
   * 数据库密码
   * 数据库连接的密码
   */
  DATABASE_PASSWORD: 'database.password',

  /**
   * 数据库名称
   * 数据库连接的数据库名称
   */
  DATABASE_DATABASE: 'database.database',

  /**
   * 数据库字符集
   * 数据库连接的字符集，默认值为 utf8mb4_unicode_ci
   */
  DATABASE_CHARSET: 'database.charset',

  /**
   * 数据库同步模式
   * 数据库是否自动同步实体到数据库表，默认值为 true
   */
  DATABASE_SYNCHRONIZE: 'database.synchronize',

  /**
   * JWT 配置
   * 配置文件中 JWT 相关配置的命名空间，包含密钥、过期时间等
   */
  JWT_CONFIG: 'jwt',

  /**
   * JWT 密钥
   * 用于签名和验证 JWT 令牌的密钥，需保密且足够复杂
   */
  JWT_SECRET: 'jwt.secret',

  /**
   * JWT 过期时间
   * JWT 令牌的有效期，单位为秒，过期后需重新获取令牌
   */
  JWT_EXPIRES_IN: 'jwt.expiresIn',

  /**
   * 邮件配置
   * 配置文件中邮件相关配置的命名空间，包含发件邮箱、SMTP 服务器地址、端口、是否开启 SSL 加密、授权码等
   */
  EMAIL_CONFIG: 'email',

  /**
   * 发件邮箱
   * 发送邮件的邮箱地址，需在 SMTP 服务器中配置
   */
  EMAIL_FROM: 'email.from',

  /**
   * SMTP 服务器地址
   * 发送邮件的 SMTP 服务器地址，如 smtp.qq.com
   */
  EMAIL_HOST: 'email.host',

  /**
   * 端口
   * 发送邮件的端口号，如 465
   */
  EMAIL_PORT: 'email.port',

  /**
   * 是否开启 SSL 加密
   * 发送邮件是否开启 SSL 加密，如 true = 465，false = 587
   */
  EMAIL_SECURE: 'email.secure',

  /**
   * 授权码
   * 发送邮件的授权码，不是邮箱密码！需在邮箱设置中开启 SMTP 功能后获取
   */
  EMAIL_CODE: 'email.code',

  /**
   * OpenAI 配置
   * 配置文件中 OpenAI 相关配置的命名空间，包含 API 密钥、基础 URL 等
   */
  OPENAI_CONFIG: 'openai',

  /**
   * OpenAI API 密钥
   * 调用 OpenAI API 的身份认证密钥
   */
  OPENAI_API_KEY: 'openai.apiKey',

  /**
   * OpenAI API 基础 URL
   * OpenAI API 的请求地址，可设置为代理地址
   */
  OPENAI_BASE_URL: 'openai.baseURL',

  /**
   * OpenAI 模型名称
   * 调用 OpenAI API 时使用的模型名称
   */
  OPENAI_MODEL: 'openai.model',

  /**
   * OpenAI 温度参数
   * 控制生成文本的随机性，0-1之间，0为确定性，1为随机性
   */
  OPENAI_TEMPERATURE: 'openai.temperature',

  /**
   * OpenAI 最大生成令牌数
   * 每个请求最大生成的字符数，建议根据模型能力调整
   */
  OPENAI_MAX_TOKENS: 'openai.maxTokens',

  /**
   * Redis 配置
   * 配置文件中 Redis 相关配置的命名空间，包含主机、端口、密码等
   */
  REDIS_CONFIG: 'redis',

  /**
   * Redis 主机
   * Redis 服务器的主机地址
   */
  REDIS_HOST: 'redis.host',

  /**
   * Redis 端口
   * Redis 服务器的监听端口
   */
  REDIS_PORT: 'redis.port',

  /**
   * Redis 密码
   * 连接 Redis 服务器的认证密码
   */
  REDIS_PASSWORD: 'redis.password',

  /**
   * Redis 数据库
   * Redis 数据库编号，用于隔离不同环境的数据
   */
  REDIS_DB: 'redis.db',
} as const
