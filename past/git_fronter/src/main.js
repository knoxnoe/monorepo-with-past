import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './plugins/element.js'
import showdown from 'showdown'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import http from './utils/request'
import VueAxios from 'vue-axios'


import './permission'
import Storage from 'vue-ls';

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

let options = {
  namespace: 'vuejs__', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
};

Vue.use(Storage, options)


Vue.prototype.md2html = (md)=> {
  let converter = new showdown.Converter()
  let text = md.toString()
  let html = converter.makeHtml(text)
  return html
}

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueAxios, http)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
