---
name: frontend-coding-guide
description: Vue3 前端代码规范与约束，涵盖模板、脚本、样式、API、状态管理、路由的全量写法约定。当生成或修改 Vue3 前端代码时强制遵循。
---

# Vue3 前端代码规范

生成或修改 `apps/admin/src` 下任何 `.vue`、`.ts` 文件时，必须严格遵循本规范。

---

## 一、模板规范

### 1.1 根容器

路由页面（`views/` 下的页面组件）最外层容器统一使用 `class="app-content"`：

```html
<template>
  <div class="app-content">
    <!-- 页面内容 -->
  </div>
</template>
```

### 1.2 图标

- **禁止**直接使用 `<el-icon>` 组件
- **必须**使用 `<SvgIcon>` 组件，`name` 取 `src/assets/icons/svg/` 目录下的文件名（不含 `.svg` 后缀）
- 如果所需图标在 `assets/icons/` 下不存在，需要提醒用户补充 SVG 文件

```html
<!-- ✅ 正确 -->
<SvgIcon name="Search" />

<!-- ❌ 错误 -->
<el-icon><search /></el-icon>
```

### 1.3 按钮图标

`el-button` 的 icon 统一使用 slot 格式：

```html
<el-button plain type="primary" @click="handleCreate">
  <template #icon> <SvgIcon name="Plus" /> </template>
  <span>新增</span>
</el-button>
```

### 1.4 消息提示

- **禁止**直接使用 `ElMessage`、`ElMessageBox`、`ElNotification`
- **必须**使用 `TipModal` 封装类，需手动导入 `import { TipModal } from '@/utils'`

```typescript
// ✅ 正确
TipModal.msg('操作提示')
TipModal.msgSuccess('操作成功')
TipModal.msgError('操作失败')
TipModal.alert('确认删除？')

// ❌ 错误
ElMessage.success('操作成功')
```

### 1.5 表格

- 涉及列表数据展示，**优先使用 `ProTable` 组件**，而非直接使用 `el-table`
- `ProTable` 通过 `columns` 配置列，通过 slot 自定义列内容

```html
<ProTable ref="tableRef" v-loading="loading" :data="list" :columns="columns" @selection-change="handleSelectionChange">
  <template #status="{ row }">
    <el-switch v-model="row.status" active-value="1" inactive-value="0" @click="handleChangeStatus(row)" />
  </template>
  <template #action="{ row }">
    <el-link type="primary" @click="handleEdit(row)">修改</el-link>
    <el-link type="primary" @click="handleDelete(row)">删除</el-link>
  </template>
</ProTable>
```

### 1.6 搜索表单

使用 `ProSearch` 组件，通过 `items` 配置搜索项，通过 `v-model` 绑定查询参数：

```html
<ProSearch :items="items" v-model="queryParams" @query="handleQuery" @reset="resetQuery" />
```

### 1.7 分页

使用 `ProPagination` 组件：

```html
<ProPagination :total v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize" @pagination="getList" />
```

### 1.8 组件选择优先级

- 能用 ElementPlus 组件的，就用 ElementPlus 组件，不要自己实现
- 功能相同情况下，优先使用项目封装组件（ProTable > el-table、ProSearch > 手动表单）

---

## 二、脚本规范

### 2.1 语法与结构

- 统一使用 `<script setup lang="ts">`
- 函数优先使用 `function` 声明，而非箭头函数

```typescript
// ✅ 正确
async function getList() { ... }
function handleQuery() { ... }

// ❌ 错误
const getList = async () => { ... }
```

### 2.2 Import 排序

import 必须按照 **从上到下、从短到长**（按整体 import 语句字符串长度）排序：

```typescript
import { TipModal } from '@/utils'
import type { ProTableColumn } from '@/types'
import UserDialog from './components/UserDialog.vue'
import { UserRequest } from '@/api/system/user.request'
import type { ProSearchItem, UserEntity, UserQueryParams } from '@/types'
```

排序规则：

1. 先按 import 语句整体长度升序排列（`import { TipModal } from '@/utils'` 短于 `import { UserRequest } from '@/api/system/user.request'`）
2. 不区分 `import` 和 `import type`，统一排序
3. 同类路径放一起，短路径在前

### 2.3 自动引入

以下 Vue API 已配置自动引入（`unplugin-auto-import`），**直接使用即可，无需手动 import**：

- `ref`、`reactive`、`computed`、`watch`、`watchEffect`
- `onMounted`、`onUnmounted`、`onBeforeUnmount`
- `useRouter`、`useRoute`、`useTemplateRef`
- `defineProps`、`defineEmits`、`defineOptions`、`defineExpose`

```typescript
// ✅ 正确 — 直接使用
const loading = ref(false)
const total = ref(0)
onMounted(() => getList())

// ❌ 错误 — 不要手动引入
import { ref, onMounted } from 'vue'
```

