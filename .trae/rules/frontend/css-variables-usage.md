---
alwaysApply: true
scene: apps/admin
---

# CSS 颜色规范

颜色必须优先使用 Element Plus CSS 变量，确保深浅色主题自动适配。项目已引入 `element-plus/theme-chalk/src/dark/css-vars.scss`，`.dark` 类名切换时所有变量自动响应。

## 常用变量速查

### 主题色

| 变量                              | 用途       |
| --------------------------------- | ---------- |
| `var(--el-color-primary)`         | 主色       |
| `var(--el-color-primary-light-3)` | 主色浅 30% |
| `var(--el-color-primary-light-5)` | 主色浅 50% |
| `var(--el-color-primary-light-7)` | 主色浅 70% |
| `var(--el-color-primary-light-8)` | 主色浅 80% |
| `var(--el-color-primary-light-9)` | 主色浅 90% |
| `var(--el-color-primary-dark-2)`  | 主色深 20% |
| `var(--el-color-success)`         | 成功色     |
| `var(--el-color-warning)`         | 警告色     |
| `var(--el-color-danger)`          | 危险色     |
| `var(--el-color-info)`            | 信息色     |

### 文本色

| 变量                               | 用途     |
| ---------------------------------- | -------- |
| `var(--el-text-color-primary)`     | 主要文字 |
| `var(--el-text-color-regular)`     | 常规文字 |
| `var(--el-text-color-secondary)`   | 次要文字 |
| `var(--el-text-color-placeholder)` | 占位符   |
| `var(--el-text-color-disabled)`    | 禁用态   |

### 背景/边框/填充

| 变量                                 | 用途                          |
| ------------------------------------ | ----------------------------- |
| `var(--el-bg-color)`                 | 主背景                        |
| `var(--el-bg-color-page)`            | 页面背景                      |
| `var(--el-bg-color-overlay)`         | 浮层背景                      |
| `var(--el-border-color)`             | 边框                          |
| `var(--el-border-color-light)`       | 浅边框                        |
| `var(--el-border-color-lighter)`     | 更浅边框                      |
| `var(--el-border-color-extra-light)` | 极浅边框                      |
| `var(--el-fill-color)`               | 填充                          |
| `var(--el-fill-color-light)`         | 浅填充                        |
| `var(--el-fill-color-lighter)`       | 更浅填充                      |
| `var(--el-fill-color-blank)`         | 空白填充（input/select 背景） |

### 白色/黑色（深浅主题不变）

| 变量                    | 用途                   |
| ----------------------- | ---------------------- |
| `var(--el-color-white)` | 纯白（深浅主题均不变） |
| `var(--el-color-black)` | 纯黑（深浅主题均不变） |

### 阴影/圆角/过渡/字体

| 变量                                 | 用途         |
| ------------------------------------ | ------------ |
| `var(--el-box-shadow)`               | 通用阴影     |
| `var(--el-box-shadow-light)`         | 浅阴影       |
| `var(--el-box-shadow-lighter)`       | 更浅阴影     |
| `var(--el-border-radius-base)`       | 圆角基准     |
| `var(--el-border-radius-small)`      | 小圆角       |
| `var(--el-transition-duration)`      | 过渡时长     |
| `var(--el-transition-duration-fast)` | 快速过渡时长 |
| `var(--el-font-family)`              | 字体栈       |
| `var(--el-font-size-base)`           | 基准字号     |
| `var(--el-font-size-small)`          | 小字号       |
| `var(--el-font-size-extra-small)`    | 超小字号     |

### 禁用态

| 变量                              | 用途     |
| --------------------------------- | -------- |
| `var(--el-disabled-bg-color)`     | 禁用背景 |
| `var(--el-disabled-text-color)`   | 禁用文字 |
| `var(--el-disabled-border-color)` | 禁用边框 |

### 遮罩/浮层

| 变量                              | 用途                   |
| --------------------------------- | ---------------------- |
| `var(--el-overlay-color)`         | 遮罩背景（深色半透明） |
| `var(--el-overlay-color-lighter)` | 高亮浮层色（hover 态） |
| `var(--el-mask-color)`            | 蒙版背景（浅色半透明） |

## 关键规则

1. **优先用 CSS 变量**：`background-color: var(--el-bg-color)` 而非 `background-color: #fff`
2. **透明色用 rgba**：`rgba(0, 0, 0, 0.05)` 在深浅模式下效果一致，无需特殊处理
3. **自定义变量用 `variables.scss`**：全局新变量定义在 `src/styles/variables.scss` 的 `:root` 中，搭配 `.dark` 覆盖
4. **禁止硬编码 HEX 色值**：如 `#333`、`#f5f5f5`，除非是纯装饰且深浅模式下无需变化
5. **暗色适配已自动**：项目通过 `@use 'element-plus/theme-chalk/src/dark/css-vars.scss'` 引入，`.dark` 类名激活后 el- 变量自动切换，无需手动写 `.dark` 覆盖
6. **BEM 优先**：样式写在下文 `<style scoped>` 中，用 BEM 命名，不使用 UnoCSS 原子类
