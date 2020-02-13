import Vue from "vue";
import Router from "vue-router";
import login from "@/components/login";
import memberLogin from "@/components/memberLogin";
import member from "@/components/member/Index";
import regMember from "@/components/member/Reg";

import layout from "@/components/Layout/Index";
import ansys from "@/components/ansys/Index";
import personManage from "@/components/personManage/Index";
import auditPerson from "@/components/auditPerson/Index";
import addPerson from "@/components/addPerson/Index";
import departmentPerformance from "@/components/departmentPerformance/Index";
import infoSetting from "@/components/infoSetting/Index";
import setDuty from "@/components/infoSetting/setDuty";
import situations from "@/components/infoSetting/situations";
import notices from "@/components/infoSetting/notices";
import mustKnow from "@/components/infoSetting/mustKnow";
import knowledge from "@/components/infoSetting/knowledge";
import showPic from "@/components/infoSetting/showPic";
import departmentManage from "@/components/DepartmentManage/Index";
import termManage from "@/components/termManage/Index";
import userManage from "@/components/UserManage/Index";

// //处理点击相同路由报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);
//根据用户权限去筛选路由，用户分2类，utype=0,为超级管理员，不受权限限制。当utype=1时，需要过滤路由，由路由的meta信息requiresAuth值确定
export default new Router({
  routes: [
    {
      path: "/login",
      component: login
    },
    {
      path: "/memberLogin",
      component: memberLogin
    },
    {
      path: "/admin",
      component: layout,
      children: [
        {
          path: "ansys",
          component: ansys,
          meta: {
            title: "疫情分析",
            requiresAuth: false,
            icon: "el-icon-pie-chart"
          }
        },
        {
          path: "personManage",
          component: personManage,
          meta: {
            title: "人员管理",
            requiresAuth: false,
            icon: "el-icon-s-custom"
          }
        },

        {
          path: "auditPerson",
          component: auditPerson,
          meta: {
            title: "审核人员",
            requiresAuth: false,
            icon: "el-icon-plus"
          }
        },
        // {
        //   path: "addPerson",
        //   component: addPerson,
        //   meta: {
        //     title: "添加人员",
        //     requiresAuth: false,
        //     icon: "el-icon-plus"
        //   }
        // },
        // {
        //   path: "departmentPerformance",
        //   component: departmentPerformance,
        //   meta: {
        //     title: "单位评估",
        //     requiresAuth: false,
        //     icon: "el-icon-star-on"
        //   }
        // },
        // {
        //   path: "infoSetting",
        //   component: infoSetting,
        //   meta: {
        //     title: "内容设置",
        //     requiresAuth: false,
        //     icon: "el-icon-setting"
        //   },
        //   children: [
        //     {
        //       path: "setDuty",
        //       component: setDuty,
        //       meta: {
        //         title: "值班信息",
        //         requiresAuth: false,
        //         icon: null
        //       }
        //     },
        //     {
        //       path: "situations",
        //       component: situations,
        //       meta: {
        //         title: "检查情况",
        //         requiresAuth: false,
        //         icon: null
        //       }
        //     },
        //     {
        //       path: "notices",
        //       component: notices,
        //       meta: {
        //         title: "通知公告",
        //         requiresAuth: false,
        //         icon: null
        //       }
        //     },
        //     {
        //       path: "mustKnow",
        //       component: mustKnow,
        //       meta: {
        //         title: "应知应会",
        //         requiresAuth: false,
        //         icon: null
        //       }
        //     },
        //     {
        //       path: "knowledge",
        //       component: knowledge,
        //       meta: {
        //         title: "理论学习",
        //         requiresAuth: false,
        //         icon: null
        //       }
        //     },
        //     {
        //       path: "showPic",
        //       component: showPic,
        //       meta: {
        //         title: "图片展示",
        //         requiresAuth: false,
        //         icon: null
        //       }
        //     }
        //   ]
        // },
        {
          path: "departmentManage",
          component: departmentManage,
          meta: {
            title: "机构管理",
            requiresAuth: false,
            icon: "el-icon-menu"
          }
        },
        {
          path: "userManage",
          component: userManage,
          meta: {
            title: "用户管理",
            requiresAuth: false,
            icon: "el-icon-user"
          }
        },
        {
          path: "",
          meta: {
            title: "默认显示",
            requiresAuth: false
          },
          component: personManage //默认显示学员管理界面
        }
      ]
    },
    {
      path: "/member",
      component: member
    },
    {
      path: "/regMember",
      component: regMember
    }
  ]
});
