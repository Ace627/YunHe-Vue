<template>
  <div class="app-content">
    <el-form ref="queryParamsRef" :model="queryParams" inline v-permissions="['system:dict:query']">
      <el-form-item label="字典类型" prop="dictType">
        <el-select v-model="queryParams.dictType" placeholder="请选择" clearable style="width: 200px" @change="handleQuery">
          <el-option v-for="item in typeOptions" :key="item.id" :label="item.dictName" :value="item.dictType" />
        </el-select>
      </el-form-item>
      <el-form-item label="字典标签" prop="dictLabel">
        <el-input v-model="queryParams.dictLabel" placeholder="请输入字典标签" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="字典状态" clearable style="width: 160px">
          <el-option label="正常" value="1" />
          <el-option label="停用" value="0" />
        </el-select>
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
      <el-button plain type="primary" @click="handleCreate" :disabled="!queryParams.dictType" v-permissions="['system:dict:create']">
        <template #icon> <SvgIcon name="Plus" /> </template>
        <span>新增</span>
      </el-button>
      <el-button plain type="danger" @click="handleDelete()" :disabled="!isMultiple" v-permissions="['system:dict:delete']">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>批量删除</span>
      </el-button>
      <el-button type="warning" plain @click="handleClose">
        <span>关闭</span>
        <template #icon> <SvgIcon name="Close" /> </template>
      </el-button>
    </div>

    <ProTable ref="tableRef" v-loading="loading" :data="list" :columns="columns" @selection-change="handleSelectionChange">
      <template #dictLabel="{ row }">
        <el-tag v-if="row.listClass" :type="row.listClass">{{ row.dictLabel }}</el-tag>
        <span v-else>{{ row.dictLabel }}</span>
      </template>
      <template #status="{ row }">
        <el-tag :type="row.status === '1' ? 'primary' : 'danger'">
          {{ row.status === '1' ? '正常' : '停用' }}
        </el-tag>
      </template>
      <template #action="{ row }">
        <el-link type="primary" @click="handleEdit(row)" v-permissions="['system:dict:update']">修改</el-link>
        <el-link type="danger" @click="handleDelete(row)" v-permissions="['system:dict:delete']">删除</el-link>
      </template>
    </ProTable>

    <ProPagination :total v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />

    <el-dialog v-model="visible" :title="dialogTitle" :width="dialogWidth">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="字典类型" prop="dictType">
          <el-select v-model="form.dictType" placeholder="请选择" style="width: 100%" disabled>
            <el-option v-for="item in typeOptions" :key="item.id" :label="item.dictName" :value="item.dictType" />
          </el-select>
        </el-form-item>
        <el-form-item label="字典标签" prop="dictLabel">
          <el-input v-model.trim="form.dictLabel" placeholder="请输入字典标签" />
        </el-form-item>
        <el-form-item label="字典键值" prop="dictValue">
          <el-input v-model.trim="form.dictValue" placeholder="请输入字典键值" />
        </el-form-item>
        <el-form-item label="字典排序" prop="dictSort">
          <el-input-number v-model="form.dictSort" :min="1" :max="9999" />
        </el-form-item>
        <el-form-item label="回显样式" prop="listClass">
          <el-select v-model="form.listClass">
            <el-option v-for="item in listClassOptions" :key="item.value" :label="item.label + '(' + item.value + ')'" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典状态" prop="status">
          <el-radio-group v-model="form.status" :options="sys_normal_disable"> </el-radio-group>
        </el-form-item>
        <el-form-item label="字典备注" prop="remark">
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
import { TipModal } from '@/utils'
import type { ProTableColumn } from '@/components'
import { DictRequest } from '@/api/system/dict.request'
import type { DictDataEntity, DictDataQueryParams, DictTypeEntity } from '@/types'

const { sys_normal_disable } = useDict('sys_normal_disable')
const route = useRoute()
const router = useRouter()
const list = ref<DictDataEntity[]>([])
const multipleSelection = ref<DictDataEntity[]>([])
const total = ref<number>(0)
const loading = ref<boolean>(true)
const isMultiple = computed(() => multipleSelection.value.length > 0)
const tableRef = useTemplateRef('tableRef')
const queryParams = ref<DictDataQueryParams>({ pageNo: 1, pageSize: 10 })
const queryParamsRef = useTemplateRef('queryParamsRef')
const typeOptions = ref<DictTypeEntity[]>([])

