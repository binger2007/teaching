<template>
  <div class="wrap">
    <h1>疫情监控系统（会员登录）</h1>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>会员登录</span>
        <router-link
          style="float: right; padding: 3px 0;color: #409eff;"
          to="/login"
          >管理员登录</router-link
        >
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
        <el-form-item label="选择单位" prop="department">
          <el-cascader
            :options="departmentData"
            :props="{ checkStrictly: true }"
            @change="handleChangeDepartment"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginRuleForm')"
            >登陆</el-button
          >
          <el-button @click="resetForm('loginRuleForm')">重置</el-button>
          <el-button @click="reg()" type="success">注册会员</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { generateOptions } from "../assets/js/public";
import { setCookie } from "../assets/js/cookie.js";
export default {
  name: "memberLogin",
  data() {
    return {
      loginRuleForm: {
        userName: "",
        pass: "",
        department: ""
      },
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        department: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ]
      },
      departmentData: []
    };
  },
  mounted() {
    this.loadDepartment();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginRuleForm.pass = this.$md5(this.loginRuleForm.pass);
          this.$Axios
            .post("handle_user/checkMemberLogin", this.loginRuleForm)
            .then(res => {
              if (!res.data) {
                this.$message({
                  message: "登陆失败，用户或密码错误！",
                  type: "warning"
                });
              } else {
                sessionStorage.clear();
                sessionStorage.setItem("mName", res.data.name);
                sessionStorage.setItem("mId", res.data.Id);
                sessionStorage.setItem("mDepartmentId", res.data.department_id);
                sessionStorage.setItem("mDepartmentName", res.data.label);
                this.$router.push("/member");
              }
            });
        } else {
          return false;
        }
      });
    },
    //加载分类信息
    loadDepartment() {
      this.$Axios
        .post("handle_department/loadDepartment", {
          departmentId: 0
        })
        .then(res => {
          this.departmentData = generateOptions(res.data);
        });
    },
    handleChangeDepartment(value) {
      this.loginRuleForm.department = value[value.length - 1];
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //跳转到注册页面
    reg() {
      this.$router.push("/regMember");
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
  height: calc(50vh + 200px);
  padding-top: calc(50vh - 200px);
  background-color: #f2f6fc;
}
.box-card {
  width: 500px;
  margin-left: calc(50vw - 250px);
  /* height: 400px; */
}
</style>
