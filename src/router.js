import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/Signup.vue')
    },
    {
      path: '/question',
      name: 'from-question',
      component: () => import('./components/FormQuestion.vue')
    }, 
    {
      path: '/answer/:id',
      name: 'answer',
      props: true,
      component: () => import('./components/FormAnswer.vue'),
    }
  ]
})