import { getComponentSize, getSidebarStatus, setComponentSize, setSidebarStatus } from '@/utils'

export const useAppStore = defineStore('app', () => {
  /** 是否折叠菜单 */
  const isCollapse = ref<boolean>(getSidebarStatus())
  /** 是否移除侧栏和主容器的过渡效果 */
  const withoutAnimation = ref<boolean>(false)
  /** 设备类型 */
  const device = ref<'desktop' | 'mobile'>('desktop')
  /** 全局组件大小 */
  const size = ref<ComponentSize>(getComponentSize())

  /** 面包屑开关菜单栏的回调 */
  function toggleSidebar(): void {
    withoutAnimation.value = false
    isCollapse.value = !isCollapse.value
    setSidebarStatus(isCollapse.value)
  }

  /** 关闭侧边栏（主要用于移动端状态下） */
  function closeSidebar(hasAnimation: boolean = false): void {
    isCollapse.value = true
    setSidebarStatus(isCollapse.value)
    withoutAnimation.value = hasAnimation
  }

  /** 设置组件大小 */
  function setSize(value: ComponentSize): void {
    size.value = value
    setComponentSize(value)
  }

  return { isCollapse, withoutAnimation, device, size, setSize, toggleSidebar, closeSidebar }
})
