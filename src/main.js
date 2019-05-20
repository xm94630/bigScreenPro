import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/main.css'
import './assets/css/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'


import store from '@/src/store'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  store,
  router,
}).$mount('#app')


