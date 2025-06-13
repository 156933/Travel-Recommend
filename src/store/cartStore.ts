import { defineStore } from "pinia";

interface CartItem {
    id: string;
    name: string;
    title: string;
    cover: string;
    price: number;
    description: string;
    quantity: number;
    addedAt: Date;
}

interface CartState {
    items: CartItem[];
}

// 从localStorage加载购物车数据
const loadCartState = () => {
    const savedState = localStorage.getItem('cart-state')
    if (savedState) {
        const parsedState = JSON.parse(savedState)
        // 转换日期字符串回Date对象
        parsedState.items.forEach((item) => {
            item.addedAt = new Date(item.addedAt)
        })
        return parsedState
    }
    return { items: [] }
}

// 保存购物车数据到localStorage
const saveCartState = (state) => {
    localStorage.setItem('cart-state', JSON.stringify(state))
}

export const useCartStore = defineStore("cart", {
    state: () => loadCartState(),

    getters: {
        // 购物车总数量
        totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),

        // 购物车总价格
        totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),

        // 检查商品是否在购物车中
        isInCart: (state) => (productId) => state.items.some((item) => item.id === productId),

        // 获取商品在购物车中的数量
        getItemQuantity: (state) => (productId) => {
            const item = state.items.find((item) => item.id === productId);
            return item ? item.quantity : 0;
        }
    },

    actions: {
        // 添加商品到购物车
        addToCart(product) {
            const existingItem = this.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    title: product.title,
                    cover: product.cover,
                    price: product.price,
                    description: product.description,
                    quantity: 1,
                    addedAt: new Date()
                });
            }
            // 保存到localStorage
            saveCartState(this.$state)
        },

        // 从购物车移除商品
        removeFromCart(productId) {
            this.items = this.items.filter((item) => item.id !== productId);
            saveCartState(this.$state)
        },

        // 更新商品数量
        updateQuantity(productId, quantity) {
            const item = this.items.find((item) => item.id === productId);
            if (item) {
                if (quantity <= 0) {
                    this.removeFromCart(productId);
                } else {
                    item.quantity = quantity;
                    saveCartState(this.$state)
                }
            }
        },

        // 清空购物车
        clearCart() {
            this.items = [];
            saveCartState(this.$state)
        }
    }
}); 