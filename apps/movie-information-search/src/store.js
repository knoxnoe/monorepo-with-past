import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var VueCookie = require('vue-cookie')

const BaseConfig = {//一些全局变量（关于配置...）
  namespaced: true,
  state: {
    httpsUrl: 'http://editme.top:8000',
    loadListNum: 10
  },
  mutations: {},
  getters: {},
  actions: {}
}

const UserState = {//登陆用户状态管理
  namespaced: true,
  state: {
    logonStatus: false,
    token: '',
    username: '',
    currentSearchText: VueCookie.get('currentSearchText'),
    searchStyle: VueCookie.get('searchStyle'),
    subName: VueCookie.get('subName'),
  },
  mutations: {
    judgeLogonStatus(state) {
      if (!VueCookie.get('token') || VueCookie.get('token') == 'false') {
        state.logonStatus = false
      } else {
        state.token = VueCookie.get('token')
        state.username = VueCookie.get('username')
        state.logonStatus = true
      }
    },
    removeLogonStatus(state) {
      state.token = ''
      state.username = ''
      state.logonStatus = false
    }
  },
  getters: {},
  actions: {}
}

const PageState = {//页面状态管理
  namespaced: true,
  state: {
    hashUrl: VueCookie.get('hashUrl')//'/'
  },
  mutations: {
    saveHashUrl(state, hash) {
      state.hashUrl = hash
      VueCookie.set('hashUrl', hash, 1)
    }
  },
  getters: {},
  actions: {}
}

export default new Vuex.Store({
  modules: {
    BaseConfig: BaseConfig,
    UserState: UserState,
    PageState: PageState
  }
})
