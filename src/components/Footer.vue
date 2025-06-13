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
        <p>040620230035官心晨、042620230090黄启扬、031120230027曾鸿涛、010120230037周子浩、080520230043肖金桂</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 旅游推荐系统 - 课程设计</p>
    </div>
  </footer>
</template>

<script setup lang="ts">

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
