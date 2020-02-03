<template>
  <el-menu
    background-color="#304156"
    text-color="#fff"
    active-text-color="#1890ff"
    class="mydiy"
    @select="handleSelect"
    :default-openeds="openeds"
  >
    <div v-for="item in menus" :key="item.meta.title">
      <el-menu-item v-if="!item.children && item.path" :index="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
      <el-submenu :index="item.path" v-if="item.children && item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </template>
        <div v-for="subitem in item.children" :key="subitem.meta.title">
          <el-menu-item :index="item.path + '/' + subitem.path">{{
            subitem.meta.title
          }}</el-menu-item>
        </div>
      </el-submenu>
    </div>
  </el-menu>
</template>
<script>
export default {
  name: "asideMenu",
  data() {
    return {
      menus: [],
      flag: true,
      openeds: ["infoSetting"]
    };
  },
  mounted() {
    this.filterRoutes();
  },
  methods: {
    //根据用户权限去筛选路由，用户分2类，utype=0,为超级管理员，不受权限限制。当utype=1时，需要过滤路由，由路由的meta信息requiresAuth值确定
    filterRoutes() {
      var utype = sessionStorage.getItem("uType");
      if (utype != "管理员") {
        this.$router.options.routes[1].children.forEach((ele, index) => {
          if (!ele.meta.requiresAuth) {
            this.menus.push(ele);
          }
        });
      } else {
        this.menus = this.$router.options.routes[1].children;
      }
      // this.menus.pop();
    },
    handleSelect(key) {
      this.$router.push("/admin/" + key);
      var k;
      if (key.indexOf("/") == "-1") {
        k = key;
      } else {
        var arr = key.split("/");
        k = arr[0];
      }
      this.menus.forEach(ele => {
        if (ele.path == k) {
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
