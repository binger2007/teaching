<template>
  <el-form
    v-if="utype != '管理员'"
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
  >
    <el-form-item label="工作安排" prop="working">
      <el-select v-model="ruleForm.working" placeholder="请选择工作安排">
        <el-option label="飞行" value="飞行"></el-option>
        <el-option label="休息" value="休息"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="值班首长" prop="zbsz">
      <el-input v-model="ruleForm.zbsz"></el-input>
    </el-form-item>
    <el-form-item label="值班主官" prop="zbzg">
      <el-input v-model="ruleForm.zbzg"></el-input>
    </el-form-item>
    <el-form-item label="值班员" prop="zby">
      <el-input v-model="ruleForm.zby"></el-input>
    </el-form-item>
    <el-form-item label="值班员" prop="zry">
      <el-input v-model="ruleForm.zry"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    </el-form-item>
  </el-form>
  <el-table v-else :data="dutyTableData" style="width: 100%">
    <el-table-column prop="label" label="单位"> </el-table-column>
    <el-table-column prop="zbzg" label="值班主官"> </el-table-column>
    <el-table-column prop="zby" label="值班员"> </el-table-column>
    <el-table-column prop="zry" label="值班员"> </el-table-column>
    <el-table-column prop="working" label="工作安排"> </el-table-column>
    <el-table-column prop="time" label="日期"> </el-table-column>
  </el-table>
</template>
<script>
import { timestampToTime } from "@/assets/js/public.js";
export default {
  name: "setDuty",
  data() {
    return {
      ruleForm: {
        working: "",
        zbsz: "",
        zbzg: "",
        zby: "",
        zry: "",
        department_id: ""
      },
      rules: {
        working: [
          { required: true, message: "请选择工作安排", trigger: "change" }
        ],
        zbsz: [{ required: true, message: "请填写值班首长", trigger: "blur" }],
        zbzg: [{ required: true, message: "请填写值班主官", trigger: "blur" }],
        zby: [{ required: true, message: "请填写值班员", trigger: "blur" }],
        zry: [{ required: true, message: "请填写值日员", trigger: "blur" }]
      },
      utype: sessionStorage.getItem("uType"),
      dutyTableData: []
    };
  },
  mounted() {
    this.ruleForm.department_id = sessionStorage.getItem("departmentId");
    if (sessionStorage.getItem("uType") != "管理员") {
      this.loadDuty();
    } else {
      this.loadAllDuty();
    }
  },
  methods: {
    //加载值班信息
    loadDuty() {
      this.$Axios
        .post("handle_duty/loadDuty", {
          department_id: sessionStorage.getItem("departmentId")
        })
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.ruleForm = res.data[0];
          } else {
            this.$message.error("暂无数据");
          }
        });
    },
    //如果管理员登录，加载所有单位的值班信息
    loadAllDuty() {
      this.$Axios.get("handle_duty/loadAllDuty").then(res => {
        if (res.data) {
          res.data.forEach(ele => {
            ele.time = timestampToTime(ele.time);
          });
          this.dutyTableData = res.data;
        } else {
          this.$message.error("暂无数据");
        }
      });
    },
    //保存值班信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios.post("handle_duty/addDuty", this.ruleForm).then(res => {
            if (res.data) {
              this.$message({
                message: "保存值班信息成功",
                type: "success"
              });
            } else {
              this.$message.error("不成功，请重新修改！");
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
