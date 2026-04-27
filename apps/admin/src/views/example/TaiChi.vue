<template>
  <div class="app-content h-full flex-center overflow-hidden">
    <div class="taichi"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.app-content {
  --length: 720px; /* 太极图的直径 */
  --animation-time: 3s; /* 太极图的旋转时速 */
  background-color: #ccd3cc;
}
html[data-device='mobile'] .app-content {
  --length: 400px;
}
.taichi {
  position: relative;
  width: var(--length);
  height: var(--length);
  /* 利用线性渐变实现左黑右白 */
  background-image: linear-gradient(to right, #000 50%, #fff 0);
  /* 利用圆角属性变圆 */
  border-radius: 50%;
  /* 应用旋转动画 线性 不停止 */
  animation: run var(--animation-time) linear infinite;
  box-shadow:
    0px 12px 32px 4px rgba(0, 0, 0, 0.04),
    0px 8px 20px rgba(0, 0, 0, 0.08);
}
.taichi::before,
.taichi::after {
  content: '';
  position: absolute;
  left: calc(var(--length) / 4);
  width: calc(var(--length) / 2);
  height: calc(var(--length) / 2);
  border-radius: 50%;
  border: 1px solid transparent; /* 解决移动端出现的锯齿效果 */
}
/* 阳鱼 */
.taichi::before {
  top: 0;
  background-color: #fff;
  background-image: radial-gradient(ellipse at center, #fff 25%, #000 25%);
}
/* 阴鱼 */
.taichi::after {
  bottom: 0;
  background-color: #000;
  background-image: radial-gradient(ellipse at center, #000 25%, #fff 25%);
}

/* 使太极图动起来的动画 */
@keyframes run {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
