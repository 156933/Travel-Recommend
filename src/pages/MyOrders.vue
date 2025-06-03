<template>
  <div class="order-page" v-if="user.isLoggedIn">
    <Header />
    <h2>我的订单</h2>
    <el-empty description="暂无订单" v-if="orders.length === 0" />

    <el-row :gutter="20" v-else>
      <el-col :span="8" v-for="order in orders" :key="order.createdAt">
        <el-card>
          <img :src="order.trip.cover" class="order-img" />
          <h3>{{ order.trip.title }}</h3>
          <p>价格：￥{{ order.trip.price }}</p>
          <p>下单时间：{{ order.createdAt }}</p>

          
        </el-card>
      </el-col>
    </el-row>
  </div>

  <div v-else class="not-logged">
    <el-empty description="请先登录查看订单" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/userStore'
import { useOrderStore } from '../store/orderStore'
import { useTripStore } from '../store/tripStore'
import { computed } from 'vue'

const user = useUserStore()
const orderStore = useOrderStore()
const tripStore = useTripStore()

const orders = computed(() => {
  return orderStore.getOrdersByUser(user.username).map((order: any) => ({
    ...order,
    trip: tripStore.getTripById(order.tripId)!
  }))
})
</script>

<style scoped>
.order-page {
  padding: 32px;
}

.order-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
}

.not-logged {
  padding: 80px 20px;
}




</style>
