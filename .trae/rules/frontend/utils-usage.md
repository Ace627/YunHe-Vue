---
alwaysApply: true
scene: apps/admin
---

# 前端工具函数调用规范

项目中通用方法优先从 `@/utils` 导入使用，禁止重复造轮子。使用前检查 `@/utils` 是否已有对应函数。

## 工具函数速查

### 消息提示 — TipModal

| 方法                              | 说明             | 签名                                                                  |
| --------------------------------- | ---------------- | --------------------------------------------------------------------- |
| `TipModal.msg(message)`           | 信息消息         | `(string, MessageOptions?)`                                           |
| `TipModal.msgSuccess(message)`    | 成功消息         | `(string, MessageOptions?)`                                           |
| `TipModal.msgError(message)`      | 错误消息         | `(string, MessageOptions?)`                                           |
| `TipModal.msgWarning(message)`    | 警告消息         | `(string, MessageOptions?)`                                           |
| `TipModal.alert(content)`         | 弹出提示框       | `(string, ElMessageBoxOptions?)`                                      |
| `TipModal.alertError(content)`    | 弹出错误框       | `(string, ElMessageBoxOptions?)`                                      |
| `TipModal.alertSuccess(content)`  | 弹出成功框       | `(string, ElMessageBoxOptions?)`                                      |
| `TipModal.alertWarning(content)`  | 弹出警告框       | `(string, ElMessageBoxOptions?)`                                      |
| `TipModal.confirm(content)`       | 确认对话框       | `(string, ElMessageBoxOptions?) => Promise<{confirm, cancel}>`        |
| `TipModal.prompt(content)`        | 输入对话框       | `(string, ElMessageBoxOptions?) => Promise<{confirm, cancel, value}>` |
| `TipModal.notify(message)`        | 信息通知         | `(string, NotificationOptions?)`                                      |
| `TipModal.notifyError(message)`   | 错误通知         | `(string, NotificationOptions?)`                                      |
| `TipModal.notifySuccess(message)` | 成功通知         | `(string, NotificationOptions?)`                                      |
| `TipModal.notifyWarning(message)` | 警告通知         | `(string, NotificationOptions?)`                                      |
| `TipModal.showLoading(content?)`  | 打开全局 loading | `(string?, options?)`                                                 |
| `TipModal.hideLoading()`          | 关闭全局 loading | `()`                                                                  |

### 树操作

| 函数                           | 说明               |
| ------------------------------ | ------------------ |
| `listToTree<T>(list, config?)` | 扁平列表转树形结构 |
| `treeToList<T>(tree, config?)` | 树形结构转扁平列表 |

### 浏览器操作

| 函数                               | 说明                                |
| ---------------------------------- | ----------------------------------- |
| `copyText(content, options?)`      | 复制文本到剪贴板，内置成功/失败提示 |
| `linkDownload(fileURL, fileName?)` | 触发文件下载                        |

### 通用工具

| 函数           | 说明                   |
| -------------- | ---------------------- |
| `sleep(delay)` | 异步延迟，返回 Promise |

### 缓存操作

| 函数                                                                        | 说明       |
| --------------------------------------------------------------------------- | ---------- |
| `setAccessToken` / `getAccessToken` / `removeAccessToken`                   | 登录凭证   |
| `setSidebarStatus` / `getSidebarStatus` / `removeSidebarStatus`             | 侧边栏状态 |
| `setComponentSize` / `getComponentSize` / `removeComponentSize`             | 组件尺寸   |
| `setSystemSetting` / `getSystemSetting` / `removeSystemSetting`             | 系统设置   |
| `setVisitedViews` / `getVisitedViews` / `setCachedViews` / `getCachedViews` | 标签视图   |
| `setLoginParams` / `getLoginParams` / `removeLoginParams`                   | 记住密码   |

## 关键规则

1. **优先查 `@/utils`**：实现通用功能前先检查是否已有对应方法，避免重复造轮子
2. **禁止直接使用 ElMessage**：消息提示统一用 `TipModal`，其内部封装了 Element Plus 的消息组件
3. **新增工具函数放 `src/utils/` 下**：按领域创建文件，在 `src/utils/index.ts` 中导出
4. **工具函数用命名导出**：`export function xxx()` 而非 `export default`，保持与现有风格一致
5. **树操作统一用 `listToTree` / `treeToList`**：禁止自行实现递归转树逻辑
6. **loading 统一用 `TipModal.showLoading/hideLoading`**：禁止直接使用 `ElLoading.service`
