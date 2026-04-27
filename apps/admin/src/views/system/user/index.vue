<template>
  <div class="app-content">
    <el-form ref="queryParamsRef" :model="queryParams" inline v-permissions="['system:user:query']">
      <el-form-item label="用户账号" prop="username">
        <el-input v-model="queryParams.username" placeholder="请输入用户账号" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="queryParams.phone" placeholder="请输入手机号码" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="用户状态" :options="sys_normal_disable" clearable style="width: 160px"> </el-select>
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
      <el-button plain type="primary" @click="handleCreate()" v-permissions="['system:user:create']">
        <template #icon> <SvgIcon name="Plus" /> </template>
        <span>新增</span>
      </el-button>
      <el-button plain type="danger" @click="handleDelete()" :disabled="!isMultiple" v-permissions="['system:user:delete']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>批量删除</span>
      </el-button>
    </div>

    <ProTable ref="tableRef" v-loading="loading" :data="list" :columns="columns" @selection-change="handleSelectionChange">
      <template #gender="{ row }">
        <DictTag :options="sys_user_gender" :value="row.gender" />
      </template>
      <template #status="{ row }">
        <DictTag :options="sys_normal_disable" :value="row.status" />
      </template>
      <template #action="{ row }">
        <el-link type="primary" @click="handleEdit(row)" v-permissions="['system:user:update']">修改</el-link>
        <el-link type="danger" @click="handleDelete(row)" v-permissions="['system:user:delete']">删除</el-link>
      </template>
    </ProTable>

    <ProPagination :total v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />

    <!-- 新增/修改用户弹窗组件 -->
    <UserDialog ref="userDialogRef" @getList="getList" />
  </div>
</template>

<script setup lang="ts">
import type { UserEntity, UserQueryParams } from '@/types'
import type { ProTableColumn } from '@/components'
import { UserRequest } from '@/api/system/user.request'
import { TipModal } from '@/utils'
import UserDialog from './components/UserDialog.vue'

const { sys_normal_disable, sys_user_gender } = useDict('sys_normal_disable', 'sys_user_gender')
const list = ref<UserEntity[]>([])
const multipleSelection = ref<UserEntity[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(true)
const isMultiple = computed(() => multipleSelection.value.length > 0)
const tableRef = useTemplateRef('tableRef')
const queryParams = ref<UserQueryParams>({ pageNo: 1, pageSize: 10 })
const queryParamsRef = useTemplateRef('queryParamsRef')
const userDialogRef = useTemplateRef('userDialogRef')

const columns: ProTableColumn<UserEntity>[] = [
  { align: 'center', type: 'selection' },
  { align: 'center', type: 'index', label: '序号', width: 64 },
  { align: 'center', prop: 'username', label: '用户账号', showOverflowTooltip: true },
  { align: 'center', prop: 'nickname', label: '用户昵称', showOverflowTooltip: true },
  { align: 'center', prop: 'phone', label: '手机号码', showOverflowTooltip: true, minWidth: 120 },
  { align: 'center', prop: 'email', label: '用户邮箱', showOverflowTooltip: true, minWidth: 180 },
  { align: 'center', prop: 'gender', label: '性别', slot: 'gender', width: 80 },
  { align: 'center', prop: 'status', label: '状态', slot: 'status', width: 80 },
  { align: 'center', prop: 'createTime', label: '创建时间', width: 160 },
  { align: 'center', slot: 'action', label: '操作', fixed: 'right', minWidth: 120 },
]

async function getList() {
  try {
    loading.value = true
    const data = await UserRequest.findList(queryParams.value)
    list.value = data.records
    total.value = data.total
  } catch (error) {
    console.error('UserRequest findList error:', error)
    return Promise.reject(error)
  } finally {
    loading.value = false
  }
}

function handleSelectionChange(row: UserEntity[]) {
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

async function handleCreate() {
  userDialogRef.value?.open()
}

async function handleEdit(row: UserEntity) {
  userDialogRef.value?.open(row)
}

async function handleDelete(row?: UserEntity) {
  try {
    const { cancel } = await TipModal.confirm('确定要删除选中的数据吗？')
    if (cancel) return TipModal.msg('操作取消')
    const ids = row ? row.id : multipleSelection.value.map((item) => item.id).join(',')
    await UserRequest.delete({ ids })
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
    console.error('UserRequest delete error:', error)
  }
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
