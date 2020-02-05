<template>
  <!-- 添加用户对话框 -->
  <el-dialog title="添加用户" :visible.sync="dialogVisible">
    <el-form :model="addUserForm" :rules="addUserRules" ref="addUserForm">
      <el-alert
        title="添加用户的默认密码为123456，用户登陆后可在后台修改"
        type="warning"
        style="margin-bottom:30px;"
      ></el-alert>
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="uname">
        <el-input v-model="addUserForm.uname" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="用户类别" :label-width="formLabelWidth" prop="utype">
        <el-select v-model="addUserForm.utype" placeholder="请选择用户类别">
          <el-option label="管理员" value="0"></el-option>
          <el-option label="普通用户" value="1"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- 如果用户类别选择普通用户，则显示“选择管理单位” -->
      <el-form-item
        label="选择管理单位"
        :label-width="formLabelWidth"
        prop="department"
      >
        <el-cascader
          :options="departmentData"
          :props="{ checkStrictly: true }"
          @change="handleChangeDepartment"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitUser('addUserForm')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { generateOptions } from "../../assets/js/public";
export default {
  name: "AddUser",
  data() {
    return {
      dialogVisible: false,
      addUserForm: {
        uname: "",
        utype: "1",
        department: ""
      },

      addUserRules: {
        uname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        department: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  props: ["departmentData"],
  methods: {
    //提交用户
    submitUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios
            .post("handle_user/addUser", this.addUserForm)
            .then(res => {
              if (res.data) {
                this.$message({
                  message: "恭喜你，用户添加成功",
                  type: "success"
                });
                this.addUserForm.uname = "";
                this.addUserForm.utype = "";
                this.addUserForm.department = "";
                this.dialogVisible = false;
                this.$forceUpdate();
                this.$emit("successAdd");
                // this.$parent.loadUserList();
              } else {
                this.$message.error("不成功，用户名已存在！");
              }
            });
        } else {
          return false;
        }
      });
    },

    //
    handleChangeDepartment(value) {
      this.addUserForm.department = value[value.length - 1];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
