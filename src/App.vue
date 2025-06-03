<script setup lang="ts">
    import Header from './components/Header.vue';
</script>

<template>
    <Header />
    <RouterView></RouterView>
</template>

<style>
/* 全局消息提示样式 */
.el-message {
  top: 80px !important; /* 确保在header下方 */
  background: rgba(0, 0, 0, 0.8) !important;
  border: none !important;
  backdrop-filter: blur(8px);
  z-index: 3000 !important; /* 确保不会被其他元素遮挡 */
}

.el-message .el-message__content {
  color: white !important;
}

.el-message .el-message__icon {
  color: white !important;
}

/* 确保header的z-index合适 */
.modern-header {
  z-index: 1000 !important;
}
</style>
