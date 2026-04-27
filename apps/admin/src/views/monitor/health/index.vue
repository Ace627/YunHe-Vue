<template>
  <div class="app-content">
    <el-card class="health__overview">
      <div class="health__overview-header">
        <div class="health__overview-title">
          <div class="health__overview-icon">
            <SvgIcon name="Monitor" />
          </div>
          <div>
            <h2 class="health__overview-heading">系统健康检查</h2>
            <p class="health__overview-subtitle">实时监控服务运行状态</p>
          </div>
        </div>

        <div class="health__overview-actions">
          <div class="health__overview-stats">
            <span class="health__stats-label">服务统计</span>
            <span class="health__stats-value">
              <span class="health__stats-normal">{{ totalNormal }}</span>
              /
              <span class="health__stats-error">{{ totalError }}</span>
            </span>
          </div>

          <el-button type="primary" :loading="loading" @click="fetchData">
            <template #icon><SvgIcon name="Refresh" /></template>
            刷新检查
          </el-button>
        </div>
      </div>
    </el-card>

    <el-row :gutter="16">
      <el-col :span="8" :xs="24" v-for="item in serviceList" :key="item.key">
        <el-card class="health__service-card" shadow="hover">
          <div class="health__service-body">
            <div class="health__service-left">
              <div class="health__service-icon" :class="`health__service-icon--${item.status}`">
                <SvgIcon :name="item.icon" />
              </div>
              <div class="health__service-info">
                <span class="health__service-name">{{ item.name }}</span>
                <span class="health__service-desc">{{ item.desc }}</span>
              </div>
            </div>

            <el-tag :type="item.status === 'up' ? 'success' : 'danger'" round size="small">
              {{ item.status === 'up' ? '正常' : '异常' }}
            </el-tag>
          </div>

          <p v-if="item.message" class="health__service-msg">{{ item.message }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { TipModal } from '@/utils'
import type { HealthCheckData } from '@/types'
import { HealthRequest } from '@/api/monitor/health.request'

interface ServiceItem {
  key: string
  name: string
  icon: string
  desc: string
  status: 'up' | 'down'
  message: string
}

const loading = ref(false)
const healthData = ref<HealthCheckData>({
  status: 'ok',
  info: {},
  error: {},
  details: {},
})

const serviceList = ref<ServiceItem[]>([
  { key: 'network', name: '网络', icon: 'Link', desc: '外部网络连通性', status: 'up', message: '' },
  { key: 'database', name: '数据库', icon: 'Redis', desc: '数据库连接状态', status: 'up', message: '' },
  { key: 'memory', name: '内存(HEAP)', icon: 'Cpu', desc: '堆内存使用状态', status: 'up', message: '' },
  { key: 'rss', name: '内存(RSS)', icon: 'Memory', desc: '进程内存使用状态', status: 'up', message: '' },
  { key: 'storage', name: '磁盘', icon: 'Disk', desc: '磁盘空间状态', status: 'up', message: '' },
])

const totalNormal = computed(() => serviceList.value.filter((i) => i.status === 'up').length)

const totalError = computed(() => serviceList.value.filter((i) => i.status !== 'up').length)

async function fetchData() {
  loading.value = true
  try {
    const res = await HealthRequest.checkAll()
    healthData.value = res

    serviceList.value.forEach((item) => {
      if (res.info?.[item.key]) {
        item.status = 'up'
        item.message = ''
      }
      if (res.error?.[item.key]) {
        item.status = 'down'
        item.message = res.error[item.key].message || ''
      }
    })
  } catch (error: any) {
    console.log('fetchData error: ', error)
    TipModal.msgError('获取健康状态失败')
  } finally {
    loading.value = false
  }
}

fetchData()
</script>

<style lang="scss" scoped>
.health {
  &__overview {
    margin-bottom: 16px;
  }

  &__overview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  &__overview-title {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__overview-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background-color: rgba(47, 150, 252, 0.1);

    .svg-icon {
      width: 28px;
      height: 28px;
      color: #2f96fc;
    }
  }

  &__overview-heading {
    margin: 0 0 4px;
    font-size: 20px;
    font-weight: 700;
    color: var(--el-text-color-primary);
  }

  &__overview-subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }

  &__overview-actions {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__overview-stats {
    text-align: right;
  }

  &__stats-label {
    display: block;
    font-size: 13px;
    color: var(--el-text-color-secondary);
  }

  &__stats-value {
    display: block;
    margin-top: 4px;
    font-size: 18px;
    font-weight: 700;
  }

  &__stats-normal {
    color: var(--el-color-success);
  }

  &__stats-error {
    color: var(--el-color-danger);
  }

  &__service-card {
    margin-bottom: 16px;
  }

  &__service-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__service-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__service-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--el-fill-color-light);

    .svg-icon {
      width: 22px;
      height: 22px;
    }

    &--up .svg-icon {
      color: var(--el-color-success);
    }

    &--down .svg-icon {
      color: var(--el-color-danger);
    }
  }

  &__service-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__service-name {
    font-size: 15px;
    font-weight: 500;
    color: var(--el-text-color-primary);
  }

  &__service-desc {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }

  &__service-msg {
    margin: 12px 0 0;
    font-size: 13px;
    color: var(--el-color-danger);
  }
}

html[data-device='mobile'] {
  .el-col + .el-col {
    margin-top: 16px;
  }
}
</style>
