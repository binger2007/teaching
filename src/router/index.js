import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import layout from '@/components/Layout/Index'
import studentManage from '@/components/StudentManage/Index'
import subjectManage from '@/components/SubjectManage/Index'
import departmentManage from '@/components/DepartmentManage/Index'
import termManage from '@/components/termManage/Index'
import userManage from '@/components/UserManage/Index'
// //处理点击相同路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)
//根据用户权限去筛选路由，用户分2类，utype=0,为超级管理员，不受权限限制。当utype=1时，需要过滤路由，由路由的meta信息requiresAuth值确定
export default new Router({
  routes: [{
      path: '/login',
      component: login
    },
    {
      path: '/admin',
      component: layout,
      children: [{
        path: 'studentManage',
        component: studentManage,
        meta: {
          title: '学员管理',
          requiresAuth: false
        }
      }, {
        path: 'subjectManage',
        component: subjectManage,
        meta: {
          title: '学科管理',
          requiresAuth: false
        }
      }, {
        path: 'departmentManage',
        component: departmentManage,
        meta: {
          title: '单位管理',
          requiresAuth: true
        }
      }, {
        path: 'termManage',
        component: termManage,
        meta: {
          title: '期班管理',
          requiresAuth: true
        }
      }, {
        path: 'userManage',
        component: userManage,
        meta: {
          title: '用户管理',
          requiresAuth: true
        }
      }, {
        path: '*',
        meta: {
          title: '学员管理',
          requiresAuth: false
        },
        component: studentManage //默认显示学员管理界面
      }]
    }
  ]
})
