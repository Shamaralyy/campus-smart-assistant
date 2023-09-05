import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/AI',
        name: 'AI',
        component: () => import('../views/AI.vue'),
        meta: { isAuth: true }
    },
    {
        path: '/queryS',
        name: 'queryS',
        component: () => import('../views/queryS.vue')
    },
    {
        path: '/queryT',
        name: 'queryT',
        component: () => import('../views/queryT.vue')
    },
]

const router = createRouter({
    // mode: "hash",
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    console.log('to', to);
    console.log('from', from);
    console.log('next', next);
    if(to.meta.isAuth) {
        console.log('需要权限');
    }
    next()
})

export default router;