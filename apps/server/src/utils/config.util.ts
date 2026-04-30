import { load } from 'js-yaml'
import { merge } from 'lodash'
import { resolve } from 'node:path'
import { readFileSync, existsSync } from 'node:fs'

/**
 * 读取指定路径的 YAML 配置文件并转为对象类型
 * @param filePath YAML 配置文件的路径
 * @returns 解析后的配置对象，如果文件不存在则返回空对象
 */
function loadConfig(filePath: string): Record<string, any> {
  return existsSync(filePath) ? (load(readFileSync(filePath, 'utf-8')) as Record<string, any>) : {}
}

/**
 * 配置加载核心函数：读取并合并多环境 YAML 配置文件
 *
 * 功能说明：
 *  - 根据 NODE_ENV 区分开发/生产环境，确定配置文件存放目录
 *  - 按优先级读取4类 YAML 配置文件（通用→通用本地→环境→环境本地）
 *  - 深度合并配置对象，后续配置会覆盖前面的同名嵌套属性
 *  - 最终返回合并后的完整配置，供 NestJS ConfigModule 使用
 *
 * 配置优先级（从低到高，后面覆盖前面）：
 *  - config.yaml < config.local.yaml < config.{NODE_ENV}.yaml < config.{NODE_ENV}.local.yaml
 */
export function configuration() {
  // 从环境变量中获取当前运行环境
  const { NODE_ENV } = process.env

  // 确定配置文件的存放目录
  //  - 开发环境: 读取项目根目录下的 config 文件夹
  //  - 生产环境: 直接读取当前文件所在的目录
  //  - 未指定环境: 直接读取当前文件所在的目录
  const CONFIG_DIR_PATH = NODE_ENV === 'development' ? resolve(process.cwd(), 'config') : __dirname
  // const CONFIG_DIR_PATH = !NODE_ENV || NODE_ENV === 'development' ? resolve(process.cwd(), 'config') : __dirname

  // 定义各类配置文件的路径
  // 通用配置文件（所有环境共享的基础配置）
  const YAML_COMMON_CONFIG_PATH = resolve(CONFIG_DIR_PATH, 'config.yaml')
  // 通用本地配置文件（本地开发覆盖通用配置的个性化设置，不应提交到代码仓库）
  const YAML_COMMON_CONFIG_LOCAL_PATH = resolve(CONFIG_DIR_PATH, 'config.local.yaml')
  // 特定环境的配置文件（针对当前环境的专用配置，如开发/生产环境的差异配置）
  const YAML_ENV_CONFIG_PATH = resolve(CONFIG_DIR_PATH, `config.${NODE_ENV || 'development'}.yaml`)
  // 特定环境的本地配置文件（本地覆盖当前环境配置的个性化设置，不应提交到代码仓库）
  const YAML_ENV_CONFIG_LOCAL_PATH = resolve(CONFIG_DIR_PATH, `config.${NODE_ENV || 'development'}.local.yaml`)

  // 读取通用配置文件（所有环境共享的基础配置）
  const COMMON_CONFIG = loadConfig(YAML_COMMON_CONFIG_PATH)
  // 读取通用本地配置文件（本地开发覆盖通用配置的个性化设置，不应提交到代码仓库）
  const COMMON_CONFIG_LOCAL = loadConfig(YAML_COMMON_CONFIG_LOCAL_PATH)
  // 读取特定环境的配置文件（针对当前环境的专用配置，如开发/生产环境的差异配置）
  const ENV_CONFIG = loadConfig(YAML_ENV_CONFIG_PATH)
  // 读取特定环境的本地配置文件（本地覆盖当前环境配置的个性化设置，不应提交到代码仓库）
  const ENV_CONFIG_LOCAL = loadConfig(YAML_ENV_CONFIG_LOCAL_PATH)

  // 深度合并配置，后面的配置会覆盖前面的同名配置
  // 这样既保证了基础配置的通用性，又允许环境和本地配置进行个性化定制
  const finalConfig = merge({}, COMMON_CONFIG, COMMON_CONFIG_LOCAL, ENV_CONFIG, ENV_CONFIG_LOCAL)

  adaptDockerEnv(finalConfig)

  // 返回合并后的完整配置，供 NestJS ConfigModule 使用
  return finalConfig
}

function adaptDockerEnv(finalConfig: Record<string, any>) {
  const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env
  if (MYSQL_USERNAME) finalConfig.database.username = MYSQL_USERNAME
  if (MYSQL_PASSWORD) finalConfig.database.password = MYSQL_PASSWORD
  if (MYSQL_DATABASE) finalConfig.database.database = MYSQL_DATABASE

  const { REDIS_PASSWORD } = process.env
  if (REDIS_PASSWORD) finalConfig.redis.password = REDIS_PASSWORD

  const { EMAIL_FROM, EMAIL_HOST, EMAIL_PORT, EMAIL_CODE, EMAIL_SECURE } = process.env
  if (EMAIL_FROM) finalConfig.email.from = EMAIL_FROM
  if (EMAIL_HOST) finalConfig.email.host = EMAIL_HOST
  if (EMAIL_PORT) finalConfig.email.port = Number(EMAIL_PORT)
  if (EMAIL_CODE) finalConfig.email.code = EMAIL_CODE
  if (EMAIL_SECURE) finalConfig.email.secure = EMAIL_SECURE === 'true'

  const { OPENAI_API_KEY, OPENAI_API_MODEL, OPENAI_API_BASE_URL, OPENAI_API_TEMPERATURE, OPENAI_API_MAX_TOKENS } = process.env
  if (OPENAI_API_KEY) finalConfig.openai.apiKey = OPENAI_API_KEY
  if (OPENAI_API_MODEL) finalConfig.openai.model = OPENAI_API_MODEL
  if (OPENAI_API_BASE_URL) finalConfig.openai.baseURL = OPENAI_API_BASE_URL
  if (OPENAI_API_TEMPERATURE) finalConfig.openai.temperature = Number(OPENAI_API_TEMPERATURE)
  if (OPENAI_API_MAX_TOKENS) finalConfig.openai.maxTokens = Number(OPENAI_API_MAX_TOKENS)
}
