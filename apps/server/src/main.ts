import helmet from 'helmet'
import { resolve } from 'node:path'
import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { WinstonModule, ConfigConstant } from '@/common'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  // 创建 NestJS 应用实例，传入根模块 AppModule，NestFactory.create() 会初始化依赖注入系统并加载所有模块
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: WinstonModule.createLogger() })

  // 配置 Helmet 中间件，用于设置 HTTP 头，增强应用的安全性
  app.use(helmet())

  // 从配置服务中获取服务器端口和全局路由前缀
  const configService = app.get(ConfigService)
  const serverPort = configService.get<number>(ConfigConstant.SERVER_PORT, 3000)
  const globalPrefix = configService.get<string>(ConfigConstant.SERVER_GLOBAL_PREFIX, '')

  // 配置静态资源托管，将 uploads 目录下的文件托管到 /uploads/ 路径下
  app.useStaticAssets(resolve(process.cwd(), 'uploads'), { prefix: '/uploads/' }) // 托管 uploads 目录

  // 设置全局路由前缀，所有接口都必须在该前缀下访问
  app.setGlobalPrefix(globalPrefix)

  // 启动应用并监听配置中指定的端口，这一步会启动 HTTP 服务器，使应用开始接收外部请求
  await app.listen(serverPort)

  // 打印服务启动信息，方便开发者在终端查看访问地址
  console.log('\n--------------------------------------------------')
  console.log(`➜  Local:    http://localhost:${serverPort}/${globalPrefix}`)

  console.log('--------------------------------------------------')
}

bootstrap()
