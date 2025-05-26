import { defineStore } from "pinia";

interface Order {
    orderId: string;
    username: string;
    tripId: string;
    createdAt: string;
}

export const useOrderStore = defineStore("order",{
    state: () => ({
        orders: [] as Order[],
    }),

     actions: {
    addOrder(username: string, tripId: string) {
      const time = new Date().toLocaleString()
      this.orders.push({ username, tripId, createdAt: time , orderId: `${username}-${tripId}-${time}` })
    },
    getOrdersByUser(username: string) {
      return this.orders.filter(o => o.username === username)
    }
  }
})