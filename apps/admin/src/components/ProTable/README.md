# ProTable

基于 `el-table` 的轻量封装，通过 `columns` 配置动态生成列。全局注册，直接使用无需手动引入。

## 基础用法

通过 `columns` 配置列，`data` 传入数据：

```vue
<template>
  <ProTable :columns="columns" :data="tableData" />
</template>

<script setup>
const columns = [
  { type: 'index', label: '序号', width: 60 },
  { prop: 'roleCode', label: '角色编码', minWidth: 120 },
  { prop: 'roleName', label: '角色名称', minWidth: 120 },
  { prop: 'createTime', label: '创建时间', width: 180 },
]

const tableData = ref([{ roleCode: 'admin', roleName: '管理员', createTime: '2024-01-01 12:00:00' }])
</script>
```

## 自定义列模板

通过 `slot` 指定插槽名，在 `<ProTable>` 内用具名插槽自定义列内容：

```vue
<template>
  <ProTable :columns="columns" :data="tableData">
    <template #status="{ row }">
      <el-switch v-model="row.status" active-value="1" inactive-value="0" />
    </template>
    <template #action="{ row }">
      <el-link type="primary" @click="handleEdit(row)">修改</el-link>
      <el-link type="primary" @click="handleDelete(row)">删除</el-link>
    </template>
  </ProTable>
</template>

<script setup>
const columns = [
  { prop: 'roleName', label: '角色名称', minWidth: 120 },
  { prop: 'status', label: '状态', slot: 'status', width: 80 },
  { slot: 'action', label: '操作', fixed: 'right', width: 132 },
]
</script>
```

## 多选

设置 `type` 为 `selection` 即可实现多选，配合 `@selection-change` 获取选中行：

```vue
<template>
  <ProTable ref="tableRef" :columns="columns" :data="tableData" @selection-change="handleSelectionChange">
    <template #action="{ row }">
      <el-link type="primary" @click="handleEdit(row)">修改</el-link>
    </template>
  </ProTable>
</template>

<script setup>
const columns = [
  { type: 'selection', width: 50 },
  { prop: 'roleName', label: '角色名称' },
  { slot: 'action', label: '操作', width: 100 },
]

const ids = ref<string[]>([])

function handleSelectionChange(rows) {
  ids.value = rows.map(r => r.id)
}
</script>
```

## 展开行

设置 `type` 为 `expand`，通过 `slot` 指定展开内容：

```vue
<template>
  <ProTable :columns="columns" :data="tableData" row-key="id">
    <template #expand="{ row }">
      <div style="padding: 16px">
        <p>角色编码：{{ row.roleCode }}</p>
        <p>角色描述：{{ row.description }}</p>
      </div>
    </template>
  </ProTable>
</template>

<script setup>
const columns = [
  { type: 'expand', slot: 'expand', width: 40 },
  { prop: 'roleName', label: '角色名称' },
  { prop: 'roleCode', label: '角色编码' },
]
</script>
```

## 加载状态

通过 `loading` 控制表格加载状态，`element-loading-text` 自定义加载文案：

```vue
<template>
  <ProTable :columns="columns" :data="tableData" :loading="loading" element-loading-text="数据加载中..." />
</template>
```

## 树形数据

设置 `row-key` 和 `default-expand-all` 展示树形数据：

```vue
<ProTable :columns="columns" :data="treeData" row-key="id" :default-expand-all="true" />
```

## 排序

列配置中设置 `sortable` 开启排序，通过 `@sort-change` 监听排序变化：

```vue
<template>
  <ProTable :columns="columns" :data="tableData" @sort-change="handleSortChange" />
</template>

<script setup>
const columns = [
  { prop: 'roleName', label: '角色名称', sortable: true },
  { prop: 'createTime', label: '创建时间', sortable: true, width: 180 },
]

function handleSortChange({ prop, order }) {
  console.log(prop, order)
}
</script>
```

## Table 实例方法

通过 ref 获取 ProTable 实例，可调用 `el-table` 全部原生方法：

```vue
<template>
  <ProTable ref="tableRef" :columns="columns" :data="tableData" />
</template>

<script setup>
const tableRef = useTemplateRef('tableRef')

// 清空选中
tableRef.value?.clearSelection()

// 切换行选中状态
tableRef.value?.toggleRowSelection(row, true)

// 切换展开行
tableRef.value?.toggleRowExpansion(row)

// 重新布局
tableRef.value?.doLayout()

// 设置滚动位置
tableRef.value?.setScrollTop(0)
</script>
```

