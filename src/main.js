import Vue from 'vue'
import router from './router'
import App from './APP.vue'
import './assets/css/global.css'
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'


import CKEditor from 'ckeditor4-vue';

Vue.use(CKEditor);
Vue.use(ElementUI);

//设置axios默认请求路径
axios.defaults.baseURL = 'http://fanyi.xmint.cn/'
//请求拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  //为请求头添加token字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
//响应拦截器
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios
Vue.prototype.$Message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