const visible = ref<boolean>(false)
const dialogTitle = ref<string>('新增字典数据')
const formRef = useTemplateRef('formRef')
const form = ref<Partial<DictDataEntity>>({ status: '1', dictSort: 1 })
const isEdit = computed(() => !!form.value.id)

const getterStore = useGetterStore()
const dialogWidth = computed(() => (getterStore.isDesktop ? '600px' : 'calc(100% - 32px)'))

// 数据标签回显样式
const listClassOptions = [
  { value: 'primary', label: '主要' },
  { value: 'success', label: '成功' },
  { value: 'info', label: '信息' },
  { value: 'warning', label: '警告' },
  { value: 'danger', label: '危险' },
]

const columns: ProTableColumn<DictDataEntity>[] = [
  { align: 'center', type: 'selection' },
  { align: 'center', type: 'index', label: '序号', width: 64 },
  { align: 'center', slot: 'dictLabel', label: '字典标签', showOverflowTooltip: true },
  { align: 'center', prop: 'dictValue', label: '字典键值', showOverflowTooltip: true },
  { align: 'center', prop: 'dictSort', label: '排序' },
  { align: 'center', prop: 'status', label: '状态', slot: 'status' },
  { align: 'center', prop: 'remark', label: '备注', showOverflowTooltip: true, width: 120 },
  { align: 'center', prop: 'createTime', label: '创建时间', width: 160 },
  { align: 'center', slot: 'action', label: '操作', fixed: 'right', minWidth: 120 },
]

const rules = {
  dictType: [{ required: true, message: '字典类型不能为空', trigger: 'change' }],
  dictLabel: [{ required: true, message: '字典标签不能为空', trigger: 'blur' }],
  dictValue: [{ required: true, message: '字典键值不能为空', trigger: 'blur' }],
  dictSort: [{ required: true, message: '字典排序不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
}

async function getTypeOptions() {
  try {
    const data = await DictRequest.findTypeList({ pageNo: 1, pageSize: 100 })
    typeOptions.value = data.records
  } catch (error) {
    console.error('DictRequest findTypeList error:', error)
  }
}

function handleClose() {
  router.replace({ path: '/system/dict' })
}

async function getList() {
  if (!queryParams.value.dictType) {
    list.value = []
    total.value = 0
    loading.value = false
    return
  }
  try {
    loading.value = true
    const data = await DictRequest.findDataList(queryParams.value)
    list.value = data.records
    total.value = data.total
  } catch (error) {
    console.error('DictRequest findDataList error:', error)
  } finally {
    loading.value = false
  }
}

function handleSelectionChange(row: DictDataEntity[]) {
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
  queryParams.value.dictType = route.query.dictType as string
  handleQuery()
}

async function handleCreate() {
  form.value = { dictType: queryParams.value.dictType, dictSort: 1, status: '1' }
  dialogTitle.value = '新增字典数据'
  visible.value = true
}

async function handleEdit(row: DictDataEntity) {
  try {
    const data = await DictRequest.findDataDetail({ id: row.id })
    form.value = { ...data }
    dialogTitle.value = '修改字典数据'
    visible.value = true
  } catch (error) {
    console.error('DictRequest findDataDetail error:', error)
  }
}

async function handleDelete(row?: DictDataEntity) {
  try {
    const { cancel } = await TipModal.confirm('确定要删除选中的数据吗？')
    if (cancel) return TipModal.msg('操作取消')
    const ids = row ? row.id : multipleSelection.value.map((item) => item.id).join(',')
    await DictRequest.deleteData({ ids })
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
    console.error('DictRequest deleteData error:', error)
  }
}

async function handleSubmit() {
  try {
    const valid = await formRef.value?.validate()
    if (!valid) return
    if (isEdit.value) {
      await DictRequest.updateData(form.value as DictDataEntity)
      TipModal.msgSuccess('修改成功')
    } else {
      await DictRequest.createData(form.value as DictDataEntity)
      TipModal.msgSuccess('新增成功')
    }
    closeDialog()
    await getList()
  } catch (error) {
    console.error('DictRequest submit error:', error)
  }
}

function closeDialog() {
  visible.value = false
  formRef.value?.resetFields()
}

onMounted(async () => {
  await getTypeOptions()
  if (route.query.dictType) {
    queryParams.value.dictType = route.query.dictType as string
    getList()
  }
})
</script>

<style lang="scss" scoped></style>
