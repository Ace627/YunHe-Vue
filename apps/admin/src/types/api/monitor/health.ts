export interface HealthItem {
  status: 'up' | 'down' | string
  message?: string
}

// 健康检查完整数据结构
export interface HealthCheckData {
  status: 'ok' | 'error' // 总状态
  info: Record<string, HealthItem> // 正常服务
  error: Record<string, HealthItem> // 异常服务
  details: Record<string, HealthItem> // 详情
}
