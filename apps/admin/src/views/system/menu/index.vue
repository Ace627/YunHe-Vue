<template>
  <div class="app-content flex flex-col h-full">
    <el-form inline v-permissions="['system:menu:query']">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="菜单状态" prop="status">
        <el-select v-model="queryForm.status" placeholder="请选择菜单状态" style="width: 200px" clearable :options="sys_normal_disable"> </el-select>
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
      <el-button type="primary" plain @click="handleCreate()" v-permissions="['system:menu:create']">
        <span>新增</span>
        <template #icon> <SvgIcon name="Plus" /> </template>
      </el-button>
      <el-button type="info" plain @click="toggleExpandAll">
        <span>{{ isExpandAll ? '折叠' : '展开' }}</span>
        <template #icon> <SvgIcon name="Sort" /> </template>
      </el-button>
    </div>

    <ProTable :loading :columns :data="list" row-key="id" :default-expand-all="isExpandAll" v-if="refreshTable">
      <template #menuName="{ row }">
        <SvgIcon :name="row.icon" v-if="row.icon" class="mr-4px" />
        <span>{{ row.menuName }}</span>
      </template>
      <template #menuType="{ row }">
        <el-tag v-if="isExternal(row.path)" type="danger">外链</el-tag>
        <el-tag v-else-if="row.menuType === 'M'" type="primary">目录</el-tag>
        <el-tag v-else-if="row.menuType === 'C'" type="success">菜单</el-tag>
        <el-tag v-else-if="row.menuType === 'F'" type="warning">按钮</el-tag>
      </template>
      <template #status="{ row }">
        <DictTag :options="sys_normal_disable" :value="row.status" />
      </template>
      <template #visible="{ row }">
        <DictTag :options="sys_menu_visible" :value="row.visible" />
      </template>
      <template #action="{ row }">
        <el-link type="primary" @click="handleCreate(row)" v-permissions="['system:menu:create']">新增</el-link>
        <el-link type="primary" @click="handleUpdate(row)" v-permissions="['system:menu:update']">修改</el-link>
        <el-link type="primary" @click="handleDelete(row)" v-permissions="['system:menu:delete']">删除</el-link>
      </template>
    </ProTable>

    <!-- 菜单新增/修改对话框 -->
    <MenuDialog ref="menuDialogRef" @getList="getList" />
  </div>
</template>

<script setup lang="ts">
import type { MenuEntity, MenuQueryParams, MenuTreeEntity } from '@/types'
import { isExternal, listToTree, TipModal } from '@/utils'
import { MenuRequest } from '@/api/system/menu.request'
import type { ProTableColumn } from '@/components'
import MenuDialog from './components/MenuDialog.vue'

/** 菜单对话框实例 */
const menuDialogRef = ref<InstanceType<typeof MenuDialog>>()
const { sys_normal_disable, sys_menu_visible } = useDict('sys_normal_disable', 'sys_menu_visible')

/** 表格数据加载态 */
const loading = ref<boolean>(false)
/** 是否展开，默认全部折叠 */
const isExpandAll = ref<boolean>(false)
/** 是否重新渲染表格状态 */
const refreshTable = ref<boolean>(true)
/** 查询表单 */
const queryForm = ref<MenuQueryParams>({})
/** 菜单树数据 */
const list = ref<MenuTreeEntity[]>([])
/** 表格列配置 */
const columns: ProTableColumn<MenuEntity>[] = [
  { align: 'left', label: '菜单名称', slot: 'menuName', width: 185 },
  { align: 'center', label: '菜单类型', slot: 'menuType' },
  { align: 'center', label: '显示顺序', prop: 'menuSort', width: 90 },
  { align: 'center', label: '权限标识', prop: 'permission', width: 200 },
  { align: 'center', label: '路由地址', prop: 'path', width: 180, showOverflowTooltip: true },
  { align: 'center', label: '页面地址', prop: 'component', width: 220, showOverflowTooltip: true },
  { align: 'center', label: '菜单状态', slot: 'status' },
  { align: 'center', label: '是否隐藏', slot: 'visible' },
  { align: 'center', label: '最近更新', prop: 'updateTime', width: 170 },
  { align: 'center', label: '操作', slot: 'action', width: 150, fixed: 'right' },
]

async function getList() {
  try {
    loading.value = true
    const records = await MenuRequest.findList(queryForm.value)
    list.value = listToTree(records)
    loading.value = false
  } catch (error: any) {
    console.log('getList error: ', error)
    loading.value = false
    return Promise.reject(error)
  }
}

function handleQuery() {
  getList()
}

function resetQuery() {
  queryForm.value = {}
  handleQuery()
}

function handleCreate(record?: MenuEntity) {
  menuDialogRef.value?.open('create', record)
}

function handleUpdate(record: MenuEntity) {
  menuDialogRef.value?.open('update', record)
}

async function handleDelete(record: MenuEntity) {
  const { cancel } = await TipModal.confirm(`确定要删除《${record.menuName}》吗？`)
  if (cancel) return TipModal.msg(`操作取消`)
  await MenuRequest.delete({ id: record.id })
  TipModal.msgSuccess(`删除成功`)
  getList()
}

function toggleExpandAll() {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => (refreshTable.value = true))
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped></style>
