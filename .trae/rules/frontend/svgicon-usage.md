---
alwaysApply: true
scene: apps/admin
---

# SvgIcon 使用规范

图标只允许使用 SvgIcon 组件，严禁使用 ElIcon 或其他图标组件。全局注册，无需手动引入。

## 标准用法

### 组件 icon 插槽

Element Plus 组件中自带 `icon`、`prefix`、`suffix` 等图标插槽的，一律用 SvgIcon：

```vue
<!-- el-button #icon -->
<el-button plain type="primary">
  <template #icon> <SvgIcon name="Plus" /> </template>
  <span>新增</span>
</el-button>

<!-- el-input #prefix -->
<el-input v-model.trim="username" placeholder="账号" clearable>
  <template #prefix>
    <SvgIcon name="User" />
  </template>
</el-input>

<!-- el-input #suffix -->
<el-input v-model.trim="keyword" placeholder="搜索" clearable>
  <template #suffix>
    <SvgIcon name="Search" />
  </template>
</el-input>
```

通用格式：`<template #插槽名> <SvgIcon name="xxx" /> </template>`，适用于所有 Element Plus 组件的图标插槽。

### 直接使用

```vue
<SvgIcon name="User" />
<SvgIcon name="Delete" size="1.2em" />
<SvgIcon name="Search" color="#409eff" :size="24" />
```

### 动态 name

```vue
<SvgIcon :name="row.icon" />
<SvgIcon :name="`${model.icon ? model.icon : 'Search'}`" />
```

## 关键规则

1. **name**：`src/assets/icons/` 目录下的 SVG 文件名（不含 `.svg` 后缀），如 `Plus` `Delete` `Search`
2. **size**：默认 `1em`，支持字符串 `"1.2em"` 或数字 `24`（px）
3. **color**：默认 `inherit`，继承父级颜色
4. **customClass**：自定义类名，用于 margin 等间距控制
5. **组件 icon 插槽**：`icon`、`prefix`、`suffix` 等插槽统一格式 `<template #插槽名> <SvgIcon name="xxx" /> </template>`
6. **name 不存在时需提醒**：如果 `src/assets/icons/` 下找不到对应文件名，提醒用户补充
