import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/registration',
        name: 'Registration',
        component: () => import(/* webpackChunkName: "about" */ '../views/Registration.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.afterEach(
    (to, from) => {
        const html = document.querySelector('html')
        if (to.name) html?.classList.add(to.name)
        if (from.name) html?.classList.remove(from.name)

    }
)

export default router
