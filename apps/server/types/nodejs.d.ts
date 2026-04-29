/**
 * NodeJS 类型扩展
 * - 说明：扩展 NodeJS 命名空间下的类型定义，用于添加或修改 Node.js 相关的类型声明
 * - 用途：为项目中的 Node.js 环境变量等提供类型支持，确保类型安全
 */
declare namespace NodeJS {
  /**
   * 进程环境变量接口
   * - 说明：定义 Node.js 进程环境变量的类型结构，用于约束和提供环境变量的类型提示
   * - 用途：在项目中使用 process.env 时获得类型检查和自动补全支持
   */
  interface ProcessEnv {
    /**
     * 运行环境
     * - 说明：指定应用的运行环境，用于区分开发环境和生产环境
     * - 类型：'development' | 'production'
     * - 用途：根据不同环境执行不同的配置或逻辑，如日志级别、数据库连接等
     */
    NODE_ENV: 'development' | 'production'

    // 适配 Docker 环境注入
    [key: string]: string
  }
}
