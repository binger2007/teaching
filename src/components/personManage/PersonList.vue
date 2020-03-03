<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24">
        <!-- 人员列表 -->
        <el-table border :data="personData" style="width: 100%" stripe>
          <el-table-column type="index" width="50" align="center" fixed="left">
            <template slot-scope="scope">
              {{ scope.row.index + (currpage - 1) * pagesize }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" width="80" align="center" fixed="left">
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
          <el-table-column
            show-overflow-tooltip
            label="单位"
            prop="departmentPath"
            width="150"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="家庭住址"
            prop="address"
            width="150"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="家庭成员数量"
            align="center"
            prop="members"
            width="50"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="联系电话"
            align="center"
            prop="tel"
            width="150"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="检测人"
            align="center"
            prop="jianceren"
            width="80"
          >
          </el-table-column>
          <!-- <el-table-column
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
          </el-table-column> -->

          <el-table-column label="本人是否“四类人员”" align="center">
            <el-table-column label="确诊" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.selfQuezhen == 1" style="color:#F56C6C"
                  >是</span
                >
                <span v-else> 否</span>
              </template>
            </el-table-column>
            <el-table-column label="疑似" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.selfYisi == 1" style="color:#F56C6C">
                  是</span
                >
                <span v-else> 否</span>
              </template>
            </el-table-column>
            <el-table-column label="密切接触者" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.selfMiqie == 1" style="color:#F56C6C">
                  是</span
                >
                <span v-else> 否</span>
              </template>
            </el-table-column>
            <el-table-column label="发热人员" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.selfFare == 1" style="color:#F56C6C">
                  是</span
                >
                <span v-else> 否</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="家庭成员是否“四类人员”" align="center">
            <el-table-column label="确诊" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.homeQuezhen == 1" style="color:#F56C6C"
                  >是</span
                >
                <span v-else> 否</span>
              </template>
            </el-table-column>
            <el-table-column label="疑似" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.homeYisi == 1" style="color:#F56C6C">
                  是</span
                >
                <span v-else> 否</span>
              </template>
            </el-table-column>
            <el-table-column label="密切接触者" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.homeMiqie == 1" style="color:#F56C6C">
                  是</span
                >
                <span v-else> 否</span>
              </template>
            </el-table-column>
            <el-table-column label="发热人员" align="center" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.homeFare == 1" style="color:#F56C6C">
                  是</span
                >
                <span v-else> 否</span>
              </template>
            </el-table-column>
          </el-table-column>

          <!-- <el-table-column
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
          </el-table-column> -->
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
            width="200"
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
                @click="openCard(scope.row)"
                type="success"
                size="small"
                >查看健康卡</el-button
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
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="currpage"
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
    <PersonInfo ref="personInfo" :personData="personData"></PersonInfo>
    <OpenCard ref="OpenCard"></OpenCard>
  </div>
</template>

<script>
import EditPerson from "./EditPerson";
import HandlePerformance from "./HandlePerformance";
import PersonInfo from "./PersonInfo";
import OpenCard from "./OpenCard";
export default {
  name: "help",
  data() {
    return {
      personData: [],
      total: 0,
      pagesize: 10,
      currpage: 1,
      departmentData: []
    };
  },
  components: {
    EditPerson,
    HandlePerformance,
    PersonInfo,
    OpenCard
  },
  methods: {
    //处理分页
    handleCurrentChange(cpage) {
      // this.currpage = cpage;
      this.$emit("changPage", {
        cpage: cpage,
        ppage: 10,
        total: this.total
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
          this.$parent.loadPerson();
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
    //查看健康卡
    openCard(row) {
      this.$refs.OpenCard.dialogVisible = true;
      this.$refs.OpenCard.info = row;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
