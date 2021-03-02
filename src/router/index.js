import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const page = path => () => import(`../views${path}`).then(m => m.default || m)

const routes = [
  {
    path: '/',
    name: 'index',
    component: page('/Index')
  },
  {
    path: '*',
    component: page('/errors/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
