import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import picmark from '@/components/picmark'
import vuepicmark from '@/components/vuepicmark'


Vue.use(Router)

export default new Router({
  routes: [
    {
      // http://localhost:8080/#/HelloWorld
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      // http://localhost:8080/#/picmark
      path: '/picmark',
      name: 'picmark',
      component: picmark
    },
    {
      path: '/vuepicmark',
      name: 'vuepicmark',
      component: vuepicmark
    },
    {
      // 重定向
      path: '/', 
      redirect: '/HelloWorld' 
    }
  ]
})
