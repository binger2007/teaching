<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="选择单位" prop="department">
        <el-cascader
          :options="departmentData"
          :props="{ checkStrictly: true }"
          @change="handleChangeDepartment"
          :placeholder="departmentName"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="人员状态">
        <el-select v-model="form.status" placeholder="请选择活动区域">
          <el-option
            v-for="(item, index) in options"
            :label="item.name"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.lvju">旅居史</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.jiechu">接触史</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.fashao">发烧</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.cough">咳嗽</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.qicu">气促</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <download-excel
          class="export-excel-wrapper"
          :data="personData"
          :fields="json_fields"
          :name="fileName"
        >
          <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
          <el-button type="success">导出EXCEL</el-button>
        </download-excel>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCurrentDate } from "../../assets/js/public";
export default {
  name: "search",
  data() {
    return {
      departmentName: sessionStorage.getItem("departmentName"),
      form: {
        departmentId: sessionStorage.getItem("departmentId"),
        lvju: false,
        status: "",
        jiechu: false,
        fashao: false,
        cough: false,
        qicu: false,
        authed: 2
      },
      departmentData: [],
      options: [
        { name: "全部", value: "" },
        { name: "在位", value: "在位" },
        { name: "隔离", value: "隔离" },
        { name: "疑似", value: "疑似" },
        { name: "确诊", value: "确诊" },
        { name: "休假", value: "休假" },
        { name: "学习", value: "学习" },
        { name: "借调", value: "借调" },
        { name: "住院", value: "住院" },
        { name: "其他", value: "其他" }
      ],
      json_fields: {
        序号: "index",
        姓名: "name",
        性别: "sex",
        年龄: "age",
        单位: "departmentPath",
        人员状态: "status",
        旅居史: "lvju",
        接触史: "jiechu",
        早体温: "temp_am",
        晚体温: "temp_pm",
        早咳嗽: "cough_am",
        晚咳嗽: "cough_pm",
        早气促: "qicu_am",
        晚气促: "qicu_am",
        备注: "remark"
      },
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ],
      fileName:
        sessionStorage.getItem("departmentName") +
        "健康日报（" +
        getCurrentDate(1) +
        ").xls"
    };
  },
  props: ["personData"],
  mounted() {
    // this.onDataOut();
  },
  methods: {
    handleChangeDepartment(value) {
      this.form.departmentId = value[value.length - 1];
    },
    onSearch() {
      this.$emit("onSearch", this.form);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
