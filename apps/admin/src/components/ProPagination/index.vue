<template>
  <div class="pagination-container" :class="`align-${align}`">
    <el-pagination
      v-bind="$attrs"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="background"
      :pager-count="pagerCount"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ProPagination' })

const props = defineProps({
  /** 总条目数 */
  total: { type: Number, required: true },
  /** 当前页数 */
  page: { type: Number, default: 1 },
  /** 每页显示条目个数 */
  limit: { type: Number, default: 10 },
  /** 每页显示个数选择器的选项设置 */
  pageSizeList: { type: Array as PropType<number[]>, default: [10, 20, 30, 40, 50] },
  /** 组件布局，子组件名用逗号分隔 */
  layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
  /** 是否为分页按钮添加背景色 */
  background: { type: Boolean, default: true },
  /** 移动端页码按钮的数量端默认值 5 */
  pagerCount: { type: Number, default: document.body.clientWidth < 992 ? 5 : 7 },
  /** 分页组件 左 中 右 */
  align: { type: String as PropType<'left' | 'center' | 'right'>, default: 'right' },
})

/** 接收父组件传递的事件 */
const emits = defineEmits(['update:page', 'update:limit', 'pagination'])

const getterStore = useGetterStore()

const layout = computed(() => (getterStore.isMobile ? `total, prev, jumper, next` : props.layout))

/** 利用 computed 拦截 v-model */
const currentPage = computed({
  get() {
    return props.page
  },
  set(value: number) {
    emits('update:page', value)
  },
})
const pageSize = computed({
  get() {
    return props.limit
  },
  set(value: number) {
    emits('update:limit', value)
  },
})

/** 处理当前页码数改变的操作 */
function handleCurrentChange() {
  emits('pagination')
}

/** page-size 改变时触发 */
function handleSizeChange(value: number) {
  if (currentPage.value * value > props.total) currentPage.value = 1
  emits('pagination')
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.align-left {
  justify-content: flex-start;
}
.align-center {
  justify-content: center;
}
.align-right {
  justify-content: flex-end;
}
</style>
