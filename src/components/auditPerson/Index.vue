<template>
  <div class="hello">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="first">
        <PersonTable
          @successChange="loadPerson"
          statusType="pendingData"
          :tableData="pendingData"
          @pageChange="pageChange"
        >
          <template></template>
        </PersonTable>
      </el-tab-pane>
      <el-tab-pane label="审核通过" name="second"
        ><PersonTable
          statusType="auditedData"
          :tableData="auditedData"
          @successChange="loadPerson"
          @pageChange="pageChange"
        ></PersonTable
      ></el-tab-pane>
      <el-tab-pane label="未通过" name="third"
        ><PersonTable
          statusType="refuseData"
          :tableData="refuseData"
          @successChange="loadPerson"
          @pageChange="pageChange"
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
      pendingData: {
        total: "",
        data: [],
        type: "pendingData",
        classify: 1
      },
      //已审核
      auditedData: {
        total: "",
        data: [],
        type: "auditedData",
        classify: 2
      },
      //审核不通过
      refuseData: {
        total: "",
        data: [],
        type: "refuseData",
        classify: 3
      }
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
          this.departmentForPath = generateOptions(res.data)[1]; //用来计算单位路径
          this.loadPerson({
            type: "pendingData",
            classify: 1
          });
          this.loadPerson({
            type: "auditedData",
            classify: 2
          });
          this.loadPerson({
            type: "refuseData",
            classify: 3
          });
        });
    },
    //加载人员
    loadPerson(pars) {
      var obj = {
        type: "auditedData",
        classify: 2,
        cpage: 1,
        ppage: 10
      };
      Object.assign(obj, pars);
      this[obj.type]["data"] = [];
      this.$Axios
        .post("handle_person/loadPerson", {
          departmentId: this.rootId,
          authed: obj.classify,
          cpage: obj.cpage,
          ppage: obj.ppage
        })
        .then(res => {
          res.data["list"].forEach(ele => {
            ele.departmentPath = computedDepartmentPath(
              this.departmentForPath,
              ele.department_id
            );
            this[obj.type]["data"].push(ele);
            this[obj.type]["total"] = res.data.total;
          });
        });
    },
    pageChange(val) {
      this.loadPerson({
        type: val.type,
        classify: val.classify,
        cpage: val.cpage,
        total: val.total
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
