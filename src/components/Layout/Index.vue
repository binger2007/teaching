<template>
  <el-container style="height: 100vh;">
    <el-aside width="220px" style="background-color: #304156">
      <router-link to="/admin" class="logo">
        <img src="../../assets/img/logo.png" alt />
        <h1>疫情监控系统</h1>
      </router-link>
      <asideMenu></asideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(item, index) in this.$store.state.breadcrumbItems"
            :key="index"
            >{{ item }}</el-breadcrumb-item
          >
        </el-breadcrumb>
        <ul class="userInfo">
          <li>
            <i class="el-icon-thirdwode1"></i>
            您好，{{ userName }} 【{{ utype }}-{{ departmentName }}】
          </li>
          <li>
            <i class="el-icon-setting"></i>
            <a style="cursor: pointer;" @click="changePass()">修改密码</a>
          </li>
          <li>
            <i class="el-icon-thirdtuichu"></i>
            <a @click="logout" style="cursor: pointer;">退出</a>
          </li>
        </ul>
      </el-header>
      <el-main style="padding:35px;">
        <router-view v-if="isRouterShow" />
      </el-main>
    </el-container>
    <!-- 修改密码 -->
    <resetPass ref="resetPass"></resetPass>
  </el-container>
</template>

<script>
import resetPass from "@/components/Layout/ResetPass";
import asideMenu from "@/components/Layout/AsideMenu";
export default {
  name: "layout",
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    resetPass,
    asideMenu
  },
  data() {
    return {
      userType: sessionStorage.getItem("uType"),
      userName: "",
      utype: "",
      departmentId: "",
      departmentName: "",
      isRouterShow: true
    };
  },
  computed: {},
  mounted() {
    if (!sessionStorage.getItem("uName")) {
      this.$router.push("/login");
    } else {
      this.userName = sessionStorage.getItem("uName");
      this.utype = sessionStorage.getItem("uType");
      this.departmentId = sessionStorage.getItem("departmentId");
      this.departmentName = sessionStorage.getItem("departmentName");
    }
  },
  methods: {
    async reload() {
      this.isRouterShow = false;
      await this.$nextTick();
      this.isRouterShow = true;
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    handleSelect(key, keyPath) {
      this.$store.commit("changeActiveIndex", key);
    },
    changePass() {
      this.$refs.resetPass.dialogVisible = true;
      this.$refs.resetPass.ruleForm.pass = "";
      this.$refs.resetPass.ruleForm.checkPass = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  position: relative;
  background-color: #fff;
  color: #333;
  font-size: 14px;
  height: 60px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
}

.el-aside {
  color: #333;
}

.el-breadcrumb {
  /* margin-top: 30px; */
  line-height: 60px;
}

.userInfo {
  position: absolute;
  right: 40px;
  top: 0px;
}
.userInfo li {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  padding: 0px 8px;
}

.logo {
  position: relative;
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #2b2f3a;
  margin-bottom: 20px;
}
.logo img {
  position: absolute;
  width: 32px;
  height: 32px;
  left: 10px;
  top: 14px;
}
.logo h1 {
  line-height: 60px;
  margin-left: 50px;
  color: #fff;
}
</style>
