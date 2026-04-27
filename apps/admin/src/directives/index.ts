import type { App } from 'vue'
import { roles } from './modules/roles'
// import VueDOMPurifyHTML from 'vue-dompurify-html'
import { permissions } from './modules/permissions'

export function setupDirectives(app: App) {
  // 增强 v-html 指令，过滤 XSS 攻击脚本（使用 v-dompurify-html 替代原生 v-html）
  // app.use(VueDOMPurifyHTML)
  // 注册 v-roles 指令：基于角色控制元素显示/隐藏
  app.directive('roles', roles)
  // 注册 v-permissions 指令：基于权限编码控制元素显示/隐藏
  app.directive('permissions', permissions)
}