### 2.4 类型定义

- 所有变量、参数、返回值必须有明确的类型注解
- 禁止使用 `any`（除非有充分理由并注释说明）
- 类型文件统一放在 `types/api/` 目录下

```typescript
// ✅ 正确
const list = ref<UserEntity[]>([])
const queryParams = ref<UserQueryParams>({ pageNo: 1, pageSize: 10 })

// ❌ 错误
const list = ref([])
const queryParams = ref<any>({})
```

### 2.5 组件名称

- 只有在 `router.database.ts` 中注册过的组件，才允许使用 `defineOptions({ name: '...' })` 定义组件名称
- 未在路由中注册的组件（如弹窗组件），**禁止**使用 `defineOptions` 定义 name

```typescript
// ✅ 允许 — UserDialog 已在路由注册（动态路由）
defineOptions({ name: 'UserDialog' })

// ❌ 禁止 — 未在 router.database.ts 中注册的组件
defineOptions({ name: 'SomeRandomName' })
```

### 2.6 字典数据

使用 `useDict()` 获取字典数据（已自动引入）：

```typescript
const { sys_normal_disable, sys_user_gender } = useDict('sys_normal_disable', 'sys_user_gender')
```

---

## 三、样式规范

### 3.1 样式方案

- **禁止**使用 UnoCSS / Tailwind 等原子化 CSS 类名
- **必须**使用 BEM 命名规范，在 `<style scoped lang="scss">` 中手写样式

```scss
<style scoped lang="scss">
.app-content {
  padding: 16px;

  &__header {
    display: flex;
    align-items: center;
  }

  &__item {
    &--active {
      color: var(--el-color-primary);
    }
  }
}
</style>
```

### 3.2 色彩变量

- 色彩**优先使用 Element Plus CSS 变量**（`var(--el-*)`），方便深色主题自动适配
- 避免硬编码颜色值

```scss
// ✅ 正确
color: var(--el-color-primary);
background: var(--el-bg-color);

// ❌ 错误
color: #409eff;
background: #ffffff;
```

### 3.3 响应式布局

布局需要适配桌面端和移动端：

- `html[data-device='mobile']` 代表处于移动端环境
- 使用 `el-row` + `el-col` 的 `:xs` 断点适配移动端

```html
<el-col :span="12" :xs="24">
  <!-- 桌面端占半行，移动端占整行 -->
</el-col>
```

---

## 四、API 请求规范

### 4.1 请求类定义

API 请求统一封装为抽象类，方法为静态方法，路径前缀与模块名一致：

```typescript
// api/system/role.request.ts
import { request } from '@/utils/request'
import type { RoleEntity, RoleQueryParams } from '@/types'

export abstract class RoleRequest {
  /** 分页列表 */
  static findList(params: RoleQueryParams): PaginationResponse<RoleEntity> {
    return request.get('/system/role/list', { params })
  }

  /** 详情 */
  static findOneById(params: { id: string }): Promise<RoleEntity> {
    return request.get('/system/role/detail', { params })
  }

  /** 创建 */
  static create(data: RoleEntity): Promise<string> {
    return request.post('/system/role/create', data)
  }

  /** 更新 */
  static update(data: RoleEntity): Promise<string> {
    return request.put('/system/role/update', data)
  }

  /** 删除 */
  static delete(params: { ids: string }): Promise<string> {
    return request.delete('/system/role/delete', { params })
  }
}
```

### 4.2 请求实例

- 使用项目封装的 `request` 实例（`@/utils/request`）
- 拦截器已全局配置（JWT 认证、重复提交、进度条、响应错误/转换），无需手动处理
- 文件命名：`<模块名>.request.ts`，放在 `api/<区域>/` 目录下

---

## 五、状态管理规范

### 5.1 Pinia Store

使用 Pinia 的 Setup Store 语法（组合式 API 风格）：

```typescript
// store/modules/user.ts
export const useUserStore = defineStore('user', () => {
  const user = ref({} as UserEntity)
  const roles = ref<string[]>([])

  async function getInfo() { ... }

  return { user, roles, getInfo }
})
```

- Store 文件放在 `store/modules/` 下
- 命名规范：`useXxxStore`，文件名 `xxx.ts`

### 5.2 使用 Store

在组件中直接调用 `useXxxStore()`（已自动引入 `defineStore`，无需 import）：

```typescript
const userStore = useUserStore()
```

---

## 六、路由规范

### 6.1 动态路由 vs 静态路由

- **标准 CRUD 列表页** → 不需要改 `router.database.ts`，通过后台菜单管理配置即可（动态路由）
- **子表页 / 详情页 / 隐藏路由** → 需要在 `router.database.ts` 中注册为静态路由，`meta: { hidden: true }`

