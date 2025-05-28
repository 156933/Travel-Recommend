<template>
  <div class="navbar">
    <div class="navbar-left" @click="$router.push('/')">
      <img src="/images/logo.png" class="logo-img" />
      <span class="logo">旅行网</span>
    </div>

    <div class="navbar-right">
      <el-button text @click="$router.push('/')">首页</el-button>
      <el-button text @click="$router.push('/orders')">我的订单</el-button>
      <el-button text @click="$router.push('/wishlist')">心愿单</el-button>

      <template v-if="user.isLoggedIn">
        <span class="welcome">你好，{{ user.username }}</span>
        <el-button text @click="user.logout()">退出</el-button>
      </template>
      <template v-else>
        <el-button type="primary" plain size="small" @click="$router.push('/login')">登录</el-button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/userStore'
const user = useUserStore()
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 32px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-weight: bold;
  font-size: 18px;
  color: #409eff;
  cursor: pointer;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.welcome {
  font-size: 14px;
  color: #333;
}

.logo-img {
  height: 36px;
  margin-right: 10px;
  vertical-align: middle;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}

</style>
