<template>
  <el-main>
    <el-card class="box-card" shadow="hover">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="选择类别" prop="category">
          <el-cascader
            :options="classData"
            :props="{ checkStrictly: true }"
            @change="handleChangeClass"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="选择单位" prop="department">
          <el-cascader
            :options="departmentData"
            :props="{ checkStrictly: true }"
            @change="handleChangeDepartment"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="添加时间">
          <el-date-picker
            value-format="timestamp"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="权重">
          <el-input-number v-model="ruleForm.weight" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="上传附件">
          <el-button type="success" @click="openFilesTree">
            上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
          <div style="margin-top:15px;">
            <div
              v-for="(item,key) in files"
              :key="key"
              style="line-height:26px;"
            >{{key+1}}.{{item.label}}</div>
          </div>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <Editor></Editor>
          <!-- <el-input type="textarea" v-model="ruleForm.content"></el-input> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <Upload @getFiles="getFiles" ref="uploadFiles"></Upload>
  </el-main>
</template>

<script>
import Editor from "../articleManage/Editor";
import { generateOptions } from "../../assets/js/public";
import { getCookie } from "../../assets/js/cookie";
import Upload from "@/components/articleManage/Upload";
export default {
  name: "articleManage",
  data() {
    return {
      // 级联分类数据
      classData: [],
      departmentData: [],
      ruleForm: {
        title: "",
        category: "",
        department: "",
        date: "",
        desc: "",
        content: "",
        userName: getCookie("userName"),
        weight: 1,
        type: "addArticle",
        files: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        category: [
          { required: true, message: "请选择所属类别", trigger: "change" }
        ],
        department: [
          { required: true, message: "请选择所属单位", trigger: "change" }
        ],
        content: [{ required: true, message: "请填写内容", trigger: "blur" }]
      },
      //选中的歌曲
      files: []
    };
  },
  watch: {
    "$store.state.content": function() {
      this.ruleForm.content = this.$store.state.content;
    }
  },
  components: {
    Editor,
    Upload
  },
  created() {},
  mounted() {
    this.$store.state.content = "";
    this.loadClass();
    this.loadDepartment();
  },
  methods: {
    //加载分类信息
    loadClass() {
      this.$Axios.get("/handleClass.php?type=loadClass").then(res => {
        this.classData = generateOptions(res.data);
      });
    },
    //加载分类信息
    loadDepartment() {
      this.$Axios.get("/handleDepartment.php?type=loadClass").then(res => {
        this.departmentData = generateOptions(res.data);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.ruleForm.date) {
            this.ruleForm.date = new Date().valueOf();
          }

          this.$Axios.post("/handleArticle.php", this.ruleForm).then(res => {
            if (res.data == "1") {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$router.push("/admin");
              // this.ruleForm.title = "";
              // this.ruleForm.date = "";
              // this.ruleForm.desc = "";
              // this.ruleForm.content = "";
              // this.ruleForm.weight = 1;
              // this.$store.commit("getContent", "");
            } else {
              this.$message.error("不成功，请重新输入！");
            }
          });
        } else {
          return false;
        }
      });
    },
    handleChangeClass(value) {
      this.ruleForm.category = value[value.length - 1];
    },
    handleChangeDepartment(value) {
      this.ruleForm.department = value[value.length - 1];
    },
    //打开选择文件对话框
    openFilesTree() {
      this.$refs.uploadFiles.dialogFormVisible = true;
    },
    //获取所选节点
    getFiles(msg) {
      this.files = msg;
      this.ruleForm.files = JSON.stringify(msg);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
  width: 90%;
  height: calc(100vh - 200px);
  overflow-y: auto;
  margin: 30px auto;
  margin-bottom: 10px;
}
</style>
