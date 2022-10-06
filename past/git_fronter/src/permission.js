import Vue from 'vue'
import router from './router'
import store from './store/'

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  console.log(store)
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if (Vue.ls.get("access_token", null)) { // 判断当前的token是否存在 ； 登录存入的token
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});