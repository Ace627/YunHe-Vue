<template>
  <ScreenAdapter class="monitor-dashboard-warpper">
    <div class="monitor-dashboard">
      <!-- 背景层 -->
      <div class="monitor-dashboard__bg"></div>

      <!-- 顶部 Header -->
      <header class="monitor-dashboard__header">
        <div class="monitor-dashboard__header-left" @click="toHome">
          <img src="/img/logo.png" alt="logo" class="monitor-dashboard__logo" />
          <span class="monitor-dashboard__sys-name">{{ appTitle }}</span>
        </div>
        <div class="monitor-dashboard__header-center">
          <h1 class="monitor-dashboard__title">实时监控中心</h1>
          <div class="monitor-dashboard__scan-line"></div>
        </div>
        <div class="monitor-dashboard__header-right">
          <div class="monitor-dashboard__datetime">
            <span class="monitor-dashboard__time">{{ currentTime }}</span>
            <span class="monitor-dashboard__date">{{ currentWeekDay }}</span>
          </div>
          <div class="monitor-dashboard__weather">
            <SvgIcon name="Sunny" class="monitor-dashboard__weather-icon" />
            <span>晴 26℃</span>
          </div>
          <!-- <el-button class="monitor-dashboard__fullscreen-btn" text @click="toggleFullscreen">
            <template #icon>
              <SvgIcon :name="isFullscreen ? 'ExitFullScreen' : 'FullScreen'" />
            </template>
          </el-button> -->
        </div>
      </header>

      <!-- 主体内容 -->
      <div class="monitor-dashboard__body">
        <!-- KPI 卡片行 -->
        <div class="monitor-dashboard__kpi-row">
          <div v-for="card in kpiCards" :key="card.label" class="monitor-dashboard__kpi-card">
            <div class="monitor-dashboard__kpi-icon">
              <SvgIcon :name="card.icon" />
            </div>
            <div class="monitor-dashboard__kpi-info">
              <div class="monitor-dashboard__kpi-value">{{ card.value }}</div>
              <div class="monitor-dashboard__kpi-label">{{ card.label }}</div>
            </div>
            <!-- <div class="monitor-dashboard__kpi-bottom">
              <span class="monitor-dashboard__kpi-trend" :class="card.trendUp ? 'is-up' : 'is-down'">
                <SvgIcon name="ArrowUp" />
                {{ card.trend }}
              </span>
            </div> -->
          </div>
        </div>

        <!-- 三栏核心区域 -->
        <div class="monitor-dashboard__main-row">
          <!-- 左侧 25% -->
          <div class="monitor-dashboard__left">
            <div class="monitor-dashboard__panel">
              <div class="monitor-dashboard__panel-header">
                <span class="monitor-dashboard__panel-title">浏览器占比</span>
              </div>
              <div class="monitor-dashboard__panel-body">
                <ProChart :options="browserOption" customClass="monitor-dashboard__chart" />
              </div>
            </div>

            <div class="monitor-dashboard__panel">
              <div class="monitor-dashboard__panel-header">
                <span class="monitor-dashboard__panel-title">操作系统占比</span>
              </div>
              <div class="monitor-dashboard__panel-body">
                <ProChart :options="osOption" customClass="monitor-dashboard__chart" />
              </div>
            </div>
          </div>

          <!-- 中间 45% -->
          <div class="monitor-dashboard__center">
            <div class="monitor-dashboard__panel monitor-dashboard__panel--center h-full">
              <div class="monitor-dashboard__panel-header">
                <span class="monitor-dashboard__panel-title">中国地图 · 用户地域分布</span>
              </div>
              <div class="monitor-dashboard__panel-body">
                <ProChart v-if="mapReady" :options="chinaMapOption" customClass="monitor-dashboard__chart" />
                <div v-else class="monitor-dashboard__map-loading">地图加载中...</div>
              </div>
            </div>
          </div>

          <!-- 右侧 30% -->
          <div class="monitor-dashboard__right">
            <div class="monitor-dashboard__panel">
              <div class="monitor-dashboard__panel-header">
                <span class="monitor-dashboard__panel-title">系统资源监控</span>
              </div>
              <div class="monitor-dashboard__panel-body monitor-dashboard__panel-body--gauges">
                <div v-for="gauge in gaugeItems" :key="gauge.label" class="monitor-dashboard__gauge-item">
                  <ProChart :options="gauge.option" customClass="monitor-dashboard__gauge-chart" />
                  <div class="monitor-dashboard__gauge-label">{{ gauge.label }}</div>
                </div>
              </div>
            </div>

            <div class="monitor-dashboard__panel">
              <div class="monitor-dashboard__panel-header">
                <span class="monitor-dashboard__panel-title">Redis 监控</span>
                <span class="monitor-dashboard__panel-subtitle">命令调用 TOP5</span>
              </div>
              <div class="monitor-dashboard__panel-body">
                <ProChart :options="redisCommandOption" customClass="monitor-dashboard__chart" />
              </div>
            </div>
          </div>
        </div>

        <!-- 底部区域 -->
        <div class="monitor-dashboard__bottom">
          <div class="monitor-dashboard__panel">
            <div class="monitor-dashboard__panel-header">
              <span class="monitor-dashboard__panel-title">当前在线用户列表</span>
              <span class="monitor-dashboard__panel-subtitle">共 {{ onlineUserData.length }} 人</span>
            </div>
            <div class="monitor-dashboard__panel-body monitor-dashboard__panel-body--table">
              <div class="monitor-dashboard__table-wrapper" :class="{ 'monitor-dashboard__table-wrapper--scroll': onlineUserScrolling }" :style="{ '--table-row-count': TABLE_ROW_COUNT }">
                <el-table :data="onlineUserDisplay" class="monitor-dashboard__table" size="small" stripe header-row-class-name="monitor-table-header">
                  <el-table-column prop="username" label="用户名" min-width="100" />
                  <el-table-column prop="location" label="登录地点" min-width="110" />
                  <el-table-column prop="os" label="操作系统" min-width="110" />
                  <el-table-column prop="browser" label="浏览器" min-width="120" />
                  <el-table-column prop="loginTime" label="登录时间" min-width="150" />
                  <el-table-column prop="status" label="状态" width="80">
                    <template #default="{ row }">
                      <span class="monitor-dashboard__status is-online">{{ row.status === 'online' ? '在线' : '离线' }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>

          <div class="monitor-dashboard__panel">
            <div class="monitor-dashboard__panel-header">
              <span class="monitor-dashboard__panel-title">最近登录记录</span>
              <span class="monitor-dashboard__panel-subtitle">共 {{ loginRecordData.length }} 条</span>
            </div>
            <div class="monitor-dashboard__panel-body monitor-dashboard__panel-body--table">
              <div class="monitor-dashboard__table-wrapper" :class="{ 'monitor-dashboard__table-wrapper--scroll': loginRecordScrolling }" :style="{ '--table-row-count': TABLE_ROW_COUNT }">
                <el-table :data="loginRecordDisplay" class="monitor-dashboard__table" size="small" stripe header-row-class-name="monitor-table-header">
                  <el-table-column prop="username" label="用户名" min-width="100" />
                  <el-table-column prop="location" label="登录地点" min-width="110" />
                  <el-table-column prop="ip" label="IP 地址" min-width="130" />
                  <el-table-column prop="browser" label="浏览器" min-width="120" />
                  <el-table-column prop="loginTime" label="登录时间" min-width="150" />
                  <el-table-column prop="status" label="状态" width="80">
                    <template #default="{ row }">
                      <span class="monitor-dashboard__status" :class="row.status === 'success' ? 'is-online' : 'is-fail'">
                        {{ row.status === 'success' ? '成功' : '失败' }}
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ScreenAdapter>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import { toHome } from '@/router/router.helper'
import { registerChinaMap } from './register-china-map'
import { formatTime, getDaysDiff, getWeekDay } from '@yunhe/utils'
import { browserData, osData, chinaMapScatterData, chinaFlyLines, systemResourceData, redisCommandData, onlineUserData, loginRecordData } from './mock-data'
import { CacheConstant } from '@/common'
import { getSystemSetting } from '@/utils'

// const isFullscreen = ref(false)
const mapReady = ref(false)

/** 实时计算当前页面的帧率（FPS） */
const fps = useFps()
const appTitle = import.meta.env.VITE_APP_TITLE

const TABLE_ROW_COUNT = 4 // 实际显示是 4 +1 行

const onlineUserDisplay = computed(() => {
  const sliced = onlineUserData.slice(0, TABLE_ROW_COUNT)
  return onlineUserData.length > TABLE_ROW_COUNT ? [...sliced, ...sliced] : sliced
})
const loginRecordDisplay = computed(() => {
  const sliced = loginRecordData.slice(0, TABLE_ROW_COUNT)
  return loginRecordData.length > TABLE_ROW_COUNT ? [...sliced, ...sliced] : sliced
})
const onlineUserScrolling = computed(() => onlineUserData.length > TABLE_ROW_COUNT)
const loginRecordScrolling = computed(() => loginRecordData.length > TABLE_ROW_COUNT)

/** 响应式获取当前时间对象（实时更新） */
const currentDate = useNow()
/** 实时计算当前时间，格式化为 HH:mm:ss（时分秒） */
const currentTime = computed(() => formatTime(currentDate.value, 'HH:mm:ss'))
/** 实时计算今天是星期几，返回中文：星期一 ~ 星期日 */
const currentWeekDay = computed(() => getWeekDay(currentDate.value))

onMounted(async () => {
  const ok = await registerChinaMap()
  mapReady.value = ok
})

// function toggleFullscreen() {
//   // if (!document.fullscreenElement) {
//   //   document.documentElement.requestFullscreen()
//   //   isFullscreen.value = true
//   // } else {
//   //   document.exitFullscreen()
//   //   isFullscreen.value = false
//   // }
//   isFullscreen.value = !isFullscreen.value
//   document.querySelector('.monitor-dashboard')?.classList.toggle('monitor-dashboard--screenfull', isFullscreen.value)
//   console.log("document.querySelector('.monitor-dashboard'): ", document.querySelector('.monitor-dashboard'))
// }

const browserOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(10,25,47,0.92)',
    borderColor: 'rgba(0,212,255,0.3)',
    textStyle: { color: '#e6f7ff', fontSize: 12 },
    formatter: '{b}: {c}%',
  },
  legend: {
    orient: 'vertical',
    right: '8px',
    top: 'center',
    textStyle: { color: '#7aa2d2', fontSize: 11 },
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 12,
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'], // 缩小饼图半径，避免和文本重叠
      center: ['32%', '50%'], // 饼图整体左移
      data: browserData,
      label: { show: false },
      emphasis: { scaleSize: 6, label: { show: true, color: '#e6f7ff' } },
      itemStyle: { borderColor: 'rgba(10,25,47,0.72)', borderWidth: 2 },
    },
  ],
  graphic: [
    {
      type: 'text',
      left: '27%',
      top: '40%', // 增大两行文字的上下间距
      style: { text: '100%', textAlign: 'center', fill: '#e6f7ff', fontSize: 14, fontWeight: 600 },
    },
    {
      type: 'text',
      left: '27%',
      top: '54%',
      style: { text: '总占比', textAlign: 'center', fill: '#7aa2d2', fontSize: 12 },
    },
  ],
}))

const osOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(10,25,47,0.92)',
    borderColor: 'rgba(0,212,255,0.3)',
    textStyle: { color: '#e6f7ff', fontSize: 12 },
    formatter: '{b}: {c}%',
  },
  legend: {
    orient: 'vertical',
    right: '8px',
    top: 'center',
    textStyle: { color: '#7aa2d2', fontSize: 11 },
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 12,
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'], // 缩小饼图半径，避免和文本重叠
      center: ['32%', '50%'], // 饼图整体左移
      data: osData,
      label: { show: false },
      emphasis: { scaleSize: 6, label: { show: true, color: '#e6f7ff' } },
      itemStyle: { borderColor: 'rgba(10,25,47,0.72)', borderWidth: 2 },
    },
  ],
  graphic: [
    {
      type: 'text',
      left: '27%',
      top: '40%',
      style: { text: '100%', textAlign: 'center', fill: '#e6f7ff', fontSize: 14, fontWeight: 600 },
    },
    {
      type: 'text',
      left: '27%',
      top: '54%',
      style: { text: '总占比', textAlign: 'center', fill: '#7aa2d2', fontSize: 12 },
    },
  ],
}))

const chinaMapOption = computed<EChartsOption>(() => {
  const scatterData = chinaMapScatterData.map((d) => ({ name: d.name, value: d.value }))
  const linesData = chinaFlyLines.map((line) => ({
    coords: line.coords,
    lineStyle: { color: '#00d4ff', width: 1, opacity: 0.5, curveness: 0.2 },
  }))

  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10,25,47,0.92)',
      borderColor: 'rgba(0,212,255,0.3)',
      textStyle: { color: '#e6f7ff', fontSize: 12 },
      formatter: (params: any) => {
        if (params.seriesType === 'effectScatter') {
          const val = params.value
          if (Array.isArray(val) && val.length >= 3) return `${params.name}<br/>用户数：${val[2].toLocaleString()}`
          return params.name || ''
        }
        return ''
      },
    },
    geo: {
      map: 'china',
      roam: false,
      center: [105, 36],
      zoom: 1.6,
      itemStyle: {
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#0a2233' },
            { offset: 1, color: '#061423' },
          ],
        },
        borderColor: 'rgba(0,212,255,0.35)',
        borderWidth: 1,
      },
      emphasis: {
        label: { color: '#e6f7ff' },
        itemStyle: { areaColor: 'rgba(0,212,255,0.15)' },
      },
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: scatterData,
        symbolSize: (val: number[]) => Math.sqrt(val[2]) * 0.15 + 1,
        showEffectOn: 'render',
        rippleEffect: { brushType: 'stroke', scale: 1.2, period: 5, color: '#00d4ff' },
        itemStyle: { color: '#00ff95' },
        label: { show: true, position: 'right', color: '#7aa2d2', fontSize: 10, formatter: '{b}' },
      },
      {
        type: 'lines',
        coordinateSystem: 'geo',
        data: linesData,
        effect: { show: true, period: 4, trailLength: 0.2, symbol: 'arrow', symbolSize: 5, color: '#00d4ff' },
        lineStyle: { color: '#00d4ff', width: 1, opacity: 0.4, curveness: 0.2 },
      },
    ],
  }
})

