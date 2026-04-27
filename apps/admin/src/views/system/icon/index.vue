<template>
  <div class="app-content">
    <el-form inline>
      <el-form-item label="图标名称">
        <el-input placeholder="请输入图标名称" v-model.trim="name" @change="handleQuery" clearable @clear="resetQuery"></el-input>
      </el-form-item>
      <el-form-item>
        <el-switch v-model="mode" active-text="单击下载" inactive-text="单击复制" :active-value="2" :inactive-value="1" />
      </el-form-item>
    </el-form>
    <div class="icon-list mx-auto grid">
      <div class="icon-item flex-center flex-col" v-for="(item, index) in list" :key="index" @click="handleClickIcon(item)">
        <SvgIcon :name="item" size="1.64em" />
        <span class="label my-8px">{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { linkDownload, TipModal, copyText } from '@/utils'

const list = ref<string[]>([])
const name = ref<string>('')
/** 点击图标触发的操作 */
const mode = ref<number>(1)

/**
 * 获取 SVG 图标文件列表
 * @description 从指定目录读取所有 SVG 文件并提取文件名（不含扩展名）
 */
function getList() {
  const svgFileList = import.meta.glob('@/assets/icons/*.svg', { eager: true })
  const svgPathList: string[] = Object.keys(svgFileList)
  const svgNameList = svgPathList.map((svgPath) => svgPath.match(/\/([^/]+)\.\w+$/)?.[1] || svgPath)
  list.value = svgNameList
}

function handleQuery() {
  list.value = list.value.filter((item) => item.includes(name.value))
}
function resetQuery() {
  name.value = ''
  getList()
}

function handleClickIcon(name: string) {
  if (mode.value === 1) {
    copyText(`<SvgIcon name='${name}' />`)
  } else {
    handleDownload(name)
  }
}

async function handleDownload(name: string) {
  const data = await import(`@/assets/icons/${name}.svg`)
  const svgContent: string = decodeURIComponent(data.default).replace('data:image/svg+xml,', '')
  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  linkDownload(blob, `${name}.svg`)
}

getList()
</script>

<style lang="scss" scoped>
.el-input {
  --el-input-width: 220px;
}

.icon-list {
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  border-left: 1px solid var(--el-border-color);
  border-top: 1px solid var(--el-border-color);

  .icon-item {
    position: relative;
    cursor: pointer;
    padding: 8px 0;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    background-color: #fff;
    .label {
      font-size: 12px;
    }
    .btn-group {
      bottom: 0;
      width: 100%;
      .el-link {
        --el-link-font-size: 12px;
      }
    }
  }
  .icon-item:hover {
    color: var(--el-color-primary);
  }
}
</style>
