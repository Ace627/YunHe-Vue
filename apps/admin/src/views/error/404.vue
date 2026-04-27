<template>
  <div class="error-page wh-full">
    <img src="@/assets/images/status/404.png" alt="404" />
    <div class="error-page__detail">
      <h2>404</h2>
      <h4>抱歉，您访问的页面不存在</h4>
      <el-button type="primary" @click="router.push({ path: '/' })">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'NotFound' })

const router = useRouter()
</script>

<style scoped lang="scss">
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 120px;
  h2 {
    font-size: 60px;
  }
  h4 {
    margin: 10px 0 20px;
    font-size: 19px;
    font-weight: 400;
    color: var(--el-color-info);
  }
}

html[data-device='mobile'] .error-page {
  flex-direction: column;

  &__detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
