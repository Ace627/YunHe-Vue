<template>
  <!-- ProTable - 基于 Element Plus Table 的封装组件 支持动态列配置、自定义插槽、加载状态等功能 -->
  <el-table ref="proTableRef" v-bind="mergeProps($attrs, nativeTableProps)" v-loading="loading" :element-loading-text element-loading-background="rgba(0, 0, 0, 0.72)">
    <!-- 遍历所有列配置，动态生成表格列 -->
    <template v-for="column in columns" :key="generateColumnKey(column)">
      <!-- 插槽列：当列配置了 slot 属性时，使用自定义插槽渲染内容 -->
      <el-table-column v-if="column.slot" v-bind="generateBindColumn(column)">
        <template #default="scope">
          <!-- 将当前行数据和列配置透传给父组件的插槽 -->
          <slot :name="column.slot" v-bind="scope"></slot>
        </template>
      </el-table-column>

      <!-- 常规列：没有配置 slot 时，直接渲染 prop 对应的数据 -->
      <el-table-column v-else v-bind="generateBindColumn(column)"></el-table-column>
    </template>

    <!-- 透传其他插槽：支持父组件传入任意插槽（如操作列、展开行等） -->
    <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
      <slot :name="name" v-bind="scope || {}"></slot>
    </template>
  </el-table>
</template>

<script setup lang="ts">
defineOptions({ name: 'ProTable' })
import { mergeProps } from 'vue'
import type { TableInstance } from 'element-plus'
import type { ProTableColumn, ProTableProps } from './types'

// 接收组件属性，设置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  // 默认高亮当前行
  highlightCurrentRow: true,
})

/**
 * 提取原生 Table 属性
 * 过滤掉 ProTable 特有的属性（columns、loading 等），只保留 Element Plus Table 原生支持的属性
 */
const nativeTableProps = computed(() => {
  const { columns, loading, elementLoadingText, ...tableProps } = props
  return tableProps
})

// 存储 Table 实例的引用
const proTableRef = shallowRef<TableInstance>()

/**
 * 生成列的唯一标识
 * 优先级：type > prop > slot
 */
function generateColumnKey(column: ProTableColumn) {
  return column.type || column.prop || column.slot
}

/**
 * 过滤列配置中的非原生属性
 * 移除 slot 属性，只保留 Element Plus Table Column 原生支持的属性
 */
function generateBindColumn(column: ProTableColumn) {
  const { slot, ...nativeColumn } = column
  return nativeColumn
}

/**
 * 暴露 Table 实例方法
 * 使用 Proxy 代理，让父组件可以直接调用原生 Table 的所有方法（如 toggleRowSelection、clearSort 等）
 */
defineExpose<TableInstance>(
  new Proxy(
    {},
    {
      get(_target, key) {
        // 代理获取属性：转发到实际的 Table 实例
        return proTableRef.value?.[key as keyof TableInstance]
      },
      has(_target, key) {
        // 代理检查属性：判断属性是否存在于 Table 实例中
        return key in (proTableRef.value || {})
      },
    },
  ) as TableInstance,
)
</script>

<style lang="scss" scoped></style>
