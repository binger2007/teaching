<template>
  <!-- 添加人员 -->
  <el-form
    :model="ruleForm"
    inline
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
  >
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="部职别" prop="bzb">
      <el-input v-model="ruleForm.bzb"></el-input>
    </el-form-item>
    <el-form-item label="单位" prop="department_id">
      <el-cascader
        :options="departmentData"
        :props="{ checkStrictly: true }"
        @change="handleChangeDepartment"
      ></el-cascader>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { generateOptions } from "../../assets/js/public";
export default {
  name: "addPerson",
  data() {
    return {
      departmentData: [],
      ruleForm: {
        name: "",
        bzb: "",
        department_id: sessionStorage.getItem("departmentId")
      },
      rules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // this.loadDepartment();
  },
  methods: {
    //加载单位信息
    // loadDepartment() {
    //   this.$Axios
    //     .post("handle_department/loadDepartment", {
    //       departmentId: sessionStorage.getItem("departmentId"),
    //       userType: sessionStorage.getItem("uType")
    //     })
    //     .then(res => {
    //       this.departmentData = generateOptions(res.data);
    //     });
    // },
    handleChangeDepartment(value) {
      this.ruleForm.department_id = value[value.length - 1];
    },
    //保存人员
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios
            .post("handle_person/addPerson", this.ruleForm)
            .then(res => {
              if (res.data) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$emit("submitPerson");
              } else {
                this.$message.error("不成功！");
              }
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
