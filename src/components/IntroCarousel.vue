<template>
  <el-carousel height="260px" :interval="4000" arrow="always">
    <el-carousel-item v-for="s in slides" :key="s.id">
      <div class="slide" :style="{ backgroundImage: `url(${s.cover})` }">
        <h3>{{ s.title }}</h3>
        <p>{{ s.description }}</p>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
  import { useTripStore } from '@/store/tripStore';
  import { computed } from 'vue';

  const store = useTripStore();
  const slides = computed(() => store.getRandomSlides);
  
  

</script>



<style scoped>
.slide {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-size: cover;
  background-position: center;
  text-shadow: 0 1px 4px rgba(0,0,0,.6);
}
.slide h3 { font-size: 32px; margin: 0; font-weight: 700; }
.slide p  { font-size: 18px; margin-top: 8px; }
.el-carousel__item { border-radius: 12px; overflow: hidden; }
</style>
