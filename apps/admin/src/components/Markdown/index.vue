<template>
  <div class="markdown-editor">
    <MdEditor ref="editorRef" :theme v-model="content" :toolbars-exclude="toolbarsEExclude" @save="handleSave" :placeholder />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Markdown' })
import { MdEditor, type ToolbarNames } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { linkDownload } from '@/utils'

const settingStore = useSettingStore()

const content = defineModel({ type: String, required: true })

const props = defineProps({
  placeholder: { type: String, default: '请输入内容' },
})

// const editorRef = useTemplateRef('editorRef')
const theme = computed(() => (settingStore.theme === 'dark' ? 'dark' : 'light'))

/** 排除的工具栏 */
const toolbarsEExclude: ToolbarNames[] = ['github']

/** 保存内容 */
function handleSave(value: string) {
  const blob = new Blob([value], { type: 'text/markdown' })
  linkDownload(blob, `${Date.now()}.md`)
}

onMounted(() => {})
</script>

<style lang="scss" scoped>
.markdown-editor {
  position: relative;
  width: 100%;
  height: 100%;
}
.md-editor {
  --md-color: var(--el-text-color-primary);
  --md-border-color: var(--el-border-color);
  width: 100%;
  font-family: var(--el-font-family);
}
</style>
