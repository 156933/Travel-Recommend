import { defineStore } from "pinia";

// 从localStorage加载订单数据
const loadOrderState = () => {
    const savedState = localStorage.getItem('order-state')
    if (savedState) {
        return JSON.parse(savedState)
    }
    return { orders: [] }
}

// 保存订单数据到localStorage
const saveOrderState = (state) => {
    localStorage.setItem('order-state', JSON.stringify(state))
}

export const useOrderStore = defineStore("order", {
    state: () => loadOrderState(),

    actions: {
        addOrder(username, tripId) {
            const time = new Date().toLocaleString()
            this.orders.push({
                username,
                tripId,
                createdAt: time,
                orderId: `${username}-${tripId}-${time}`
            })
            saveOrderState(this.$state)
        },
        getOrdersByUser(username) {
            return this.orders.filter((o) => o.username === username)
        }
    }
})