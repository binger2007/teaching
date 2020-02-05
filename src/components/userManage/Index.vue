<template>
  <div>
    <div style="width: 100%;">
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="width: 100%;"
        @click="openAddDialog()"
        >添加用户</el-button
      >
    </div>
    <el-table
      :data="userTableData"
      stripe
      style="width: 100%;margin: 30px auto;"
    >
      <el-table-column type="index" align="center" width="50"></el-table-column>
      <el-table-column
        prop="uname"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="utype"
        label="类别"
        align="center"
      ></el-table-column>
      <el-table-column prop="departmentPath" label="管理单位"></el-table-column>

      <el-table-column label="最后登陆时间" width="220" align="center">
        <template slot-scope="scope">
          {{ timestampToTime(scope.row.last_login_time) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="last_login_ip"
        label="最后登陆IP"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="360">
        <template slot-scope="scope">
          <el-button
            @click="resetPwd(scope.row)"
            type="primary"
            size="small"
            icon="el-icon-setting"
            >重置密码</el-button
          >
          <el-button
            @click="edit(scope.row)"
            type="warning"
            size="small"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            @click="delUser(scope.row)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <EditUser
      ref="EditUser"
      :departmentData="departmentData"
      @successEdit="loadUserList()"
    ></EditUser>
    <AddUser
      ref="AddUser"
      :departmentData="departmentData"
      @successAdd="loadUserList()"
    ></AddUser>
  </div>
</template>

<script>
import {
  timestampToTime,
  generateOptions,
  computedDepartmentPath
} from "../../assets/js/public";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
export default {
  name: "userManage",
  components: {
    EditUser,
    AddUser
  },
  data() {
    return {
      rootId: sessionStorage.getItem("departmentId"), //根单位
      departmentForPath: [], //为了计算单位路径
      // 级联分类数据
      //用户列表数据
      userTableData: [],
      //所属单位
      departmentData: []
    };
  },
  mounted() {
    //获取单位数据
    this.loadDepartment();
  },
  methods: {
    timestampToTime(time) {
      return timestampToTime(time);
    },
    //加载分类信息
    loadDepartment() {
      this.$Axios
        .post("handle_department/loadDepartment", {
          departmentId: this.rootId
        })
        .then(res => {
          this.departmentForPath = res.data; //用来计算单位路径
          this.departmentData = generateOptions(res.data);
          //先加载单位数据，再加载用户数据，因为用户数据需要计算单位路径
          this.loadUserList();
        });
    },
    //加载用户
    loadUserList() {
      this.$Axios.get("handle_user/loadUser?did=" + this.rootId).then(res => {
        this.userTableData = res.data;
        //计算单位路径
        this.userTableData.forEach(ele => {
          ele.departmentPath = computedDepartmentPath(
            this.departmentForPath,
            ele
          );
        });
      });
    },
    //删除用户
    delUser(row) {
      this.$Axios
        .post("handle_user/delUser", {
          id: row.id
        })
        .then(res => {
          if (res.data) {
            this.$message({
              message: "删除用户成功！",
              type: "success"
            });
            this.loadUserList();
          }
        });
    },
    //重置密码
    resetPwd(row) {
      this.$Axios
        .post("handle_user/resetPwd", {
          id: row.id
        })
        .then(res => {
          if (res.data) {
            this.$message({
              message: "用户密码重置成功！",
              type: "success"
            });
          }
        });
    },
    //编辑用户
    edit(row) {
      this.$refs.EditUser.dialogVisible = true;
      this.$refs.EditUser.ruleForm.utype =
        row.utype == "超级管理员" ? "0" : "1";
      this.$refs.EditUser.ruleForm.id = row.id;
      this.$refs.EditUser.ruleForm.uname = row.uname;
      this.$refs.EditUser.ruleForm.department = row.department_id;
    },
    //添加用户
    openAddDialog() {
      this.$refs.AddUser.dialogVisible = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap90 {
  width: 90%;
  margin: 30px auto;
}
</style>
