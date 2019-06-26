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
          ]
        },
        {path:'/createBigScreen',component:createBigScreen},
        {path:'/createBigScreen2',component:createBigScreen2},
        {path:'/myReport',component:myReport}
    ],
})

//[全局前置守卫]
//这个功能不错啊。
//因为进入大屏，然后跳出，组件是不会被销毁的，所以事件也会存在。会导致我回到主页了，但是组件中的事件触发了！
//这里就把事件清空了！不会由此问题。
router.beforeEach((to, from, next) => {
  bus.$off('widgetEvent');
  next();
})

export default router

