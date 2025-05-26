<!-- components/SiteFooter.vue -->
<template>
  <footer class="footer">
    <!-- 上半部分：三列内容 -->
    <div class="footer-top">
      <el-row :gutter="20">
        <!-- 公司简介 -->
        <el-col :xs="24" :sm="12" :md="8" class="footer-col">
          <h4 class="footer-title">TravelGo</h4>
          <p class="footer-text">
            Your smart companion for planning unforgettable trips around the world.  
            Explore, book and enjoy — all in one place.
          </p>
        </el-col>

        <!-- 快速链接 -->
        <el-col :xs="24" :sm="12" :md="8" class="footer-col">
          <h4 class="footer-title">Quick&nbsp;Links</h4>
          <el-link type="info" href="/">Home</el-link><br />
          <el-link type="info" href="/destinations">Destinations</el-link><br />
          <el-link type="info" href="/cart">Cart</el-link><br />
          <el-link type="info" href="/orders">My&nbsp;Orders</el-link>
        </el-col>

        <!-- 联系方式 -->
        <el-col :xs="24" :sm="12" :md="8" class="footer-col">
          <h4 class="footer-title">Contact&nbsp;Us</h4>
          <p class="footer-text">
            <el-icon class="icon"><Location /></el-icon>
            123 Marina Bay, Singapore
          </p>
          <p class="footer-text">
            <el-icon class="icon"><Phone /></el-icon>
            +65&nbsp;800-123-456
          </p>
          <p class="footer-text">
            <el-icon class="icon"><Message /></el-icon>
            hello@travelgo.com
          </p>
        </el-col>
      </el-row>
    </div>

    <!-- 分隔线 -->
    <el-divider class="footer-divider" />

    <!-- 下半部分：版权 & 技术栈 -->
    <div class="footer-bottom">
      <span>© 2025 TravelGo. All&nbsp;rights&nbsp;reserved.</span>
      <span>Powered by Vue 3 & Element Plus</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Location, Phone, Message } from '@element-plus/icons-vue'
</script>

<style scoped>
.footer {
  background: #303133;        /* 深灰底 */
  color: #cfd3dc;
  font-size: 14px;
}

/* ---------- 顶部三栏 ---------- */
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

/* el-link 文字配合深色背景改色 */
.el-link { --el-link-text-color: #cfd3dc; }

/* ---------- 分隔线 ---------- */
.footer-divider {
  margin: 0;
  background-color: rgba(255, 255, 255, 0.14);
}

/* ---------- 底部横条 ---------- */
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
