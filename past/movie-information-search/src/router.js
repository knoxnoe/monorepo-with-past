import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/bookMark',
      name: 'bookMark',
      component: () => import('./views/UserBookMark.vue')
    },
    {
      path: '/find',
      name: 'find',
      component: () => import('./views/Find.vue')
    },
    {
      path: '/concern',
      name: 'concern',
      component: () => import('./views/UserConcern.vue')
    },
    {
      path: '/res',
      name: 'res',
      component: () => import('./views/SearchRes.vue')
    },
    {
      path: '/myEssay',
      name: 'myEssay',
      component: () => import('./views/myEssay.vue')
    },
    {
      path: '/subArticle',
      name: 'subArticle',
      component: () => import('./views/sub/subUserArticles.vue')
    },
    {
      path: '/subBookMark',
      name: 'subBookMark',
      component: () => import('./views/sub/subUserBookMark.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('./views/sub/article.vue')
    }
  ]
})
