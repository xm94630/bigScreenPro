import Vue from 'vue';
import VueRouter from 'vue-router';
import pageA from './pages/a.vue';
import pageB from './pages/b.vue';
import pageIndex from './pages/xm.vue';

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        component:pageIndex
    },{
        path:'/pagea',
        component:pageA
    },{
        path:'/pageb',
        component:pageB
    }
]

const router = new VueRouter({
    routes
})

export default router

