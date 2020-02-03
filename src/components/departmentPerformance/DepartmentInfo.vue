<template>
  <el-dialog
    width="80%"
    :title="department.label + '的个人情况'"
    :visible.sync="dialogFormVisible"
  >
    <div class="block">
      <div class="radio" style="margin-bottom:30px;">
        排序：
        <el-radio-group v-model="reverse">
          <el-radio :label="true">倒序</el-radio>
          <el-radio :label="false">正序</el-radio>
        </el-radio-group>
      </div>

      <el-timeline
        :reverse="reverse"
        style="height:50vh;overflow-y: scroll;padding-top:20px;padd-left:10px;"
      >
        <el-timeline-item
          v-for="(performance, index) in department.performance"
          :key="index"
          :timestamp="performance.pubdate"
          hide-timestamp
        >
          <el-card :class="'type' + performance.fenlei">
            分类：{{ typeName[performance.fenlei] }}； 日期：{{
              performance.pubdate.substr(0, 10)
            }}； 分数：{{ performance.score }}；
            <br />
            原因：{{ performance.reason }}
          </el-card>
          <!-- <div :class="'type' + performance.fenlei">
            
          </div> -->
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-dialog>
</template>

<script>
import { generateOptions, timestampToTime } from "../../assets/js/public";
export default {
  name: "departmentInfo",
  data() {
    return {
      dialogFormVisible: false,
      department: {},
      reverse: true,
      activities: [],
      typeName: ["思想教育", "军事训练", "日常管理"]
    };
  },
  mounted() {},
  methods: {
    loadDepartmentInfo(id) {
      this.$Axios
        .post("handle_log/load", {
          id: id
        })
        .then(res => {
          if (res.data.length) {
            res.data.forEach(ele => {
              ele.timestamp = timestampToTime(ele.time);
            });
          }
          this.activities = res.data;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.type0 {
  color: rgb(244, 91, 91);
}
.type1 {
  color: rgb(128, 133, 233);
}
.type2 {
  color: #e6a23c;
}
</style>
