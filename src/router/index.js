import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Ticket from '@/views/Ticket'
import Search from '@/views/SearchTicket'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/ticket',
      name: 'ticket',
      component: Ticket
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
