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
      <el-form-item>
        <el-checkbox v-model="form.selfHealth">本人为“四类人员”</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.homeHealth"
          >家庭成员为“四类人员”</el-checkbox
        >
      </el-form-item>
      <!-- <el-form-item label="人员状态">
        <el-select v-model="form.status" placeholder="请选择活动区域">
          <el-option
            v-for="(item, index) in options"
            :label="item.name"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item>
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
      </el-form-item> -->
      <el-form-item label="选择日期" prop="department">
        <el-date-picker
          v-model="form.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="exportExcel">导出EXCEL</el-button type="success">
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCurrentDate, computedDepartmentPath } from "../../assets/js/public";
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
        authed: 2,
        date: getCurrentDate(1),
        selfHealth: "",
        homeHealth: ""
      },
      departmentData: [],
      departmentList: [],
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
      ]
    };
  },
  props: ["personData"],
  computed: {
    // 计算属性的 getter
    fileName: function() {
      return (
        sessionStorage.getItem("departmentName") +
        "健康日报（" +
        this.form.date +
        ").xls"
      );
    }
  },
  mounted() {
    // this.onDataOut();
  },
  methods: {
    handleChangeDepartment(value) {
      this.form.departmentId = value[value.length - 1];
    },
    onSearch() {
      this.$emit("onSearch", this.form);
    },
    exportExcel() {
      delete this.form.cpage;
      delete this.form.ppage;
      this.form.downExcel = true;
      var arr = [];
      this.departmentList.forEach(ele => {
        arr.push({
          id: ele.id,
          departmentPath: ele.departmentPath
        });
      });
      this.form.departmentList = JSON.stringify(arr);
      this.$Axios({
        method: "POST",
        header: { "Content-Type": "application/xls" }, // http请求类型
        responseType: "blob", // 返回格式，默认json，可选arraybuffer、blob、document、json、text、stream
        url: "handle_person/loadPerson",
        data: this.form
      }).then(res => {
        let blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = this.fileName;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
