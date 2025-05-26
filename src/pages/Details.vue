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
          <el-button type="primary" size="large" @click="handleOrder" v-if="user.isLoggedIn">立即预定</el-button>

          <el-button type="warning" size="large" @click="$router.push('/login')" v-else>请先登录</el-button>
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

import { useTripStore } from '@/store/tripStore'
import { useUserStore } from '@/store/userStore'
import { useOrderStore } from '@/store/orderStore'

const route = useRoute()
const router = useRouter()

const tripId = route.params.id as string

const tripStore = useTripStore()
const trip = computed(() => tripStore.getTripById(tripId))

const user = useUserStore()
const orderStore = useOrderStore()

function handleOrder() {
  if (!trip.value) return

  orderStore.addOrder(user.username, tripId)

  ElMessage.success('预定成功！')

  router.push('/orders')
}
</script>

<style scoped>
.detail-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.detail-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
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
  padding: 24px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.trip-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  margin-bottom: 24px;
}

.trip-table td {
  padding: 8px 12px;
  vertical-align: top;
  color: #444;
}

.trip-table td:first-child {
  width: 100px;
  font-weight: bold;
  color: #666;
}

.price {
  color: #409EFF;
  font-weight: bold;
  font-size: 18px;
}

.action {
  text-align: center;
}

.empty {
  text-align: center;
  padding: 80px 20px;
  font-size: 18px;
  color: #999;
}

.detail-wrapper {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background: #f9f9f9;
  min-height: 100vh;
}

.detail-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  padding: 24px;
  text-align: center;
}

.cover-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 12px;
  color: #333;
}

.price {
  color: #409EFF;
  font-size: 20px;
  font-weight: bold;
}

.desc {
  margin-top: 16px;
  font-size: 15px;
  color: #666;
  line-height: 1.6;
}

.empty {
  padding: 80px 20px;
  text-align: center;
  color: #aaa;
  font-size: 18px;
}
</style>
