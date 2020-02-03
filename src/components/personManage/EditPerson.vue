<template>
  <el-dialog title="编辑人员" :visible.sync="dialogFormVisible">
    <el-form
      :model="ruleForm"
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
          :placeholder="ruleForm.label"
          :options="departmentData"
          :props="{ checkStrictly: true }"
          @change="handleChangeDepartment"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { generateOptions } from "../../assets/js/public";
export default {
  name: "editPerson",
  data() {
    return {
      dialogFormVisible: false,
      departmentData: [],
      ruleForm: {
        id: "",
        name: "",
        bzb: "",
        department_id: ""
      },
      rules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  methods: {
    handleChangeDepartment(value) {
      this.ruleForm.department_id = value[value.length - 1];
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios
            .post("handle_person/editPerson", this.ruleForm)
            .then(res => {
              if (res.data) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$parent.loadPerson();
                // this.loadPerson();
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
