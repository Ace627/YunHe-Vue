<template>
  <svg class="svg-icon" :style="styles" :class="customClass">
    <use :href="`#icon-${name}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineOptions({ name: 'SvgIcon' })
import { isString } from 'lodash-es'
import type { CSSProperties } from 'vue'

const props = defineProps({
  /** Svg 图标的名称，对应 icons 目录下的文件名 */
  name: { type: String, required: true },
  /** Svg 的 fill 颜色 */
  color: { type: String, default: 'inherit' },
  /** Svg 图标的大小，size x size */
  size: { type: [String, Number], default: '1em' },
  /** 自定义类名 */
  customClass: { type: String, default: '' },
})

/** 动态计算需要绑定的行内样式 */
const styles = computed<CSSProperties>(() => ({
  width: isString(props.size) ? props.size : `${props.size}px`,
  height: isString(props.size) ? props.size : `${props.size}px`,
}))
</script>

<style lang="scss" scoped>
.svg-icon {
  display: inline-block;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  outline: none;
}
</style>
