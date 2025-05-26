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
    }),
    actions: {
        login(name: string) {
            this.username = name
            this.isLoggedIn = true
        },
        logout() {
            this.username = ''
            this.isLoggedIn = false
        }
    }
});

