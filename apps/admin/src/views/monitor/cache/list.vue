<template>
  <div class="app-content h-full">
    <el-row :gutter="16" class="h-full">
      <el-col :span="8" :xs="24">
        <el-card>
          <template #header>
            <span>缓存列表</span>
            <SvgIcon name="Refresh" @click="refreshCacheName" />
          </template>
          <ProTable :data="names" :columns="nameColumns" @row-click="handleClickNameRow" :loading="nameLoading">
            <template #action="{ row }">
              <el-link type="danger" @click="handleDeleteName(row)">删除</el-link>
            </template>
          </ProTable>
        </el-card>
      </el-col>
      <el-col :span="8" :xs="24">
        <el-card>
          <template #header>
            <span>键名列表</span>
            <SvgIcon name="Refresh" @click="refreshCacheKeys" />
          </template>
          <ProTable :data="keys" :columns="keyColumns" @row-click="handleClickKeyRow" :loading="keyLoading">
            <template #action="{ row }">
              <el-link type="danger" @click="handleDeleteKey(row)">删除</el-link>
            </template>
          </ProTable>
        </el-card>
      </el-col>
      <el-col :span="8" :xs="24">
        <el-card>
          <template #header>缓存内容</template>
          <el-form :model="cacheForm">
            <el-form-item label="缓存名称" prop="name">
              <el-input v-model="cacheForm.name" readonly />
            </el-form-item>
            <el-form-item label="缓存键名" prop="key">
              <el-input v-model="cacheForm.key" readonly />
            </el-form-item>
            <el-form-item label="缓存内容" prop="value">
              <el-input type="textarea" :rows="16" v-model="cacheForm.value" readonly />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { TipModal } from '@/utils'
import type { CacheName } from '@/types'
import type { ProTableColumn } from '@/components'
import { CacheRequest } from '@/api/monitor/cache.request'

/** 缓存名称列表 */
const names = ref<CacheName[]>([])
/** 缓存名称数据加载态 */
const nameLoading = ref<boolean>(false)
/** 缓存键名列表 */
const keys = ref<{ key: string }[]>([])
/** 缓存键名数据加载态 */
const keyLoading = ref<boolean>(false)
/** 当前选中的缓存名称 */
const currentName = ref<string>('')
/** 缓存内容表单 */
const cacheForm = ref({ key: '', value: '', name: '' })

/** 缓存名称列表的展示列配置项 */
const nameColumns: ProTableColumn<CacheName>[] = [
  { align: 'center', label: '序号', type: 'index', minWidth: 52 },
  { align: 'center', label: '缓存名称', prop: 'prefix', minWidth: 132, showOverflowTooltip: true },
  { align: 'center', label: '备注', prop: 'remark' },
  { align: 'center', label: '操作', slot: 'action', fixed: 'right', minWidth: 52 },
]

/** 缓存键名列表的展示列配置项 */
const keyColumns: ProTableColumn<{ key: string }>[] = [
  { align: 'center', label: '序号', type: 'index', width: 64 },
  { align: 'center', label: '缓存键名', prop: 'key', width: 240, showOverflowTooltip: true },
  { align: 'center', label: '操作', slot: 'action' },
]

async function getNames() {
  try {
    nameLoading.value = true
    const data = await CacheRequest.getNames()
    names.value = data
    nameLoading.value = false
  } catch (error) {
    nameLoading.value = false
  }
}
/** 刷新缓存名称列表 */
async function refreshCacheName() {
  await getNames()
  TipModal.msgSuccess('刷新缓存列表成功')
}

async function handleDeleteName(row: CacheName) {
  await CacheRequest.clearNames({ name: row.prefix })
  TipModal.msgSuccess(`清理缓存名称 ${row.prefix} 成功`)
}
/** 点击缓存名称表格行的回调 */
async function handleClickNameRow(row: CacheName) {
  if (currentName.value !== row.prefix) cacheForm.value = {} as any
  currentName.value = row.prefix
  getKeys()
}

/** 获取缓存键名列表 */
async function getKeys() {
  try {
    keyLoading.value = true
    const data = await CacheRequest.getKeys({ name: currentName.value })
    keys.value = data.map((item) => ({ key: item.replace(`${currentName.value}:`, '') }))
    keyLoading.value = false
  } catch (error) {
    keyLoading.value = false
  }
}
/** 刷新缓存键名列表 */
async function refreshCacheKeys() {
  if (!currentName.value) return TipModal.msgWarning('请先选择一个缓存名称')
  await getKeys()
  TipModal.msgSuccess('刷新键名列表成功')
}
/** 点击缓存键名表格行的回调 */
async function handleClickKeyRow(row: { key: string }) {
  cacheForm.value.name = currentName.value
  cacheForm.value.key = `${currentName.value}:${row.key}`
  cacheForm.value.value = await CacheRequest.getValue({ key: cacheForm.value.key })
}
/** 删除对应 key 的缓存数据 */
async function handleDeleteKey(row: { key: string }) {
  const key = `${currentName.value}:${row.key}`
  await CacheRequest.clearKeys({ key })
  await getKeys()
  TipModal.msgSuccess(`清理缓存键名 ${row.key} 成功`)
}

getNames()
</script>

<style lang="scss" scoped>
.app-content {
  --card-body-height: 0; // 桌面端等高内部滚动
}
html[data-device='mobile'] .app-content {
  --card-body-height: auto; // 移动端高度自适应滚动
}

:deep() .el-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__header {
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
  }
  &__body {
    height: var(--card-body-height);
  }
}
.svg-icon:hover {
  cursor: pointer;
  color: var(--el-color-primary);
}

html[data-device='mobile'] .el-col + .el-col {
  margin-top: 16px;
}
</style>
