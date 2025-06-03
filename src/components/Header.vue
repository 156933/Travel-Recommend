<template>
  <header class="modern-header">
    <div class="container">
      <div class="header-content">
        <!-- Logo区域 -->
        <div class="logo-section" @click="$router.push('/')">
          <img src="/images/logo.png" class="logo-img" alt="旅行网" />
          <span class="logo-text text-gradient">旅行网</span>
        </div>

        <!-- 导航菜单 -->
        <nav class="nav-menu">
          <el-button 
            text 
            class="nav-item" 
            @click="$router.push('/')"
            :class="{ active: $route.path === '/' || $route.path === '/home' }"
          >
            <el-icon><House /></el-icon>
            首页
          </el-button>
          
          <el-button 
            text 
            class="nav-item" 
            @click="$router.push('/search')"
            :class="{ active: $route.path === '/search' }"
          >
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          
          <el-button 
            text 
            class="nav-item cart-button" 
            @click="$router.push('/cart')"
            :class="{ active: $route.path === '/cart' }"
          >
            <div class="cart-icon-wrapper">
              <el-icon><ShoppingCart /></el-icon>
              <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
            </div>
            购物车
          </el-button>
          
          <el-button 
            text 
            class="nav-item" 
            @click="$router.push('/orders')"
            :class="{ active: $route.path === '/orders' }"
          >
            <el-icon><List /></el-icon>
            我的订单
          </el-button>
          
          <el-button 
            text 
            class="nav-item" 
            @click="$router.push('/wishlist')"
            :class="{ active: $route.path === '/wishlist' }"
          >
            <el-icon><Star /></el-icon>
            心愿单
          </el-button>
        </nav>

        <!-- 用户区域 -->
        <div class="user-section">
          <template v-if="userStore.isLoggedIn">
            <div class="user-info">
              <el-avatar :size="32" class="user-avatar">
                {{ userStore.username?.[0]?.toUpperCase() }}
              </el-avatar>
              <span class="welcome-text">{{ userStore.username }}</span>
            </div>
            <el-button 
              text 
              class="logout-btn" 
              @click="userStore.logout()"
            >
              退出
            </el-button>
          </template>
          <template v-else>
            <el-button 
              type="primary" 
              class="login-btn"
              @click="$router.push('/login')"
            >
              登录
            </el-button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/userStore'
import { useCartStore } from '../store/cartStore'
import { Search, House, List, Star, ShoppingCart } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const cartStore = useCartStore()
const $route = useRoute()
</script>

<style scoped>
.modern-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-light);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  transition: var(--transition-normal);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
  min-height: 64px;
}

/* Logo 区域 */
.logo-section {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: var(--transition-fast);
}

.logo-section:hover {
  transform: scale(1.02);
}

.logo-img {
  height: 40px;
  width: 40px;
  border-radius: var(--border-radius);
  margin-right: var(--spacing-sm);
  object-fit: cover;
}

.logo-text {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.5px;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.nav-item {
  position: relative;
  padding: var(--spacing-sm) var(--spacing-md) !important;
  border-radius: var(--border-radius) !important;
  color: var(--text-secondary) !important;
  font-weight: var(--font-weight-medium) !important;
  transition: var(--transition-fast) !important;
}

.nav-item:hover {
  color: var(--primary-color) !important;
  background: var(--bg-tertiary) !important;
  transform: translateY(-1px);
}

.nav-item.active {
  color: var(--primary-color) !important;
  background: var(--bg-tertiary) !important;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--primary-gradient);
  border-radius: 1px;
}

.nav-item .el-icon {
  margin-right: var(--spacing-xs);
}

/* 购物车特殊样式 */
.cart-button .cart-icon-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--error-color);
  color: var(--text-white);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  padding: 2px 6px;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* 用户区域 */
.user-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--bg-tertiary);
  border-radius: var(--border-radius-xl);
}

.user-avatar {
  background: var(--primary-gradient) !important;
  color: var(--text-white) !important;
  font-weight: var(--font-weight-semibold) !important;
}

.welcome-text {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
}

.logout-btn {
  color: var(--text-secondary) !important;
  font-size: var(--font-size-sm) !important;
}

.logout-btn:hover {
  color: var(--error-color) !important;
}

.login-btn {
  padding: var(--spacing-sm) var(--spacing-lg) !important;
  font-weight: var(--font-weight-medium) !important;
  border-radius: var(--border-radius-xl) !important;
  box-shadow: var(--shadow) !important;
}

.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg) !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    padding: var(--spacing-sm) 0;
  }
  
  .nav-menu {
    display: none;
  }
  
  .logo-text {
    font-size: var(--font-size-lg);
  }
  
  .user-info .welcome-text {
    display: none;
  }
}

@media (max-width: 1024px) {
  .nav-item span {
    display: none;
  }
  
  .nav-item {
    padding: var(--spacing-sm) !important;
  }
}
</style>
