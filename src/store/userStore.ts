import { defineStore } from "pinia";

interface User {
    username: string;
    pwd: string;
}

export const useUserStore = defineStore("user", {
    state: () => ({
        isLoggedIn: false,
        user: {} as User,
        username: '',
        wishlist: [] as string[],
    }),
    actions: {
        login(name: string) {
            this.username = name
            this.isLoggedIn = true
        },
        logout() {
            this.username = ''
            this.isLoggedIn = false
        },
        toggleWishlist(id: string) {
            if (this.wishlist.includes(id)) {
                this.wishlist = this.wishlist.filter(i => i !== id)
            } else {
                this.wishlist.push(id)
            }
        },
        isInWishlist(id: string) {
            return this.wishlist.includes(id)
        },
    }
});

