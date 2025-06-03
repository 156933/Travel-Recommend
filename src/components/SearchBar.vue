<template>
  <div class="search-bar">
    <el-input
      v-model="searchQuery"
      placeholder="搜索目的地或旅行套餐..."
      @keyup.enter="handleSearch"
      clearable
    >
      <template #append>
        <el-button type="primary" @click="handleSearch">
          搜索
        </el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'Search',
      query: { q: searchQuery.value.trim() }
    })
  }
}
</script>

<script lang="ts">
export default {
  name: 'SearchBar'
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
</style> 