---
alwaysApply: true
scene: apps/admin
---

# 缓存使用规范

项目缓存基于 `CacheUtil`（localStorage + TTL 过期），通过 `CacheConstant` 管理所有缓存键，按领域封装 get/set/remove 函数。禁止在业务代码中直接操作 `localStorage` 或直接使用 `CacheUtil`。

## 架构层级

```
CacheConstant（缓存键常量） →  CacheUtil（localStorage 封装 + TTL） →  *.cache.ts（领域封装函数） →  Store / View
```

## 已有缓存模块

| 缓存模块 | 函数                                                                        | 用途             |
| -------- | --------------------------------------------------------------------------- | ---------------- |
| 登录凭证 | `setAccessToken` / `getAccessToken` / `removeAccessToken`                   | Access Token     |
| 登录凭证 | `setRefreshToken` / `getRefreshToken` / `removeRefreshToken`                | Refresh Token    |
| 登录参数 | `setLoginParams` / `getLoginParams` / `removeLoginParams`                   | 记住密码         |
| 侧边栏   | `setSidebarStatus` / `getSidebarStatus` / `removeSidebarStatus`             | 折叠/展开        |
| 组件尺寸 | `setComponentSize` / `getComponentSize` / `removeComponentSize`             | Element 全局尺寸 |
| 系统设置 | `setSystemSetting` / `getSystemSetting` / `removeSystemSetting`             | 主题/布局等      |
| 标签视图 | `setVisitedViews` / `getVisitedViews` / `setCachedViews` / `getCachedViews` | 多标签页记录     |

## 新增缓存步骤

### 1. 在 `CacheConstant` 中添加缓存键

```ts
// src/common/constant/cache.constant.ts
export const CacheConstant = {
  // ...已有键
  MY_MODULE_DATA: `${CACHE_PREFIX}:MY:MODULE:DATA`,
} as const
```

### 2. 创建领域缓存文件

```ts
// src/utils/cache/my-module.cache.ts
import { CacheConstant } from '@/common'
import { CacheUtil } from '../cache.util'

export interface MyModuleData {
  id: string
  name: string
}

export function setMyModuleData(data: MyModuleData) {
  CacheUtil.set(CacheConstant.MY_MODULE_DATA, data)
}

export function getMyModuleData(): MyModuleData | null {
  return CacheUtil.get<MyModuleData>(CacheConstant.MY_MODULE_DATA)
}

export function removeMyModuleData() {
  CacheUtil.del(CacheConstant.MY_MODULE_DATA)
}
```

### 3. 在 `src/utils/index.ts` 中导出

```ts
export * from './cache/my-module.cache'
```

### 4. 在业务代码中使用

```ts
// Store 或 View 中导入
import { setMyModuleData, getMyModuleData, removeMyModuleData } from '@/utils'
```

## CacheUtil API 速查

| 方法                                   | 说明                                       | 参数                     |
| -------------------------------------- | ------------------------------------------ | ------------------------ |
| `CacheUtil.set(key, value, ttl?)`      | 设置缓存，ttl 单位秒，-1 永不过期          | `(string, any, number?)` |
| `CacheUtil.get<T>(key, defaultValue?)` | 获取缓存，过期自动清除并返回默认值         | `(string, T?)`           |
| `CacheUtil.del(key)`                   | 删除指定缓存                               | `(string)`               |
| `CacheUtil.flushall()`                 | 清除所有缓存                               | —                        |
| `CacheUtil.exists(key)`                | 检查缓存是否存在且未过期                   | `(string)`               |
| `CacheUtil.ttl(key)`                   | 获取剩余过期时间（秒），-1 永久，-2 不存在 | `(string)`               |
| `CacheUtil.keys(pattern?)`             | 获取匹配模式的缓存键列表，默认 `*` 全部    | `(string?)`              |
| `CacheUtil.expire(key, ttl)`           | 动态设置缓存过期时间（秒）                 | `(string, number)`       |

## 关键规则

1. **禁止直接操作 localStorage**：统一使用 `CacheUtil`
2. **禁止在 View 中直接使用 CacheUtil**：必须通过 `@/utils` 导出的领域函数
3. **缓存键必须在 CacheConstant 中定义**：禁止手写字符串作为 key
4. **复杂类型定义接口**：如 `SystemSetting`、`LoginParams`，放在对应 `*.cache.ts` 中
5. **默认值在后端处理**：`getXxx()` 返回 `null` 或 `undefined` 时，由调用方提供默认值
