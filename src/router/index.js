import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Ticket from '@/views/Ticket'
// import Search from '@/views/SearchTicket'
import Main from '@/views/Main'
import Login from '@/views/Login.vue'
import Manage from '@/views/Manage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Main
    }, {
      path: '/main',
      name: 'main',
      component: Main
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/manage',
      name: 'manage',
      component: Manage
    }, {
      path: '/userinfo',
      name: 'userinfo',
      component: () => import('@/views/UserInfo.vue')
    }
  ]
})
