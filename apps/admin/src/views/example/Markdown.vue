<template>
  <div class="app-content">
    <Markdown v-model="content" />
  </div>
</template>

<script setup lang="ts">
const content = ref('')
</script>

<style lang="scss" scoped></style>
