import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from '@/views/AppHome.vue'
import AppNewHouse from '@/views/AppNewHouse.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
