<template>
  <div class="modern-search-bar">
    <el-input
      v-model="searchQuery"
      size="large"
      placeholder="搜索目的地或旅行套餐..."
      @keyup.enter="handleSearch"
      clearable
      class="search-input"
    >
      <template #prefix>
        <el-icon class="search-prefix-icon">
          <Search />
        </el-icon>
      </template>
      <template #append>
        <el-button 
          type="primary" 
          @click="handleSearch"
          :disabled="!searchQuery.trim()"
          class="search-btn"
        >
          搜索
        </el-button>
      </template>
    </el-input>
    
    <!-- 快速搜索建议 -->
    <div v-if="showSuggestions" class="quick-suggestions">
      <el-tag 
        v-for="suggestion in quickSuggestions" 
        :key="suggestion"
        type="info" 
        size="small"
        class="suggestion-tag"
        @click="handleQuickSearch(suggestion)"
      >
        {{ suggestion }}
      </el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

defineOptions({
  name: 'SearchBar'
})

const searchQuery = ref('')
const router = useRouter()
const showSuggestions = ref(false)

const quickSuggestions = ['北京', '上海', '成都', '古城', '海岛', '美食']

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'Search',
      query: { q: searchQuery.value.trim() }
    })
    showSuggestions.value = false
  }
}

const handleQuickSearch = (suggestion: string) => {
  searchQuery.value = suggestion
  handleSearch()
}

const onFocus = () => {
  showSuggestions.value = true
}

const onBlur = () => {
  // 延迟隐藏，允许点击建议标签
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}
</script>

<style scoped>
.modern-search-bar {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: var(--border-radius-xl) !important;
  padding: var(--spacing-sm) var(--spacing-md) !important;
  box-shadow: var(--shadow) !important;
  border: 1px solid var(--border-light) !important;
  transition: var(--transition-normal) !important;
  background: var(--bg-primary) !important;
}

.search-input :deep(.el-input__wrapper):hover {
  box-shadow: var(--shadow-md) !important;
  border-color: var(--primary-light) !important;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: var(--shadow-lg) !important;
  border-color: var(--primary-color) !important;
}

.search-input :deep(.el-input__inner) {
  font-size: var(--font-size-base) !important;
  color: var(--text-primary) !important;
  font-weight: var(--font-weight-normal) !important;
}

.search-input :deep(.el-input__inner::placeholder) {
  color: var(--text-tertiary) !important;
}

.search-prefix-icon {
  color: var(--text-tertiary);
  font-size: var(--font-size-lg);
  margin-right: var(--spacing-xs);
}

.search-input :deep(.el-input-group__append) {
  border-radius: 0 var(--border-radius-xl) var(--border-radius-xl) 0 !important;
  border: none !important;
  padding: 0 !important;
  background: transparent !important;
}

.search-btn {
  border-radius: 0 var(--border-radius-xl) var(--border-radius-xl) 0 !important;
  padding: var(--spacing-sm) var(--spacing-lg) !important;
  font-weight: var(--font-weight-medium) !important;
  background: var(--primary-gradient) !important;
  border: none !important;
  box-shadow: none !important;
  transition: var(--transition-normal) !important;
}

.search-btn:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-md) !important;
}

.search-btn:disabled {
  background: var(--text-tertiary) !important;
  transform: none !important;
}

/* 快速搜索建议 */
.quick-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  margin-top: var(--spacing-xs);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-dropdown);
  animation: fadeInUp 0.2s ease-out;
}

.suggestion-tag {
  margin: 0 var(--spacing-xs) var(--spacing-xs) 0;
  cursor: pointer;
  transition: var(--transition-fast);
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}

.suggestion-tag:hover {
  background: var(--primary-color);
  color: var(--text-white);
  border-color: var(--primary-color);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-search-bar {
    max-width: 100%;
  }
  
  .search-input :deep(.el-input__wrapper) {
    padding: var(--spacing-sm) !important;
  }
  
  .search-btn {
    padding: var(--spacing-sm) !important;
  }
  
  .quick-suggestions {
    left: var(--spacing-sm);
    right: var(--spacing-sm);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 