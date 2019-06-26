import Vue from 'vue';
import VueRouter from 'vue-router';
//import pageA from './pages/a.vue';
//import pageB from './pages/b.vue';
import createBigScreen from './pages/createBigScreen.vue';
import createBigScreen2 from './pages/createBigScreen2.vue';
import pageIndex from './pages/indexPage.vue';
import myReport from './pages/myReport.vue';
import pageIndexDashboard from './pages/indexPage_dashboard.vue';
import pageIndexBigScreen from './pages/indexPage_bigScreen.vue';
import bus from '@/src/tools/bus.js';

Vue.use(VueRouter)


const router = new VueRouter({
    routes:[
        {path:'/',redirect: '/index/bigscreen'},
        {
          path:'/index',
          component:pageIndex,
          children: [
            {path: 'bigscreen',component: pageIndexBigScreen},
            {path: 'dashboard',component: pageIndexDashboard},
          ],
          //前置守卫
          beforeEnter:function (to, from, next){
            bus.$off('widgetEvent');
            next();
          }
        },
        {path:'/createBigScreen',component:createBigScreen},
        {path:'/createBigScreen2',component:createBigScreen2},
        {path:'/myReport',component:myReport}
    ],
})


export default router

