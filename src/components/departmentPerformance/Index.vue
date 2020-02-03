<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <!-- 单位图 -->
        <Charts ref="charts"></Charts>
      </el-col>
      <el-col :span="24" style="margin-top:30px;">
        <el-card style="position: relative;">
          <div slot="header" class="clearfix">
            <span>单位列表</span>
          </div>
          <!-- 根据时间筛选 -->
          <div class="block">
            <span class="demonstration">选择时间范围</span>
            <PicDateRange
              @picDate="computScore"
              ref="PicDateRange"
            ></PicDateRange>
          </div>
          <!-- 根据单位筛选 -->
          <div class="block depart">
            <span class="demonstration">选择单位</span>
            <el-cascader
              :options="departmentData"
              :props="{ checkStrictly: true }"
              @change="handleChangeDepartment"
            ></el-cascader>
          </div>
          <!-- 人员列表 -->
          <el-table :data="departmentDataForTable" style="width: 100%" stripe>
            <el-table-column type="index" width="50" align="center">
            </el-table-column>
            <el-table-column label="单位" align="center" width="150">
              <template slot-scope="scope">
                <el-link
                  @click="openDepartmentInfo(scope.row)"
                  type="primary"
                  >{{ scope.row.label }}</el-link
                >
              </template>
            </el-table-column>

            <el-table-column label="绩效得分" prop="s0" sortable>
              <template slot-scope="scope">
                <div style="font-size:0">
                  <div
                    class="s1"
                    v-bind:style="{ width: scope.row.s1 * 0.5 + '%' }"
                  >
                    {{ scope.row.s1 }}
                  </div>
                  <div
                    class="s2"
                    v-bind:style="{ width: scope.row.s2 * 0.5 + '%' }"
                  >
                    {{ scope.row.s2 }}
                  </div>
                  <div
                    class="s3"
                    v-bind:style="{ width: scope.row.s3 * 0.5 + '%' }"
                  >
                    {{ scope.row.s3 }}
                  </div>
                  <span style="font-size:14px;">总分：{{ scope.row.s0 }}</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  @click="handleScore(scope.row)"
                  type="warning"
                  size="small"
                  >加/减分</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- 加减分 -->
    <HandleScore ref="handleScore" @success="loadDepartment"></HandleScore>
    <!-- 显示单位评分状态 -->
    <DepartmentInfo ref="departmentInfo"></DepartmentInfo>
  </div>
</template>
<script>
import { timestampToTime, generateOptions } from "../../assets/js/public";
import HandleScore from "./HandleScore";
import DepartmentInfo from "./DepartmentInfo";
import Charts from "./Charts";
import PicDateRange from "../public/PickDateRange";
export default {
  name: "index",
  data() {
    return {
      rootId: sessionStorage.getItem("departmentId"), //根单位
      departmentData: [], //单位的级联菜单数据,
      departmentDataForTable: []
    };
  },
  components: {
    HandleScore,
    PicDateRange,
    DepartmentInfo,
    Charts
  },
  mounted() {
    this.loadDepartment();
    this.loadDepartmentForTable();
  },
  methods: {
    //处理选择根节点
    handleChangeDepartment(value) {
      this.rootId = value[value.length - 1];
      this.loadDepartmentForTable();
    },
    //加载单位信息,给级联菜单用
    loadDepartment() {
      this.$Axios
        .post("handle_department/loadDepartment", {
          departmentId: this.rootId
        })
        .then(res => {
          this.departmentData = generateOptions(res.data);
        });
    },
    //加载单位信息,给表格
    loadDepartmentForTable() {
      this.$Axios
        .post("handle_department/departmentDataForTable", {
          departmentId: this.rootId
        })
        .then(res => {
          //需要先对数据赋值属性，否则视图无法更新
          res.data.forEach(ele => {
            ele.s0 = ""; //总分
            ele.s1 = ""; //思想教育
            ele.s2 = ""; //军事训练
            ele.s3 = ""; //日常管理
          });
          this.departmentDataForTable = res.data;
          this.computScore();
        });
    },
    openDepartmentInfo(row) {
      console.log(row);
      this.$refs.departmentInfo.dialogFormVisible = true;
      this.$refs.departmentInfo.department = row;
      this.$refs.departmentInfo.loadDepartmentInfo(row.Id);
    },
    //加分/减分操作
    handleScore(row) {
      // console.log(row);
      this.$refs.handleScore.dialogFormVisible = true;
      this.$refs.handleScore.form.danwei = row.label;
      this.$refs.handleScore.form.belong_id = row.id;
    },
    //计算分数
    computScore(data) {
      var start;
      var end;
      if (data) {
        var start = data[0].getTime() + 8 * 60 * 60 * 1000;
        var end = data[1].getTime() + 32 * 60 * 60 * 1000;
      } else {
        var start =
          this.$refs.PicDateRange.value[0].getTime() + 8 * 60 * 60 * 1000;
        var end =
          this.$refs.PicDateRange.value[1].getTime() + 32 * 60 * 60 * 1000;
      }
      this.departmentDataForTable.forEach(ele => {
        ele.s0 = 100; //总分
        ele.s1 = 30; //思想教育
        ele.s2 = 40; //军事训练
        ele.s3 = 30; //日常管理
        ele.performance.forEach(item => {
          var time = new Date(item.pubdate).getTime();
          if (time >= start && time <= end) {
            item.flag = true;
            switch (item.fenlei) {
              case 0:
                ele.s1 += item.score * 0.3;
                ele.s1 = +ele.s1.toFixed(2);
                ele.s0 += item.score * 0.3;
                ele.s0 = +ele.s0.toFixed(2);
                break;
              case 1:
                ele.s2 += item.score * 0.4;
                ele.s2 = +ele.s2.toFixed(2);
                ele.s0 += item.score * 0.4;
                ele.s0 = +ele.s0.toFixed(2);
                break;
              case 2:
                ele.s3 += item.score * 0.3;
                ele.s3 = +ele.s3.toFixed(2);
                ele.s0 += item.score * 0.3;
                ele.s0 = +ele.s0.toFixed(2);
                break;
              default:
                break;
            }
          } else {
            item.flag = false;
          }
        });
      });
      //绘制单位绩效评分，将人员列表传进去
      this.$refs.charts.initChart(this.departmentDataForTable);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
  position: absolute;
  top: 10px;
  right: 30px;
}
.depart {
  position: absolute;
  top: 10px;
  right: 530px;
}
.s4,
.s5,
.s1,
.s2,
.s3 {
  /* width: 20%; */
  height: 20px;
  background-color: rgb(244, 91, 91);
  display: inline-block;
  /* float: left; */
  color: white;
  text-align: center;
  line-height: 20px;
  min-width: 30px;
  max-width: 26%;
  margin-top: 2px;
  padding-left: 0px;
  padding-right: 0px;
  font-size: 14px;
}

.s2 {
  background-color: rgb(128, 133, 233);
}

.s4 {
  background-color: #67c23a;
}

.s3 {
  background-color: #e6a23c;
  margin-right: 10px;
}

.s5 {
  background-color: rgb(149, 206, 255);
}
</style>
