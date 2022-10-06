import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
Vue.use(Router)

const a = Router.prototype.push;

Router.prototype.push =function push(location, onResolve, onReject) {

  if (onResolve || onReject)return a.call(this, location, onResolve, onReject);

  return a.call(this, location).catch(err => err);
}

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'nologin',
      component: () => import('@v/NoLogin')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@v/MainPage')
    },
    {
      path: '/home/:user',
      name: 'home',
      meta: {
        requireAuth: true, // 判断是否需要登录
      },
      component: Home
    },
    {
      path: '/repodetail/*',
      name: 'repodetail',
      meta: {
        requireAuth: true, // 判断是否需要登录
      },
      component: () => import('@v/RepoDetail')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@v/Login')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/About.vue')
    }
  ]
})
