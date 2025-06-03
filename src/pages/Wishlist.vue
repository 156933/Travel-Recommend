<template>
  <div class="wishlist-page">
    <h2>我的心愿单</h2>

    <div v-if="user.isLoggedIn && trips.length">
      <el-row :gutter="20">
        <el-col
          v-for="t in trips"
          :key="t.id"
          :xs="24"
          :sm="12"
          :md="8"
        >
          <el-card shadow="hover" class="card" @click="$router.push(`/detail/${t.id}`)">
            <img :src="t.cover" class="order-img" />
            <h3>{{ t.title }}</h3>
            <p>￥{{ t.price }}</p>

            <el-icon class="wishlist-icon" @click.stop="user.toggleWishlist(t.id)">
            <component :is="user.isInWishlist(t.id) ? StarFilled : Star" />
          </el-icon>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-else class="not-logged">
      <p v-if="!user.isLoggedIn">请先登录查看你的心愿单。</p>
      <p v-else>你还没有收藏任何行程。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/userStore'
import { useTripStore } from '../store/tripStore'
import { Star, StarFilled } from '@element-plus/icons-vue'
import { computed } from 'vue'

const user = useUserStore()
const tripStore = useTripStore()

const trips = computed(() =>
  tripStore.trips.filter((t: any) => user.wishlist.includes(t.id))
)
</script>

<style scoped>
.wishlist-page {
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
  text-align: center;
  font-size: 16px;
  color: #999;
}

.card h3 {
  margin: 10px 0 5px;
  font-size: 18px;
  font-weight: 600;
}

.card p {
  color: #409EFF;
  font-size: 16px;
  font-weight: bold;
}

.wishlist-icon {
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 20px;
  color: #fadb14;
  cursor: pointer;
}

.el-card {
  position: relative;
}
</style>
