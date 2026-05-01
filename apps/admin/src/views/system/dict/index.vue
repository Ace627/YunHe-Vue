<template>
  <div class="app-content">
    <el-form ref="queryParamsRef" :model="queryParams" inline v-permissions="['system:dict:query']">
      <el-form-item label="字典名称" prop="dictName">
        <el-input v-model="queryParams.dictName" placeholder="请输入字典名称" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="字典类型" prop="dictType">
        <el-input v-model="queryParams.dictType" placeholder="请输入字典类型" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="字典状态" :options="sys_normal_disable" clearable style="width: 160px"> </el-select>
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
      <el-button plain type="primary" @click="handleCreate" v-permissions="['system:dict:create']">
        <template #icon> <SvgIcon name="Add" /> </template>
        <span>新增</span>
      </el-button>
      <el-button plain type="danger" @click="handleDelete()" :disabled="!isMultiple" v-permissions="['system:dict:delete']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>批量删除</span>
      </el-button>
      <el-button type="danger" plain @click="clearDictCache">
        <span>刷新缓存</span>
        <template #icon> <SvgIcon name="Refresh" /> </template>
      </el-button>
    </div>

    <ProTable ref="tableRef" v-loading="loading" :data="list" :columns="columns" @selection-change="handleSelectionChange">
      <template #status="{ row }">
        <DictTag :options="sys_normal_disable" :value="row.status" />
      </template>
      <template #action="{ row }">
        <el-link type="primary" @click="handleEdit(row)" v-permissions="['system:dict:update']">修改</el-link>
        <el-link type="primary" @click="handleDictData(row)">列表</el-link>
        <el-link type="danger" @click="handleDelete(row)" v-permissions="['system:dict:delete']">删除</el-link>
      </template>
    </ProTable>

    <ProPagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />

    <el-dialog v-model="visible" :title="dialogTitle" :close-on-click-modal="false" :width="dialogWidth">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="字典名称" prop="dictName">
          <el-input v-model.trim="form.dictName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input v-model.trim="form.dictType" placeholder="请输入字典类型" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status" :options="sys_normal_disable"> </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="form.remark" type="textarea" placeholder="请输入备注" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { DictTypeEntity, DictTypeQueryParams } from '@/types'
import type { ProTableColumn } from '@/components'
import { DictRequest } from '@/api/system/dict.request'
import { TipModal } from '@/utils'

const router = useRouter()
const { sys_normal_disable } = useDict('sys_normal_disable')

const list = ref<DictTypeEntity[]>([])
const multipleSelection = ref<DictTypeEntity[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(true)
const isMultiple = computed(() => multipleSelection.value.length > 0)
const tableRef = useTemplateRef('tableRef')
const queryParams = ref<DictTypeQueryParams>({ pageNo: 1, pageSize: 10 })
const queryParamsRef = useTemplateRef('queryParamsRef')

const visible = ref<boolean>(false)
const dialogTitle = ref<string>('新增字典')
const formRef = useTemplateRef('formRef')
const form = ref<Partial<DictTypeEntity>>({ status: '1' })
const isEdit = computed(() => !!form.value.id)

const getterStore = useGetterStore()
const dialogWidth = computed(() => (getterStore.isDesktop ? '600px' : 'calc(100% - 32px)'))

const columns: ProTableColumn<DictTypeEntity>[] = [
  { align: 'center', type: 'selection' },
  { align: 'center', type: 'index', label: '序号', width: 64 },
  { align: 'center', prop: 'dictName', label: '字典名称', showOverflowTooltip: true, minWidth: 90 },
  { align: 'center', prop: 'dictType', label: '字典类型', showOverflowTooltip: true, minWidth: 180 },
  { align: 'center', prop: 'status', label: '状态', slot: 'status' },
  { align: 'center', prop: 'remark', label: '备注', showOverflowTooltip: true, minWidth: 120 },
  { align: 'center', prop: 'createTime', label: '创建时间', minWidth: 160 },
  { align: 'center', slot: 'action', label: '操作', fixed: 'right', width: 120 },
]

const rules = {
  dictName: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
  dictType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
}

async function getList() {
  try {
    loading.value = true
    const data = await DictRequest.findTypeList(queryParams.value)
    list.value = data.records
    total.value = data.total
  } catch (error) {
    console.error('DictRequest findTypeList error:', error)
    return Promise.reject(error)
  } finally {
    loading.value = false
  }
}

function handleSelectionChange(row: DictTypeEntity[]) {
  multipleSelection.value = row
}

async function clearDictCache() {
  await DictRequest.clearCache()
  TipModal.msgSuccess('字典缓存刷新成功')
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
  form.value = { status: '1' }
  dialogTitle.value = '新增字典'
  visible.value = true
}

async function handleEdit(row: DictTypeEntity) {
  try {
    const data = await DictRequest.findTypeDetail({ id: row.id })
    form.value = { ...data }
    dialogTitle.value = '修改字典'
    visible.value = true
  } catch (error) {
    console.error('DictRequest findTypeDetail error:', error)
    return Promise.reject(error)
  }
}

function handleDictData(row: DictTypeEntity) {
  router.push({ path: '/system/dict/data', query: { dictType: row.dictType } })
}

async function handleDelete(row?: DictTypeEntity) {
  try {
    const { cancel } = await TipModal.confirm('确定要删除选中的数据吗？')
    if (cancel) return TipModal.msg('操作取消')
    const ids = row ? row.id : multipleSelection.value.map((item) => item.id).join(',')
    await DictRequest.deleteType({ ids })
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
    console.error('DictRequest deleteType error:', error)
    return Promise.reject(error)
  }
}

async function handleSubmit() {
  try {
    const valid = await formRef.value?.validate()
    if (!valid) return
    if (isEdit.value) {
      await DictRequest.updateType(form.value as DictTypeEntity)
      TipModal.msgSuccess('修改成功')
    } else {
      await DictRequest.createType(form.value as DictTypeEntity)
      TipModal.msgSuccess('新增成功')
    }
    closeDialog()
    await getList()
  } catch (error) {
    console.error('DictRequest submit error:', error)
    return Promise.reject(error)
  }
}

function closeDialog() {
  visible.value = false
  formRef.value?.resetFields()
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
