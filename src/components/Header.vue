<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo" @click="$router.push('/')">
          <h2>🌍 旅游推荐</h2>
        </div>

        <!-- 导航菜单 -->
        <nav class="nav">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link to="/search" class="nav-item">搜索</router-link>
          <router-link to="/orders" class="nav-item" v-if="user.isLoggedIn">我的订单</router-link>
          <router-link to="/about" class="nav-item">关于</router-link>
        </nav>

        <!-- 用户操作区 -->
        <div class="user-actions">
          <!-- 购物车 -->
          <router-link to="/cart" class="cart-link">
            <el-badge :value="cart.totalItems" :hidden="cart.totalItems === 0">
              <el-button type="primary" size="small">
                🛒 购物车
              </el-button>
            </el-badge>
          </router-link>

          <!-- 用户信息 -->
          <div v-if="user.isLoggedIn" class="user-info">
            <el-dropdown>
              <span class="username">{{ user.username }}</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/orders')">我的订单</el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          
          <!-- 登录按钮 -->
          <el-button v-else type="primary" size="small" @click="$router.push('/login')">
            登录
          </el-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/userStore'
import { useCartStore } from '../store/cartStore'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const user = useUserStore()
const cart = useCartStore()
const router = useRouter()

const handleLogout = () => {
  user.logout()
  ElMessage.success('已退出登录')
  router.push('/')
}
</script>

<script lang="ts">
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.logo {
  cursor: pointer;
}

.logo h2 {
  margin: 0;
  color: #667eea;
  font-size: 1.5rem;
}

.nav {
  display: flex;
  gap: 30px;
}

.nav-item {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-item:hover,
.nav-item.router-link-active {
  background: #667eea;
  color: white;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cart-link {
  text-decoration: none;
}

.username {
  color: #333;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.2s;
}

.username:hover {
  background: #f5f5f5;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
    padding: 10px 0;
  }
  
  .nav {
    gap: 20px;
  }
  
  .nav-item {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .user-actions {
    gap: 10px;
  }
  
  .logo h2 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .nav {
    gap: 15px;
  }
  
  .nav-item {
    padding: 4px 8px;
    font-size: 13px;
  }
}
</style> 