## 典型页面示例

```vue
<template>
  <div class="app-content">
    <!-- 搜索栏 -->
    <ProSearch :items="searchItems" v-model="queryParams" @query="handleQuery" @reset="resetQuery" />

    <!-- 操作按钮 -->
    <div class="mb-16px">
      <el-button type="primary" plain @click="handleCreate">新增</el-button>
      <el-button type="danger" plain :disabled="!isMultiple" @click="handleDelete()">批量删除</el-button>
    </div>

    <!-- 表格 -->
    <ProTable ref="tableRef" v-loading="loading" :columns="columns" :data="list" @selection-change="handleSelectionChange">
      <template #status="{ row }">
        <DictTag :options="dictOptions" :value="row.status" />
      </template>
      <template #action="{ row }">
        <el-link type="primary" @click="handleEdit(row)">修改</el-link>
        <el-link type="primary" @click="handleDelete(row)">删除</el-link>
      </template>
    </ProTable>

    <!-- 分页 -->
    <ProPagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />
  </div>
</template>
```

## API

### ProTable Props

| 属性名                | 说明               | 类型                              | 默认值 |
| --------------------- | ------------------ | --------------------------------- | ------ |
| columns               | 列配置数组         | `ProTableColumn[]`                | —      |
| data                  | 表格数据           | `any[]`                           | —      |
| loading               | 加载状态           | `boolean`                         | —      |
| element-loading-text  | 加载文案           | `string`                          | —      |
| highlight-current-row | 高亮当前行         | `boolean`                         | `true` |
| row-key               | 行数据的 Key       | `string`                          | —      |
| border                | 是否带有纵向边框   | `boolean`                         | —      |
| stripe                | 是否带有斑马纹     | `boolean`                         | —      |
| size                  | 表格尺寸           | `'large' \| 'default' \| 'small'` | —      |
| default-expand-all    | 是否默认展开所有行 | `boolean`                         | —      |

> 继承 `el-table` 全部原生 Props，此处仅列出常用项。

### ProTableColumn

| 属性名                | 说明                   | 类型                                 | 默认值 |
| --------------------- | ---------------------- | ------------------------------------ | ------ |
| prop                  | 字段名                 | `string`                             | —      |
| label                 | 列标题                 | `string`                             | —      |
| slot                  | 自定义插槽名称         | `string`                             | —      |
| width / minWidth      | 列宽 / 最小列宽        | `string \| number`                   | —      |
| type                  | 列类型                 | `'selection' \| 'index' \| 'expand'` | —      |
| fixed                 | 列固定位置             | `'left' \| 'right'`                  | —      |
| align                 | 对齐方式               | `'left' \| 'center' \| 'right'`      | —      |
| sortable              | 是否可排序             | `boolean \| 'custom'`                | —      |
| show-overflow-tooltip | 内容过长时显示 tooltip | `boolean`                            | —      |

> 继承 `el-table-column` 全部原生属性，此处仅列出常用项。

### ProTable Events

继承 `el-table` 全部原生事件，常用事件：

| 事件名           | 说明           | 回调参数                                        |
| ---------------- | -------------- | ----------------------------------------------- |
| selection-change | 多选变化时触发 | `(rows: any[]) => void`                         |
| sort-change      | 排序变化时触发 | `({ prop: string, order: string }) => void`     |
| row-click        | 行点击时触发   | `(row: any, column: any, event: Event) => void` |

### ProTable Methods

通过 ref 可调用 `el-table` 全部原生方法，常用方法：

| 方法名             | 说明             | 参数                             |
| ------------------ | ---------------- | -------------------------------- |
| clearSelection     | 清空选中         | —                                |
| toggleRowSelection | 切换行选中       | `(row: any, selected: boolean)`  |
| toggleRowExpansion | 切换展开行       | `(row: any, expanded?: boolean)` |
| doLayout           | 重新布局         | —                                |
| setScrollTop       | 设置垂直滚动位置 | `(top: number)`                  |
| sort               | 手动排序         | `(prop: string, order: string)`  |

### ProTable Slots

| 插槽名 | 说明                               | 作用域                    |
| ------ | ---------------------------------- | ------------------------- |
| —      | `columns` 中声明的 `slot` 对应插槽 | `{ row, column, $index }` |
