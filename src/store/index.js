import Vue from 'vue' //引入Vue
import Vuex from 'vuex' //引入Vuex
//使用Vuex
Vue.use(Vuex);
//创建Vuex实例
const store = new Vuex.Store({
  state: {
    //面包屑导航
    breadcrumbItems: ["学员管理"]
    // activeIndex: "1",
    // initAddArticle: {},
    // //文本编辑器里面的内容
    // content: ""
  },
  mutations: {
    // initAddArticle(state, data) {
    //   state.initAddArticle = data;
    // },
    // changeActiveIndex(state, index) {
    //   state.activeIndex = index;
    // },
    // getContent(state, content) {
    //   state.content = content;
    // }

  }

})
//导出store
export default store;
