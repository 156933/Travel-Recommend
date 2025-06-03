import { defineStore } from "pinia";

interface User {
    username: string;
    pwd: string;
}

interface UserState {
    isLoggedIn: boolean;
    user: User;
    username: string;
    wishlist: string[];
}

// 从localStorage加载用户数据
const loadUserState = (): UserState => {
    const savedState = localStorage.getItem('user-state')
    if (savedState) {
        return JSON.parse(savedState)
    }
    return {
        isLoggedIn: false,
        user: {} as User,
        username: '',
        wishlist: []
    }
}

// 保存用户数据到localStorage
const saveUserState = (state: UserState) => {
    localStorage.setItem('user-state', JSON.stringify(state))
}

export const useUserStore = defineStore("user", {
    state: (): UserState => loadUserState(),
    actions: {
        login(name: string) {
            this.username = name
            this.isLoggedIn = true
            saveUserState(this.$state)
        },
        logout() {
            this.username = ''
            this.isLoggedIn = false
            saveUserState(this.$state)
        },
        toggleWishlist(id: string) {
            if (this.wishlist.includes(id)) {
                this.wishlist = this.wishlist.filter((i: string) => i !== id)
            } else {
                this.wishlist.push(id)
            }
            saveUserState(this.$state)
        },
        isInWishlist(id: string) {
            return this.wishlist.includes(id)
        },
    }
});

