import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Details from '@/pages/Details.vue';
import Login from '@/pages/Login.vue';
import MyOrders from '@/pages/MyOrders.vue';
import Wishlist from '@/pages/Wishlist.vue';
import Search from '@/pages/Search.vue';
import Cart from '@/pages/Cart.vue';
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

const routes = [
  { path: '/home', 
    name: 'Home', 
    component: Home 
  },

  {
    path: '/detail/:id',
    name: 'Details',
    component: Details,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/orders',
    name: 'MyOrders',
    component: MyOrders,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  }



];


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;