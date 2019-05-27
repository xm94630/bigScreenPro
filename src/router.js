import Vue from 'vue';
import VueRouter from 'vue-router';
//import pageA from './pages/a.vue';
//import pageB from './pages/b.vue';
import createBigScreen from './pages/createBigScreen.vue';
import pageIndex from './pages/indexPage.vue';
import myReport from './pages/myReport.vue';
import pageIndexDashbord from './pages/indexPage_dashbord.vue';
import pageIndexBigScreen from './pages/indexPage_bigScreen.vue';


Vue.use(VueRouter)


const router = new VueRouter({
    routes:[
        {path:'/',redirect: '/index/posts'},
        {
          path:'/index',
          component:pageIndex,
          children: [
            {path: 'profile',component: pageIndexDashbord},
            {path: 'posts',component: pageIndexBigScreen}
          ]
        },
        {path:'/createBigScreen',component:createBigScreen},
        {path:'/myReport',component:myReport}
    ],
})

export default router

