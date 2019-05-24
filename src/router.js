import Vue from 'vue';
import VueRouter from 'vue-router';
import pageA from './pages/a.vue';
import pageB from './pages/b.vue';
import createBigScreen from './pages/createBigScreen.vue';
import pageIndex from './pages/indexPage.vue';
import myReport from './pages/myReport.vue';


Vue.use(VueRouter)

const Foo = { template: `<div class="foo"><h1>foo</h1></div>` }
const Bar = { template: `<div class="bar"><h1>bar</h1></div>` }

const childRouter = new VueRouter({
  mode: 'abstract',
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})



const router = new VueRouter({
    routes:[
        { 
          path: '/nested-router', 
          component: {
            router: childRouter,
            template: `<div class="child">
                <p>Child router path: {{ $route.fullPath }}</p>
                <ul>
                    <li><router-link to="/foo">/foo</router-link></li>
                    <li><router-link to="/bar">/bar</router-link></li>
                </ul>
                <router-view/>
                </div>`
          } 
        },
        {path:'/',component:pageIndex},
        {path:'/pagea',component:pageA},
        {path:'/pageb',component:pageB},
        {path:'/createBigScreen',component:createBigScreen},
        {path:'/myReport',component:myReport}
    ],
})

export default router

