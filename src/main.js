import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
//设置axios默认地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//axios请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
}, function (error) {
  console.log(error)
})
//将axios挂在到Vue实例原型中去
Vue.prototype.$http = axios

//关闭控制台提示信息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
