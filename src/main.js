// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import md5 from 'js-md5'
import {
  Loading,
  Message
} from 'element-ui';
import echarts from 'echarts'
//引入vue-preview
import VuePreview from 'vue-preview'
import Router from 'vue-router'
import VueCropper from 'vue-cropper'
// Vue.component('AppBreadcrumb', AppBreadcrumb) // 注册全局面包屑组件
Vue.use(VueCropper)
Vue.use(ElementUI)
Vue.use(VuePreview)
Vue.use(Router)
//级联选择器多选配置
import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS
Vue.use(iView)
import cascaderMulti from "cascader-multi";
Vue.use(cascaderMulti);
Vue.prototype.$http = axios
Vue.prototype.$md5 = md5
import 'element-ui/lib/theme-chalk/index.css'
//全局引入iconfont
import '../static/font-icon/iconfont.css'
// 导入自定义全局样式
import './assets/css/index.css'
Vue.config.productionTip = false
//loading
let loading //定义loading变量
function startLoading() { //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  })
}
function endLoading() { //使用Element loading-close 方法
  loading.close()
}
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
// 配置axios请求拦截器
axios.interceptors.request.use(function (config) {
    // config.headers['token'] = window.sessionStorage.getItem('token')
    config.headers['orgType'] = window.sessionStorage.getItem('orgType')
    // config.headers['userType'] = window.sessionStorage.getItem('userType')
    config.headers['id'] = window.sessionStorage.getItem('id')
    config.headers['orgid'] = window.sessionStorage.getItem('orgid')
    // this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'red'
    // })
    // setTimeout(() => {
    //   loading.close();
    // }, 2000);
    // config.headers.set("Access-Control-Allow-Origin","*")
    // config.headers['Cookie'] = ""
    if (window.sessionStorage.getItem('id')) {

    //   config.data = { 
    //     ...config.data, 
    //     orgId:"123"
    // } 
    }
    showFullScreenLoading()
    return config
  }),
  function (error) {
    return Promise.reject(error)
  }
// http response 拦截器
axios.interceptors.response.use(function (response) {
    tryHideFullScreenLoading()
    return response;
  },
  function (error) {
    tryHideFullScreenLoading()
    if (error.response.status == 401) {
      confirm('需要登陆再访问')
      router.replace({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
      return false
    }
    return Promise.reject(error.response.msg)
  });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
