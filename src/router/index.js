import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import admin from '@/components/admin'
import help from '@/components/help'
import articleManage from '@/components/articleManage/Index.vue'
import EditArticle from '@/components/articleManage/EditArticle.vue'
import ShowArticle from '@/components/articleManage/ShowArticle.vue'
import classManage from '@/components/classManage/Index.vue'
import departmentManage from '@/components/departmentManage/Index.vue'
import userManage from '@/components/userManage/Index.vue'
import frontPageIndex from '@/components/frontPage/Index.vue'

Vue.use(Router)
const scrollBehavior = function (to, from, savedPosition) {
  if (to.hash) {
    return {
      // 通过 to.hash 的值來找到对应的元素
      selector: to.hash
    }
  }
}
export default new Router({
  routes: [{
      path: '/login',
      component: login
    },
    {
      //前台首页
      path: '/index',
      component: frontPageIndex
    },
    {
      //前台首页
      path: '/',
      component: frontPageIndex
    },
    {
      path: '/admin',
      component: admin,
      children: [{
        path: '',
        component: index
      }, {
        path: 'articleManage',
        component: articleManage
      }, {
        path: 'editArticle',
        component: EditArticle
      }, {
        path: 'showArticle',
        component: ShowArticle
      }, {
        path: 'help',
        component: help
      }, {
        path: 'classManage',
        component: classManage
      }, {
        path: 'departmentManage',
        component: departmentManage
      }, {
        path: 'userManage',
        component: userManage
      }]
    }
  ],
  // mode: 'history',
  // base: '/index',
  scrollBehavior
})
