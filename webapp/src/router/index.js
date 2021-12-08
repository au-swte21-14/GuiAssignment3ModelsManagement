import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== "Login" && !localStorage.getItem("token")) {
        // Not logged in
        next({
            path: "/login",
            params: {nextUrl: to.fullPath},
        });
    } else if (to.name === "Login" && localStorage.getItem("token")) {
        // Already logged in
        next({
            path: "/",
            params: {nextUrl: to.fullPath},
        });
    } else {
        next();
    }
})

export default router
