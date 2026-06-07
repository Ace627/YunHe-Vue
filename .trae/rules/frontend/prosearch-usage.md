---
alwaysApply: true
scene: apps/admin
---

# ProSearch 使用规范

列表页面必须使用 ProSearch，严禁手写 el-form 搜索栏。按照以下模板生成代码：

## 标准模板

```vue
<template>
  <div class="app-content">
    <ProSearch :items="items" v-model="queryParams" @query="handleQuery" @reset="resetQuery" />
  </div>
</template>

<script setup lang="ts">
import type { ProSearchItem } from '@/types'

const queryParams = ref({ pageNo: 1, pageSize: 10 })

const items: ProSearchItem[] = [
  { type: 'input', prop: 'name', label: '名称' },
  { type: 'input', prop: 'code', label: '编码' },
  { type: 'select', prop: 'status', label: '状态', options: sys_normal_disable },
  { type: 'date', prop: 'createTime', label: '创建时间' },
]

function handleQuery() {
  queryParams.value.pageNo = 1
  getList()
}

function resetQuery() {
  queryParams.value = { pageNo: 1, pageSize: 10 }
  getList()
}
</script>
```

## 自定义插槽

当内置 `type` 无法满足需求时（如远程搜索、级联选择等），使用具名插槽自定义表单项。插槽名为 `prop` 值，作用域为 `{ model, item }`：

```vue
<template>
  <ProSearch :items="items" v-model="queryParams" @query="handleQuery" @reset="resetQuery">
    <template #dictType="{ model, item }">
      <el-select v-model="model[item.prop]" placeholder="请选择字典类型" clearable @change="handleQuery">
        <el-option v-for="opt in typeOptions" :key="opt.id" :label="opt.dictName" :value="opt.dictType" />
      </el-select>
    </template>
  </ProSearch>
</template>

<script setup lang="ts">
const items: ProSearchItem[] = [
  { label: '字典类型', prop: 'dictType', type: 'select' },
  { label: '字典标签', prop: 'dictLabel', type: 'input' },
]
</script>
```

## 关键规则

1. **类型声明**：`ProSearchItem[]` 从 `@/types` 导入
2. **v-model**：绑定 `queryParams` 对象，ProSearch 自动管理各字段值
3. **type 类型**：`input` 输入框 / `select` 下拉框 / `date` 日期选择器
4. **select 的 options**：直接传响应式数据即可，支持 `Ref<ProSearchOption[]>` 和普通数组
5. **options 格式**：`{ label: string, value: any }[]`
6. **@query 事件**：点击查询按钮触发，回调中重置 `pageNo` 为 1
7. **@reset 事件**：点击重置按钮触发，ProSearch 内部已清空 `queryParams` 各字段，回调中只需重新请求
8. **placeholder**：不传时自动生成（input → "请输入xxx"，select → "请选择xxx"）
9. **展开/收起**：超过一行的搜索项自动显示展开/收起按钮，无需手动配置
10. **hidden**：设置 `hidden: true` 可隐藏某一项，不占位
11. **自定义插槽**：插槽名为 `prop` 值，作用域 `{ model, item }`，`model[item.prop]` 读写字段值，覆盖内置控件
