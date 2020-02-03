// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/style0/theme/index.css'

import App from './App'
import router from './router'

import Axios from 'axios'
import qs from 'qs'
import './assets/icon/eleDepartmentIcon/iconfont.css'
import './assets/icon/eleThirdIcon/iconfont.css'
import echarts from 'echarts'
import md5 from 'js-md5';
import {
  showLoading,
  hideLoading
} from './assets/js/loading';
import store from './store';

var axios_instance = Axios.create({
  // config里面有这个transformRquest， 这个选项会在发送参数前进行处理。# 这时候我们通过Qs.stringify转换为表单查询参数
  transformRequest: [function (data) {
    data = qs.stringify(data);
    return data;
  }],
  // 设置Content - Type
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  baseURL: '/api'
})

Vue.config.productionTip = false

/* 请求拦截器（请求之前的操作） */
axios_instance.interceptors.request.use((req) => {
  showLoading();
  return req;
}, err => Promise.reject(err));

/* 请求之后的操作 */
axios_instance.interceptors.response.use((res) => {
  hideLoading();
  return res;
}, (err) => {
  hideLoading();
  alert("请求超时！");
  return Promise.reject(err);
});
Vue.prototype.$Axios = axios_instance;
Vue.prototype.$echarts = echarts;
Vue.prototype.$md5 = md5;



Vue.use(ElementUI)
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
