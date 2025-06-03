<template>
  <div class="about-page">
    <div class="container">
      <div class="about-header">
        <h1>关于旅游推荐系统</h1>
        <p>一个基于现代前端技术栈的旅游推荐网站</p>
      </div>

      <div class="about-content">
        <!-- 项目介绍 -->
        <section class="section">
          <h2>📋 项目介绍</h2>
          <div class="content-card">
            <p>
              这是一个专为课程设计开发的旅游推荐系统，实现了完整的电商流程。
              用户可以浏览热门旅游套餐、搜索心仪的目的地、查看详细信息、
              添加到购物车并完成下单流程。
            </p>
            <p>
              系统采用现代化的前端技术栈，界面简洁美观，功能完整实用，
              特别适合作为 Vue 3 学习和课程设计的参考项目。
            </p>
          </div>
        </section>

        <!-- 主要功能 -->
        <section class="section">
          <h2>✨ 主要功能</h2>
          <div class="content-card">
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">🏠</div>
                <h3>首页展示</h3>
                <p>热门旅游推荐和快速搜索</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🔍</div>
                <h3>搜索功能</h3>
                <p>支持关键词搜索旅游套餐</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📄</div>
                <h3>详情页面</h3>
                <p>查看旅游套餐详细信息</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🛒</div>
                <h3>购物车</h3>
                <p>商品管理和数量调整</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📝</div>
                <h3>订单管理</h3>
                <p>查看购买记录和订单状态</p>
              </div>
              <div class="feature-item">
                <div class="feature-icon">👤</div>
                <h3>用户系统</h3>
                <p>简单的用户认证机制</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 技术栈 -->
        <section class="section">
          <h2>🛠️ 技术栈</h2>
          <div class="content-card">
            <div class="tech-grid">
              <div class="tech-category">
                <h3>前端框架</h3>
                <ul>
                  <li>Vue 3 (Composition API)</li>
                  <li>TypeScript</li>
                  <li>Vite</li>
                </ul>
              </div>
              <div class="tech-category">
                <h3>UI 组件</h3>
                <ul>
                  <li>Element Plus</li>
                  <li>CSS3</li>
                  <li>响应式设计</li>
                </ul>
              </div>
              <div class="tech-category">
                <h3>状态管理</h3>
                <ul>
                  <li>Pinia</li>
                  <li>Vue Router 4</li>
                  <li>localStorage</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 项目信息 -->
        <section class="section">
          <h2>ℹ️ 项目信息</h2>
          <div class="content-card">
            <div class="project-info">
              <div class="info-row">
                <strong>项目名称：</strong>
                <span>旅游推荐系统 (Travel Recommend System)</span>
              </div>
              <div class="info-row">
                <strong>开发时间：</strong>
                <span>2024年12月</span>
              </div>
              <div class="info-row">
                <strong>项目性质：</strong>
                <span>课程设计作品</span>
              </div>
              <div class="info-row">
                <strong>开发目的：</strong>
                <span>Vue 3 前端技术学习与实践</span>
              </div>
              <div class="info-row">
                <strong>设计理念：</strong>
                <span>简洁实用，功能完整，易于学习</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 作者信息 -->
        <section class="section">
          <h2>👨‍💻 作者信息</h2>
          <div class="content-card">
            <div class="author-info">
              <div class="author-card">
                <div class="author-avatar">👨‍🎓</div>
                <div class="author-details">
                  <h3>开发者</h3>
                  <p><strong>班级：</strong>230902 计算机科学与技术2班</p>
                  <p><strong>联系方式：</strong>zhou15996@gmail.com</p>
                  <p><strong>电话：</strong>13888888888</p>
                  <p><strong>GitHub：</strong>github.com/your-username</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 致谢 -->
        <section class="section">
          <h2>🙏 致谢</h2>
          <div class="content-card">
            <p>感谢以下技术和工具的支持：</p>
            <ul>
              <li>Vue.js 团队提供的优秀前端框架</li>
              <li>Element Plus 提供的精美 UI 组件库</li>
              <li>TypeScript 提供的类型安全支持</li>
              <li>Vite 提供的快速构建工具</li>
              <li>所有开源社区贡献者的无私奉献</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '../components/Footer.vue'
</script>

<script lang="ts">
export default {
  name: 'About'
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.about-header {
  text-align: center;
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  margin-bottom: 40px;
}

.about-header h1 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
}

.about-header p {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

.about-content {
  padding: 0 20px 40px;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
  border-left: 4px solid #667eea;
  padding-left: 15px;
}

.content-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.content-card p {
  line-height: 1.8;
  color: #666;
  margin-bottom: 15px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.feature-item {
  text-align: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: transform 0.2s;
}

.feature-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.feature-item h3 {
  margin: 10px 0;
  color: #333;
}

.feature-item p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.tech-category h3 {
  color: #667eea;
  margin-bottom: 15px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 5px;
}

.tech-category ul {
  list-style: none;
  padding: 0;
}

.tech-category li {
  padding: 5px 0;
  color: #666;
  position: relative;
  padding-left: 20px;
}

.tech-category li::before {
  content: "▸";
  color: #667eea;
  position: absolute;
  left: 0;
}

.project-info {
  space-y: 15px;
}

.info-row {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

.info-row strong {
  color: #333;
  min-width: 120px;
  margin-right: 10px;
}

.info-row span {
  color: #666;
}

.author-card {
  display: flex;
  align-items: center;
  gap: 20px;
}

.author-avatar {
  font-size: 4rem;
  background: #667eea;
  color: white;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.author-details h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.author-details p {
  margin: 8px 0;
  color: #666;
}

.content-card ul {
  padding-left: 20px;
}

.content-card li {
  margin: 8px 0;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .about-header h1 {
    font-size: 2rem;
  }
  
  .about-header p {
    font-size: 1rem;
  }
  
  .content-card {
    padding: 20px;
  }
  
  .author-card {
    flex-direction: column;
    text-align: center;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .info-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .info-row strong {
    min-width: auto;
    margin-bottom: 5px;
  }
}
</style> 