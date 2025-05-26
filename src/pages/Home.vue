<template>
  <div class="common-layout">
    <el-container>
    
    <el-header>
    </el-header>
    <el-main>
    <IntroCarousel />
    <CardMenuGrid />
    </el-main>

    <el-footer>
    <Footer/>
    </el-footer>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import CardMenuGrid from '@/components/CardMenuGrid.vue';
import Header from '@/components/Header.vue';
import IntroCarousel from '@/components/IntroCarousel.vue';
import Footer from '@/components/Footer.vue';





    
</script>

<style>
.page-root {
  min-height: 100vh;
}
/* Header 固定在顶部并投影 */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,.08);
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 56px;
}
/* 主内容区浅灰底 */
.site-main {
  background: #f5f7fa;
  padding: 24px;
}
/* Footer 灰底、文字居中 */
.site-footer {
  background: #303133;
  color: #cfd3dc;
  font-size: 14px;
  text-align: center;
  line-height: 60px;
  height: 60px;
}
</style>
