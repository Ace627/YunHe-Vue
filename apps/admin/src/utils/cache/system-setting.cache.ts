import { CacheConstant } from '@/common'
import { CacheUtil } from '../cache.util'

export interface SystemSetting {
  /** 侧边栏是否手风琴模式 */
  uniqueOpened: boolean
  /** 是否显示动态标题 */
  showDynamicTitle: boolean
  /** 是否显示面包屑导航 */
  showBreadcrumb: boolean
  /** 是否显示面包屑导航的图标 */
  showBreadcrumbIcon: boolean
  /** 是否显示多标签模式 */
  showTagsView: boolean
  /** 是否显示项目名称及 Logo */
  showLogo: boolean
  /** 显示页签图标 */
  showTagsViewIcon: boolean
  /** 路由转场动效 */
  transition: 'fade-transform' | 'el-fade-in-linear' | 'el-fade-in' | 'el-zoom-in-center' | 'el-zoom-in-top' | 'el-zoom-in-bottom'
}

export function setSystemSetting(config: SystemSetting) {
  CacheUtil.set(CacheConstant.SYSTEM_SETTING, config)
}

export function getSystemSetting(): SystemSetting | null {
  return CacheUtil.get(CacheConstant.SYSTEM_SETTING)
}

export function removeSystemSetting() {
  CacheUtil.del(CacheConstant.SYSTEM_SETTING)
}
