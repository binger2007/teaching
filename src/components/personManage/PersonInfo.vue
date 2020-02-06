<template>
  <el-dialog
    width="80%"
    title="隔离医学观察登记表"
    :visible.sync="dialogFormVisible"
  >
    <el-table :data="info.performance">
      <el-table-column align="center" type="index" width="70" label="序号">
      </el-table-column>
      <el-table-column align="center" label="姓名" width="120">
        {{ info.name }}
      </el-table-column>
      <el-table-column align="center" label="性别" width="60">
        {{ info.sex }}
      </el-table-column>
      <el-table-column align="center" label="年龄" width="60">
        {{ info.age }}
      </el-table-column>
      <el-table-column align="center" prop="address" label="现隔离医学观察地址">
      </el-table-column>
      <el-table-column
        align="center"
        prop="pubdate"
        label="观察日期"
        width="120"
      >
      </el-table-column>
      <el-table-column align="center" label="临床表现">
        <el-table-column align="center" label="体温">
          <el-table-column align="center" label="早" width="70">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.temp_am <= 37.5 && scope.row.temp_am">{{
                scope.row.temp_am
              }}</el-tag>
              <el-tag
                type="warning"
                v-if="scope.row.temp_am > 37.5 && scope.row.temp_am <= 39"
                >{{ scope.row.temp_am }}</el-tag
              >
              <el-tag type="danger" v-if="scope.row.temp_am > 39">{{
                scope.row.temp_am
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="晚" width="70">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.temp_pm <= 37.5 && scope.row.temp_pm">{{
                scope.row.temp_pm
              }}</el-tag>
              <el-tag
                type="warning"
                v-if="scope.row.temp_pm > 37.5 && scope.row.temp_pm <= 39"
                >{{ scope.row.temp_pm }}</el-tag
              >
              <el-tag type="danger" v-if="scope.row.temp_pm > 39">{{
                scope.row.temp_pm
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="咳嗽">
          <el-table-column align="center" label="早" width="70">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.cough_am == '否'">{{
                scope.row.cough_am
              }}</el-tag>
              <el-tag type="warning" v-if="scope.row.cough_am == '是'">{{
                scope.row.cough_am
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="晚" width="70">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.cough_pm == '否'">{{
                scope.row.cough_pm
              }}</el-tag>
              <el-tag type="warning" v-if="scope.row.cough_pm == '是'">{{
                scope.row.cough_pm
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="气促">
          <el-table-column align="center" label="早" width="70">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.qicu_am == '否'">{{
                scope.row.qicu_am
              }}</el-tag>
              <el-tag type="danger" v-if="scope.row.qicu_am == '是'">{{
                scope.row.qicu_am
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="晚" width="70">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.qicu_pm == '否'">{{
                scope.row.qicu_pm
              }}</el-tag>
              <el-tag type="danger" v-if="scope.row.qicu_pm == '是'">{{
                scope.row.qicu_pm
              }}</el-tag>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" prop="remark" label="备注" width="120">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: "personInfo",
  data() {
    return {
      dialogFormVisible: false,
      info: {}
    };
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