function makeGaugeOption(value: number, color: string[]): EChartsOption {
  return {
    series: [
      {
        type: 'gauge',
        startAngle: 210,
        endAngle: -30,
        center: ['50%', '55%'],
        radius: '90%',
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [value / 100, color[0]],
              [1, 'rgba(122,162,210,0.15)'],
            ],
          },
        },
        pointer: { length: '60%', width: 3, itemStyle: { color: color[0] } },
        axisTick: { distance: -6, length: 4, lineStyle: { width: 1, color: 'rgba(122,162,210,0.4)' } },
        splitLine: { distance: -10, length: 8, lineStyle: { width: 1, color: 'rgba(122,162,210,0.4)' } },
        axisLabel: { color: '#7aa2d2', fontSize: 8, distance: 16 },
        detail: { valueAnimation: true, formatter: '{value}%', color: '#e6f7ff', fontSize: 18, fontWeight: 700, offsetCenter: [0, '70%'] },
        data: [{ value }],
      },
    ],
  }
}

const gaugeItems = computed(() => [
  {
    label: 'CPU 使用率',
    option: makeGaugeOption(systemResourceData.cpu, ['#00d4ff', '#4facfe']),
  },
  {
    label: '内存使用率',
    option: makeGaugeOption(systemResourceData.memory, ['#a78bfa', '#c084fc']),
  },
  {
    label: '磁盘使用率',
    option: makeGaugeOption(systemResourceData.disk, ['#ffc857', '#ff8c00']),
  },
  {
    label: '系统负载',
    option: makeGaugeOption(systemResourceData.load * 25, ['#00ff95', '#4facfe']),
  },
])

