import { createRouter,createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        // redirect: '/login',
        //使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
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
        component: () => import('../views/AI.vue')
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
    mode: "hash",
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// 在这里调用导航守卫的钩子函数
router.beforeEach((to, from ) => {
  // ...
//   console.log('to',to);
//   console.log('from',from);
});

export default router;