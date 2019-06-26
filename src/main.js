// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/base.css'
import * as customFilter from './filters/filter'

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = { threshold: 100 }

Vue.config.productionTip = false

// 导出的是对象，可以直接通过key和value来获得过滤器的名和过滤器的方法
Object.keys(customFilter).forEach(key => {
  Vue.filter(key, customFilter[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
