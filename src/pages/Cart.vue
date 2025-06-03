<template>
  <div class="cart-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title text-gradient">购物车</h1>
        <p class="page-subtitle">管理您的旅行计划</p>
      </div>

      <!-- 购物车内容 -->
      <div v-if="cart.items.length > 0" class="cart-content">
        <!-- 购物车商品列表 -->
        <div class="cart-items">
          <div class="section-title">
            <h2>商品清单</h2>
            <span class="item-count">共 {{ cart.totalItems }} 件商品</span>
          </div>
          
          <div class="items-list">
            <div 
              v-for="item in cart.items" 
              :key="item.id" 
              class="cart-item card-modern"
            >
              <div class="item-image">
                <img :src="item.cover" :alt="item.title" />
              </div>
              
              <div class="item-content">
                <div class="item-info">
                  <h3 class="item-title">{{ item.title }}</h3>
                  <p class="item-location">📍 {{ item.name }}</p>
                  <p class="item-description">{{ item.description }}</p>
                </div>
                
                <div class="item-actions">
                  <div class="quantity-control">
                    <el-button 
                      size="small" 
                      @click="decreaseQuantity(item.id)"
                      :disabled="item.quantity <= 1"
                    >
                      -
                    </el-button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <el-button 
                      size="small" 
                      @click="increaseQuantity(item.id)"
                    >
                      +
                    </el-button>
                  </div>
                  
                  <div class="item-price">
                    <span class="price">￥{{ item.price * item.quantity }}</span>
                    <span class="unit-price">单价: ￥{{ item.price }}</span>
                  </div>
                  
                  <el-button 
                    type="danger" 
                    size="small" 
                    text
                    @click="removeItem(item.id)"
                  >
                    <el-icon><Delete /></el-icon>
                    移除
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 购物车总结 -->
        <div class="cart-summary card-modern">
          <h3 class="summary-title">订单总结</h3>
          
          <div class="summary-details">
            <div class="summary-row">
              <span>商品总数</span>
              <span>{{ cart.totalItems }} 件</span>
            </div>
            <div class="summary-row">
              <span>商品总价</span>
              <span>￥{{ cart.totalPrice }}</span>
            </div>
            <div class="summary-row">
              <span>服务费</span>
              <span>￥0</span>
            </div>
            <div class="summary-row total">
              <span>总计</span>
              <span class="total-price">￥{{ cart.totalPrice }}</span>
            </div>
          </div>
          
          <div class="checkout-actions">
            <el-button 
              type="primary" 
              size="large" 
              class="checkout-btn"
              @click="handleCheckout"
            >
              立即结算
            </el-button>
            <el-button 
              size="large" 
              @click="clearCartConfirm"
            >
              清空购物车
            </el-button>
          </div>
        </div>
      </div>

      <!-- 空购物车状态 -->
      <div v-else class="empty-cart">
        <el-empty description="购物车是空的">
          <div class="empty-actions">
            <el-button 
              type="primary" 
              @click="$router.push('/')"
            >
              去首页看看
            </el-button>
            <el-button 
              @click="$router.push('/search')"
            >
              搜索旅行
            </el-button>
          </div>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import { useOrderStore } from '../store/orderStore'
import { Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

interface CartItem {
  id: string;
  quantity: number;
}

const cart = useCartStore()
const user = useUserStore()
const orderStore = useOrderStore()
const router = useRouter()

const increaseQuantity = (productId: string) => {
  const currentQuantity = cart.getItemQuantity(productId)
  cart.updateQuantity(productId, currentQuantity + 1)
}

const decreaseQuantity = (productId: string) => {
  const currentQuantity = cart.getItemQuantity(productId)
  if (currentQuantity > 1) {
    cart.updateQuantity(productId, currentQuantity - 1)
  }
}

const removeItem = async (productId: string) => {
  try {
    await ElMessageBox.confirm('确定要移除这个商品吗？', '确认', {
      type: 'warning'
    })
    cart.removeFromCart(productId)
    ElMessage.success('商品已移除')
  } catch {
    // 用户取消
  }
}

const clearCartConfirm = async () => {
  try {
    await ElMessageBox.confirm('确定要清空整个购物车吗？', '确认', {
      type: 'warning'
    })
    cart.clearCart()
    ElMessage.success('购物车已清空')
  } catch {
    // 用户取消
  }
}

const handleCheckout = async () => {
  if (!user.isLoggedIn) {
    ElMessage.warning('请先登录')
    router.push('/login')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确认支付 ￥${cart.totalPrice} 吗？`,
      '确认支付',
      {
        confirmButtonText: '确认支付',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    // 将购物车中的每个商品添加到订单
    cart.items.forEach((item: CartItem) => {
      // 每个数量作为一个独立订单
      for (let i = 0; i < item.quantity; i++) {
        orderStore.addOrder(user.username, item.id)
      }
    })

    // 清空购物车
    cart.clearCart()

    ElMessage.success('支付成功！订单已生成')
    router.push('/orders')
  } catch {
    // 用户取消支付
  }
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: var(--bg-secondary);
  padding: var(--spacing-xl) 0;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.page-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.page-subtitle {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-2xl);
  align-items: start;
}

/* 购物车商品列表 */
.cart-items {
  background: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow);
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-light);
}

.section-title h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.item-count {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.cart-item {
  display: flex;
  padding: var(--spacing-lg);
  gap: var(--spacing-lg);
  border: 1px solid var(--border-light);
  transition: var(--transition-normal);
}

.cart-item:hover {
  box-shadow: var(--shadow-md);
}

.item-image {
  flex-shrink: 0;
  width: 120px;
  height: 90px;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}

.item-location {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xs);
}

.item-description {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  line-height: 1.4;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacing-md);
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: var(--font-weight-medium);
}

.item-price {
  text-align: right;
}

.price {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  display: block;
}

.unit-price {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

/* 购物车总结 */
.cart-summary {
  background: var(--bg-primary);
  padding: var(--spacing-xl);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.summary-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-light);
}

.summary-details {
  margin-bottom: var(--spacing-xl);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-base);
}

.summary-row.total {
  border-top: 1px solid var(--border-light);
  padding-top: var(--spacing-md);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
}

.total-price {
  color: var(--primary-color);
  font-weight: var(--font-weight-bold);
}

.checkout-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.checkout-btn {
  width: 100% !important;
  padding: var(--spacing-md) !important;
}

/* 空购物车状态 */
.empty-cart {
  text-align: center;
  padding: var(--spacing-3xl) 0;
}

.empty-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  margin-top: var(--spacing-lg);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .item-image {
    width: 100%;
    height: 150px;
  }
  
  .item-content {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .item-actions {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .empty-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style> 