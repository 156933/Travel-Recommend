<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">用户登录</h2>
      <el-input v-model="username" placeholder="请输入用户名" />
      <el-button type="primary" class="btn" @click="handleLogin">登录</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'

const username = ref('')
const router = useRouter()
const userStore = useUserStore()

function handleLogin() {
  if (username.value.trim()) {
    userStore.login(username.value.trim())
    router.push('/') 
  } else {
    alert('请输入用户名')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f3f3;
}

.login-card {
  width: 320px;
  padding: 24px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.btn {
  width: 100%;
  margin-top: 12px;
}
</style>
