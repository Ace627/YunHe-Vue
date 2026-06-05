---
alwaysApply: true
scene: apps/admin
---

AI 生成的 Vue3 代码必须遵循以下规则：

- ElMessage 统一使用 TipModal 封装，禁止直接使用 ElMessage 组件
- 图标只允许使用 SvgIcon 组件，禁止直接使用 ElIcon 组件，name 是 src/assets/icons/svg 目录下的文件名（不包含后缀）
- router.database.ts 没有的组件，禁止使用 `defineOptions({ name: 'MonitorHealth' })` 定义组件名称
- ref, onMounted, computed 已配置自动引入，直接使用即可，无需手动引入
- 生成的 .vue 组件不要用 UnoCSS 这类原子类名，直接使用 BEM 命名规范，在 style 中写样式
- 能用 ElementPlus 组件的，就用 ElementPlus 组件，不要自己实现
- el-button 的 icon 统一使用 <template #icon> <SvgIcon name="Search" /> </template> 格式
- 涉及到使用 el-table 的地方，优先考虑使用 ProTable 组件，而不是直接使用 el-table 组件
- 项目中的 import 必须按照从上到下、从短到长的顺序排序，不能随机排序，是 `import { TipModal } from '@/utils'` 整体长度
