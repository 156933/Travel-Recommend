import { defineStore } from "pinia";

// 从localStorage加载用户数据
const loadUserState = () => {
    const savedState = localStorage.getItem('user-state')
    if (savedState) {
        return JSON.parse(savedState)
    }
    return {
        isLoggedIn: false,
        user: {},
        username: ''
    }
}

// 保存用户数据到localStorage
const saveUserState = (state) => {
    localStorage.setItem('user-state', JSON.stringify(state))
}

export const useUserStore = defineStore("user", {
    state: () => loadUserState(),
    actions: {
        login(name) {
            this.username = name
            this.isLoggedIn = true
            saveUserState(this.$state)
        },
        logout() {
            this.username = ''
            this.isLoggedIn = false
            saveUserState(this.$state)
        }
    }
});

