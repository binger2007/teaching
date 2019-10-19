<template>
  <el-menu
    background-color="#304156"
    text-color="#fff"
    active-text-color="#1890ff"
    class="mydiy"
    @select="handleSelect"
  >
    <div v-for="(item) in menus" :key="item.meta.title">
      <el-menu-item :index="item.path">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>
<script>
import { getCookie } from "../../assets/js/cookie.js";
export default {
  name: "asideMenu",
  data() {
    return {
      menus: [],
      flag: true
    };
  },
  mounted() {
    this.filterRoutes();
  },
  methods: {
    //根据用户权限去筛选路由，用户分2类，utype=0,为超级管理员，不受权限限制。当utype=1时，需要过滤路由，由路由的meta信息requiresAuth值确定
    filterRoutes() {
      var utype = getCookie("utype");
      if (utype != 0) {
        this.$router.options.routes[1].children.forEach((ele, index) => {
          if (!ele.meta.requiresAuth) {
            this.menus.push(ele);
          }
        });
      } else {
        this.menus = this.$router.options.routes[1].children;
      }
      this.menus.pop();
    },
    handleSelect(key) {
      this.$router.push("/admin/" + key);
      this.menus.forEach(ele => {
        if (ele.path == key) {
          this.$store.state.breadcrumbItems = [ele.meta.title];
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mydiy {
  border-right: none;
  height: calc(100vh - 60px);
  overflow-y: auto;
}

::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  outline: 2px solid #304156;
  border: 2px solid #304156;
}

::-webkit-scrollbar-track-piece {
  background-color: #304156; /*滚动条的背景颜色*/
}
</style>
