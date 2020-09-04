import Vue from 'vue'
// import { db } from '../services/firebase'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import Login from '../views/Login.vue'
import store from '../store/index'

// lazy load
// const User = resolve => {
//   require.ensure(['../views/Home.vue'], () => {
//     resolve(require('../views/Home.vue'))
//   })
// }

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLogged) {
        next()
      } else {
        next({ name: 'Login' })
      }
    }
  },
  {
    path: '/create',
    name: 'Create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Create,
    beforeEnter(to, from, next) {
      if (store.getters.isUserLogged) {
        next()
      } else {
        next({ name: 'Login' })
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'Redirect',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
