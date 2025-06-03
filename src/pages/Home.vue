<template>
  <div class="home">
    <!-- 搜索区域 -->
    <section class="search-section">
      <div class="search-content">
        <h1>发现您的完美旅程</h1>
        <p>探索世界各地的精彩目的地，创造难忘的旅行回忆</p>
        <SearchBar />
        
        <!-- 快速搜索 -->
        <div class="quick-search">
          <span @click="handleQuickSearch('北京')">🏛️ 古都北京</span>
          <span @click="handleQuickSearch('海岛')">🏝️ 海岛度假</span>
          <span @click="handleQuickSearch('美食')">🍜 美食之旅</span>
          <span @click="handleQuickSearch('古城')">🏮 古城风情</span>
        </div>
      </div>
    </section>

    <!-- 热门推荐区域 -->
    <section class="recommendations">
      <CardMenuGrid />
    </section>

    <!-- 特色服务 -->
    <section class="features">
      <h2>为什么选择我们</h2>
      <div class="features-grid">
        <div class="feature">
          <div class="feature-icon">✓</div>
          <h3>安全保障</h3>
          <p>全程安全保障，让您放心出行</p>
        </div>
        <div class="feature">
          <div class="feature-icon">★</div>
          <h3>专业服务</h3>
          <p>24小时客服支持，专业旅行顾问</p>
        </div>
        <div class="feature">
          <div class="feature-icon">¥</div>
          <h3>优惠价格</h3>
          <p>最优价格保证，性价比超高</p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import CardMenuGrid from '../components/CardMenuGrid.vue'
import Footer from '../components/Footer.vue'
import SearchBar from '../components/SearchBar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleQuickSearch = (query: string) => {
  router.push({
    name: 'Search',
    query: { q: query }
  })
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.search-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
}

.search-content {
  max-width: 800px;
  margin: 0 auto;
}

.search-content h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.search-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.quick-search {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.quick-search span {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.2s;
}

.quick-search span:hover {
  background: rgba(255, 255, 255, 0.3);
}

.recommendations {
  background: white;
  padding: 20px;
}

.features {
  background: #f8f9fa;
  padding: 60px 20px;
  text-align: center;
}

.features h2 {
  font-size: 2rem;
  margin-bottom: 40px;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.feature {
  background: white;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 20px;
}

.feature h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.feature p {
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .search-content h1 {
    font-size: 2rem;
  }
  
  .quick-search {
    gap: 10px;
  }
  
  .quick-search span {
    padding: 8px 15px;
    font-size: 14px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
