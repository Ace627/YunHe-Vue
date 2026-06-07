---
alwaysApply: true
scene: apps/admin
---

# ProChart 使用规范

图表必须使用 ProChart 组件，严禁直接使用 echarts。ProChart 自动处理初始化、主题切换、自适应缩放和内存回收。全局注册，无需手动引入。

## 标准用法

```vue
<template>
  <el-card>
    <template #header>命令统计</template>
    <ProChart :options="chartOption" customClass="h-360px" />
  </el-card>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'

const chartOption = computed<EChartsOption>(() => ({
  tooltip: { trigger: 'axis' },
  grid: { left: '3%', right: '4%', bottom: '3%', containLabel: false },
  xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  yAxis: { type: 'value', max: 250 },
  series: [
    {
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    },
  ],
}))
</script>
```

## 关键规则

1. **options 类型**：`computed<EChartsOption>(() => ({}))`，从 `echarts` 导入 `EChartsOption` 类型
2. **customClass**：用于设置图表高度，如 `customClass="h-360px"`，不传则宽度默认 `100%`
3. **自适应**：ProChart 内部使用 `ResizeObserver` 自动监听容器尺寸变化并 resize
4. **深浅色**：ProChart 内部自动根据 `settingStore.theme` 切换 ECharts 的 `dark` / `light` 主题
5. **渲染**：`setOption` 时自动设置 `backgroundColor: 'transparent'`，保证与卡片背景融合
6. **内存**：组件卸载时自动 `dispose` 和断开 `ResizeObserver`，无需手动清理
7. **echarts 实例**：项目已通过 `@/common` 统一导出，在 ProChart 内部引用，使用时无需关心
