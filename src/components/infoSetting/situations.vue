<template>
  <div>
    <el-form
      v-if="utype != '管理员'"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item>
        <el-alert title="注意：大屏默认只显示最新的1条记录！" type="success">
        </el-alert>
      </el-form-item>
      <el-form-item label="检查情况" prop="jcqk">
        <el-input type="textarea" v-model="ruleForm.jcqk"></el-input>
      </el-form-item>
      <el-form-item label="检查人" prop="jcr">
        <el-input v-model="ruleForm.jcr"></el-input>
      </el-form-item>
      <el-form-item label="检查日期" prop="jcrq">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.jcrq"
          value-format="timestamp"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <el-collapse v-model="activeNames" style="margin-top:30px;">
      <el-collapse-item
        :title="item.jcrq + '检查情况——检查人：' + item.jcr"
        :name="item.id"
        v-for="item in listData"
        :key="item.id"
      >
        <div>
          {{ item.jcqk }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { timestampToTime } from "../../assets/js/public";
export default {
  name: "situations",
  data() {
    return {
      ruleForm: {
        jcrq: Date.parse(new Date()),
        jcr: "",
        jcqk: "",
        department_id: ""
      },
      rules: {
        jcqk: [{ required: true, message: "请填写检查情况", trigger: "blur" }]
      },
      utype: sessionStorage.getItem("uType"),
      activeNames: [],
      listData: []
    };
  },
  mounted() {
    this.ruleForm.department_id = sessionStorage.getItem("departmentId");
    this.load();
  },
  methods: {
    timestampToTime(time) {
      return timestampToTime(time);
    },
    //加载检查信息
    load() {
      this.$Axios
        .post("handle_situations/load", {
          department_id: sessionStorage.getItem("departmentId")
        })
        .then(res => {
          if (res.data && res.data.length > 0) {
            res.data.forEach(ele => {
              ele.jcrq = timestampToTime(ele.jcrq);
            });
            this.listData = res.data;
            this.activeNames.push(res.data[0].id);
          } else {
            this.$message.error("暂无数据");
          }
        });
    },
    //保存检查信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios.post("handle_situations/add", this.ruleForm).then(res => {
            if (res.data) {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.$refs[formName].resetFields();
              this.load();
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
