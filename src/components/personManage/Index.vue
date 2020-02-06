<template>
  <div>
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
          <el-table-column label="姓名" width="120" align="center">
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
          <el-table-column
            label="临床表现"
            align="center"
            prop="jiechu"
            width="200"
          >
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
                v-if="
                  !scope.row.dishao &&
                    !scope.row.gaoshao &&
                    !scope.row.cough &&
                    !scope.row.qicu
                "
              >
                无
              </span>
            </template>
          </el-table-column>
          <el-table-column label="记录时间" align="center" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.performance.length > 0">{{
                scope.row.performance[0].pubdate
              }}</span>
              <span type="danger" v-else>未记录</span>
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
              >
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
  computedDepartmentPath //计算单位数
} from "../../assets/js/public";
import EditPerson from "./EditPerson";
import HandlePerformance from "./HandlePerformance";
import PersonInfo from "./PersonInfo";

export default {
  name: "index",
  data() {
    return {
      rootId: sessionStorage.getItem("departmentId"), //根单位
      departmentData: [], //单位的级联菜单数据
      personData: [], //人员列表数据
      pagesize: 10,
      currpage: 1
    };
  },
  components: {
    EditPerson,
    HandlePerformance,
    PersonInfo
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
          this.departmentForPath = res.data; //用来计算单位路径
          this.loadPerson();
        });
    },
    //加载人员
    loadPerson() {
      this.$Axios
        .post("handle_person/loadPerson", {
          departmentId: this.rootId
        })
        .then(res => {
          this.personData = res.data;
          this.personData.forEach(ele => {
            ele.departmentPath = computedDepartmentPath(
              this.departmentForPath,
              ele
            );
            if (ele.performance.length > 0) {
              //低烧
              if (
                (ele.performance[0].temp_pm > 37.5 &&
                  ele.performance[0].temp_pm <= 39) ||
                (!ele.performance[0].temp_pm &&
                  ele.performance[0].temp_am > 37.5 &&
                  ele.performance[0].temp_am <= 39)
              ) {
                ele.dishao =
                  ele.performance[0].temp_pm || ele.performance[0].temp_am;
              }
              // 高烧
              if (
                ele.performance[0].temp_pm > 39 ||
                (!ele.performance[0].temp_pm && ele.performance[0].temp_am > 39)
              ) {
                ele.gaoshao =
                  ele.performance[0].temp_pm || ele.performance[0].temp_am;
              }
              //咳嗽
              if (
                ele.performance[0].cough_pm == "是" ||
                (!ele.performance[0].cough_pm &&
                  ele.performance[0].cough_am == "是")
              ) {
                ele.cough = "咳嗽";
              }
              //气促
              if (
                ele.performance[0].qicu_pm == "是" ||
                (!ele.performance[0].qicu_pm &&
                  ele.performance[0].qicu_am == "是")
              ) {
                ele.qicu = "气促";
              }
            }
          });
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
      this.$refs.handlePerformance.form.belong_id = row.Id;
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
