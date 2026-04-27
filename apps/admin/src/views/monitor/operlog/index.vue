<template>
  <div class="app-content flex flex-col h-full">
    <el-form ref="queryParamsRef" :model="queryParams" inline v-permissions="['monitor:operlog:query']">
      <el-form-item label="系统模块" prop="title">
        <el-input v-model="queryParams.title" placeholder="请输入系统模块" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="操作人员" prop="username">
        <el-input v-model="queryParams.username" placeholder="请输入操作人员" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="操作地址" prop="ip">
        <el-input v-model="queryParams.ip" placeholder="请输入操作地址" clearable style="width: 240px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="操作状态" clearable style="width: 240px" :options="sys_common_status"> </el-select>
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
      <el-button :loading type="danger" plain @click="handleDelete()" :disabled="!isMultiple" v-permissions="['monitor:operlog:delete']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>批量删除</span>
      </el-button>
      <el-button :loading type="danger" plain @click="handleClear" v-permissions="['monitor:operlog:clear']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>清空</span>
      </el-button>
      <el-button :loading="exportLoading" type="warning" plain @click="handleExport" v-permissions="['monitor:operlog:export']">
        <template #icon> <SvgIcon name="Download" /> </template>
        <span>导出</span>
      </el-button>
    </div>

    <ProTable ref="tableRef" v-loading="loading" :data="list" :columns="columns" @selection-change="handleSelectionChange">
      <template #businessType="{ row }">
        <DictTag :options="sys_oper_type" :value="row.businessType" />
      </template>
      <template #status="{ row }">
        <DictTag :options="sys_common_status" :value="row.status" />
      </template>
      <template #duration="{ row }">
        <span>{{ row.duration }}毫秒</span>
      </template>
      <template #action="{ row }">
        <el-link type="primary" @click="handleView(row)">详细</el-link>
        <el-link type="danger" @click="handleDelete(row)">删除</el-link>
      </template>
    </ProTable>

    <ProPagination :total v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />

    <OperateDetailDialog ref="operateDetailDialogRef" />
  </div>
</template>

<script setup lang="ts">
import OperateDetailDialog from './detail.vue'
import { linkDownload, TipModal } from '@/utils'
import type { ProTableColumn } from '@/components'
import type { OperLogEntity, OperlogQueryParams } from '@/types'
import { OperateinfoRequest } from '@/api/monitor/operlog.request'

const { sys_oper_type, sys_common_status } = useDict('sys_oper_type', 'sys_common_status')

const list = ref<OperLogEntity[]>([])
const multipleSelection = ref<OperLogEntity[]>([])
const total = ref<number>(0)
const exportLoading = ref<boolean>(false)
const loading = ref<boolean>(true)
const isMultiple = computed(() => multipleSelection.value.length > 0)
const tableRef = useTemplateRef('tableRef')
const queryParams = ref<OperlogQueryParams>({ pageNo: 1, pageSize: 10 })
const queryParamsRef = useTemplateRef('queryParamsRef')
const operateDetailDialogRef = useTemplateRef('operateDetailDialogRef')

const columns: ProTableColumn<OperLogEntity>[] = [
  { align: 'center', type: 'selection' },
  { align: 'center', type: 'index', label: '序号', width: 64 },
  { align: 'center', prop: 'requestId', label: '请求ID', showOverflowTooltip: true, width: 100 },
  { align: 'center', prop: 'title', label: '系统模块', showOverflowTooltip: true, width: 90 },
  { align: 'center', prop: 'businessType', label: '操作类型', slot: 'businessType', width: 90 },
  { align: 'center', prop: 'username', label: '操作人员', showOverflowTooltip: true },
  { align: 'center', prop: 'ip', label: '操作地址', showOverflowTooltip: true, width: 90 },
  { align: 'center', prop: 'location', label: '操作地点', showOverflowTooltip: true },
  { align: 'center', prop: 'requestMethod', label: '请求方法', width: 90 },
  { align: 'center', prop: 'status', label: '操作状态', slot: 'status', width: 90 },
  { align: 'center', prop: 'operTime', label: '操作时间', width: 160 },
  { align: 'center', prop: 'duration', label: '消耗时间', slot: 'duration', width: 100 },
  { align: 'center', slot: 'action', label: '操作', fixed: 'right', minWidth: 120 },
]

async function getList() {
  try {
    loading.value = true
    const data = await OperateinfoRequest.findList(queryParams.value)
    list.value = data.records
    total.value = data.total
    loading.value = false
  } catch (error: any) {
    console.log('OperateinfoRequest getList error: ', error)
    loading.value = false
    return Promise.reject(error)
  }
}

function handleSelectionChange(row: OperLogEntity[]) {
  multipleSelection.value = row
}

async function handleDelete(record?: OperLogEntity) {
  try {
    const { cancel } = await TipModal.confirm(`确定要删除选中的数据吗？`)
    if (cancel) return TipModal.msg(`操作取消`)
    const ids = record ? record.id : multipleSelection.value.map((item) => item.id).join(',')
    await OperateinfoRequest.delete({ ids })
    if (list.value.length <= 1) queryParams.value.pageNo = queryParams.value.pageNo > 1 ? queryParams.value.pageNo - 1 : 1
    await getList()
    TipModal.msgSuccess(`删除成功`)
    if (!isMultiple.value) return
    multipleSelection.value = []
    tableRef.value?.clearSelection()
  } catch (error: any) {
    console.log('operlog handleDelete error: ', error)
    return Promise.reject(error)
  }
}

function handleView(record: OperLogEntity) {
  operateDetailDialogRef.value?.open(record)
}

async function handleClear() {
  const { cancel } = await TipModal.confirm(`确定要清空所有的数据吗？`)
  if (cancel) return TipModal.msg(`操作取消`)
  const msg = await OperateinfoRequest.clear()
  await getList()
  TipModal.msgSuccess(msg || `数据清空成功`)
}

async function handleExport() {
  try {
    exportLoading.value = true
    const response = await OperateinfoRequest.export()
    const filenameMatch = response.headers['content-disposition'].match(/filename\*=UTF-8''(.*)/i)
    const filename = decodeURIComponent(filenameMatch[1])
    linkDownload(response.data, filename)
    exportLoading.value = false
  } catch (error) {
    console.log('handleExport error: ', error)
    exportLoading.value = false
    return Promise.reject(error)
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
