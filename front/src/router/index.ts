import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import AppNewHouse from '@/views/AppNewHouse.vue'
import AppOneHouse from '@/views/AppOneHouse.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome,
  },
  {
    path: '/share',
    name: 'AppNewHouse',
    component: AppNewHouse
  },
  {
    path: '/house/:id',
    name: 'AppOneHouse',
    component: AppOneHouse
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
