<template>
  <footer class="footer">
    <div class="footer-top">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" class="footer-col">
          <h4 class="footer-title">旅游推荐</h4>
          <p class="footer-text">
            探索、预订、享受——一切尽在一处。
          </p>
        </el-col>


        <el-col :xs="24" :sm="12" :md="8" class="footer-col">
          <h4 class="footer-title">关于</h4>
          <p class="footer-text">
            <el-icon class="icon"><Location /></el-icon>
            230902 计算机科学与技术2班
          </p>
          <p class="footer-text">
            <el-icon class="icon"><Phone /></el-icon>
            13888888888
          </p>
          <p class="footer-text">
            <el-icon class="icon"><Message /></el-icon>
            zhou15996@gmail.com
          </p>
        </el-col>
      </el-row>
    </div>

    <el-divider class="footer-divider" />

    
  </footer>
</template>

<script setup lang="ts">
import { Location, Phone, Message } from '@element-plus/icons-vue'

defineOptions({
  name: 'Footer'
})
</script>

<style scoped>
.footer {
  background: #303133;        
  color: #cfd3dc;
  font-size: 14px;
}

.footer-top {
  max-width: 1200px;
  padding: 40px 24px 20px;
  margin: 0 auto;
}

.footer-col { margin-bottom: 24px; }

.footer-title {
  font-size: 16px;
  color: #ffffff;
  margin: 0 0 12px;
}

.footer-text {
  margin: 0 0 8px;
  line-height: 1.6;
}

.icon {
  vertical-align: -2px;
  margin-right: 6px;
}

.el-link { --el-link-text-color: #cfd3dc; }

.footer-divider {
  margin: 0;
  background-color: rgba(255, 255, 255, 0.14);
}

.footer-bottom {
  max-width: 1200px;
  padding: 16px 24px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
