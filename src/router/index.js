import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Rights from '@/components/rights/Rights.vue'
import Roles from '@/components/rights/Roles.vue'
import Categories from '@/components/product/Categories.vue'
import Params from '@/components/product/Params.vue'
import Goods from '@/components/product/Goods.vue'
import Add from '@/components/product/Add.vue'
import Orders from '@/components/order/Orders.vue'
import Report from '@/components/reports/Report.vue'



Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home, redirect: '/welcome', children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Categories },
      { path: '/params', component: Params },
      { path: '/goods', component: Goods },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Orders },
      { path: '/reports', component: Report },
    ]
  },
]

const router = new VueRouter({
  routes
})

//本质就是改写了element内部的push方法
//对错误进行了捕获
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach(function (to, from, next) {
  //to表示将要访问的路劲
  //from代表从哪个路径跳转而来
  //next表示放行
  if (to.path == '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
