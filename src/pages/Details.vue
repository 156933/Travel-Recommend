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
          <el-button type="primary" size="large" @click="handleAddToCart">
            🛒 加入购物车
          </el-button>
          <el-button @click="$router.back()">
            ↩️ 返回
          </el-button>
          <el-button v-if="!user.isLoggedIn" type="success" @click="$router.push('/login')">
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

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useTripStore } from '../store/tripStore'
import { useUserStore } from '../store/userStore'
import { useCartStore } from '../store/cartStore'

const route = useRoute()
const router = useRouter()
const tripId = route.params.id

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
  padding: 20px;
  display: flex;
  justify-content: center;
}

.detail-card {
  background: white;
  border: 1px solid #ddd;
  max-width: 600px;
  width: 100%;
}

.cover-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.info {
  padding: 20px;
}

.info h2 {
  text-align: center;
  margin-bottom: 20px;
}

.detail-info {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
}

.price {
  color: #e74c3c;
  font-weight: bold;
}

.actions {
  text-align: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.login-tip {
  background: #f0f9ff;
  border: 1px solid #bfdbfe;
  padding: 10px;
  text-align: center;
}

.empty {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-content {
  background: white;
  padding: 30px;
  border: 1px solid #ddd;
  text-align: center;
  max-width: 500px;
}

.empty-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

@media (max-width: 768px) {
  .cover-img {
    height: 200px;
  }

  .actions {
    flex-direction: column;
  }

  .empty-actions {
    flex-direction: column;
  }
}
</style>
