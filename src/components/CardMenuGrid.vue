<template>
  <el-row :gutter="20">
    <el-col v-for="t in trips" :key="t.id" :xs="24" :sm="12" :md="8">
      <el-card shadow="hover" class="card">
        <img :src="t.cover" class="card-img" @click="$router.push(`/detail/${t.id}`)" />
        <div class="card-body">
          <h3 class="card-title">{{ t.title }}</h3>
          <div class="card-price">￥{{ t.price }}</div>

          <!--  心愿单按钮 -->
          <el-icon class="wishlist-icon" @click.stop="user.toggleWishlist(t.id)">
            <component :is="user.isInWishlist(t.id) ? StarFilled : Star" />
          </el-icon>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useTripStore } from '@/store/tripStore';
import { useUserStore } from '@/store/userStore';
import { Star, StarFilled } from '@element-plus/icons-vue'


const user = useUserStore()
const store = useTripStore();
const trips = store.trips;
</script>


<style scoped>
.card {
  cursor: pointer;
  transition: box-shadow .2s ease;
  height: 400px;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
}

.card-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.card-body {
  margin-top: 12px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
}

.card-price {
  color: #409eff;
  font-size: 15px;
  font-weight: 700;
}

.wishlist-icon {
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 20px;
  color: #fadb14;
  cursor: pointer;
}
.card {
  position: relative;
}
</style>
