import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/login',
        component: () => import('../pages/login.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../pages/about.vue')
    },
    {
        path: '/guide',
        name: 'guide',
        component: () => import('../pages/guide.vue')
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../pages/contact.vue')
    },
    {
        path: '/AI',
        name: 'AI',
        component: () => import('../pages/AI.vue'),
        // meta: { isAuth: true }
    },
    {
        path: '/queryS',
        name: 'queryS',
        component: () => import('../pages/queryS.vue')
    },
    {
        path: '/queryT',
        name: 'queryT',
        component: () => import('../pages/queryT.vue')
    },
]

const router = createRouter({
    // mode: "hash",
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// router.beforeEach((to, from, next) => {
//     if (to.meta.isAuth) {
//         console.log('需要权限');
//     }
//     next()
// })

export default router;