const redisCommandOption = computed<EChartsOption>(() => ({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(10,25,47,0.92)',
    borderColor: 'rgba(0,212,255,0.3)',
    textStyle: { color: '#e6f7ff', fontSize: 12 },
    axisPointer: { type: 'shadow' },
  },
  grid: { left: 8, right: 30, top: 4, bottom: 4 },
  xAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(122,162,210,0.1)' } },
    axisLabel: { color: '#7aa2d2', fontSize: 10, formatter: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)) },
  },
  yAxis: {
    type: 'category',
    data: redisCommandData.map((d) => d.command),
    axisLine: { lineStyle: { color: 'rgba(122,162,210,0.3)' } },
    axisLabel: { color: '#7aa2d2', fontSize: 11 },
    axisTick: { show: false },
    inverse: true,
  },
  series: [
    {
      type: 'bar',
      data: redisCommandData.map((d) => ({ value: d.count, itemStyle: d.itemStyle })),
      barWidth: 14,
      itemStyle: { borderRadius: [0, 4, 4, 0] },
    },
  ],
}))

const daysSinceLaunch = shallowRef<number>(0)
const transitionDaysSinceLaunch = useTransition(daysSinceLaunch, { duration: 800 })

const kpiCards = computed(() => [
  { icon: 'Online', label: '在线用户', value: '2,847', trend: '↑ 12.5%', trendUp: true },
  { icon: 'User', label: '系统总用户', value: '18,632', trend: '↑ 8.3%', trendUp: true },
  { icon: 'Logininfor', label: '今日登录', value: '1,536', trend: '↑ 5.2%', trendUp: true },
  // { icon: 'Check', label: '登录成功率', value: '98.6%', trend: '↑ 0.3%', trendUp: true },
  { icon: 'Fps', label: '屏幕帧率', value: fps, trend: '↑ 0.3%', trendUp: true },
  { icon: 'Server', label: '运行时间', value: `${Math.round(transitionDaysSinceLaunch.value)} 天`, trend: '14 时 32 分', trendUp: true },
  { icon: 'Redis', label: 'Redis Key', value: '12,486', trend: '↑ 3.1%', trendUp: true },
])

