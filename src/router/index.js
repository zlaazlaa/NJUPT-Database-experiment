import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Ticket from '@/views/Ticket'
import Search from '@/views/SearchTicket'
import Main from '@/views/Main'
import Login from '@/views/Login'
import Manage from '@/views/Manage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Main
    }, {
      path: '/ticket',
      name: 'ticket',
      component: Ticket
    }, {
      path: '/search',
      name: 'search',
      component: Search
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
    }
  ]
})
