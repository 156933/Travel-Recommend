<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <RouterView />
</template>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
}

.el-message {
  top: 80px !important;
  z-index: 3000 !important;
}
</style>
