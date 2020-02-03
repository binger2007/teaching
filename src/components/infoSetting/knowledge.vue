<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
      </el-form-item>

      <el-form-item label="日期" prop="time">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="ruleForm.time"
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
    <el-table :data="listData" style="width: 100%" stripe>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="content" label="内容"> </el-table-column>
      <el-table-column label="日期" width="130">
        <template slot-scope="scope">
          {{ timestampToTime(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="del(scope.row)" type="danger" size="small"
            >删除</el-button
          >
          <el-button @click="edit(scope.row)" type="primary" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑信息对话框 -->
    <el-dialog title="编辑信息" :visible.sync="editDialogFormVisible">
      <el-form
        :model="editRuleForm"
        :rules="editRules"
        ref="editRuleForm"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="editRuleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="editRuleForm.content"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editRuleForm.time"
            value-format="timestamp"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEditForm('editRuleForm')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { timestampToTime } from "../../assets/js/public";
export default {
  name: "knowledge",
  data() {
    return {
      ruleForm: {
        title: "",
        content: "",
        time: Date.parse(new Date()),
        department_id: sessionStorage.getItem("departmentId"),
        type_id: 3
      },
      rules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        content: [{ required: true, message: "请填写内容", trigger: "blur" }]
      },
      //编辑表单信息
      editRuleForm: {},
      editRules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        content: [{ required: true, message: "请填写内容", trigger: "blur" }]
      },
      listData: [],
      editDialogFormVisible: false
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    timestampToTime(time) {
      return timestampToTime(time);
    },
    //保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios.post("handle_content/add", this.ruleForm).then(res => {
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
    },
    //加载检查信息
    load() {
      this.$Axios
        .post("handle_content/load", {
          department_id: sessionStorage.getItem("departmentId"),
          type_id: 3
        })
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.listData = res.data;
          } else {
            this.$message.error("暂无数据");
          }
        });
    },
    //删除
    del(row) {
      this.$Axios
        .post("handle_content/del", {
          id: row.id
        })
        .then(res => {
          if (res.data) {
            this.load();
            this.$message({
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message.error("不成功");
          }
        });
    },
    edit(row) {
      this.editDialogFormVisible = true;
      this.editRuleForm = row;
    },
    submitEditForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$Axios
            .post("handle_content/edit", this.editRuleForm)
            .then(res => {
              if (res.data) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
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
