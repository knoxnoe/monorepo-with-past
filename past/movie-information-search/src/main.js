import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookie from 'vue-cookie'
import echarts from 'echarts'

Vue.use(ElementUI);
Vue.use(VueCookie);

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
