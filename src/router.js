import Vue from 'vue';
import VueRouter from 'vue-router';
import createBigScreen from './pages/createBigScreen.vue';
import createBigScreen2 from './pages/createBigScreen2.vue';
import pageIndex from './pages/indexPage.vue';
import myReport from './pages/myReport.vue';
import pageIndexDashboard from './pages/indexPage_dashboard.vue';
import pageIndexBigScreen from './pages/indexPage_bigScreen.vue';
import pageIndexWidgetInstructions from './pages/indexPage_widgetInstructions.vue';
import test from './pages/test.vue';
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
        {path: 'widgetInstructions',component: pageIndexWidgetInstructions},
        {path: 'test',component: test},
      ]
    },
    {path:'/createBigScreen',component:createBigScreen},
    {path:'/createBigScreen2',component:createBigScreen2},
    {path:'/myReport',component:myReport}
  ],
})

//全局前置守卫
router.beforeEach((to, from, next)=>{
  next();
});

export default router