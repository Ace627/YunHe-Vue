<template>
  <div :class="classes">
    <!-- mobile 端侧边栏遮罩层 -->
    <div v-if="getterStore.isMobile && !appStore.isCollapse" class="drawer-bg" @click="appStore.closeSidebar(true)"></div>
    <Sidebar class="sidebar-container" />
    <div class="main-container clearFix">
      <header class="fixed-header">
        <Navbar />
        <TagsView v-if="settingStore.showTagsView" />
      </header>
      <AppMain />
    </div>

    <!-- 应用配置自定义面板 -->
    <SettingPanel />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import { Sidebar, Navbar, AppMain, TagsView, SettingPanel } from './components'

const appStore = useAppStore()
const getterStore = useGetterStore()
const settingStore = useSettingStore()

const classes = computed(() => [
  'app-container',
  appStore.device,
  { 'has-tags-view': settingStore.showTagsView },
  { 'hide-sidebar': appStore.isCollapse },
  { 'open-sidebar': !appStore.isCollapse },
  { withoutAnimation: appStore.withoutAnimation },
])
</script>

<style lang="scss" scoped>
.app-container {
  --el-drawer-bg-index: calc(var(--el-sidebar-index) - 1);
  --el-fixed-header-index: calc(var(--el-sidebar-index) - 2);
  position: relative;
  width: 100%;
  height: 100%;
}

/* 侧边栏区域容器 */
.sidebar-container {
  user-select: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--el-sidebar-index);
  width: var(--el-sidebar-width);
  height: 100%;
  color: var(--el-sidebar-text-color);
  background-color: var(--el-sidebar-bg-color);
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width var(--el-transition-duration);
  overflow: hidden;
}

/* 主体内容区域容器 */
.main-container {
  position: relative;
  height: 100%;
  transition: margin-left var(--el-transition-duration);
  margin-left: var(--el-sidebar-width);
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: var(--el-fixed-header-index);
  width: calc(100% - var(--el-sidebar-width));
  transition: width var(--el-transition-duration);
}

/* 桌面模式 侧栏折叠 */
.hide-sidebar {
  .sidebar-container {
    width: var(--el-sidebar-hide-width);
  }
  .main-container {
    margin-left: var(--el-sidebar-hide-width);
  }
  .fixed-header {
    width: calc(100% - var(--el-sidebar-hide-width));
  }
}

/* 移动端 侧边栏展开 */
.mobile {
  .main-container {
    margin-left: 0;
  }
  .fixed-header {
    width: 100%;
  }
}

/* 移动端 侧边栏折叠 */
.mobile.hide-sidebar .sidebar-container {
  width: 0;
  pointer-events: none;
}

/* 移动端用来关闭左侧边栏抽屉的背景遮罩层 */
.drawer-bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: var(--el-drawer-bg-index); // 比 sidebar 低
  width: 100%;
  height: 100%;
  background-color: var(--el-overlay-color-lighter);
  overflow: hidden;
}

/* 移除侧栏和主容器的过渡效果 */
.withoutAnimation .sidebar-container,
.withoutAnimation .main-container {
  transition: none;
}
</style>
