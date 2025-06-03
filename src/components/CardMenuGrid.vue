<template>
  <div class="trip-grid">
    <h2>热门推荐</h2>
    <div class="trips">
      <div v-for="trip in trips" :key="trip.id" class="trip-card" @click="$router.push(`/detail/${trip.id}`)">
        <img :src="trip.cover" :alt="trip.title" class="trip-image" />
        <div class="trip-content">
          <h3>{{ trip.title }}</h3>
          <p class="trip-location">📍 {{ trip.name }}</p>
          <p class="trip-description">{{ trip.description }}</p>
          <div class="trip-footer">
            <span class="trip-price">￥{{ trip.price }}</span>
            <el-button size="small" type="primary" @click.stop="handleBooking(trip)">
              立即预订
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTripStore } from '../store/tripStore'
import { useCartStore } from '../store/cartStore'
import { ElMessage } from 'element-plus'

const store = useTripStore()
const cart = useCartStore()
const trips = store.trips

const handleBooking = (trip: any) => {
  cart.addToCart(trip)
  ElMessage.success(`已添加 ${trip.title} 到购物车`)
}
</script>

<script lang="ts">
export default {
  name: 'CardMenuGrid'
}
</script>

<style scoped>
.trip-grid {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.trip-grid h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #333;
}

.trips {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.trip-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.trip-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.trip-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.trip-content {
  padding: 20px;
}

.trip-content h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
}

.trip-location {
  color: #666;
  margin: 5px 0;
  font-size: 14px;
}

.trip-description {
  color: #888;
  margin: 10px 0 15px 0;
  font-size: 14px;
  line-height: 1.4;
}

.trip-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.trip-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #e74c3c;
}

@media (max-width: 768px) {
  .trips {
    grid-template-columns: 1fr;
  }
  
  .trip-footer {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
