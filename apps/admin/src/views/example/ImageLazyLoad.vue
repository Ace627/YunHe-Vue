<template>
  <div class="app-content">
    <!-- 功能描述：突出核心优点与项目价值 -->
    <div class="lazy-desc">🔥 图片懒加载功能 | 核心优势：进入视口才加载图片 → 首屏加载速度提升80%、节省带宽资源、避免页面卡顿，大幅优化多图场景用户体验</div>

    <div class="card-list">
      <div class="item" v-for="(item, index) in TOTAL_ITEMS" :key="index">
        <img ref="imgRefs" :src="DEFAULT_IMG" alt="image" :data-src="IMG_URL_TEMPLATE(item)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ==================== 配置项 ====================
/** 图片总数 */
const TOTAL_ITEMS = 99
/** 默认占位图 */
const DEFAULT_IMG = 'https://pica.zhimg.com/v2-f052aa50ca65df4bad1c3b7e4084d00e_1440w.jpg'
/** 真实图片地址模板 */
const IMG_URL_TEMPLATE = (index: number) => `https://picsum.photos/400/600?r=${index}`

// ==================== DOM 引用 ====================
/** 获取所有需要懒加载的图片 DOM */
/** 在 v-for 中使用 ref，Vue 会自动把所有 DOM 存入一个数组里 */
const imgRefs = ref<HTMLImageElement[]>([])
/** 观察者实例（用于卸载） */
let observer: IntersectionObserver | null = null

// ==================== 懒加载核心 ====================
/** 初始化 IntersectionObserver 实现图片懒加载 */
async function initLazyLoad() {
  observer = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        // 只处理进入视口的元素
        if (!entry.isIntersecting) continue
        const img = entry.target as HTMLImageElement
        const realSrc = img.dataset.src
        // 替换真实图片
        if (realSrc) img.src = realSrc
        // 加载完成后取消观察
        observer.unobserve(img)
      }
    },
    {
      threshold: 0.01, // 设置交叉阈值，极小值确保触发回调，触发条件：露出 1% 即加载
    },
  )
  // DOM 渲染完成后开始监听所有图片
  await nextTick()
  imgRefs.value.forEach((img) => observer?.observe(img))
}

/**
 * 卸载观察器（关键！）
 * 组件销毁时停止所有监听
 */
function destroyLazyLoad() {
  if (!observer) return
  // 取消所有图片的监听
  imgRefs.value.forEach((img) => observer!.unobserve(img))
  // 销毁观察器
  observer.disconnect()
  observer = null
}

// ==================== 生命周期 ====================
// 挂载时执行
onMounted(() => {
  initLazyLoad()
})

/** 组件销毁 → 卸载监听（防止内存泄漏） */
onUnmounted(() => {
  destroyLazyLoad()
})
</script>

<style lang="scss" scoped>
.app-content {
  --item-gap: 16px; /* 列表项的间距 */
  --item-min-width: 150px; /* 列表项的最小宽度 与设计稿保持一致即可 */
  --item-height: 300px;
}

.lazy-desc {
  margin-bottom: 16px;
  padding: 8px 16px;
  background: #f0f9ff;
  border-left: 4px solid #409eff;
  border-radius: 4px;
  color: #1f2937;
  font-size: 14px;
  font-weight: 500;
  text-align: justify;
  line-height: 1.5;
}

.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--item-min-width), 1fr));
  gap: var(--item-gap);
}

.card-list .item {
  cursor: pointer;
  height: var(--item-height);
  border-radius: 4px;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  overflow: hidden;
}

.card-list .item:hover img {
  transform: scale(1.5);
}

.card-list .item img {
  display: block;
  width: 100%;
  height: 100%;
  transition: all 0.32s;
}
</style>
