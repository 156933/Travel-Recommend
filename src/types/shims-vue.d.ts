declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'element-plus' {
  const ElementPlus: any
  export default ElementPlus
  export const ElMessage: any
  export const ElMessageBox: any
}

declare module 'pinia' {
  export function createPinia(): any
  export function defineStore(name: string, options: {
    state?: () => any;
    getters?: any;
    actions?: any;
  }): any
  export function defineStore(id: string, setup: any): any
}

declare module 'vue-router' {
  export function createRouter(options: any): any
  export function createWebHistory(base?: string): any
  export function useRoute(): any
  export function useRouter(): any
}

declare module '@element-plus/icons-vue' {
  export const Search: any
  export const House: any
  export const List: any
  export const Star: any
  export const StarFilled: any
  export const ShoppingCart: any
  export const Location: any
  export const Check: any
  export const Coin: any
  export const Delete: any
  export const Phone: any
  export const Message: any
} 