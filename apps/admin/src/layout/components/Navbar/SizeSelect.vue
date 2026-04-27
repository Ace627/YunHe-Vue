<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div class="wh-full flex-center px-8px">
      <SvgIcon name="Size" size="1.16em" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="appStore.size === item.value" :command="item.value">
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
defineOptions({ name: 'SizeSelect' })

const appStore = useAppStore()

const sizeOptions = [
  { label: '小型', value: 'small' },
  { label: '默认', value: 'default' },
  { label: '大型', value: 'large' },
]

function handleSetSize(size: ComponentSize): void {
  appStore.setSize(size)
}
</script>

<style lang="scss" scoped></style>
