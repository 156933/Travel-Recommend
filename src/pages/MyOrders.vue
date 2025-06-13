<template>
  <div class="orders-page">
    <div class="container">
      <h1>我的订单</h1>

      <!-- 未登录状态 -->
      <div v-if="!userStore.isLoggedIn" class="not-logged-in">
        <div class="login-prompt">
          <h2>🔒 请先登录</h2>
          <p>您需要登录后才能查看订单记录</p>
          <div class="login-actions">
            <el-button type="primary" size="large" @click="$router.push('/login')">
              立即登录
            </el-button>
            <el-button @click="$router.push('/')">
              返回首页
            </el-button>
          </div>
        </div>
      </div>

      <!-- 已登录状态 -->
      <div v-else>
        <div v-if="orders.length > 0" class="orders-list">
          <div v-for="order in orders" :key="order.orderId" class="order-item">
            <div class="order-info">
              <h3>{{ getTrip(order.tripId)?.title || '未知商品' }}</h3>
              <p>📍 {{ getTrip(order.tripId)?.name || '未知地点' }}</p>
              <p class="order-date">下单时间：{{ order.createdAt }}</p>
            </div>
            <div class="order-price">
              ￥{{ getTrip(order.tripId)?.price || 0 }}
            </div>
          </div>
        </div>

        <div v-else class="empty-orders">
          <h2>📝 暂无订单</h2>
          <p>您还没有购买任何旅游套餐</p>
          <el-button type="primary" @click="$router.push('/')">开始购物</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useOrderStore } from '../store/orderStore'
import { useUserStore } from '../store/userStore'
import { useTripStore } from '../store/tripStore'

const orderStore = useOrderStore()
const userStore = useUserStore()
const tripStore = useTripStore()

const orders = computed(() => {
  if (userStore.isLoggedIn) {
    return orderStore.getOrdersByUser(userStore.username)
  }
  return []
})

const getTrip = (tripId) => {
  return tripStore.getTripById(tripId)
}
</script>

<style scoped>
.orders-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.container h1 {
  text-align: center;
  margin-bottom: 30px;
}

/* 未登录提示 */
.not-logged-in {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.login-prompt {
  background: white;
  padding: 40px;
  border: 1px solid #ddd;
  text-align: center;
  max-width: 400px;
}

.login-prompt h2 {
  margin: 0 0 20px 0;
}

.login-prompt p {
  margin-bottom: 30px;
}

.login-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* 订单列表 */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-item {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-info h3 {
  margin: 0 0 5px 0;
}

.order-info p {
  margin: 3px 0;
  font-size: 14px;
}

.order-price {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

/* 空订单状态 */
.empty-orders {
  text-align: center;
  padding: 40px;
  background: white;
  border: 1px solid #ddd;
}

.empty-orders h2 {
  margin: 0 0 15px 0;
}

.empty-orders p {
  margin-bottom: 25px;
}

@media (max-width: 768px) {
  .login-prompt {
    padding: 30px 20px;
    margin: 0 20px;
  }

  .login-actions {
    flex-direction: column;
  }

  .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .order-price {
    align-self: flex-end;
  }
}
</style>
