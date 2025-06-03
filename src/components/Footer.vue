<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>旅游推荐</h4>
        <p>探索、预订、享受——一切尽在一处。</p>
      </div>
      <div class="footer-section">
        <h4>联系我们</h4>
        <p>📍 230902 计算机科学与技术2班</p>
        <p>📞 13888888888</p>
        <p>✉️ zhou15996@gmail.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 旅游推荐系统 - 课程设计</p>
    </div>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: #2c3e50;
  color: white;
  padding: 20px 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 20px;
}

.footer-section h4 {
  margin-bottom: 10px;
  color: #ecf0f1;
}

.footer-section p {
  margin: 5px 0;
  color: #bdc3c7;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #34495e;
}
</style>
