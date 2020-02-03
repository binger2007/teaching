<template>
  <el-date-picker
    v-model="value"
    type="daterange"
    align="right"
    unlink-panels
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
    @change="picDate"
  >
  </el-date-picker>
</template>

<script>
import {
  getFirstDayOfMonth,
  getFirstDayOfSeason,
  getFirstDayOfYear
} from "../../assets/js/public";
export default {
  name: "picDateRange",
  data() {
    return {
      //选择时间范围插件选项
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              var end = new Date();
              var start = new Date();
              start = getFirstDayOfMonth(start);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "本季",
            onClick(picker) {
              var end = new Date();
              var start = new Date();
              start = getFirstDayOfSeason(start);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "本年",
            onClick(picker) {
              var end = new Date();
              var start = new Date();
              start = getFirstDayOfYear(start);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "全部",
            onClick(picker) {
              var end = new Date();
              var start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 10);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //默认的时间范围，本月
      value: [new Date(new Date().setDate(1)), new Date()]
    };
  },
  methods: {
    picDate(data) {
      this.$emit("picDate", this.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
