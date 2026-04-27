import type { SystemSetting } from './utils'

export const defaultSettings: SystemSetting = {
  /** 侧边栏是否手风琴模式 */
  uniqueOpened: true,

  /** 是否显示动态标题 */
  showDynamicTitle: true,

  /** 是否显示面包屑导航 */
  showBreadcrumb: true,

  /** 是否显示面包屑导航的图标 */
  showBreadcrumbIcon: true,

  /** 是否显示多标签模式 */
  showTagsView: true,

  /** 显示页签图标 */
  showTagsViewIcon: true,

  /** 是否显示项目名称及 Logo */
  showLogo: true,

  /** 路由转场动效 */
  transition: 'fade-transform',
}
