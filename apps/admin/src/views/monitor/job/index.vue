<template>
  <div class="app-content flex flex-col h-full">
    <el-form ref="queryParamsRef" :model="queryParams" inline v-permissions="['monitor:job:query']">
      <el-form-item label="任务名称" prop="jobName">
        <el-input v-model="queryParams.jobName" placeholder="请输入任务名称" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="任务组名" prop="jobGroup">
        <el-input v-model="queryParams.jobGroup" placeholder="请输入任务组名" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable style="width: 160px" :options="sys_job_status"> </el-select>
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
      <el-button plain type="primary" @click="handleCreate" v-permissions="['monitor:job:create']">
        <template #icon> <SvgIcon name="Plus" /> </template>
        <span>新增</span>
      </el-button>
      <el-button plain type="danger" @click="handleDelete()" :disabled="!isMultiple" v-permissions="['monitor:job:delete']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>批量删除</span>
      </el-button>
      <el-button type="info" plain @click="toJobLog()">
        <span>日志查询</span>
        <template #icon> <SvgIcon name="Log" /> </template>
      </el-button>
    </div>

    <ProTable ref="tableRef" v-loading="loading" :data="list" :columns="columns" @selection-change="handleSelectionChange">
      <template #jobGroup="{ row }">
        <DictTag :options="sys_job_group" :value="row.jobGroup" />
      </template>
      <template #status="{ row }">
        <el-switch size="small" v-model="row.status" inline-prompt active-value="1" inactive-value="0" @click="handleChangeStatus(row)" v-permissions="['monitor:job:update']" />
      </template>
      <template #concurrent="{ row }">
        <el-tag :type="row.concurrent === '1' ? 'success' : 'warning'">
          {{ row.concurrent === '1' ? '允许' : '禁止' }}
        </el-tag>
      </template>
      <template #action="{ row }">
        <el-link type="primary" @click="handleEdit(row)" v-permissions="['monitor:job:update']">修改</el-link>
        <el-link type="primary" @click="handleRun(row)" v-permissions="['monitor:job:update']">执行一次</el-link>
        <el-link type="danger" @click="handleDelete(row)" v-permissions="['monitor:job:delete']">删除</el-link>
        <el-link type="primary" @click="toJobLog(row)" v-permissions="['monitor:job:query']">日志</el-link>
      </template>
    </ProTable>

    <ProPagination :total v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />

    <JobDialog ref="jobDialogRef" @getList="getList" />
  </div>
</template>

<script setup lang="ts">
import type { JobEntity, JobQueryParams } from '@/types'
import type { ProTableColumn } from '@/components'
import { JobRequest } from '@/api/monitor/job.request'
import { TipModal } from '@/utils'
import JobDialog from './components/JobDialog.vue'

const router = useRouter()
const { sys_job_status, sys_job_group } = useDict('sys_job_status', 'sys_job_group')

const list = ref<JobEntity[]>([])
const multipleSelection = ref<JobEntity[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(true)
const isMultiple = computed(() => multipleSelection.value.length > 0)
const tableRef = useTemplateRef('tableRef')
const queryParams = ref<JobQueryParams>({ pageNo: 1, pageSize: 10 })
const queryParamsRef = useTemplateRef('queryParamsRef')
const jobDialogRef = useTemplateRef('jobDialogRef')

const columns: ProTableColumn<JobEntity>[] = [
  { align: 'center', type: 'selection' },
  { align: 'center', type: 'index', label: '序号', width: 64 },
  { align: 'center', prop: 'jobName', label: '任务名称', showOverflowTooltip: true, minWidth: 120 },
  { align: 'center', slot: 'jobGroup', label: '任务组名', showOverflowTooltip: true, width: 100 },
  { align: 'center', prop: 'invokeTarget', label: '调用目标', showOverflowTooltip: true, minWidth: 200 },
  { align: 'center', prop: 'cronExpression', label: '执行表达式', showOverflowTooltip: true, width: 120 },
  { align: 'center', prop: 'status', label: '任务状态', slot: 'status', width: 80 },
  { align: 'center', prop: 'concurrent', label: '并发执行', slot: 'concurrent', width: 90 },
  { align: 'center', slot: 'action', label: '操作', fixed: 'right', minWidth: 200 },
]

async function getList() {
  try {
    loading.value = true
    const data = await JobRequest.findList(queryParams.value)
    list.value = data.records
    total.value = data.total
  } catch (error) {
    console.log('JobRequest findList error:', error)
    return Promise.reject(error)
  } finally {
    loading.value = false
  }
}

function toJobLog(row?: JobEntity) {
  if (!row) return router.push({ path: '/monitor/job/log' })
  const { jobGroup, jobName } = row
  router.push({ path: '/monitor/job/log', query: { jobGroup, jobName } })
}

function handleSelectionChange(row: JobEntity[]) {
  multipleSelection.value = row
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

function handleCreate() {
  jobDialogRef.value?.open()
}

function handleEdit(row: JobEntity) {
  jobDialogRef.value?.open(row)
}

async function handleChangeStatus(row: JobEntity) {
  try {
    const actionText = row.status === '1' ? '启动' : '停用'
    const { cancel } = await TipModal.confirm(`确认要${actionText}${row.jobName}任务吗？`)
    if (cancel) throw new Error('cancel')
    await JobRequest.changeStatus({ id: row.id, status: row.status })
    TipModal.msgSuccess(`${actionText}成功`)
    await getList()
  } catch (error: any) {
    row.status = row.status === '0' ? '1' : '0'
    if (error.message === 'cancel') return TipModal.msg('操作取消')
    return Promise.reject(error)
  }
}

async function handleRun(row: JobEntity) {
  try {
    const { cancel } = await TipModal.confirm(`确定要执行该任务吗？`)
    if (cancel) return TipModal.msg('操作取消')
    await JobRequest.run({ jobId: row.id, jobGroup: row.jobGroup || '' })
    TipModal.msgSuccess('执行成功')
  } catch (error) {
    console.log('JobRequest run error:', error)
    return Promise.reject(error)
  }
}

async function handleDelete(row?: JobEntity) {
  try {
    const { cancel } = await TipModal.confirm('确定要删除选中的数据吗？')
    if (cancel) return TipModal.msg('操作取消')
    const ids = row ? row.id : multipleSelection.value.map((item) => item.id).join(',')
    await JobRequest.delete({ ids })
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
    console.log('JobRequest delete error:', error)
    return Promise.reject(error)
  }
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
