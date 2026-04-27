<template>
  <template v-if="currentDict">
    <!-- 回显样式 -->
    <template v-if="currentDict.listClass">
      <el-tag :type="currentDict.listClass"> {{ tagText }} </el-tag>
    </template>

    <!-- 普通样式 -->
    <template v-else>
      <span>{{ tagText }}</span>
    </template>
  </template>
</template>

<script setup lang="ts">
defineOptions({ name: 'DictTag' })
import type { DictSelectItem } from '@/types'

const props = defineProps({
  options: { type: Array as PropType<DictSelectItem[]>, required: true },
  value: { type: String, default: '' },
})

// 找到和当前 value 匹配的那一项
const currentDict = computed(() => {
  return props.options.find((item) => item.dictValue === props.value)
})

// 标签显示的文字
const tagText = computed(() => {
  return currentDict.value?.label || currentDict.value?.dictLabel || props.value || '-'
})
</script>

<style lang="scss" scoped></style>
