<template>
  <div class="search-page">
    <el-container>
      <el-header class="search-header">
        <SearchBar />
      </el-header>
      
      <el-main class="search-main">
        <div class="search-info">
          <h2 v-if="searchQuery">
            搜索 "{{ searchQuery }}" 的结果
            <span class="result-count">({{ searchResults.length }} 个结果)</span>
          </h2>
          <h2 v-else>请输入搜索关键词</h2>
        </div>

        <div v-if="searchResults.length > 0" class="search-results">
          <div class="cards-container">
            <div v-for="trip in searchResults" :key="trip.id" class="card-wrapper">
              <el-card shadow="hover" class="trip-card">
                <img :src="trip.cover" class="card-img" @click="$router.push(`/detail/${trip.id}`)" />
                <div class="card-body">
                  <h3 class="card-title">{{ trip.title }}</h3>
                  <div class="card-location">📍 {{ trip.name }}</div>
                  <div class="card-description">{{ trip.description }}</div>
                  <div class="card-price">￥{{ trip.price }}</div>
                  
                  <!-- 操作按钮区域 -->
                  <div class="card-actions">
                    <el-button 
                      size="small" 
                      type="primary" 
                      @click.stop="handleAddToCart(trip)"
                    >
                      加入购物车
                    </el-button>
                  </div>
                  
                  <el-icon class="wishlist-icon" @click.stop="user.toggleWishlist(trip.id)">
                    <component :is="user.isInWishlist(trip.id) ? StarFilled : Star" />
                  </el-icon>
                </div>
              </el-card>
            </div>
          </div>
        </div>

        <div v-else-if="searchQuery" class="no-results">
          <el-empty description="没有找到相关的旅行套餐">
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
          </el-empty>
        </div>

        <div v-else class="search-tips">
          <h3>搜索建议：</h3>
          <el-tag 
            v-for="suggestion in searchSuggestions" 
            :key="suggestion"
            type="info" 
            class="suggestion-tag"
            @click="handleSuggestionClick(suggestion)"
          >
            {{ suggestion }}
          </el-tag>
        </div>
      </el-main>
      
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTripStore } from '../store/tripStore'
import { useUserStore } from '../store/userStore'
import { useCartStore } from '../store/cartStore'
import { Star, StarFilled } from '@element-plus/icons-vue'
import SearchBar from '../components/SearchBar.vue'
import Footer from '../components/Footer.vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const tripStore = useTripStore()
const user = useUserStore()
const cart = useCartStore()

const searchQuery = ref('')
const searchSuggestions = ['北京', '上海', '成都', '古城', '海岛', '山水', '美食']

const searchResults = computed(() => {
  return tripStore.searchTrips(searchQuery.value)
})

const handleSuggestionClick = (suggestion: string) => {
  router.push({
    name: 'Search',
    query: { q: suggestion }
  })
}

const handleAddToCart = (trip: any) => {
  cart.addToCart(trip)
  ElMessage.success(`已添加 ${trip.title} 到购物车`)
}

// 监听路由变化更新搜索词
watch(() => route.query.q, (newQuery) => {
  searchQuery.value = (newQuery as string) || ''
}, { immediate: true })

onMounted(() => {
  searchQuery.value = (route.query.q as string) || ''
})
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  background: var(--bg-secondary);
}

.search-header {
  background: var(--bg-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-xl);
  box-shadow: var(--shadow);
  width: 100%;
}

.search-main {
  padding: var(--spacing-xl);
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.search-info h2 {
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  font-weight: var(--font-weight-bold);
}

.result-count {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
}

.search-results {
  margin-top: var(--spacing-lg);
  width: 100%;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-xl);
  padding: 0;
  width: 100%;
}

.card-wrapper {
  display: flex;
  width: 100%;
}

.trip-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 400px;
  position: relative;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100% !important;
  flex: 1;
}

.trip-card.el-card {
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
}

.trip-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-6px);
}

.trip-card :deep(.el-card__body) {
  padding: 0 !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  cursor: pointer;
  flex-shrink: 0;
}

.card-body {
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.card-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--spacing-xs);
  color: var(--text-primary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8em;
}

.card-location {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.card-description {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  line-height: 1.4;
}

.card-price {
  font-size: var(--font-size-lg);
  color: var(--primary-color);
  font-weight: var(--font-weight-bold);
  margin: var(--spacing-xs) 0;
}

.card-actions {
  display: flex;
  justify-content: center;
  margin-top: auto;
}

.card-actions .el-button {
  width: 100%;
  font-size: var(--font-size-sm);
}

.wishlist-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 20px;
  color: #fadb14;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  padding: 6px;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 10;
}

.wishlist-icon:hover {
  transform: scale(1.15);
  background: rgba(0, 0, 0, 0.7);
}

.search-tips {
  text-align: center;
  padding: var(--spacing-3xl) var(--spacing-lg);
}

.search-tips h3 {
  margin-bottom: var(--spacing-lg);
  color: var(--text-secondary);
  font-weight: var(--font-weight-semibold);
}

.suggestion-tag {
  margin: var(--spacing-xs);
  cursor: pointer;
  font-size: var(--font-size-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  transition: var(--transition-fast);
}

.suggestion-tag:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.no-results {
  padding: var(--spacing-3xl) var(--spacing-lg);
  text-align: center;
}

/* 响应式布局优化 */
@media (max-width: 1200px) {
  .search-main {
    max-width: 100%;
    padding: var(--spacing-lg);
  }
  
  .cards-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .search-main {
    padding: var(--spacing-md);
  }

  .cards-container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }

  .trip-card {
    height: 360px;
  }

  .card-img {
    height: 160px;
  }

  .card-body {
    padding: var(--spacing-sm);
  }

  .card-title {
    font-size: var(--font-size-sm);
    height: 2.4em;
  }

  .card-price {
    font-size: var(--font-size-base);
  }

  .search-header {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .cards-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .trip-card {
    height: 340px;
  }

  .card-img {
    height: 140px;
  }

  .card-description {
    -webkit-line-clamp: 1;
  }

  .search-tips {
    padding: var(--spacing-xl) var(--spacing-sm);
  }
}
</style> 