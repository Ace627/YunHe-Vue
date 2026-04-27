<template>
  <div class="app-content">
    <el-card>
      <template #header>基本信息</template>
      <el-descriptions :column="getterStore.isDesktop ? 4 : 1" border v-if="cacheInfo.info" label-width="120px">
        <el-descriptions-item label="Redis 版本">{{ cacheInfo.info.redis_version }}</el-descriptions-item>
        <el-descriptions-item label="运行模式">{{ formatRedisMode }}</el-descriptions-item>
        <el-descriptions-item label="端口">{{ cacheInfo.info.tcp_port }}</el-descriptions-item>
        <el-descriptions-item label="客户端数">{{ cacheInfo.info.connected_clients }}</el-descriptions-item>
        <el-descriptions-item label="运行时间">{{ cacheInfo.info.uptime_in_days }}天</el-descriptions-item>
        <el-descriptions-item label="使用内存">{{ cacheInfo.info.used_memory_human }}</el-descriptions-item>
        <el-descriptions-item label="使用 CPU">{{ cacheInfo.info.used_cpu_user_children }}</el-descriptions-item>
        <el-descriptions-item label="内存配置">{{ formatMaxmemoryText }}</el-descriptions-item>
        <el-descriptions-item label="AOF 开启">{{ cacheInfo.info.aof_enabled === 0 ? '是' : '否' }}</el-descriptions-item>
        <el-descriptions-item label="RDB 状态">{{ cacheInfo.info.rdb_last_bgsave_status }}</el-descriptions-item>
        <el-descriptions-item label="Key 数量">{{ cacheInfo.dbsize }}</el-descriptions-item>
        <el-descriptions-item label="网络入口/出口">{{ formatInstantaneous }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-row :gutter="16" class="mt-16px">
      <el-col :span="12" :xs="24">
        <el-card>
          <template #header>命令统计</template>
          <ProChart :options="commandChartOption" customClass="h-360px" />
        </el-card>
      </el-col>

      <el-col :span="12" :xs="24">
        <el-card>
          <template #header>内存信息</template>
          <ProChart :options="memoryChartOption" customClass="h-360px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es'
import { TipModal } from '@/utils'
import type { CacheInfo } from '@/types'
import type { EChartsOption } from 'echarts'
import { CacheRequest } from '@/api/monitor/cache.request'

const getterStore = useGetterStore()
const cacheInfo = ref({} as CacheInfo)

const RedisModeMap = {
  standalone: '单机',
  sentinel: '哨兵',
  cluster: '集群',
}

async function getInfo() {
  try {
    TipModal.showLoading('数据加载中，请稍后')
    const data = await CacheRequest.getInfo()
    cacheInfo.value = data
    TipModal.hideLoading()
  } catch (error) {
    TipModal.hideLoading()
  }
}

/** 格式化最大内存配置文本 */
const formatMaxmemoryText = computed(() => {
  if (cacheInfo.value.info.maxmemory === 0) return '无限制'
  return cacheInfo.value.info.maxmemory_human
})

/** 格式化 Redis 运行模式 */
const formatRedisMode = computed(() => {
  return (RedisModeMap[cacheInfo.value.info.redis_mode] || '未知') + '模式'
})

/** 格式化网络入口/出口 */
const formatInstantaneous = computed(() => {
  const { instantaneous_input_kbps, instantaneous_output_kbps } = cacheInfo.value.info
  return `${instantaneous_input_kbps}KBS/${instantaneous_output_kbps}KBS`
})

getInfo()

const commandChartOption = computed<EChartsOption>(() => ({
  legend: { orient: 'vertical', left: 'right', type: 'scroll' },
  tooltip: {
    trigger: 'item',
    formatter(params: any) {
      const name = params.name || '未知命令'
      const value = params.value ?? 0
      const percent = params.percent ?? 0
      return (
        `<div style="font-weight:bold;margin-bottom:5px;font-size:14px;">${name}</div>` +
        `<div>执行次数: <span style="font-weight:bold;float:right;">${value.toLocaleString()}</span></div>` +
        `<div>占比: <span style="font-weight:bold;float:right;">${percent.toFixed(2)}%</span></div>`
      )
    },
  },
  series: [{ type: 'pie', radius: '50%', data: cacheInfo.value.commandstats }],
}))

const memoryChartOption = computed<EChartsOption>(() => {
  if (isEmpty(cacheInfo.value.info)) return {}
  // 获取内存信息字符串
  const usedMemoryHuman = String(cacheInfo.value.info.used_memory_human || '0B')
  const maxMemoryHuman = String(cacheInfo.value.info.maxmemory || '0') + 'B'
  // 解析内存字符串
  const usedMem = parseMemoryString(usedMemoryHuman)
  const maxMem = parseMemoryString(maxMemoryHuman)
  // 计算内存使用率
  let usagePercent = 0
  // 如果有最大内存限制，计算使用百分比
  if (maxMem.bytes > 0) {
    usagePercent = Math.min(100, Math.round((usedMem.bytes / maxMem.bytes) * 100))
  } else if (cacheInfo.value.info.maxmemory) {
    // 使用系统总内存作为参考
    try {
      const totalMemoryBytes = Number(cacheInfo.value.info.total_system_memory)
      usagePercent = totalMemoryBytes > 0 ? Math.min(100, Math.round((usedMem.bytes / totalMemoryBytes) * 100)) : 50
    } catch (error) {
      usagePercent = 50
    }
  } else {
    usagePercent = 50
  }

  return {
    tooltip: {
      formatter:
        maxMem.bytes > 0 ? `内存使用: ${usedMemoryHuman}<br/>最大内存: ${maxMemoryHuman}<br/>使用率: ${usagePercent}%` : `内存使用: ${usedMemoryHuman}<br/>最大内存: 未设置限制`,
    },
    series: [
      {
        name: '内存',
        type: 'gauge',
        min: 0,
        max: 100,
        data: [{ value: usagePercent, name: maxMem.bytes > 0 ? '内存使用率' : '内存使用量' }],
        detail: {
          formatter: maxMem.bytes > 0 ? '{value}%' : usedMemoryHuman,
          fontSize: 16,
          fontWeight: 'bold' as const,
          offsetCenter: [0, '70%'],
        },
      },
    ],
  }
})

// 解析内存字符串，例如 "3.6MB" -> { value: 3.6, unit: "MB" }
function parseMemoryString(memoryStr: string): { value: number; unit: string; bytes: number } {
  if (!memoryStr || typeof memoryStr !== 'string') return { value: 0, unit: 'B', bytes: 0 }
  try {
    // 用正则表达式提取数值和单位
    const match = memoryStr.match(/^([\d.]+)([KMGTP]?B)?$/i)
    if (!match) return { value: 0, unit: 'B', bytes: 0 }
    const value = Number.parseFloat(match[1]!)
    const unit = (match[2] || 'B').toUpperCase()
    // 计算字节数
    const unitIndex = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'].indexOf(unit)
    const bytes = unitIndex >= 0 ? value * 1024 ** unitIndex : value
    return { value, unit, bytes }
  } catch {
    return { value: 0, unit: 'B', bytes: 0 }
  }
}
</script>

<style lang="scss" scoped>
html[data-device='mobile'] .el-col + .el-col {
  margin-top: 16px;
}
</style>
