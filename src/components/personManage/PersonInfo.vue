<template>
  <el-dialog
    width="80%"
    :title="person.name + '的个人情况'"
    :visible.sync="dialogFormVisible"
  >
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>绩效表现</span>
          </div>
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
              style="height:50vh;overflow-y: scroll"
            >
              <el-timeline-item
                v-for="(performance, index) in person.performance"
                :key="index"
                :timestamp="performance.pubdate"
              >
                <div :class="'type' + performance.fenlei">
                  分类：{{ typeName[performance.fenlei] }}； <br />
                  分数：{{ performance.score }}；
                  <br />
                  原因：{{ performance.reason }}
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>在位情况</span>
          </div>
          <div class="block">
            <div class="radio" style="margin-bottom:30px;">
              排序：
              <el-radio-group v-model="reverse2">
                <el-radio :label="true">倒序</el-radio>
                <el-radio :label="false">正序</el-radio>
              </el-radio-group>
            </div>

            <el-timeline
              :reverse="reverse2"
              style="height:50vh;overflow-y: scroll"
            >
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
              >
                {{ activity.title }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { generateOptions, timestampToTime } from "../../assets/js/public";
export default {
  name: "personInfo",
  data() {
    return {
      dialogFormVisible: false,
      person: {},
      reverse: true,
      reverse2: true,
      activities: [],
      typeName: ["思想教育", "军事训练", "日常管理"]
    };
  },
  mounted() {},
  methods: {
    loadPersonInfo(id) {
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
