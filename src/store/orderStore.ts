import { defineStore } from "pinia";

interface Order {
    orderId: string;
    username: string;
    tripId: string;
    createdAt: string;
}

interface OrderState {
    orders: Order[];
}

// 从localStorage加载订单数据
const loadOrderState = (): OrderState => {
    const savedState = localStorage.getItem('order-state')
    if (savedState) {
        return JSON.parse(savedState)
    }
    return { orders: [] }
}

// 保存订单数据到localStorage
const saveOrderState = (state: OrderState) => {
    localStorage.setItem('order-state', JSON.stringify(state))
}

export const useOrderStore = defineStore("order",{
    state: (): OrderState => loadOrderState(),

    actions: {
        addOrder(username: string, tripId: string) {
            const time = new Date().toLocaleString()
            this.orders.push({ 
                username, 
                tripId, 
                createdAt: time, 
                orderId: `${username}-${tripId}-${time}` 
            })
            saveOrderState(this.$state)
        },
        getOrdersByUser(username: string) {
            return this.orders.filter((o: Order) => o.username === username)
        }
    }
})