<template>
  <div class="hello">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="first">
        <PersonTable
          @successChange="loadPerson"
          statusType="pendingData"
          :tableData="pendingData"
        >
          <template></template>
        </PersonTable>
      </el-tab-pane>
      <el-tab-pane label="审核通过" name="second"
        ><PersonTable
          statusType="auditedData"
          :tableData="auditedData"
          @successChange="loadPerson"
        ></PersonTable
      ></el-tab-pane>
      <el-tab-pane label="未通过" name="third"
        ><PersonTable
          statusType="refuseData"
          :tableData="refuseData"
          @successChange="loadPerson"
        ></PersonTable
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  computedDepartmentPath,
  generateOptions //计算单位数
} from "../../assets/js/public";
import PersonTable from "./PersonTable";
export default {
  name: "help",
  data() {
    return {
      rootId: sessionStorage.getItem("departmentId"), //根单位,
      departmentForPath: [],
      activeName: "first",
      //待审核
      pendingData: [],
      //已审核
      auditedData: [],
      //审核不通过
      refuseData: []
    };
  },
  components: {
    PersonTable
  },
  mounted() {
    this.loadDepartment();
  },

  methods: {
    // reload() {
    //   this.loadPerson
    // },
    handleClick() {},
    //加载单位信息
    loadDepartment() {
      this.$Axios
        .post("handle_department/loadDepartment", {
          departmentId: this.rootId
        })
        .then(res => {
          this.departmentForPath = generateOptions(res.data); //用来计算单位路径
          this.loadPerson();
        });
    },
    //加载人员
    loadPerson() {
      this.pendingData = [];
      this.auditedData = [];
      this.refuseData = [];
      this.$Axios
        .post("handle_person/loadPerson", {
          departmentId: this.rootId
        })
        .then(res => {
          res.data.forEach(ele => {
            ele.departmentPath = computedDepartmentPath(
              this.departmentForPath,
              ele.department_id,
              []
            );
            switch (+ele.authed) {
              case 1:
                this.pendingData.push(ele);
                break;
              case 2:
                this.auditedData.push(ele);
                break;
              case 3:
                this.refuseData.push(ele);
                break;
              default:
                break;
            }
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
