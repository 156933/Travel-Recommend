<template>
  <div class="search-page">
    <div class="search-header">
      <SearchBar />
    </div>
    
    <div class="search-main">
      <div class="search-info">
        <h2 v-if="searchQuery">
          搜索 "{{ searchQuery }}" 的结果 ({{ searchResults.length }} 个结果)
        </h2>
        <h2 v-else>请输入搜索关键词</h2>
      </div>

      <div v-if="searchResults.length > 0" class="search-results">
        <div class="trip-grid">
          <div v-for="trip in searchResults" :key="trip.id" class="trip-card" @click="$router.push(`/detail/${trip.id}`)">
            <img :src="trip.cover" class="trip-image" />
            <div class="trip-info">
              <h3>{{ trip.title }}</h3>
              <p class="trip-location">📍 {{ trip.name }}</p>
              <p class="trip-description">{{ trip.description }}</p>
              <div class="trip-actions">
                <span class="trip-price">￥{{ trip.price }}</span>
                <el-button size="small" type="primary" @click.stop="handleAddToCart(trip)">
                  加入购物车
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="searchQuery" class="no-results">
        <p>没有找到相关的旅行套餐</p>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </div>

      <div v-else class="search-tips">
        <h3>搜索建议：</h3>
        <div class="suggestions">
          <el-tag 
            v-for="suggestion in searchSuggestions" 
            :key="suggestion"
            @click="handleSuggestionClick(suggestion)"
          >
            {{ suggestion }}
          </el-tag>
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTripStore } from '../store/tripStore'
import { useCartStore } from '../store/cartStore'
import SearchBar from '../components/SearchBar.vue'
import Footer from '../components/Footer.vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const tripStore = useTripStore()
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
  background: #f5f5f5;
}

.search-header {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-info h2 {
  margin-bottom: 20px;
  color: #333;
}

.trip-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.trip-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.trip-card:hover {
  transform: translateY(-2px);
}

.trip-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.trip-info {
  padding: 15px;
}

.trip-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.trip-location {
  color: #666;
  margin: 5px 0;
}

.trip-description {
  color: #888;
  margin: 10px 0;
  font-size: 14px;
}

.trip-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.trip-price {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

.no-results {
  text-align: center;
  padding: 40px;
}

.search-tips {
  text-align: center;
  padding: 40px;
}

.suggestions {
  margin-top: 15px;
}

.suggestions .el-tag {
  margin: 5px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .trip-grid {
    grid-template-columns: 1fr;
  }
  
  .trip-actions {
    flex-direction: column;
    gap: 10px;
  }
}
</style> 