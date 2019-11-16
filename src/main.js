import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import ZkTable from 'vue-table-with-tree-grid'
Vue.component('tree-table', ZkTable)
import axios from 'axios'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

  //设置axios默认地址
  axios.defaults.baseURL = process.env.VUE_APP_BASE_URL


//axios请求拦截器
axios.interceptors.request.use(function (config) {
  NProgress.start();
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
}, function (error) {
  console.log(error)
})

//响应拦截
//axios响应拦截器
axios.interceptors.response.use(function(config){
  NProgress.done();
  return config;
},function(error){
  console.log(error)
})
//将axios挂在到Vue实例原型中去
Vue.prototype.$http = axios

//关闭控制台提示信息
Vue.config.productionTip = false
//定义全局过滤器/过滤时间格式
Vue.filter('dateFormate', function (time) {
  const date = time / 1000
  const fd = new Date(date)
  let y = fd.getFullYear();//年
  let m = (fd.getMonth() + 1 + '').padStart(2, '0');//月
  let d = (fd.getDay() + '').padStart(2, '0');//日
  let hh = (fd.getHours() + '').padStart(2, '0');//时
  let mm = (fd.getMinutes() + '').padStart(2, '0');//分
  let ss = (fd.getSeconds() + '').padStart(2, '0');//秒
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
