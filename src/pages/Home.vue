<template>
  <div class="modern-home">
    <!-- 轮播图区域 -->
    <section class="hero-section">
      <IntroCarousel />
    </section>
    
    <!-- 搜索区域 -->
    <section class="search-section">
      <div class="container">
        <div class="search-content">
          <h1 class="search-title">发现您的完美旅程</h1>
          <p class="search-subtitle">探索世界各地的精彩目的地，创造难忘的旅行回忆</p>
          <div class="search-wrapper">
            <SearchBar />
          </div>
          
          <!-- 快速导航 -->
          <div class="quick-nav">
            <div class="quick-nav-item" @click="handleQuickSearch('北京')">
              <div class="nav-icon">🏛️</div>
              <span>古都北京</span>
            </div>
            <div class="quick-nav-item" @click="handleQuickSearch('海岛')">
              <div class="nav-icon">🏝️</div>
              <span>海岛度假</span>
            </div>
            <div class="quick-nav-item" @click="handleQuickSearch('美食')">
              <div class="nav-icon">🍜</div>
              <span>美食之旅</span>
            </div>
            <div class="quick-nav-item" @click="handleQuickSearch('古城')">
              <div class="nav-icon">🏮</div>
              <span>古城风情</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门推荐区域 -->
    <section class="recommendations-section">
      <div class="container">
        <CardMenuGrid />
      </div>
    </section>

    <!-- 特色服务区域 -->
    <section class="features-section">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title text-gradient">为什么选择我们</h2>
          <p class="section-subtitle">专业的旅行服务，让您的每一次出行都完美无忧</p>
        </div>
        
        <div class="features-grid grid grid-3">
          <div class="feature-card card-modern animate-fadeInUp">
            <div class="feature-icon">
              <el-icon><Check /></el-icon>
            </div>
            <h3 class="feature-title">安全保障</h3>
            <p class="feature-description">全程安全保障，让您放心出行</p>
          </div>
          
          <div class="feature-card card-modern animate-fadeInUp">
            <div class="feature-icon">
              <el-icon><Star /></el-icon>
            </div>
            <h3 class="feature-title">专业服务</h3>
            <p class="feature-description">24小时客服支持，专业旅行顾问</p>
          </div>
          
          <div class="feature-card card-modern animate-fadeInUp">
            <div class="feature-icon">
              <el-icon><Coin /></el-icon>
            </div>
            <h3 class="feature-title">优惠价格</h3>
            <p class="feature-description">最优价格保证，性价比超高</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import CardMenuGrid from '../components/CardMenuGrid.vue';
import IntroCarousel from '../components/IntroCarousel.vue';
import Footer from '../components/Footer.vue';
import SearchBar from '../components/SearchBar.vue';
import { Check, Star, Coin } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleQuickSearch = (query: string) => {
  router.push({
    name: 'Search',
    query: { q: query }
  });
};
</script>

<style scoped>
.modern-home {
  min-height: 100vh;
  background: var(--bg-secondary);
}

/* 轮播图区域 */
.hero-section {
  position: relative;
  overflow: hidden;
}

/* 搜索区域 */
.search-section {
  background: var(--primary-gradient);
  color: var(--text-white);
  padding: var(--spacing-3xl) 0;
  position: relative;
  overflow: hidden;
}

.search-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(%23pattern)"/></svg>');
  opacity: 0.1;
}

.search-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.search-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  color: var(--text-white);
  letter-spacing: -0.5px;
}

.search-subtitle {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-2xl);
  color: rgba(255, 255, 255, 0.9);
  font-weight: var(--font-weight-normal);
}

.search-wrapper {
  margin-bottom: var(--spacing-2xl);
}

/* 快速导航 */
.quick-nav {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.quick-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: var(--transition-normal);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 120px;
}

.quick-nav-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.nav-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-xs);
}

.quick-nav-item span {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-white);
}

/* 推荐区域 */
.recommendations-section {
  background: var(--bg-primary);
  border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  margin-top: -30px;
  position: relative;
  z-index: 3;
  box-shadow: var(--shadow-xl);
}

/* 特色服务区域 */
.features-section {
  background: var(--bg-secondary);
  padding: var(--spacing-3xl) 0;
}

.section-header {
  margin-bottom: var(--spacing-3xl);
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-md);
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  font-weight: var(--font-weight-normal);
}

.features-grid {
  gap: var(--spacing-xl);
}

.feature-card {
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  transition: var(--transition-normal);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  background: var(--primary-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
}

.feature-icon .el-icon {
  font-size: var(--font-size-3xl);
  color: var(--text-white);
}

.feature-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
}

.feature-description {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .quick-nav {
    gap: var(--spacing-md);
  }
}

@media (max-width: 768px) {
  .search-section {
    padding: var(--spacing-2xl) 0;
  }
  
  .search-title {
    font-size: var(--font-size-3xl);
  }
  
  .search-subtitle {
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-lg);
  }
  
  .quick-nav {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
    display: grid;
  }
  
  .quick-nav-item {
    min-width: auto;
    padding: var(--spacing-sm);
  }
  
  .nav-icon {
    font-size: var(--font-size-2xl);
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .section-title {
    font-size: var(--font-size-3xl);
  }
  
  .section-subtitle {
    font-size: var(--font-size-base);
  }
  
  .feature-card {
    padding: var(--spacing-lg);
  }
  
  .feature-icon {
    width: 60px;
    height: 60px;
    margin-bottom: var(--spacing-md);
  }
  
  .feature-icon .el-icon {
    font-size: var(--font-size-2xl);
  }
}
</style>
