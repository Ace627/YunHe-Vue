<template>
  <ElConfigProvider :locale="zhCn" :size="appStore.size">
    <RouterView />
  </ElConfigProvider>
</template>

<script setup lang="ts">
defineOptions({ name: 'App' })
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const appStore = useAppStore()

useResize()
useDynamicTitle()
</script>

<style lang="scss" scoped></style>
