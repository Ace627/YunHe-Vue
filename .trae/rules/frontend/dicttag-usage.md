---
alwaysApply: true
scene: apps/admin
---

# DictTag 使用规范

表格中展示字典值时，必须使用 DictTag 组件。按以下方式使用：

## 标准用法

```vue
<template>
  <ProTable :columns="columns" :data="list">
    <template #status="{ row }">
      <DictTag :options="sys_normal_disable" :value="row.status" />
    </template>
    <template #type="{ row }">
      <DictTag :options="dictTypeOptions" :value="row.type" />
    </template>
  </ProTable>
</template>

<script setup lang="ts">
const { sys_normal_disable } = useDict('sys_normal_disable')

const columns = [
  { prop: 'status', label: '状态', slot: 'status', width: 80 },
  { prop: 'type', label: '类型', slot: 'type', width: 80 },
]
</script>
```

## 关键规则

1. **options**：来自 `useDict('dictType')` 返回的响应式数组，直接传入即可
2. **value**：当前行的字段值，DictTag 自动匹配 `options` 中 `dictValue` 相等的项并显示其 `dictLabel`
3. **渲染效果**：匹配项有 `listClass` 时渲染为 `<el-tag>` 彩色标签，否则渲染为普通文本
4. **useDict 支持多字典**：`useDict('sys_normal_disable', 'sys_user_gender')` 一次获取多个
5. **useDict 有全局缓存**：同名字典只请求一次，多次调用直接复用缓存
