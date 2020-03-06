<template>
  <div class="hello">
    <el-table :data="tableData.data" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center">
      </el-table-column>
      <el-table-column prop="sex" width="50" align="center" label="性别">
      </el-table-column>
      <el-table-column prop="departmentPath" label="申请单位">
      </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div v-if="statusType == 'pendingData'">
            <el-button
              @click="changeStatus(scope.row, 2)"
              type="primary"
              size="small"
              >通过</el-button
            >
            <el-button
              @click="changeStatus(scope.row, 3)"
              type="danger"
              size="small"
              >拒绝</el-button
            >
          </div>
          <div v-else-if="statusType == 'auditedData'">
            <el-button
              @click="changeStatus(scope.row, 1)"
              type="warning"
              size="small"
              >转为待审</el-button
            >
            <el-button
              @click="changeStatus(scope.row, 3)"
              type="danger"
              size="small"
              >拒绝</el-button
            >
          </div>
          <div v-else-if="statusType == 'refuseData'">
            <el-button
              @click="changeStatus(scope.row, 2)"
              type="primary"
              size="small"
              >通过</el-button
            >
            <el-button
              @click="changeStatus(scope.row, 1)"
              type="warning"
              size="small"
              >转为待审</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px;"
      background
      layout="prev, pager, next"
      :total="+tableData.total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "help",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    changeStatus(row, type) {
      this.$Axios
        .post("handle_person/changeAuditStatus", {
          openid: row.openid,
          type: type
        })
        .then(res => {
          this.$message("操作成功");
          this.$emit("successChange");
        });
    },
    //处理分页
    handleCurrentChange(cpage) {
      // console.log(cpage);
      this.$emit("pageChange", {
        cpage: cpage,
        total: this.tableData.total,
        classify: this.tableData.classify,
        type: this.tableData.type
      });
      // this.currpage = cpage;
      // this.$emit("changPage", {
      //   cpage: cpage,
      //   ppage: 10,
      //   total: this.total
      // });
    }
  },
  props: ["tableData", "statusType"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