```typescript
{
  path: '/system/notice/detail',
  component: Layout,
  meta: { hidden: true },
  children: [{
    path: '',
    component: () => import('@/views/system/notice/detail.vue'),
    name: 'NoticeDetail',
    meta: { title: '公告详情', activeMenu: '/system/notice' },
  }],
}
```

### 6.2 权限指令

按钮级权限使用 `v-permissions` 指令：

```html
<el-button v-permissions="['system:user:create']">新增</el-button> <el-link v-permissions="['system:user:update']">修改</el-link>
```

---

## 七、类型定义规范

### 7.1 类型文件组织

```
types/
  api/
    system/
      user.ts      # UserEntity, UserQueryParams
      role.ts      # RoleEntity, RoleQueryParams
      dict.ts
      menu.ts
    monitor/
      ...
  index.ts          # 桶导出
```

### 7.2 类型导出

新增类型文件后，必须在 `types/index.ts` 中添加桶导出：

```typescript
export * from './api/system/user'
```

### 7.3 通用类型

- `ProTableColumn`、`ProSearchItem` 等通用类型已从 `@/types` 桶导出
- 分页响应统一使用 `PaginationResponse<T>` 泛型

---

## 八、工具函数规范

### 8.1 工具导入

工具函数从 `@/utils` 桶导入：

```typescript
import { TipModal, getAccessToken, setAccessToken, removeAccessToken } from '@/utils'
```

### 8.2 常用工具

| 工具                                                      | 用途                     |
| --------------------------------------------------------- | ------------------------ |
| `TipModal`                                                | 消息提示、确认弹窗、通知 |
| `getAccessToken` / `setAccessToken` / `removeAccessToken` | Token 管理               |
| `useDict`                                                 | 字典数据获取             |
| `tree.util`                                               | 树形数据处理             |
| `linkDownload`                                            | 文件下载（导出 Excel）   |

---

## 九、导出功能规范

涉及列表导出 Excel 等功能，按以下三层模式实现。

### 9.1 API 层

导出接口**必须使用 POST 请求**（适配 `config.yaml` 中 `server.isDemo` 演示环境，GET 请求在演示模式下可能被拦截，导致 Blob 下载失败），有查询参数则传 data，无参数则传空对象 `{}`，同时必须指定 `responseType: 'blob'`：

```typescript
// api/monitor/logininfor.request.ts
import { request } from '@/utils/request'

export abstract class LogininforRequest {
  /** 导出登录日志（无参数） */
  static export() {
    return request.post('/monitor/log/logininfor/export', {}, { responseType: 'blob' })
  }

  /** 导出时携带筛选条件（有参数） */
  static export(params: LogininforQueryParams) {
    return request.post('/monitor/log/logininfor/export', params, { responseType: 'blob' })
  }
}
```

### 9.2 模板层

导出按钮固定使用 `type="warning"` + `Download` 图标 + `:loading` 防重复点击：

```html
<el-button :loading="exportLoading" type="warning" plain @click="handleExport" v-permissions="['xxx:xxx:export']">
  <template #icon> <SvgIcon name="Download" /> </template>
  <span>导出</span>
</el-button>
```

### 9.3 脚本层

使用 `linkDownload` 工具函数，从响应头的 `content-disposition` 中提取文件名：

```typescript
import { linkDownload, TipModal } from '@/utils'

const exportLoading = ref(false)

async function handleExport() {
  try {
    exportLoading.value = true
    const response = await LogininforRequest.export()
    const filenameMatch = response.headers['content-disposition'].match(/filename\*=UTF-8''(.*)/i)
    const filename = decodeURIComponent(filenameMatch[1])
    linkDownload(response.data, filename)
    exportLoading.value = false
  } catch (error) {
    console.log('handleExport error: ', error)
    exportLoading.value = false
  }
}
```

---

## 十、检查清单

生成或修改前端代码后，逐项自查：

- [ ] 路由页面根容器使用 `class="app-content"`
- [ ] 图标使用 `SvgIcon`，未使用 `ElIcon`
- [ ] 消息提示使用 `TipModal`，未使用 `ElMessage`
- [ ] 表格优先使用 `ProTable`
- [ ] Import 按长度排序
- [ ] 未手动引入 `ref`、`computed`、`onMounted` 等自动引入 API
- [ ] 所有变量有明确类型注解，无 `any`
- [ ] 未在非路由组件中使用 `defineOptions({ name })`
- [ ] 样式使用 BEM + SCSS，未使用原子化类名
- [ ] 色彩使用 `var(--el-*)` CSS 变量
- [ ] API 请求使用 `request` 实例 + 抽象类静态方法
- [ ] 函数使用 `function` 声明，非箭头函数
- [ ] `el-button` icon 使用 `<template #icon>` slot 格式
- [ ] 导出按钮使用 `type="warning"` + `Download` 图标 + `:loading` + `linkDownload`
