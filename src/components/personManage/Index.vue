<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="16">
        <ChartsForSub ref="chartsForSub"></ChartsForSub>
      </el-col>
      <el-col :span="8">
        <Charts ref="charts"></Charts>
      </el-col>
      <el-col :span="24" style="margin-top:30px;">
        <el-card style="position: relative;">
          <div slot="header" class="clearfix">
            <span>人员列表</span>
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
          <!-- 添加人员 -->
          <AddPerson @submitPerson="loadPerson" ref="addPerson"></AddPerson>
          <!-- 人员列表 -->
          <el-table border :data="personData" style="width: 100%" stripe>
            <el-table-column type="index" width="50" align="center">
            </el-table-column>
            <el-table-column label="姓名" align="center">
              <template slot-scope="scope">
                <el-link @click="openPersonInfo(scope.row)" type="primary">{{
                  scope.row.name
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="bzb" label="部职别"> </el-table-column>
            <el-table-column label="单位" prop="departmentPath">
            </el-table-column>
            <el-table-column label="绩效得分" prop="s0" width="400" sortable>
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
              label="人员状态"
              align="center"
              sortable
              prop="status"
              width="120"
            >
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.status == '在位'"
                  @click="editStatus(scope.row)"
                  >{{ scope.row.status }}</el-tag
                >
                <el-tag type="warning" v-else @click="editStatus(scope.row)">{{
                  scope.row.status
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              width="250"
            >
              <template slot-scope="scope">
                <el-button
                  @click="handleScore(scope.row)"
                  type="warning"
                  size="small"
                  >加/减分</el-button
                >
                <el-button
                  @click="editPerson(scope.row)"
                  type="primary"
                  size="small"
                  >编辑</el-button
                >
                <el-button
                  @click="delPerson(scope.row)"
                  type="danger"
                  size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!-- 编辑人员 -->
    <EditPerson ref="editPerson"></EditPerson>
    <!-- 更改人员状态,修改时间 -->
    <EditStatus ref="editStatus"></EditStatus>
    <!-- 显示人员状态 -->
    <PersonInfo ref="personInfo"></PersonInfo>
    <!-- 加减分 -->
    <HandleScore ref="handleScore"></HandleScore>
  </div>
</template>
<script>
import {
  timestampToTime,
  generateOptions,
  computedDepartmentPath //计算单位数
} from "../../assets/js/public";
import PicDateRange from "../public/PickDateRange";
import EditPerson from "./EditPerson";
import EditStatus from "./EditStatus";
import AddPerson from "./AddPerson";
import Charts from "./Charts";
import ChartsForSub from "./ChartsForSub";
import PersonInfo from "./PersonInfo";
import HandleScore from "./HandleScore";
export default {
  name: "index",
  data() {
    return {
      rootId: sessionStorage.getItem("departmentId"), //根单位
      personData: [], //人员列表数据
      departmentData: [], //单位的级联菜单数据
      departmentForPath: [] //为了计算单位路径
    };
  },
  components: {
    EditPerson,
    EditStatus,
    AddPerson,
    Charts,
    ChartsForSub,
    PersonInfo,
    HandleScore,
    PicDateRange
  },
  mounted() {
    this.loadDepartment();
  },
  methods: {
    //处理选择根节点
    handleChangeDepartment(value) {
      this.rootId = value[value.length - 1];
      this.loadPerson();
    },
    //将时间戳变成时间字符串
    timestampToTime(time) {
      return timestampToTime(time);
    },
    //加载单位信息
    loadDepartment() {
      this.$Axios
        .post("handle_department/loadDepartment", {
          departmentId: this.rootId
        })
        .then(res => {
          this.departmentData = generateOptions(res.data);
          this.departmentForPath = res.data; //用来计算单位路径
          this.loadPerson(); //先加载单位，再加载人员列表
          this.$refs.addPerson.departmentData = this.departmentData;
        });
    },
    //加载人员
    loadPerson() {
      this.$Axios
        .post("handle_person/loadPerson", {
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
          this.personData = res.data;
          this.personData.forEach(ele => {
            ele.departmentPath = computedDepartmentPath(
              this.departmentForPath,
              ele
            );
          });
          this.$refs.charts.initChart(res.data);
          //根据时间去筛选结果，主要是为了计算人员分数
          this.computScore();
        });
    },
    //删除人员
    delPerson(row) {
      this.$Axios
        .post("handle_person/delPerson", {
          id: row.Id
        })
        .then(res => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.loadPerson();
        });
    },
    //编辑人员
    editPerson(row) {
      this.$refs.editPerson.id = row.Id;
      this.$refs.editPerson.dialogFormVisible = true;
      this.$refs.editPerson.departmentData = this.departmentData;
      this.$refs.editPerson.ruleForm = {
        id: row.Id,
        name: row.name,
        bzb: row.bzb,
        department_id: row.department_id,
        label: row.label
      };
    },
    //更改人员在位状态
    editStatus(row) {
      this.$refs.editStatus.id = row.Id;
      this.$refs.editStatus.dialogFormVisible = true;
      this.$refs.editStatus.name = row.name;
      this.$refs.editStatus.ruleForm.id = row.Id;
      this.$refs.editStatus.ruleForm.status = row.status;
      this.$refs.editStatus.logForm.person_id = row.Id;
    },
    //显示人员详细信息
    openPersonInfo(person) {
      this.$refs.personInfo.dialogFormVisible = true;
      this.$refs.personInfo.person = person;
      this.$refs.personInfo.loadPersonInfo(person.Id);
    },
    //加分/减分操作
    handleScore(row) {
      this.$refs.handleScore.dialogFormVisible = true;
      this.$refs.handleScore.form.name = row.name;
      this.$refs.handleScore.form.danwei = row.label;
      this.$refs.handleScore.form.belong_id = row.Id;
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
      this.personData.forEach(ele => {
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
      this.$refs.chartsForSub.initChart(this.personData, this.rootId);
      // console.log(this.personData);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-tag {
  cursor: pointer;
}
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
