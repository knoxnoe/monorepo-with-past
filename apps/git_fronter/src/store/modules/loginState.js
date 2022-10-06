import { login } from '@/api/login'
import Vue from 'vue'

const loginState = {
  state: {
    username: ""
  },
  mutations: {
    SET_TOKEN: (state, name) => {
      state.username = name;
    },
    LOGIN_OUT: (state) => {
      state.username = "";
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {

            if(response.status === 0) {
              console.log(JSON.parse(userInfo))
              const user = JSON.parse(userInfo);
              const res = response.data;
              const name = user.nickname;
              Vue.ls.set("access_token", res.access_token);
              Vue.ls.set("username", name);
              commit('SET_TOKEN', name);
              resolve(response);
            }
        })
          .catch(error => {
            console.log("error" + error)
            reject(error)
          })
      })
    },
    LoginOut({ commit }) {
      commit('LOGIN_OUT');
      Vue.ls.remove("username")
      Vue.ls.remove("access_token")
    }
  }
}


export default loginState;