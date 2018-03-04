import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

const ensureLoggedIn = (to, from, next) => {
    // FIXME check this based on the JWT
    const isLoggedIn = true

    if ( isLoggedIn ) {
        console.log('logged in!')
        return next()
    } else {
        return next('/login')
    }
}

export default new Router({
    routes: [
        {
            path:        '/',
            name:        'Index',
            component:   Index,
            beforeEnter: ensureLoggedIn
        }
    ]
})
