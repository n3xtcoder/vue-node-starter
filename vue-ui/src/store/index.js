import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import {auth} from '@/utils/client'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [
    createPersist({
      namespace: 'n3'
    })
  ],
  strict: true, // not for production
  state: {
    user: {
      jwt: undefined
    }
  },
  mutations: {
    addJwt (state, jwt) {
      state.user.jwt = jwt
    },
    logout (state) {
      state.user.jwt = undefined
    }
  },
  getters: {
    isLoggedIn: (state) => {
      return !!state.user.jwt
    },
    jwt: (state) => {
      return state.user.jwt
    }
  }
})

// Actions
export function login (username, password) {
  return auth(username, password).then(function (jwt) {
    store.commit('addJwt', jwt)
  })
}

export function logout () {
  store.commit('logout')
}