function handleThemeChange(event: StorageEvent) {
  if (event.key !== CacheConstant.SYSTEM_SETTING) return
  const systemSetting = getSystemSetting()
  const isDark = systemSetting?.theme === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
}

// 组件挂载时初始化
onMounted(() => {
  daysSinceLaunch.value = Math.abs(getDaysDiff('2026-04-27'))
  window.addEventListener('storage', handleThemeChange)
})

// 组件卸载时移除事件
onUnmounted(() => {
  window.removeEventListener('storage', handleThemeChange)
})
</script>

<style lang="scss" scoped>
.monitor-dashboard-warpper {
  --bg-color: #061423;
  --header-bg-color: rgba(10, 25, 47, 0.6);
  --kpi-card-bg-color: rgba(10, 25, 47, 0.72);
  background-color: var(--bg-color);
  position: fixed;
  inset: 0;
  z-index: 99999;
  overflow: hidden;
}
.dark .monitor-dashboard-warpper {
  --bg-color: var(--el-bg-color);
  --header-bg-color: transparent;
  --kpi-card-bg-color: transparent;
}
.monitor-dashboard.monitor-dashboard--screenfull {
  position: fixed !important;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
}
.monitor-dashboard {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--bg-color);
  color: #e6f7ff;
  display: flex;
  flex-direction: column;

  &__bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(79, 172, 254, 0.04) 0%, transparent 50%),
      linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
    background-size:
      100% 100%,
      100% 100%,
      40px 40px,
      40px 40px;
    pointer-events: none;
    animation: bgPulse 8s ease-in-out infinite;

    &::before,
    &::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 212, 255, 0.08);
      animation: particleFloat 6s ease-in-out infinite;
    }

    &::before {
      width: 4px;
      height: 4px;
      top: 15%;
      left: 25%;
      animation-delay: 0s;
    }

    &::after {
      width: 3px;
      height: 3px;
      top: 70%;
      left: 75%;
      animation-delay: 2s;
    }
  }

  &__header {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 0 24px;
    flex-shrink: 0;
    background: var(--header-bg-color);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 212, 255, 0.15);
  }

  &__header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  &__logo {
    width: 36px;
    height: 36px;
  }

  &__sys-name {
    font-size: 16px;
    font-weight: 500;
    color: #7aa2d2;
    letter-spacing: 2px;
  }

  &__header-center {
    position: relative;
    text-align: center;
  }

  &__title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 8px;
    background: linear-gradient(90deg, #00d4ff, #4facfe, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    filter: drop-shadow(0 0 12px rgba(0, 212, 255, 0.4));
  }

  &__scan-line {
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 200%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, #4facfe, #00d4ff, transparent);
    animation: scanLine 3s ease-in-out infinite;
  }

  &__header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__datetime {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
  }

  &__time {
    font-size: 20px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: #e6f7ff;
    letter-spacing: 2px;
  }

  &__date {
    font-size: 12px;
    color: #7aa2d2;
  }

  &__weather {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #7aa2d2;
  }

  &__weather-icon {
    width: 20px;
    height: 20px;
    color: #ffc857;
  }

  &__fullscreen-btn {
    color: #7aa2d2;
    font-size: 20px;

    &:hover {
      color: #00d4ff;
    }
  }

  &__body {
    flex: 1;
    overflow: hidden;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    z-index: 1;
  }

  &__kpi-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
    flex-shrink: 0;
  }

  &__kpi-card {
    display: flex;
    align-items: center;
    gap: 14px;
    height: 120px;
    padding: 16px 20px;
    background: var(--kpi-card-bg-color);
    border: 1px solid rgba(0, 212, 255, 0.12);
    border-radius: 8px;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 8px;
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.06), transparent 60%);
      pointer-events: none;
    }

    &:hover {
      border-color: rgba(0, 212, 255, 0.35);
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 212, 255, 0.1);
    }
  }

  &__kpi-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 212, 255, 0.1);
    border-radius: 10px;
    color: #00d4ff;
    font-size: 26px;
    filter: drop-shadow(0 0 6px rgba(0, 212, 255, 0.3));
  }

  &__kpi-info {
    flex: 1;
    min-width: 0;
  }

  &__kpi-value {
    font-size: 26px;
    font-weight: 700;
    color: #00d4ff;
    line-height: 1.2;
    letter-spacing: 1px;
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.25);
  }

  &__kpi-label {
    font-size: 12px;
    color: #7aa2d2;
    margin-top: 2px;
    letter-spacing: 1px;
  }

  &__kpi-bottom {
    position: absolute;
    bottom: 10px;
    right: 16px;
  }

  &__kpi-trend {
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 2px;

    &.is-up {
      color: #00ff95;
    }

    &.is-down {
      color: #ff4d6d;
    }
  }

  &__main-row {
    flex: 1;
    display: flex;
    gap: 16px;
    min-height: 0;
    overflow: hidden;
  }

  &__left {
    width: 25%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
  }

  &__center {
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }

  &__right {
    width: 30%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
  }

  &__panel {
    background: var(--header-bg-color);
    border: 1px solid rgba(0, 212, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      pointer-events: none;
      z-index: 2;
    }

    &::before {
      top: 0;
      left: 0;
      border-top: 1px solid rgba(0, 212, 255, 0.35);
      border-left: 1px solid rgba(0, 212, 255, 0.35);
      border-radius: 8px 0 0 0;
    }

    &::after {
      bottom: 0;
      right: 0;
      border-bottom: 1px solid rgba(0, 212, 255, 0.35);
      border-right: 1px solid rgba(0, 212, 255, 0.35);
      border-radius: 0 0 8px 0;
    }

    &--center {
      flex: 1;
    }
  }

  &__panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(0, 212, 255, 0.08);
  }

  &__panel-title {
    font-size: 14px;
    font-weight: 600;
    color: #e6f7ff;
    letter-spacing: 1px;
    position: relative;
    padding-left: 12px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 14px;
      background: linear-gradient(180deg, #00d4ff, #4facfe);
      border-radius: 2px;
    }
  }

  &__panel-subtitle {
    font-size: 11px;
    color: #7aa2d2;
  }

  &__panel-body {
    flex: 1;
    min-height: 0;
    padding: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    &--map {
      display: flex;
      flex-direction: row;
      gap: 8px;
      padding: 0;
    }
  }

  &__map-wrap {
    flex: 1;
    min-width: 0;
    position: relative;
    padding: 8px;
  }

  &__map-loading {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7aa2d2;
    font-size: 14px;
  }

  &__region-rank {
    width: 180px;
    flex-shrink: 0;
    padding: 12px 10px;
  }

  &__rank-title {
    font-size: 13px;
    font-weight: 600;
    color: #e6f7ff;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 212, 255, 0.12);
    letter-spacing: 1px;
  }

  &__rank-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 0;
    position: relative;
    font-size: 12px;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(122, 162, 210, 0.08);
    }
  }

  &__rank-index {
    width: 18px;
    text-align: center;
    color: #7aa2d2;
    font-weight: 600;

    &.is-top-1 {
      color: #ffc857;
    }
    &.is-top-2 {
      color: #a78bfa;
    }
    &.is-top-3 {
      color: #00d4ff;
    }
  }

  &__rank-name {
    flex: 1;
    min-width: 0;
    color: #7aa2d2;
  }

  &__rank-value {
    color: #e6f7ff;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  &__rank-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 212, 255, 0.3), transparent);
  }

  &__chart {
    position: absolute;
    inset: 0;
  }

  &__panel-body--gauges {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    gap: 4px;
  }

  &__gauge-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-height: 0;
  }

  &__gauge-chart {
    width: 100%;
    flex: 1;
    min-height: 0;
    height: auto;
  }

  &__gauge-label {
    font-size: 10px;
    color: #7aa2d2;
    flex-shrink: 0;
  }

  &__bottom {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    flex-shrink: 0;
  }

  &__panel-body--table {
    display: block;
    padding: 0;
    height: auto;
  }

  &__table {
    --el-table-bg-color: transparent;
    --el-table-tr-bg-color: transparent;
    --el-table-header-bg-color: rgba(0, 212, 255, 0.06);
    --el-table-border-color: rgba(0, 212, 255, 0.08);
    --el-table-text-color: #e6f7ff;
    --el-table-header-text-color: #7aa2d2;
    --el-table-row-hover-bg-color: rgba(0, 212, 255, 0.08);
    --el-fill-color-lighter: rgba(0, 212, 255, 0.04);

    font-size: 12px;

    :deep(.monitor-table-header) th {
      background: rgba(0, 212, 255, 0.06) !important;
      color: #7aa2d2;
      font-size: 12px;
      font-weight: 500;
      border-bottom: 1px solid rgba(0, 212, 255, 0.12);
    }

    :deep(td) {
      border-bottom: 1px solid rgba(0, 212, 255, 0.06);
    }

    :deep(.el-table__body tr:hover > td) {
      background: rgba(0, 212, 255, 0.06) !important;
    }
  }

  &__table-wrapper {
    height: calc(var(--table-row-count) * 40px + 32px);

    :deep(.el-table) {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    :deep(.el-table__header) {
      height: 32px;
      flex-shrink: 0;
    }

    :deep(.el-table__body-wrapper) {
      overflow: hidden;
      height: calc(var(--table-row-count) * 40px);
    }
  }

  &__table-wrapper--scroll {
    overflow: hidden;
    height: calc(var(--table-row-count) * 40px + 32px);

    :deep(.el-table) {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    :deep(.el-table__header) {
      height: 32px;
      flex-shrink: 0;
    }

    :deep(.el-table__body-wrapper) {
      overflow: hidden;
      height: calc(var(--table-row-count) * 40px);
    }

    :deep(.el-table__body) {
      animation: tableScroll 10s linear infinite;
    }

    &:hover {
      :deep(.el-table__body) {
        animation-play-state: paused;
      }
    }
  }

  &__status {
    font-size: 12px;
    font-weight: 500;

    &.is-online {
      // color: #00ff95;
      color: var(--el-color-success);
      text-shadow: 0 0 6px rgba(0, 255, 149, 0.3);
    }

    &.is-fail {
      // color: #ff4d6d;
      color: var(--el-color-danger);
    }
  }
}

@keyframes scanLine {
  0%,
  100% {
    opacity: 0.4;
    transform: translateX(-50%) scaleX(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scaleX(1.3);
  }
}

@keyframes bgPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes tableScroll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes particleFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.5;
  }
  25% {
    transform: translate(80px, -60px) scale(1.8);
    opacity: 1;
  }
  50% {
    transform: translate(120px, 40px) scale(1);
    opacity: 0.3;
  }
  75% {
    transform: translate(-40px, -30px) scale(1.5);
    opacity: 0.8;
  }
}

html[data-device='mobile'] {
  .monitor-dashboard-warpper {
    overflow-y: auto;
  }

  .monitor-dashboard__header {
    justify-content: center;
  }
  .monitor-dashboard__header-left,
  .monitor-dashboard__header-right {
    display: none;
  }
  .monitor-dashboard__kpi-row {
    grid-template-columns: repeat(1, 1fr);
    .monitor-dashboard__kpi-card {
      height: auto;
    }
  }
  .monitor-dashboard__main-row {
    display: flex;
    flex-direction: column;
    .monitor-dashboard__left {
      width: 100%;
    }
    .monitor-dashboard__right {
      width: 100%;
      .monitor-dashboard__panel-body--gauges {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .monitor-dashboard__panel {
      min-height: 300px;
    }
  }
  .monitor-dashboard__bottom {
    display: flex;
    flex-direction: column;
  }
}
</style>
