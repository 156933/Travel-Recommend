import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Details from '@/pages/Details.vue';
import Login from '@/pages/Login.vue';
import MyOrders from '@/pages/MyOrders.vue';


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