<template>
  <div class="navbar">
    <!-- 侧栏折叠控制 -->
    <Hamburger class="navbar-item hover-effect" @toggleClick="appStore.toggleSidebar" />
    <!-- 面包屑导航 -->
    <Breadcrumb v-if="!getterStore.isMobile && settingStore.showBreadcrumb" />

    <div class="right h-full ml-auto flex-center">
      <!-- 全屏控件 -->
      <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏显示'" effect="dark" placement="bottom">
        <Screenfull class="navbar-item hover-effect" />
      </el-tooltip>

      <!-- 主题切换 -->
      <el-tooltip :content="isDark ? '浅色主题' : '深色主题'" effect="dark" placement="bottom">
        <ThemeSwitch class="navbar-item hover-effect" />
      </el-tooltip>

      <!-- 组件大小选择 -->
      <el-tooltip content="布局大小" effect="dark" placement="bottom">
        <SizeSelect class="navbar-item px-0! hover-effect" />
      </el-tooltip>

      <!-- 个人中心 -->
      <UserDropDown class="navbar-item hover-effect" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import Screenfull from './Screenfull.vue'
import SizeSelect from './SizeSelect.vue'
import ThemeSwitch from './ThemeSwitch.vue'
import UserDropDown from './UserDropDown.vue'

const appStore = useAppStore()
const getterStore = useGetterStore()
const settingStore = useSettingStore()
const { isFullscreen } = useFullscreen()

const isDark = computed(() => settingStore.theme === 'dark')
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  display: flex;
  align-items: center;
  height: var(--el-navbar-height);
  background-color: var(--el-navbar-bg-color);
  box-shadow: var(--el-navbar-box-shadow);
}
.navbar-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  transition: background-color var(--el-transition-duration-fast);
}
.hover-effect:hover {
  background-color: var(--el-fill-color);
}
</style>
