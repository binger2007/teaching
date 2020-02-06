<template>
  <el-dialog title="隔离医学观察登记" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="150px">
      <el-form-item label="姓名">
        <el-input v-model="name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="danwei" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="现隔离医学观察地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="体温">
        <el-input-number
          v-model="form.temp"
          :min="34"
          :max="45"
          :precision="1"
          :step="0.1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="咳嗽">
        <el-radio-group v-model="form.cough">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="气促">
        <el-radio-group v-model="form.qicu">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="日期">
        <template>
          <div class="block">
            <el-date-picker
              v-model="form.pubdate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-radio-group v-model="form.am">
              <el-radio label="早"></el-radio>
              <el-radio label="晚"></el-radio>
            </el-radio-group>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { generateOptions, dateToTime } from "../../assets/js/public";
export default {
  name: "handlePerformance",
  data() {
    return {
      dialogFormVisible: false,
      departmentData: [],
      form: {
        temp: 36.5,
        cough: "否",
        qicu: "否",
        pubdate: new Date(),
        am: "",
        belong_id: "",
        address: "",
        remark: ""
      },
      name: "",
      danwei: "",
      rules: {
        address: [
          { required: true, message: "请填写隔离观察地址", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getTimeState();
  },
  methods: {
    //根据当前时间判断是上午还是下午
    getTimeState() {
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      if (hours <= 12) {
        this.form.am = "早";
      } else {
        this.form.am = "晚";
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.pubdate.length != 11) {
            this.form.pubdate = dateToTime(this.form.pubdate);
          }
          this.$Axios.post("handle_performance/add", this.form).then(res => {
            if (res.data) {
              this.$parent.loadPerson();
              this.$message({
                message: "保存成功",
                type: "success"
              });
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
