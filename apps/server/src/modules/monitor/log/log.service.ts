import { UAParser } from 'ua-parser-js'
import { Injectable, StreamableFile } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { RedisService } from '@/shared/redis.service'
import { formatTime, getLocationByIP, getRequestIp } from '@/utils'
import { QueryLoginLogDto, QueryOperLogDto } from './log.dto'
import { ExcelService } from '@/modules/common/excel/excel.service'
import { Equal, FindOptionsWhere, Like, Repository } from 'typeorm'
import { LogininforEntity, CommonConstant, RedisConstant, ConfigConstant, OperLogEntity } from '@/common'

@Injectable()
export class LogService {
  constructor(
    private readonly redisService: RedisService,
    private readonly excelService: ExcelService,
    private readonly configService: ConfigService,
    @InjectRepository(OperLogEntity) private readonly operRepository: Repository<OperLogEntity>,
    @InjectRepository(LogininforEntity) private readonly logininforRepository: Repository<LogininforEntity>,
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                                  Login Log                                 */
  /* -------------------------------------------------------------------------- */

  /** 新增登录日志 */
  public async createLoginLog(request: ExpressRequest, message: string, tokenKey?: string) {
    const { browser, os } = this.parseUserAgent(request.headers['user-agent'] || '') //获取用户电脑信息
    const logininfor = new LogininforEntity()
    logininfor.username = request.body.username
    logininfor.ip = getRequestIp(request)
    logininfor.location = await getLocationByIP(logininfor.ip)
    logininfor.status = tokenKey ? CommonConstant.STATUS_NORMAL : CommonConstant.STATUS_DISABLE
    logininfor.message = message
    logininfor.loginTime = formatTime()
    logininfor.browser = browser
    logininfor.os = os
    logininfor.requestId = request[CommonConstant.REQUEST_ID_KEY] // 从请求上下文获取请求 ID

    // 如果登录成功，就记录这个登录信息，方便在线用户查询
    if (tokenKey) {
      const { ip, location, username, loginTime, browser, os } = logininfor
      const userId = tokenKey.replace(`${RedisConstant.ACCESS_TOKEN_KEY}:`, '')
      const record = { userId, ip, location, username, loginTime, browser, os }
      await this.redisService.set(`${RedisConstant.ADMIN_USER_ONLINE_KEY}:${userId}`, JSON.stringify(record), 'EX', this.expiresIn)
    }
    await this.logininforRepository.save(logininfor)
    return '添加成功'
  }

  /** 导出登录日志 */
  public async exportLogininfo() {
    const queryBuilder = this.logininforRepository.createQueryBuilder('logininfor')
    const records = await queryBuilder.getMany()
    const fileReadableStream = await this.excelService.export(LogininforEntity, records)
    const filename = encodeURIComponent(`登录日志-${formatTime(new Date(), 'YYYYMMDDHHmmss')}.xlsx`)
    const disposition = `attachment; filename="${filename}"; filename*=UTF-8''${filename}`
    const type = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
    return new StreamableFile(fileReadableStream, { disposition, type })
  }

  /** 删除登录日志 */
  public async deleteLogininfo(ids: string[]) {
    await this.logininforRepository.delete(ids)
    return '删除成功'
  }

  /** 清空登录日志 */
  public async clearLogininfo() {
    await this.logininforRepository.clear()
    return '清空成功'
  }

  /** 分页查询登录日志 */
  public async findLogininfoList(queryParams: QueryLoginLogDto) {
    const where: FindOptionsWhere<LogininforEntity> = {}
    if (queryParams.ip) where.ip = Like(`%${queryParams.ip}%`)
    if (queryParams.username) where.username = Like(`%${queryParams.username}%`)
    if (queryParams.location) where.location = Like(`%${queryParams.location}%`)
    if (queryParams.status) where.status = Equal(queryParams.status)
    const queryBuilder = this.logininforRepository.createQueryBuilder('logininfor')
    queryBuilder.where(where)
    queryBuilder.orderBy('logininfor.loginTime', 'DESC') // 排序
    queryBuilder.skip(queryParams.skip).take(queryParams.take) // 分页
    const [records, total] = await queryBuilder.getManyAndCount() //  一次性获取数据和总数
    return { total, records }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Oper Log                                  */
  /* -------------------------------------------------------------------------- */

  /** 新增操作日志 */
  public createOperLog(createDto: OperLogEntity) {
    return this.operRepository.insert(createDto)
  }

  /** 导出操作日志 */
  public async exportOperLog() {
    const queryBuilder = this.operRepository.createQueryBuilder('operlog')
    const records = await queryBuilder.getMany()
    const fileReadableStream = await this.excelService.export(OperLogEntity, records)
    // 构建规范的下载配置（兼容中文、所有浏览器）
    const filename = encodeURIComponent(`操作日志-${formatTime(new Date(), 'YYYYMMDDHHmmss')}.xlsx`)
    const disposition = `attachment; filename="${filename}"; filename*=UTF-8''${filename}`
    const type = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
    return new StreamableFile(fileReadableStream, { disposition, type })
  }

  /** 删除操作日志 */
  public async deleteOperinfo(ids: string[]) {
    await this.operRepository.delete(ids)
    return '删除成功'
  }

  /** 清空操作日志 */
  public async clearOperinfo() {
    await this.operRepository.clear()
    return '清空成功'
  }

  /* 分页查询操作日志 */
  public async findOperLogList(queryParams: QueryOperLogDto) {
    const { take = 10, skip = 0, title, location, ip, status, username } = queryParams
    const where: FindOptionsWhere<OperLogEntity> = {}
    if (ip) where.ip = Like(`%${ip}%`)
    if (title) where.title = Like(`%${title}%`)
    if (username) where.username = Like(`%${username}%`)
    if (location) where.location = Like(`%${location}%`)
    if (status) where.status = Equal(status)
    const queryBuilder = this.operRepository.createQueryBuilder('operlog')
    queryBuilder.where(where)
    queryBuilder.orderBy('operlog.operTime', 'DESC') // 排序
    queryBuilder.skip(skip).take(take) // 分页
    const [records, total] = await queryBuilder.getManyAndCount() //  一次性获取数据和总数
    return { total, records }
  }

  /* -------------------------------------------------------------------------- */
  /*                              Private Property                              */
  /* -------------------------------------------------------------------------- */

  private get expiresIn() {
    return this.configService.get<number>(ConfigConstant.JWT_EXPIRES_IN, 1800)
  }

  /** 安全解析 UserAgent，兼容所有客户端、测试工具 */
  private parseUserAgent(userAgent: string) {
    if (!userAgent) return { browser: 'unknown', os: 'unknown' }
    const parser = UAParser(userAgent)
    let browser = (parser.browser.name || 'unknown') + (parser.browser.version ?? '')
    let os = (parser.os.name || 'unknown') + (parser.os.version ?? '')
    if (userAgent.includes('ApipostRuntime')) browser = 'ApipostRuntime'
    return { browser, os }
  }
}
