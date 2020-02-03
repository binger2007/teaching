<template>
  <div>
    <el-dialog
      :title="'编辑' + name + '的在位状态'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
        <el-form-item label="状态">
          <el-select v-model="ruleForm.status" placeholder="">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="time">
          <el-date-picker
            type="date"
            placeholder="日期"
            v-model="logForm.time"
            value-format="timestamp"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "editStatus",
  data() {
    return {
      dialogFormVisible: false,
      departmentData: [],
      name: "",
      ruleForm: {
        id: "",
        status: ""
      },
      logForm: {
        title: "",
        users_id: sessionStorage.getItem("uId"),
        time: Date.parse(new Date()),
        type: 1,
        person_id: ""
      },
      options: [
        {
          value: "在位"
        },
        {
          value: "休假"
        },
        {
          value: "学习"
        },
        {
          value: "借调"
        },
        {
          value: "住院"
        },
        {
          value: "其他"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios
            .post("handle_person/editStatus", this.ruleForm)
            .then(res => {
              if (res.data) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.$parent.loadPerson();
                //更新日志
                this.logForm.title = this.ruleForm.status;
                this.submitLog();
              } else {
                this.$message.error("不成功！");
              }
            });
        } else {
          return false;
        }
      });
    },
    //更新日志
    submitLog() {
      this.$Axios.post("handle_log/add", this.logForm).then(res => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
