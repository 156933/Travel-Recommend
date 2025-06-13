<template>
  <div class="login-page">
    <div class="login-form">
      <h2>登录</h2>
      <el-input v-model="username" placeholder="请输入用户名" size="large" />
      <el-button type="primary" size="large" @click="handleLogin" style="width: 100%; margin-top: 15px;">
        登录
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../store/userStore'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const username = ref('')
const userStore = useUserStore()
const router = useRouter()

const handleLogin = () => {
  if (username.value.trim()) {
    userStore.login(username.value)
    ElMessage.success('登录成功！')
    router.push('/')
  } else {
    ElMessage.warning('请输入用户名')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  background: white;
  padding: 30px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
