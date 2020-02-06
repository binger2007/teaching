<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input-number
              v-model="ruleForm.age"
              :min="1"
              :max="100"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="单位">
            <el-cascader
              :options="departmentData"
              :props="{ checkStrictly: true }"
              @change="handleChangeDepartment"
              :placeholder="departmentName"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="状态" prop="status">
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
          <el-form-item label="武汉旅居史" prop="lvju">
            <el-radio-group v-model="ruleForm.lvju">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="密切接触史" prop="jiechu">
            <el-radio-group v-model="ruleForm.jiechu">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  timestampToTime,
  generateOptions,
  computedDepartmentPath //计算单位数
} from "../../assets/js/public";

export default {
  name: "index",
  data() {
    return {
      rootId: sessionStorage.getItem("departmentId"), //根单位
      departmentData: [], //单位的级联菜单数据
      // departmentData: [],
      departmentName: sessionStorage.getItem("departmentName"),
      ruleForm: {
        name: "",
        sex: "男",
        department_id: sessionStorage.getItem("departmentId"),
        status: "",
        age: 24,
        lvju: "否",
        jiechu: "否",
        remark: ""
      },
      rules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      options: [
        {
          value: "在位"
        },
        {
          value: "隔离"
        },
        {
          value: "疑似"
        },
        {
          value: "确诊"
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
  components: {},
  mounted() {
    this.loadDepartment();
  },
  methods: {
    //加载单位信息
    loadDepartment() {
      this.$Axios
        .post("handle_department/loadDepartment", {
          departmentId: this.rootId
        })
        .then(res => {
          this.departmentData = generateOptions(res.data);
        });
    },
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
              } else {
                this.$message.error("不成功！当前单位出现重名");
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
