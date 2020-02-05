<template>
  <el-dialog title="更改用户类别" :visible.sync="dialogVisible">
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "EditUser",
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        utype: "",
        id: "",
        department: "",
        uname: ""
      },
      formLabelWidth: "120px"
    };
  },
  props: ["departmentData"],
  methods: {
    submitForm(formName) {
      this.$Axios.post("handle_user/changeType", this.ruleForm).then(res => {
        if (res.data == "1") {
          this.$message({
            message: "修改用户类型成功",
            type: "success"
          });
          this.dialogVisible = false;
          this.$emit("successEdit");
        } else {
          this.$message.error("不成功，该单位用户名重复，请重新修改！");
        }
      });
    },
    handleChangeDepartment(value) {
      this.ruleForm.department = value[value.length - 1];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
