<template>
  <el-row :gutter="20">
    <el-col v-for="t in trips" :key="t.id" :xs="24" :sm="12" :md="8">
      <el-card shadow="hover" class="card" @click="$router.push(`/detail/${t.id}`)">
        <img :src="t.cover" class="card-img" />
        <div class="card-body">
          <h3 class="card-title">{{ t.title }}</h3>
          <div class="card-price">￥{{ t.price }}</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useTripStore } from '@/store/tripStore';

const store = useTripStore();
const trips = store.trips;
</script>


<style scoped>
.card       { cursor: pointer; transition: box-shadow .2s ease; height: 400px; }
.card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.15); }
.card-img   { width: 100%; height: 300px; object-fit: cover; border-radius: 8px; }
.card-body  { margin-top: 12px; }
.card-title { font-size: 16px; font-weight: 600; margin: 0 0 4px; }
.card-price { color: #409eff; font-size: 15px; font-weight: 700; }
</style>
