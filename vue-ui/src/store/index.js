import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import { auth, issues } from '@/utils/client'

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins:   [
        createPersist({
            namespace: 'n3'
        })
    ],
    strict:    true, // not for production
    state:     {
        user: {
            jwt: undefined
        },
        issues: undefined
    },
    mutations: {
        addJwt(state, jwt) {
            state.user.jwt = jwt
        },
        logout(state) {
            state.user.jwt = undefined
        },
        refreshIssues(state, results) {
            console.log('refreshIssues', results)
            state.issues = results
        }
    },
    getters:   {
        isLoggedIn: (state) => {
            return !!state.user.jwt
        },
        jwt:        (state) => {
            return state.user.jwt
        }
    }
})

// Actions
export function login(username, password) {
    return auth(username, password).then( (jwt) => {
        store.commit('addJwt', jwt)
    })
}

export function logout() {
    store.commit('logout')
}

export function searchIssues(q) {
    store.commit('refreshIssues', undefined)
    return issues(q).then( (results) => {
        console.log('searchIssues', results)
        store.commit('refreshIssues', results)
    })
}
