import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import {store, login, logout} from '@/store'

Vue.use(Router)

const skipIfLoggedIn = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    return next('/')
  } else {
    return next()
  }
}

const ensureLoggedIn = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    return next('/login')
  } else {
    console.log('logged in!')
    return next()
  }
}

export default new Router({
  routes: [
    { path: '/login',
      name: 'Login',
      component: Login,
      props: { login },
      beforeEnter: skipIfLoggedIn
    },
    { path: '/logout',
      name: 'Logout',
      beforeEnter: (to, from, next) => {
        logout()
        return ensureLoggedIn(to, from, next)
      }
    }
  ]
})
