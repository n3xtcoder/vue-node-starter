// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from '@/store'
import TableComponent from 'vue-table-component'

Vue.use(TableComponent)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el:         '#app',
    // provide the store using the "store" option.
    // this will inject the store instance to all child components.
    store,
    router,
    template:   '<App/>',
    components: { App }
})
