<template>
  <div>
    <!-- 搜索表单 -->
    <Search ref="search" @onSearch="search" :personData="personData"></Search>
    <el-row :gutter="12">
      <el-col :span="24">
        <!-- 人员列表 -->
        <el-table
          border
          :data="
            personData.slice((currpage - 1) * pagesize, currpage * pagesize)
          "
          style="width: 100%"
          stripe
        >
          <el-table-column type="index" width="50" align="center">
          </el-table-column>
          <el-table-column label="姓名" width="80" align="center">
            <template slot-scope="scope">
              <el-link @click="openPersonInfo(scope.row)" type="primary">{{
                scope.row.name
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="sex" width="50" align="center" label="性别">
          </el-table-column>
          <el-table-column prop="age" width="50" align="center" label="年龄">
          </el-table-column>
          <el-table-column label="单位" prop="departmentPath">
          </el-table-column>
          <el-table-column
            label="人员状态"
            align="center"
            sortable
            prop="status"
            width="120"
          >
            <template slot-scope="scope">
              <el-tag type="warning" v-if="scope.row.status == '疑似'">{{
                scope.row.status
              }}</el-tag>
              <el-tag type="danger" v-else-if="scope.row.status == '确诊'">{{
                scope.row.status
              }}</el-tag>
              <el-tag type="success" v-else-if="scope.row.status == '隔离'">{{
                scope.row.status
              }}</el-tag>
              <el-tag v-else>{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="旅居史"
            align="center"
            sortable
            prop="lvju"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.lvju == '否'">{{
                scope.row.lvju
              }}</el-tag>
              <el-tag type="danger" v-else>{{ scope.row.lvju }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="接触史"
            align="center"
            sortable
            prop="jiechu"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.jiechu == '否'">{{
                scope.row.jiechu
              }}</el-tag>
              <el-tag type="danger" v-else>{{ scope.row.jiechu }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="体温" align="center">
            <el-table-column label="早" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.performance.length > 0">
                  {{
                    scope.row.datePerformance.temp_am
                      ? scope.row.datePerformance.temp_am
                      : ""
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="中" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.performance.length > 0">
                  {{
                    scope.row.datePerformance.temp_noon
                      ? scope.row.datePerformance.temp_noon
                      : ""
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="晚" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.performance.length > 0">
                  {{
                    scope.row.datePerformance.temp_pm
                      ? scope.row.datePerformance.temp_pm
                      : ""
                  }}</span
                >
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="咳嗽" align="center">
            <el-table-column label="早" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.performance.length > 0">
                  {{
                    scope.row.datePerformance.cough_am
                      ? scope.row.datePerformance.cough_am
                      : ""
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="中" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.performance.length > 0">
                  {{
                    scope.row.datePerformance.cough_noon
                      ? scope.row.datePerformance.cough_noon
                      : ""
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="晚" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.performance.length > 0">
                  {{
                    scope.row.datePerformance.cough_pm
                      ? scope.row.datePerformance.cough_pm
                      : ""
                  }}</span
                >
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="气促" align="center">
            <el-table-column label="早" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.performance.length > 0">
                  {{
                    scope.row.datePerformance.qicu_am
                      ? scope.row.datePerformance.qicu_am
                      : ""
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="中" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.performance.length > 0">
                  {{
                    scope.row.datePerformance.qicu_noon
                      ? scope.row.datePerformance.qicu_noon
                      : ""
                  }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="晚" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.performance.length > 0">
                  {{
                    scope.row.datePerformance.qicu_pm
                      ? scope.row.datePerformance.qicu_pm
                      : ""
                  }}</span
                >
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="临床表现" align="center" prop="jiechu">
            <template slot-scope="scope">
              <!-- 先记录体温，37.5~39，30~42 -->
              <el-tag type="warning" v-if="scope.row.dishao">{{
                scope.row.dishao
              }}</el-tag>
              <el-tag type="danger" v-if="scope.row.gaoshao">{{
                scope.row.gaoshao
              }}</el-tag>
              <el-tag type="warning" v-if="scope.row.cough">{{
                scope.row.cough
              }}</el-tag>
              <el-tag type="danger" v-if="scope.row.qicu">{{
                scope.row.qicu
              }}</el-tag>
              <span
                v-else-if="
                  !scope.row.dishao &&
                    !scope.row.gaoshao &&
                    !scope.row.cough &&
                    !scope.row.qicu &&
                    scope.row.datePerformance
                "
              >
                正常
              </span>
            </template>
          </el-table-column>
          <el-table-column label="记录时间" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            align="center"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <!-- <el-button
                @click="handlePerformance(scope.row)"
                type="success"
                size="small"
                >观测记录</el-button
              >
              <el-button
                @click="editPerson(scope.row)"
                type="primary"
                size="small"
                >编辑</el-button
              > -->
              <el-button
                @click="delPerson(scope.row)"
                type="danger"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="remark"
            label="备注"
            width="120"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="personData.length"
          style="margin-top:30px;"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 编辑人员 -->
    <EditPerson ref="editPerson" :departmentData="departmentData"></EditPerson>
    <!-- 观测记录 -->
    <HandlePerformance ref="handlePerformance"></HandlePerformance>
    <!-- 显示人员状态 -->
    <PersonInfo ref="personInfo"></PersonInfo>
  </div>
</template>
<script>
import {
  timestampToTime,
  generateOptions,
  computedDepartmentPath, //计算单位数
  getCurrentDate
} from "../../assets/js/public";
import EditPerson from "./EditPerson";
import HandlePerformance from "./HandlePerformance";
import PersonInfo from "./PersonInfo";
import Search from "./Search";

export default {
  name: "index",
  data() {
    return {
      rootId: sessionStorage.getItem("departmentId"), //根单位
      departmentData: [], //单位的级联菜单数据
      personData: [], //人员列表数据
      pagesize: 10,
      currpage: 1,
      loadPersonForm: {
        departmentId: sessionStorage.getItem("departmentId"),
        authed: 2,
        date: getCurrentDate(1)
      }
    };
  },
  components: {
    EditPerson,
    HandlePerformance,
    PersonInfo,
    Search
  },
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
          this.$refs.search.departmentData = this.departmentData;
          this.loadPerson();
        });
    },
    //加载人员
    loadPerson() {
      this.$Axios
        .post("handle_person/loadPerson", this.loadPersonForm)
        .then(res => {
          this.personData = res.data;
          this.personData.forEach((ele, index) => {
            ele.date = this.loadPersonForm.date;
            ele.index = index + 1;
            ele.datePerformance = "";
            ele.departmentPath = computedDepartmentPath(
              this.departmentData,
              ele.department_id,
              []
            ).join("/");
            // 从performance里取出当天的数据

            ele.performance.forEach(inner => {
              if (inner.pubdate == ele.date) {
                ele.datePerformance = inner;
              }
            });

            if (ele.datePerformance) {
              //导出excel表时，不支持数组，所有需要处理一下数据
              ele.temp_am = ele.datePerformance.temp_am;
              ele.temp_noon = ele.datePerformance.temp_noon;
              ele.temp_pm = ele.datePerformance.temp_pm;
              ele.cough_am = ele.datePerformance.cough_am;
              ele.cough_noon = ele.datePerformance.cough_noon;
              ele.cough_pm = ele.datePerformance.cough_pm;
              ele.qicu_am = ele.datePerformance.qicu_am;
              ele.qicu_noon = ele.datePerformance.qicu_noon;
              ele.qicu_pm = ele.datePerformance.qicu_pm;
              //低烧
              if (
                (ele.datePerformance.temp_pm > 37.5 &&
                  ele.datePerformance.temp_pm <= 39) ||
                (!ele.datePerformance.temp_pm &&
                  ele.datePerformance.temp_noon > 37.5 &&
                  ele.datePerformance.temp_noon <= 39) ||
                (!ele.datePerformance.temp_pm &&
                  !ele.datePerformance.temp_noon &&
                  ele.datePerformance.temp_am > 37.5 &&
                  ele.datePerformance.temp_am <= 39)
              ) {
                ele.dishao = "低烧";
              }
              // 高烧
              if (
                ele.datePerformance.temp_pm > 39 ||
                (!ele.datePerformance.temp_pm &&
                  ele.datePerformance.temp_noon > 39) ||
                (!ele.datePerformance.temp_pm &&
                  !ele.datePerformance.temp_noon &&
                  ele.datePerformance.temp_am > 39)
              ) {
                ele.gaoshao = "高烧";
              }
              //咳嗽
              if (
                ele.datePerformance.cough_pm == "是" ||
                (!ele.datePerformance.cough_pm &&
                  ele.datePerformance.cough_noon == "是") ||
                (!ele.datePerformance.cough_pm &&
                  !ele.datePerformance.cough_noon &&
                  ele.datePerformance.cough_am == "是")
              ) {
                ele.cough = "咳嗽";
              }
              //气促
              if (
                ele.datePerformance.qicu_pm == "是" ||
                (!ele.datePerformance.qicu_pm &&
                  ele.datePerformance.qicu_noon == "是") ||
                (!ele.datePerformance.qicu_pm &&
                  !ele.datePerformance.qicu_noon &&
                  ele.datePerformance.qicu_am == "是")
              ) {
                ele.qicu = "气促";
              }
            } else {
              ele.temp_am = "";
              ele.temp_pm = "";
              ele.cough_am = "";
              ele.cough_pm = "";
              ele.qicu_am = "";
              ele.qicu_pm = "";
            }
          });
          //过滤发烧
          if (this.loadPersonForm.fashao) {
            var arr = [];
            this.personData.forEach(ele => {
              if (ele.gaoshao || ele.dishao) {
                arr.push(ele);
              }
            });
            this.personData = arr;
          }
          //过滤咳嗽
          if (this.loadPersonForm.cough) {
            var arr = [];
            this.personData.forEach(ele => {
              if (ele.cough) {
                arr.push(ele);
              }
            });
            this.personData = arr;
          }
          //过滤气促
          if (this.loadPersonForm.qicu) {
            var arr = [];
            this.personData.forEach(ele => {
              if (ele.qicu) {
                arr.push(ele);
              }
            });
            this.personData = arr;
          }
        });
    },
    //处理分页
    handleCurrentChange(cpage) {
      this.currpage = cpage;
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
      this.$refs.editPerson.dialogFormVisible = true;
      this.$refs.editPerson.ruleForm = row;
    },
    //填写观测记录
    handlePerformance(row) {
      this.$refs.handlePerformance.dialogFormVisible = true;
      this.$refs.handlePerformance.name = row.name;
      this.$refs.handlePerformance.danwei = row.departmentPath;
      this.$refs.handlePerformance.form.belong_id = row.openid;
      if (row.performance.length > 0) {
        this.$refs.handlePerformance.form.address = row.performance[0].address;
      } else {
        this.$refs.handlePerformance.form.address = "";
      }
    },
    //个人观察记录
    openPersonInfo(row) {
      this.$refs.personInfo.dialogFormVisible = true;
      this.$refs.personInfo.info = row;
      // this.$refs.personInfo.loadPersonInfo(person.Id);
    },
    //处理搜索事件
    search(obj) {
      Object.assign(this.loadPersonForm, obj);
      this.loadPersonForm = obj;
      this.loadPerson();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
