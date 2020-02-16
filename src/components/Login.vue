<template>
  <div class="wrap">
    <div class="code">
      <img src="../../static/img/code.jpg" alt="" />
      <div>
        微信扫描二维码，关注公众号，上报疫情数据
      </div>
    </div>
    <h1>疫情监控系统（管理员登录）</h1>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>管理员登录</span>
      </div>
      <el-form
        :model="loginRuleForm"
        status-icon
        :rules="loginRules"
        ref="loginRuleForm"
        label-width="100px"
      >
        <el-form-item prop="userName" label="用户名">
          <el-input
            v-model="loginRuleForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item prop="pass" label="密码">
          <el-input
            type="password"
            v-model="loginRuleForm.pass"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="选择单位" prop="department">
          <el-cascader
            :options="departmentData"
            :props="{ checkStrictly: true }"
            @change="handleChangeDepartment"
          ></el-cascader>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginRuleForm')"
            >登陆</el-button
          >
          <el-button @click="resetForm('loginRuleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <el-link
        type="danger"
        style="text-align: center;width:100%;"
        href="https://www.google.cn/chrome/"
        >如果您无法登录后台或显示有问题，请点击下载下载谷歌</el-link
      >
    </el-card>
  </div>
</template>
<script>
// import { generateOptions } from "../assets/js/public";
// import { setCookie } from "../assets/js/cookie.js";
export default {
  name: "login",
  data() {
    return {
      loginRuleForm: {
        userName: "",
        pass: ""
        // department: ""
      },
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
        // department: [
        //   { required: true, message: "请选择用户类型", trigger: "change" }
        // ]
      }
      // departmentData: []
    };
  },
  mounted() {
    // this.loadDepartment();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginRuleForm.pass = this.$md5(this.loginRuleForm.pass);
          this.$Axios
            .post("handle_user/checkLogin", this.loginRuleForm)
            .then(res => {
              if (!res.data) {
                this.$message({
                  message: "登陆失败，用户或密码错误！",
                  type: "warning"
                });
              } else {
                // setCookie("userName", res.data.uname, 1000 * 60);
                sessionStorage.clear();
                sessionStorage.setItem("uName", res.data.uname);
                sessionStorage.setItem("uType", res.data.utype);
                sessionStorage.setItem("uId", res.data.id);
                sessionStorage.setItem(
                  "departmentId",
                  res.data.department ? res.data.department.id : 0
                );
                sessionStorage.setItem(
                  "departmentName",
                  res.data.department ? res.data.department.label : "未知"
                );
                this.$router.push("/admin");
              }
            });
        } else {
          return false;
        }
      });
    },
    //加载分类信息
    // loadDepartment() {
    //   this.$Axios
    //     .post("handle_department/loadDepartment", {
    //       departmentId: 0
    //     })
    //     .then(res => {
    //       this.departmentData = generateOptions(res.data);
    //     });
    // },
    handleChangeDepartment(value) {
      this.loginRuleForm.department = value[value.length - 1];
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #409eff;
}
.wrap {
  width: 100vw;
  /* height: 90vh; */
  padding-top: 120px;
  /* background-color: #f2f6fc; */
}
.box-card {
  width: 500px;
  margin-left: calc(50vw - 250px);
  /* height: 400px; */
}
.code {
  text-align: center;
  margin-bottom: 30px;
}
.code img {
  height: 150px;
}
</style>
