<template>
  <div class="app-content flex flex-col h-full">
    <el-form ref="queryParamsRef" :model="queryParams" inline v-permissions="['monitor:job:query']">
      <el-form-item label="任务名称" prop="jobName">
        <el-input v-model="queryParams.jobName" placeholder="请输入任务名称" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="任务组名" prop="jobGroup">
        <el-input v-model="queryParams.jobGroup" placeholder="请输入任务组名" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="执行状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable style="width: 160px" :options="sys_common_status"> </el-select>
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
      <el-button plain type="danger" @click="handleDelete()" :disabled="!isMultiple" v-permissions="['monitor:job:delete']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>批量删除</span>
      </el-button>
      <el-button plain type="danger" @click="handleClear" v-permissions="['monitor:job:delete']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>清空</span>
      </el-button>
      <el-button :loading="exportLoading" type="warning" plain @click="handleExport" v-permissions="['monitor:job:export']">
        <template #icon> <SvgIcon name="Download" /> </template>
        <span>导出</span>
      </el-button>
      <el-button type="warning" plain @click="handleClose">
        <span>关闭</span>
        <template #icon> <SvgIcon name="Close" /> </template>
      </el-button>
    </div>

    <ProTable ref="tableRef" v-loading="loading" :data="list" :columns="columns" @selection-change="handleSelectionChange">
      <template #status="{ row }">
        <DictTag :options="sys_common_status" :value="row.status" />
      </template>
      <template #action="{ row }">
        <el-link type="primary" @click="handleView(row)">详细</el-link>
        <el-link type="primary" @click="handleDelete(row)" v-permissions="['monitor:job:delete']">删除</el-link>
      </template>
    </ProTable>

    <ProPagination :total v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />

    <JobLogDetailDialog ref="jobLogDetailDialogRef" />
  </div>
</template>

<script setup lang="ts">
import type { JobLogEntity, JobLogQueryParams } from '@/types'
import type { ProTableColumn } from '@/components'
import { JobLogRequest } from '@/api/monitor/job-log.request'
import { linkDownload, TipModal } from '@/utils'
import JobLogDetailDialog from './detail.vue'

const { sys_common_status } = useDict('sys_common_status')
const router = useRouter()
const route = useRoute()
const list = ref<JobLogEntity[]>([])
const multipleSelection = ref<JobLogEntity[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(true)
const exportLoading = ref<boolean>(false)
const isMultiple = computed(() => multipleSelection.value.length > 0)
const tableRef = useTemplateRef('tableRef')
const queryParams = ref<JobLogQueryParams>({ pageNo: 1, pageSize: 10 })
const queryParamsRef = useTemplateRef('queryParamsRef')
const jobLogDetailDialogRef = useTemplateRef('jobLogDetailDialogRef')

const columns: ProTableColumn<JobLogEntity>[] = [
  { align: 'center', type: 'selection' },
  { align: 'center', type: 'index', label: '序号', width: 64 },
  { align: 'center', prop: 'jobName', label: '任务名称', showOverflowTooltip: true, minWidth: 120 },
  { align: 'center', prop: 'jobGroup', label: '任务组名', showOverflowTooltip: true, width: 100 },
  { align: 'center', prop: 'invokeTarget', label: '调用目标', showOverflowTooltip: true, minWidth: 200 },
  { align: 'center', prop: 'jobMessage', label: '日志信息', showOverflowTooltip: true, minWidth: 200 },
  { align: 'center', prop: 'status', label: '执行状态', slot: 'status', width: 90 },
  { align: 'center', prop: 'createTime', label: '执行时间', showOverflowTooltip: true, width: 160 },
  { align: 'center', slot: 'action', label: '操作', fixed: 'right', minWidth: 120 },
]

async function getList() {
  try {
    loading.value = true
    const data = await JobLogRequest.findList(queryParams.value)
    list.value = data.records
    total.value = data.total
  } catch (error) {
    console.log('JobLogRequest findList error:', error)
    return Promise.reject(error)
  } finally {
    loading.value = false
  }
}

function handleSelectionChange(row: JobLogEntity[]) {
  multipleSelection.value = row
}

function handleClose() {
  router.replace({ path: '/monitor/job' })
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

function handleView(row: JobLogEntity) {
  jobLogDetailDialogRef.value?.open(row)
}

async function handleExport() {
  try {
    exportLoading.value = true
    const response = await JobLogRequest.export()
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

async function handleDelete(row?: JobLogEntity) {
  try {
    const { cancel } = await TipModal.confirm('确定要删除选中的数据吗？')
    if (cancel) return TipModal.msg('操作取消')
    const ids = row ? row.id : multipleSelection.value.map((item) => item.id).join(',')
    await JobLogRequest.delete({ ids })
    if (list.value.length <= 1) {
      queryParams.value.pageNo = queryParams.value.pageNo > 1 ? queryParams.value.pageNo - 1 : 1
    }
    await getList()
    TipModal.msgSuccess('删除成功')
    if (!row) {
      multipleSelection.value = []
      tableRef.value?.clearSelection()
    }
  } catch (error) {
    console.log('JobLogRequest delete error:', error)
    return Promise.reject(error)
  }
}

async function handleClear() {
  try {
    const { cancel } = await TipModal.confirm('确定要清空所有的数据吗？')
    if (cancel) return TipModal.msg('操作取消')
    await JobLogRequest.clear()
    await getList()
    TipModal.msgSuccess('清空成功')
  } catch (error) {
    console.log('JobLogRequest clear error:', error)
    return Promise.reject(error)
  }
}

onMounted(() => {
  const { jobGroup, jobName } = route.query as unknown as JobLogQueryParams
  if (jobGroup) queryParams.value.jobGroup = jobGroup
  if (jobName) queryParams.value.jobName = jobName
  getList()
})
</script>

<style lang="scss" scoped></style>
