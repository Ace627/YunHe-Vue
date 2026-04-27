---
alwaysApply: true
scene: vue3_code
---

AI 生成的 Vue3 代码必须遵循以下规则：

- 强制使用 `<script setup lang="ts">` 语法，全程禁用 Options API
- ref、reactive、computed、watch、onMounted 等组合式API，以及 useRouter、useRoute 均支持自动引入，直接使用即可
- defineProps、defineEmits、defineExpose、useTemplateRef 编译器宏无需引入，直接使用
- 获取 DOM/组件实例统一使用 `const xxxRef = useTemplateRef('xxxRef')`，禁止使用 this.$refs
- 代码书写顺序统一：模板渲染 → 响应式变量 → 计算属性 → 业务函数 → 侦听器 → 生命周期钩子
- 命名规范：变量/方法使用小驼峰 camelCase，组件/接口使用大驼峰 PascalCase，文件名称使用短横线 kebab-case
- 常量命名使用全大写 + 下划线分隔（UPPER_CASE）
- 强制使用 TypeScript 类型校验，自定义类型通过 interface/type 定义，严禁滥用 any 类型
- 全局类型规范：根目录 `types` 为全局类型声明，无需手动引入，可直接使用
- 模板规范：v-for 必须绑定唯一 key 属性，统一使用 @ 绑定事件、: 绑定属性
- 样式规范：style 标签必须添加 scoped 作用域，类名遵循语义化命名规则
- 禁用规则：禁止使用 this 关键字，禁止手动导入已配置自动引入的API，禁止编写冗余代码
- 代码要求：简洁优雅，关键业务逻辑添加简洁注释，保证代码可读性与可维护性
