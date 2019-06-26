import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import calendar from '@/components/calendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: calendar
    },
    {
      path: 'helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
