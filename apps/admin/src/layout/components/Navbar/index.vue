<template>
  <div class="navbar">
    <!-- 侧栏折叠控制 -->
    <Hamburger class="navbar-item" @toggleClick="appStore.toggleSidebar" />
    <!-- 面包屑导航 -->
    <Breadcrumb v-if="!getterStore.isMobile && settingStore.showBreadcrumb" />

    <div class="right h-full ml-auto flex-center">
      <!-- 全屏控件 -->
      <Screenfull class="navbar-item" />

      <!-- 主题切换 -->
      <ThemeSwitch class="navbar-item" />

      <!-- 组件大小选择 -->
      <el-tooltip content="布局大小" effect="dark" placement="bottom">
        <SizeSelect class="navbar-item px-0!" />
      </el-tooltip>

      <!-- 个人中心 -->
      <UserDropDown class="navbar-item" />
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
  &:hover {
    background-color: rgba(0, 21, 41, 0.08);
  }
}
</style>
