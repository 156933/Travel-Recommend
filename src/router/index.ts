import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Details from '@/pages/Details.vue';
import Login from '@/pages/Login.vue';
import MyOrders from '@/pages/MyOrders.vue';
import Search from '@/pages/Search.vue';
import Cart from '@/pages/Cart.vue';
import About from '@/pages/About.vue';

const routes = [
  { 
    path: '/home', 
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
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/orders',
    name: 'MyOrders',
    component: MyOrders,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;