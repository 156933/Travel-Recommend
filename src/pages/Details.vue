<template>
  <div class="detail-wrapper" v-if="trip">
    <div class="detail-card">
      <img :src="trip.cover" class="cover-img" />

      <div class="info">
        <h2 class="title">{{ trip.title }}</h2>
        <table class="trip-table">
          <tbody>
            <tr>
              <td>目的地</td>
              <td>{{ trip.name }}</td>
            </tr>
            <tr>
              <td>价格</td>
              <td class="price">￥{{ trip.price }}</td>
            </tr>
            <tr>
              <td>描述</td>
              <td>{{ trip.description }}</td>
            </tr>
          </tbody>
        </table>

        <div class="action">
          <el-button 
            type="primary" 
            size="large" 
            @click="handleAddToCart" 
            v-if="user.isLoggedIn"
          >
            加入购物车
          </el-button>

          <el-button 
            type="warning" 
            size="large" 
            @click="$router.push('/login')" 
            v-else
          >
            请先登录
          </el-button>

          <el-icon 
            class="wishlist-icon" 
            @click="user.toggleWishlist(tripId)"
            v-if="user.isLoggedIn"
          >
            <component :is="user.isInWishlist(tripId) ? StarFilled : Star" />
          </el-icon>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="empty">
    <p>找不到该行程。</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Star, StarFilled } from '@element-plus/icons-vue'

import { useTripStore } from '../store/tripStore'
import { useUserStore } from '../store/userStore'
import { useCartStore } from '../store/cartStore'

const route = useRoute()
const router = useRouter()

const tripId = route.params.id as string

const tripStore = useTripStore()
const trip = computed(() => tripStore.getTripById(tripId))

const user = useUserStore()
const cart = useCartStore()

function handleAddToCart() {
  if (!trip.value) return
  
  cart.addToCart(trip.value)
  ElMessage.success(`已将 ${trip.value.title} 添加到购物车`)
}
</script>

<style scoped>
.detail-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background: var(--bg-secondary);
  min-height: 100vh;
}

.detail-card {
  background: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  max-width: 720px;
  width: 100%;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
}

.info {
  padding: var(--spacing-xl);
  position: relative;
}

.title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  text-align: center;
}

.trip-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-xl);
}

.trip-table td {
  padding: var(--spacing-sm) var(--spacing-md);
  vertical-align: top;
  color: var(--text-primary);
}

.trip-table td:first-child {
  width: 100px;
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
}

.price {
  color: var(--primary-color);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xl);
}

.action {
  text-align: center;
  position: relative;
}

.wishlist-icon {
  position: absolute;
  top: -240px;
  right: 20px;
  font-size: 24px;
  color: #fadb14;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.wishlist-icon:hover {
  transform: scale(1.1);
  background: rgba(0, 0, 0, 0.5);
}

.empty {
  text-align: center;
  padding: 80px 20px;
  font-size: var(--font-size-lg);
  color: var(--text-tertiary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .detail-card {
    margin: 0 var(--spacing-sm);
  }

  .cover-img {
    height: 240px;
  }

  .info {
    padding: var(--spacing-lg);
  }

  .title {
    font-size: var(--font-size-xl);
  }

  .trip-table {
    font-size: var(--font-size-sm);
  }

  .wishlist-icon {
    top: -180px;
  }
}
</style>
