<template>
  <div class="app-content">
    <el-form ref="queryParamsRef" :model="queryParams" inline v-permissions="['system:role:query']">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="queryParams.roleCode" placeholder="请输入角色编码" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="queryParams.roleName" placeholder="请输入角色名称" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="角色状态" clearable style="width: 160px" :options="sys_normal_disable"> </el-select>
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
      <el-button plain type="primary" @click="handleCreate" v-permissions="['system:role:create']">
        <template #icon> <SvgIcon name="Plus" /> </template>
        <span>新增</span>
      </el-button>
      <el-button plain type="danger" @click="handleDelete()" :disabled="!isMultiple" v-permissions="['system:role:delete']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>批量删除</span>
      </el-button>
    </div>

    <ProTable ref="tableRef" v-loading="loading" :data="list" :columns="columns" @selection-change="handleSelectionChange">
      <template #status="{ row }">
        <el-switch size="small" v-model="row.status" inline-prompt active-value="1" inactive-value="0" @click="handleChangeStatus(row)" v-permissions="['system:role:update']" />
      </template>
      <template #action="{ row }">
        <el-link type="primary" @click="handleEdit(row)" v-permissions="['system:role:update']">修改</el-link>
        <el-link type="danger" @click="handleDelete(row)" v-permissions="['system:role:delete']">删除</el-link>
        <el-link type="success" @click="handleAuth(row)" v-permissions="['system:role:update']">授权</el-link>
      </template>
    </ProTable>

    <ProPagination :total v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />

    <!-- 角色新增/修改对话框 -->
    <RoleDialog ref="roleDialogRef" @getList="getList" />
    <!-- 角色权限分配抽屉 -->
    <AuthPermission ref="authPermissionRef" @getList="getList" />
  </div>
</template>

<script setup lang="ts">
import { TipModal } from '@/utils'
import type { ProTableColumn } from '@/components'
import RoleDialog from './components/RoleDialog.vue'
import { RoleRequest } from '@/api/system/role.request'
import type { RoleEntity, RoleQueryParams } from '@/types'
import AuthPermission from './components/AuthPermission.vue'

const { sys_normal_disable } = useDict('sys_normal_disable')

const list = ref<RoleEntity[]>([])
const multipleSelection = ref<RoleEntity[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(true)
const isMultiple = computed(() => multipleSelection.value.length > 0)
const tableRef = useTemplateRef('tableRef')
const queryParams = ref<RoleQueryParams>({ pageNo: 1, pageSize: 10 })
const queryParamsRef = useTemplateRef('queryParamsRef')
const roleDialogRef = useTemplateRef('roleDialogRef')
const authPermissionRef = useTemplateRef('authPermissionRef')

const columns: ProTableColumn<RoleEntity>[] = [
  { align: 'center', type: 'selection' },
  { align: 'center', type: 'index', label: '序号', width: 64 },
  { align: 'center', prop: 'roleCode', label: '角色编码', showOverflowTooltip: true },
  { align: 'center', prop: 'roleName', label: '角色名称', showOverflowTooltip: true },
  // { align: 'center', prop: 'roleSort', label: '排序', width: 80 },
  { align: 'center', prop: 'status', label: '状态', slot: 'status', width: 80 },
  { align: 'center', prop: 'remark', label: '备注', showOverflowTooltip: true },
  { align: 'center', prop: 'createTime', label: '创建时间', width: 160 },
  { align: 'center', slot: 'action', label: '操作', fixed: 'right', width: 132 },
]

async function getList() {
  try {
    loading.value = true
    const data = await RoleRequest.findList(queryParams.value)
    list.value = data.records
    total.value = data.total
  } catch (error) {
    console.error('RoleRequest findList error:', error)
    return Promise.reject(error)
  } finally {
    loading.value = false
  }
}

function handleSelectionChange(row: RoleEntity[]) {
  multipleSelection.value = row
}

function handleAuth(role: RoleEntity) {
  authPermissionRef.value?.handleOpen(role.id)
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
  roleDialogRef.value?.open()
}

function handleEdit(row: RoleEntity) {
  roleDialogRef.value?.open(row)
}

async function handleChangeStatus(row: RoleEntity) {
  try {
    const actionText = row.status === '1' ? '启用' : '停用'
    const { cancel } = await TipModal.confirm(`确认要${actionText}${row.roleName}角色吗？`)
    if (cancel) throw new Error('cancel')
    await RoleRequest.changeStatus({ id: row.id, status: row.status })
    TipModal.msgSuccess(`${actionText}成功`)
    await getList()
  } catch (error: any) {
    row.status = row.status === '0' ? '1' : '0'
    if (error.message === 'cancel') return TipModal.msg('操作取消')
    return Promise.reject(error)
  }
}

async function handleDelete(row?: RoleEntity) {
  try {
    const { cancel } = await TipModal.confirm('确定要删除选中的数据吗？')
    if (cancel) return TipModal.msg('操作取消')
    const ids = row ? row.id : multipleSelection.value.map((item) => item.id).join(',')
    await RoleRequest.delete({ ids })
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
    console.error('RoleRequest delete error:', error)
  }
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
