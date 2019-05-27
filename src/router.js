import Vue from 'vue';
import VueRouter from 'vue-router';
//import pageA from './pages/a.vue';
//import pageB from './pages/b.vue';
import createBigScreen from './pages/createBigScreen.vue';
import pageIndex from './pages/indexPage.vue';
import myReport from './pages/myReport.vue';
import pageIndexDashboard from './pages/indexPage_dashboard.vue';
import pageIndexBigScreen from './pages/indexPage_bigScreen.vue';


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
          ]
        },
        {path:'/createBigScreen',component:createBigScreen},
        {path:'/myReport',component:myReport}
    ],
})

export default router

