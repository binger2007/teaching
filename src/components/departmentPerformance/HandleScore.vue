<template>
  <el-dialog title="加/减分" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="单位" :label-width="formLabelWidth" prop="danwei">
        <el-input v-model="form.danwei" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="原因" :label-width="formLabelWidth" prop="reason">
        <el-input v-model="form.reason" type="textarea" :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="分类" :label-width="formLabelWidth" prop="fenlei">
        <el-select v-model="form.fenlei" placeholder="请选择分类">
          <el-option label="思想教育" value="0"></el-option>
          <el-option label="军事训练" value="1"></el-option>
          <el-option label="日常管理" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分数" :label-width="formLabelWidth" prop="score">
        <template>
          <el-input-number
            v-model="form.score"
            :min="-100"
            :max="100"
            label="描述文字"
          ></el-input-number>
        </template>
      </el-form-item>
      <el-form-item label="日期" :label-width="formLabelWidth">
        <template>
          <div class="block">
            <el-date-picker
              v-model="form.pubdate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "handleScore",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        reason: "",
        fenlei: "",
        score: 0,
        pubdate: new Date(),
        danwei: "",
        type: 2,
        belong_id: "",
        who: sessionStorage.getItem("uId")
      },
      formLabelWidth: "120px",
      rules: {
        reason: [
          { required: true, message: "请输入加分或减分的原因", trigger: "blur" }
        ],
        fenlei: [{ required: true, message: "请选择分类", trigger: "change" }],
        score: [
          { required: true, validator: this.checkScore, trigger: "change" }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios.post("handle_performance/add", this.form).then(res => {
            if (res.data) {
              // this.$parent.loadPerson();
              this.$emit("success");
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
