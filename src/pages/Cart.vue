<template>
  <div class="cart-page">
    <div class="container">
      <h1>购物车</h1>

      <div v-if="cart.items.length > 0" class="cart-content">
        <div class="cart-items">
          <h2>商品清单 ({{ cart.totalItems }} 件商品)</h2>
          
          <div v-for="item in cart.items" :key="item.id" class="cart-item">
            <img :src="item.cover" :alt="item.title" class="item-image" />
            
            <div class="item-info">
              <h3>{{ item.title }}</h3>
              <p>📍 {{ item.name }}</p>
              <p class="description">{{ item.description }}</p>
            </div>
            
            <div class="item-actions">
              <div class="quantity-control">
                <el-button size="small" @click="decreaseQuantity(item.id)" :disabled="item.quantity <= 1">-</el-button>
                <span>{{ item.quantity }}</span>
                <el-button size="small" @click="increaseQuantity(item.id)">+</el-button>
              </div>
              
              <div class="price-info">
                <div class="total-price">￥{{ item.price * item.quantity }}</div>
                <div class="unit-price">单价: ￥{{ item.price }}</div>
              </div>
              
              <el-button type="danger" size="small" @click="removeItem(item.id)">删除</el-button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <h3>订单总结</h3>
          <div class="summary-item">
            <span>商品总数：{{ cart.totalItems }} 件</span>
          </div>
          <div class="summary-item">
            <span>商品总价：￥{{ cart.totalPrice }}</span>
          </div>
          <div class="summary-total">
            <span>总计：￥{{ cart.totalPrice }}</span>
          </div>
          
          <div class="checkout-actions">
            <el-button type="primary" size="large" @click="handleCheckout">立即结算</el-button>
            <el-button @click="clearCartConfirm">清空购物车</el-button>
          </div>
        </div>
      </div>

      <div v-else class="empty-cart">
        <p>购物车是空的</p>
        <div class="empty-actions">
          <el-button type="primary" @click="$router.push('/')">去首页看看</el-button>
          <el-button @click="$router.push('/search')">搜索旅行</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import { useOrderStore } from '../store/orderStore'
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
    await ElMessageBox.confirm(`确认支付 ￥${cart.totalPrice} 吗？`, '确认支付', {
      confirmButtonText: '确认支付',
      cancelButtonText: '取消',
      type: 'warning'
    })

    cart.items.forEach((item: CartItem) => {
      for (let i = 0; i < item.quantity; i++) {
        orderStore.addOrder(user.username, item.id)
      }
    })

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
  background: #f5f5f5;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.container h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-items {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.cart-items h2 {
  margin-bottom: 20px;
  color: #333;
}

.cart-item {
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.item-image {
  width: 100px;
  height: 75px;
  object-fit: cover;
  border-radius: 6px;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.item-info p {
  margin: 3px 0;
  color: #666;
  font-size: 14px;
}

.description {
  color: #888 !important;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-control span {
  min-width: 20px;
  text-align: center;
}

.price-info {
  text-align: right;
}

.total-price {
  font-size: 16px;
  font-weight: bold;
  color: #e74c3c;
}

.unit-price {
  font-size: 12px;
  color: #999;
}

.cart-summary {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: fit-content;
}

.cart-summary h3 {
  margin-bottom: 15px;
  color: #333;
}

.summary-item {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.summary-total {
  margin: 15px 0;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

.checkout-actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-cart p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.empty-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-image {
    width: 100%;
    height: 150px;
  }
  
  .item-actions {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .empty-actions {
    flex-direction: column;
  }
}
</style> 