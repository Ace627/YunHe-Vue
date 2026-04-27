interface CpuInfo {
  /** 核心数 */
  cores: number
  /** 当前空闲率 */
  free: string
  /** 系统使用率 */
  system: string
  /** 用户使用率 */
  used: string
}

interface MemoryInfo {
  /** 剩余内存 */
  free: string
  /** 总内存 */
  total: string
  /** 使用率 */
  usage: string
  /** 已用内存 */
  used: string
}

interface ServerInfo {
  /** 服务器IP */
  ip: string
  /** 服务器名称 */
  hostname: string
  /** 操作系统 */
  platform: string
  /** 系统架构 */
  arch: string
}

export interface DiskInfo {
  /** 盘符路径 */
  fs: string
  /** 文件系统 */
  mount: string
  /** 盘符类型 */
  type: string
  /** 总大小（GB） */
  total: string
  /** 可用大小（GB） */
  used: string
  /** 已用大小（GB） */
  free: string
  /** 已用百分比 */
  usage: string
}

export interface ServerEntity {
  cpu: CpuInfo
  memory: MemoryInfo
  server: ServerInfo
  disks: DiskInfo[]
}
