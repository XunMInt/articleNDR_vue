import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/login.vue')
const Home = () => import('../components/home.vue')
const classity = () => import('../components/admin/classity.vue')
const article = () => import('../components/admin/alerticle.vue')
const addArticle = () => import('../components/admin/addAlerticle.vue')
const editorArticle = () => import('../components/admin/editorAlerticle.vue')
const rotation = () => import('../components/admin/rotation.vue')
const account = () => import('../components/admin/account.vue')
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/classity' },
  {
    path: '/home', component: Home, redirect: '/classity', children: [
      { path: '/classity', component: classity },
      { path: '/article', component: article },
      { path: '/addArticle', component: addArticle },
      { path: '/editorArticle', component: editorArticle },
      { path: '/rotation', component: rotation },
      { path: '/account', component: account }
    ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
