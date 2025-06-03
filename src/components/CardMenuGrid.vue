<template>
  <div class="modern-card-grid">
    <div class="section-header">
      <h2 class="section-title text-gradient">热门推荐</h2>
      <p class="section-subtitle">精选优质旅行套餐，开启您的完美旅程</p>
    </div>
    
    <div class="grid grid-3">
      <div v-for="trip in trips" :key="trip.id" class="trip-card-wrapper animate-fadeInUp">
        <div class="trip-card card-modern" @click="$router.push(`/detail/${trip.id}`)">
          <!-- 图片区域 -->
          <div class="card-image-container">
            <img :src="trip.cover" :alt="trip.title" class="card-image" />
            <div class="image-overlay">
              <el-button type="primary" class="view-details-btn">
                查看详情
              </el-button>
            </div>
            
            <!-- 心愿单按钮 -->
            <div class="wishlist-btn" @click.stop="user.toggleWishlist(trip.id)">
              <el-icon class="wishlist-icon">
                <component :is="user.isInWishlist(trip.id) ? StarFilled : Star" />
              </el-icon>
            </div>
            
            <!-- 价格标签 -->
            <div class="price-tag">
              <span class="price-symbol">￥</span>
              <span class="price-value">{{ trip.price }}</span>
            </div>
          </div>

          <!-- 内容区域 -->
          <div class="card-content">
            <div class="card-header">
              <h3 class="card-title">{{ trip.title }}</h3>
              <div class="card-location">
                <el-icon class="location-icon"><Location /></el-icon>
                {{ trip.name }}
              </div>
            </div>
            
            <p class="card-description">{{ trip.description }}</p>
            
            <div class="card-footer">
              <div class="rating">
                <el-icon v-for="i in 5" :key="i" class="star-icon">
                  <StarFilled />
                </el-icon>
                <span class="rating-text">4.8</span>
              </div>
              
              <div class="card-actions">
                <el-button 
                  size="small" 
                  type="primary" 
                  class="book-btn"
                  @click.stop="handleBooking(trip)"
                >
                  立即预订
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTripStore } from '../store/tripStore';
import { useUserStore } from '../store/userStore';
import { useCartStore } from '../store/cartStore';
import { Star, StarFilled, Location } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const user = useUserStore()
const store = useTripStore();
const cart = useCartStore();
const trips = store.trips;

const handleBooking = (trip: any) => {
  cart.addToCart(trip)
  ElMessage.success(`已添加 ${trip.title} 到购物车`)
}
</script>

<style scoped>
.modern-card-grid {
  padding: var(--spacing-3xl) 0;
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.section-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  font-weight: var(--font-weight-normal);
}

.trip-card-wrapper {
  animation-delay: calc(var(--i, 0) * 0.1s);
}

.trip-card {
  height: 480px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  transition: var(--transition-normal);
}

.trip-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

/* 图片区域 */
.card-image-container {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-slow);
}

.trip-card:hover .card-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-normal);
}

.trip-card:hover .image-overlay {
  opacity: 1;
}

.view-details-btn {
  background: rgba(255, 255, 255, 0.95) !important;
  color: var(--primary-color) !important;
  border: none !important;
  backdrop-filter: blur(10px);
  font-weight: var(--font-weight-semibold) !important;
}

/* 心愿单按钮 */
.wishlist-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
  backdrop-filter: blur(10px);
}

.wishlist-btn:hover {
  background: var(--bg-primary);
  transform: scale(1.1);
}

.wishlist-icon {
  font-size: var(--font-size-xl);
  color: var(--warning-color);
}

/* 价格标签 */
.price-tag {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  background: var(--primary-gradient);
  color: var(--text-white);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-xl);
  font-weight: var(--font-weight-bold);
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
}

.price-symbol {
  font-size: var(--font-size-sm);
}

.price-value {
  font-size: var(--font-size-lg);
  margin-left: 2px;
}

/* 内容区域 */
.card-content {
  padding: var(--spacing-lg);
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-header {
  margin-bottom: var(--spacing-sm);
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  line-height: 1.4;
}

.card-location {
  display: flex;
  align-items: center;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.location-icon {
  margin-right: var(--spacing-xs);
  color: var(--primary-color);
}

.card-description {
  color: var(--text-tertiary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.star-icon {
  color: var(--warning-color);
  font-size: var(--font-size-sm);
}

.rating-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
  margin-left: var(--spacing-xs);
}

.book-btn {
  padding: var(--spacing-xs) var(--spacing-md) !important;
  border-radius: var(--border-radius-xl) !important;
  font-weight: var(--font-weight-medium) !important;
  font-size: var(--font-size-sm) !important;
}

.book-btn:hover {
  transform: translateY(-1px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .modern-card-grid {
    padding: var(--spacing-2xl) 0;
  }
  
  .section-title {
    font-size: var(--font-size-3xl);
  }
  
  .section-subtitle {
    font-size: var(--font-size-base);
  }
  
  .grid-3 {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .trip-card {
    height: 420px;
  }
  
  .card-image-container {
    height: 240px;
  }
  
  .card-content {
    height: 180px;
    padding: var(--spacing-md);
  }
}

/* 动画延迟 */
.trip-card-wrapper:nth-child(1) { --i: 0; }
.trip-card-wrapper:nth-child(2) { --i: 1; }
.trip-card-wrapper:nth-child(3) { --i: 2; }
.trip-card-wrapper:nth-child(4) { --i: 3; }
.trip-card-wrapper:nth-child(5) { --i: 4; }
.trip-card-wrapper:nth-child(6) { --i: 5; }
.trip-card-wrapper:nth-child(7) { --i: 6; }
.trip-card-wrapper:nth-child(8) { --i: 7; }
.trip-card-wrapper:nth-child(9) { --i: 8; }
</style>
