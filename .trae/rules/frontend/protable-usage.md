---
alwaysApply: true
scene: apps/admin
---

# ProTable 使用规范

列表页面必须使用 ProTable，严禁直接使用 el-table。按照以下模板生成代码：

## 标准模板

```vue
<template>
  <div class="app-content">
    <ProSearch :items="items" v-model="queryParams" @query="handleQuery" @reset="resetQuery" />

    <div class="mb-16px">
      <el-button plain type="primary" @click="handleCreate">
        <template #icon> <SvgIcon name="Plus" /> </template>
        <span>新增</span>
      </el-button>
      <el-button plain type="danger" @click="handleDelete()" :disabled="!isMultiple">
        <template #icon> <SvgIcon name="Delete" /> </template>
        <span>批量删除</span>
      </el-button>
    </div>

    <ProTable ref="tableRef" v-loading="loading" :data="list" :columns="columns" @selection-change="handleSelectionChange">
      <template #status="{ row }">
        <DictTag :options="sys_normal_disable" :value="row.status" />
      </template>
      <template #action="{ row }">
        <el-link type="primary" @click="handleEdit(row)">修改</el-link>
        <el-link type="primary" @click="handleDelete(row)">删除</el-link>
      </template>
    </ProTable>

    <ProPagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />
  </div>
</template>
```

## columns 定义规范

```ts
const columns: ProTableColumn<RowEntity>[] = [
  { align: 'center', type: 'selection' },
  { align: 'center', type: 'index', label: '序号', width: 64 },
  { align: 'center', prop: 'name', label: '名称', showOverflowTooltip: true, minWidth: 120 },
  { align: 'center', prop: 'status', label: '状态', slot: 'status', width: 80 },
  { align: 'center', prop: 'createTime', label: '创建时间', width: 170 },
  { align: 'center', slot: 'action', label: '操作', fixed: 'right', width: 132 },
]
```

## 关键规则

1. **columns 类型**：使用 `ProTableColumn<T>[]`，T 为行数据类型，从 `@/types` 导入
2. **prop 列**：只需指定 `prop` + `label`，ProTable 自动渲染字段值
3. **slot 列**：columns 中设置 `slot: 'xxx'`，在 `<ProTable>` 内用 `<template #xxx="{ row }">` 自定义内容
4. **多选列**：`{ type: 'selection' }` + `@selection-change="handleSelectionChange"` 获取选中行
5. **序号列**：`{ type: 'index', label: '序号', width: 64 }`
6. **操作列**：`{ slot: 'action', label: '操作', fixed: 'right', width: 132 }`
7. **ref 方法**：通过 `const tableRef = useTemplateRef('tableRef')` 获取实例，可调用 `clearSelection()` `toggleRowSelection()` 等 el-table 原生方法
8. **ProTable 继承 el-table 全部 Props 和 Events**：`data` `loading` `border` `row-key` 等直接透传
