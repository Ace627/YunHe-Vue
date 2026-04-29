<template>
  <div class="app-content flex flex-col h-full">
    <el-form ref="queryParamsRef" :model="queryParams" inline v-permissions="['monitor:logininfor:query']">
      <el-form-item label="登录地址" prop="ip">
        <el-input v-model="queryParams.ip" placeholder="请输入登录地址" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="登录账号" prop="username">
        <el-input v-model="queryParams.username" placeholder="请输入登录账号" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="登录状态" clearable style="width: 240px" :options="sys_common_status"> </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="handleQuery">
          <template #icon> <SvgIcon name="Search" /> </template>
          <span>查询</span>
        </el-button>
        <el-button plain type="danger" @click="resetQuery">
          <template #icon> <SvgIcon name="Refresh" /> </template>
          <span>重置</span>
        </el-button>
      </el-form-item>
    </el-form>

    <div class="mb-16px">
      <el-button :loading type="danger" plain @click="handleDelete()" :disabled="!isMultiple" v-permissions="['monitor:logininfor:delete']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>批量删除</span>
      </el-button>
      <el-button :loading type="danger" plain @click="handleClear" v-permissions="['monitor:logininfor:clear']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>清空</span>
      </el-button>
      <el-button :loading="exportLoading" type="warning" plain @click="handleExport" v-permissions="['monitor:logininfor:export']">
        <template #icon> <SvgIcon name="Download" /> </template>
        <span>导出</span>
      </el-button>
    </div>

    <ProTable ref="tableRef" v-loading="loading" :data="list" :columns="columns" @selection-change="handleSelectionChange">
      <template #status="{ row }">
        <DictTag :options="sys_common_status" :value="row.status" />
      </template>
      <template #action="{ row }">
        <el-link type="danger" @click="handleDelete(row)">删除</el-link>
      </template>
    </ProTable>

    <ProPagination :total v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />
  </div>
</template>

<script setup lang="ts">
import { linkDownload, TipModal } from '@/utils'
import type { ProTableColumn } from '@/components'
import { LogininforRequest } from '@/api/monitor/logininfor.request'
import type { LogininfoEntity, LogininforQueryParams } from '@/types'

const { sys_common_status } = useDict('sys_common_status')
const list = ref<LogininfoEntity[]>([])
const multipleSelection = ref<LogininfoEntity[]>([])
const total = ref<number>(0)
const exportLoading = ref<boolean>(false)
const loading = ref<boolean>(true)
const isMultiple = computed(() => multipleSelection.value.length > 0)
const tableRef = useTemplateRef('tableRef')
const queryParams = ref<LogininforQueryParams>({ pageNo: 1, pageSize: 10 })
const queryParamsRef = useTemplateRef('queryParamsRef')

const columns: ProTableColumn<LogininfoEntity>[] = [
  { align: 'center', type: 'selection' },
  { align: 'center', type: 'index', label: '序号', width: 64 },
  { align: 'center', prop: 'requestId', label: '访问编号', showOverflowTooltip: true },
  { align: 'center', prop: 'username', label: '用户名称', showOverflowTooltip: true },
  { align: 'center', prop: 'ip', label: '地址', showOverflowTooltip: true, minWidth: 100 },
  { align: 'center', prop: 'location', label: '登录地点', showOverflowTooltip: true },
  { align: 'center', prop: 'os', label: '操作系统', showOverflowTooltip: true, minWidth: 120 },
  { align: 'center', prop: 'browser', label: '浏览器', showOverflowTooltip: true, width: 140 },
  { align: 'center', prop: 'status', label: '登录状态', slot: 'status', width: 90 },
  { align: 'center', prop: 'message', label: '描述', showOverflowTooltip: true, width: 180 },
  { align: 'center', prop: 'loginTime', label: '登录时间', width: 170 },
  { align: 'center', slot: 'action', label: '操作', fixed: 'right', width: 80 },
]

async function getList() {
  try {
    loading.value = true
    const data = await LogininforRequest.findList(queryParams.value)
    list.value = data.records
    total.value = data.total
    loading.value = false
  } catch (error: any) {
    console.log('LogininforRequest getList error: ', error)
    loading.value = false
    return Promise.reject(error)
  }
}

function handleSelectionChange(row: LogininfoEntity[]) {
  multipleSelection.value = row
}

/** 处理表格数据删除（支持单条删除与批量删除） */
async function handleDelete(record?: LogininfoEntity) {
  try {
    const { cancel } = await TipModal.confirm(`确定要删除选中的数据吗？`)
    if (cancel) return TipModal.msg(`操作取消`)
    const ids = record ? record.id : multipleSelection.value.map((item) => item.id).join(',')
    await LogininforRequest.delete({ ids })
    // 处理页码回退：当前页只有1条数据时，删除后返回上一页（避免空页）
    if (list.value.length <= 1) queryParams.value.pageNo = queryParams.value.pageNo > 1 ? queryParams.value.pageNo - 1 : 1
    await getList()
    TipModal.msgSuccess(`删除成功`)
    if (!isMultiple.value) return
    multipleSelection.value = []
    tableRef.value?.clearSelection()
  } catch (error: any) {
    console.log('user handleDelete error: ', error)
  }
}

async function handleClear() {
  const { cancel } = await TipModal.confirm(`确定要清空所有的数据吗？`)
  if (cancel) return TipModal.msg(`操作取消`)
  const msg = await LogininforRequest.clear()
  await getList()
  TipModal.msgSuccess(msg || `数据清空成功`)
}

async function handleExport() {
  try {
    exportLoading.value = true
    const response = await LogininforRequest.export()
    const filenameMatch = response.headers['content-disposition'].match(/filename\*=UTF-8''(.*)/i)
    const filename = decodeURIComponent(filenameMatch[1])
    linkDownload(response.data, filename)
    exportLoading.value = false
  } catch (error) {
    console.log('handleExport error: ', error)
    exportLoading.value = false
  }
}

function handleQuery() {
  if (loading.value) return TipModal.msgWarning('正在查询中，请勿重复操作')
  queryParams.value.pageNo = 1
  multipleSelection.value = []
  tableRef.value?.clearSelection()
  getList()
}

function resetQuery() {
  queryParamsRef.value?.resetFields()
  handleQuery()
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
