<template>
  <div class="detail-page" v-if="trip">
    <div class="detail-card">
      <img :src="trip.cover" class="cover-img" />
      <div class="info">
        <h2>{{ trip.title }}</h2>
        
        <div class="detail-info">
          <div class="info-item">
            <strong>目的地：</strong>{{ trip.name }}
          </div>
          <div class="info-item">
            <strong>价格：</strong><span class="price">￥{{ trip.price }}</span>
          </div>
          <div class="info-item">
            <strong>描述：</strong>{{ trip.description }}
          </div>
        </div>

        <div class="actions">
          <el-button 
            type="primary" 
            size="large" 
            @click="handleAddToCart"
          >
            🛒 加入购物车
          </el-button>
          <el-button @click="$router.back()">
            ↩️ 返回
          </el-button>
          <el-button 
            v-if="!user.isLoggedIn" 
            type="success" 
            @click="$router.push('/login')"
          >
            👤 登录
          </el-button>
        </div>

        <!-- 温馨提示 -->
        <div v-if="!user.isLoggedIn" class="login-tip">
          <p>💡 温馨提示：您可以将商品加入购物车，结算时需要登录账户</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="empty">
    <div class="empty-content">
      <h2>😔 找不到该旅游套餐</h2>
      <p>您访问的套餐可能已下架或链接有误</p>
      <div class="empty-actions">
        <el-button type="primary" @click="$router.push('/')">🏠 返回首页</el-button>
        <el-button @click="$router.push('/search')">🔍 搜索其他套餐</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
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
  
  if (user.isLoggedIn) {
    ElMessage.success(`已将 ${trip.value.title} 添加到购物车`)
  } else {
    ElMessage({
      message: `已将 ${trip.value.title} 添加到购物车，结算时请登录`,
      type: 'success',
      duration: 4000
    })
  }
}
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.detail-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 600px;
  width: 100%;
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.info {
  padding: 30px;
}

.info h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
  font-size: 1.8rem;
}

.detail-info {
  margin-bottom: 30px;
}

.info-item {
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.6;
}

.info-item strong {
  color: #555;
  margin-right: 10px;
}

.price {
  color: #e74c3c;
  font-weight: bold;
  font-size: 1.4rem;
}

.actions {
  text-align: center;
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}

.login-tip {
  background: #f0f9ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.login-tip p {
  margin: 0;
  color: #1e40af;
  font-size: 14px;
}

/* 空状态样式 */
.empty {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.empty-content {
  background: white;
  padding: 60px 40px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 500px;
}

.empty-content h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.8rem;
}

.empty-content p {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.empty-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

@media (max-width: 768px) {
  .detail-card {
    margin: 0 10px;
  }
  
  .cover-img {
    height: 200px;
  }
  
  .info {
    padding: 20px;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .empty-content {
    padding: 40px 20px;
    margin: 0 20px;
  }
  
  .empty-actions {
    flex-direction: column;
  }
}
</style>
