import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import ZkTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', ZkTable)
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
//定义全局过滤器/过滤时间格式
Vue.filter('dateFormate', function (time) {
  const fd = new Date(time)
  let y = fd.getFullYear();//年
  let m = (fd.getMonth() + 1 + '').padStart(2, '0');//月
  let d = (fd.getDay() + '').padStart(2, '0');//日
  let hh = (fd.getHours() + '').padStart(2, '0');//时
  let mm = (fd.getMinutes() + '').padStart(2, '0');//分
  let ss = (fd.getSeconds() + '').padStart(2, '0');//秒
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
