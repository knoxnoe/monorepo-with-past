import axios from 'axios'
import vars from './vars'
import { Notification} from "element-ui";
import Vue from 'vue'


axios.defaults.withCredentials = true

const http = axios.create({
  baseURL: vars.BASE_URL || process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = error => {
  if (error.response) {
    const data = error.response.data
    Notification({
      title: 'Error',
      message: data,
      type: 'error'
    })
  }
  return Promise.reject(error)
}


// request interceptor
http.interceptors.request.use(config => {

  config.headers['abc'] = Vue.ls.get('access_token');
  console.log(config)
  return config
}, err)

// response interceptor
http.interceptors.response.use(response => {
  console.log("接收res拦截器")
  return response.data
}, err)



export default http