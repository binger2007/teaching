<template>
  <el-row :gutter="20">
    <!-- <el-col :span="3" v-for="o in 8" :key="o">
      <el-card class="card">
        <div slot="header" class="card-header">
          <span>卡片名称</span>
        </div>
        <h1 class="card-body">
          123(2.5%)
        </h1>
      </el-card>
    </el-col> -->
    <el-col :span="24" style="margin: 00px 0px 0px 0px;">
      <el-card>
        <ChartsForBar ref="chartsForBar"></ChartsForBar>
      </el-card>
    </el-col>
    <el-col :span="8" style="margin: 30px 0px 0px 0px;">
      <el-card>
        <ChartsForPercent ref="chartsForPercent"></ChartsForPercent>
      </el-card>
    </el-col>
    <el-col :span="8" style="margin: 30px 0px 0px 0px;">
      <el-card>
        <ChartsForLinChuang ref="chartsForLinChuang"></ChartsForLinChuang>
      </el-card>
    </el-col>
    <el-col :span="8" style="margin: 30px 0px 0px 0px;">
      <el-card>
        <ChartsForStatus ref="chartsForStatus"></ChartsForStatus>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import ChartsForBar from "./ChartsForBar";
import ChartsForPercent from "./ChartsForPercent";
import ChartsForLinChuang from "./ChartsForLinChuang";
import ChartsForStatus from "./ChartsForStatus";
export default {
  name: "index",
  data() {
    return {
      rootId: sessionStorage.getItem("departmentId"), //根单位
      total: 0
    };
  },
  components: {
    ChartsForBar,
    ChartsForPercent,
    ChartsForLinChuang,
    ChartsForStatus
  },
  mounted() {
    this.loadPerson();
  },
  methods: {
    loadPerson() {
      this.$Axios
        .post("handle_person/loadPerson", {
          departmentId: this.rootId,
          authed: 2
        })
        .then(res => {
          //根据填报的数据判断是否发烧、咳嗽、气促
          var arr = this.checkPlusStatus(res.data);
          this.computedChartsData(arr);
        });
    },
    //计算图标数值
    computedChartsData(arr) {
      //柱状图数据
      //    0: "确诊",
      //    1: "疑似",
      //    2: "咳嗽",
      //    3: "发烧",
      //    4: "气促",
      //    5: "隔离",
      //    6: "休假",
      //    7: "旅居史",
      //    8: "接触史",
      //    9: "在位",
      //    10:"学习",
      //    11:"借调",
      //    12:"住院",
      //    13:"其他"
      var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.total = arr.length;
      arr.forEach(ele => {
        switch (ele.status) {
          case "在位":
            data[9]++;
            break;
          case "隔离":
            data[5]++;
            break;
          case "疑似":
            data[1]++;
            break;
          case "确诊":
            data[0]++;
            break;
          case "休假":
            data[6]++;
            break;
          case "学习":
            data[10]++;
            break;
          case "借调":
            data[11]++;
            break;
          case "住院":
            data[12]++;
            break;
          case "其他":
            data[13]++;
            break;
          default:
            break;
        }
        //旅居史
        if (ele.lvju == "是") {
          data[7]++;
        }
        //接触史
        if (ele.jiechu == "是") {
          data[8]++;
        }
        //发烧
        if (ele.fashao) {
          data[3]++;
        }
        //咳嗽
        if (ele.cough) {
          data[2]++;
        }
        //旅居史
        if (ele.qicu) {
          data[4]++;
        }
      });
      //柱状图数据
      this.initChartForBar(data);
      //初始化第一个饼状图
      this.initChartForPercent(data);

      // //初始化第二个饼图
      this.initChartForLinChuang(data);
      //初始化第3个饼图
      this.initChartForStatus(data);
    },
    //柱状图数据
    initChartForBar(data) {
      this.$refs.chartsForBar.total = this.total;
      this.$refs.chartsForBar.option.series[0].data = [
        data[0],
        data[1],
        data[2],
        data[3],
        data[4],
        data[5],
        data[6],
        data[7],
        data[8]
      ];
      this.$refs.chartsForBar.initChart();
    },
    //初始化第一个饼状图
    initChartForPercent(data) {
      this.$refs.chartsForPercent.option.series[0].data[0].value =
        this.total - data[1] - data[0];
      this.$refs.chartsForPercent.option.series[0].data[1].value = data[1];
      this.$refs.chartsForPercent.option.series[0].data[2].value = data[0];
      this.$refs.chartsForPercent.initChart();
    },
    // 初始化第二个饼图
    initChartForLinChuang(data) {
      // 气促
      this.$refs.chartsForLinChuang.option.series[0].data[0].value = data[4];
      this.$refs.chartsForLinChuang.option.series[0].data[1].value =
        this.total - data[4];
      //咳嗽
      this.$refs.chartsForLinChuang.option.series[1].data[0].value = data[2];
      this.$refs.chartsForLinChuang.option.series[1].data[1].value =
        this.total - data[2];
      //发烧
      this.$refs.chartsForLinChuang.option.series[2].data[0].value = data[3];
      this.$refs.chartsForLinChuang.option.series[2].data[1].value =
        this.total - data[3];
      this.$refs.chartsForLinChuang.initChart();
    },
    //初始化第3个饼图
    initChartForStatus(data) {
      // 在位
      this.$refs.chartsForStatus.option.series[0].data[0].value = data[9];
      //  隔离
      this.$refs.chartsForStatus.option.series[0].data[1].value = data[5];
      // 疑似
      this.$refs.chartsForStatus.option.series[0].data[2].value = data[1];
      // 确诊
      this.$refs.chartsForStatus.option.series[0].data[3].value = data[0];
      //  休假
      this.$refs.chartsForStatus.option.series[0].data[4].value = data[6];
      // 学习
      this.$refs.chartsForStatus.option.series[0].data[5].value = data[10];
      // 借调
      this.$refs.chartsForStatus.option.series[0].data[6].value = data[11];
      //  住院
      this.$refs.chartsForStatus.option.series[0].data[7].value = data[12];
      // 其他
      this.$refs.chartsForStatus.option.series[0].data[8].value = data[13];
      this.$refs.chartsForStatus.initChart();
    },
    //根据填报的数据判断是否发烧、咳嗽、气促
    checkPlusStatus(arr) {
      arr.forEach(ele => {
        if (ele.performance.length > 0) {
          //低烧
          if (
            ele.performance[0].temp_pm > 37.5 ||
            (!ele.performance[0].temp_pm && ele.performance[0].temp_am > 37.5)
          ) {
            ele.fashao = "发烧";
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
            (!ele.performance[0].qicu_pm && ele.performance[0].qicu_am == "是")
          ) {
            ele.qicu = "气促";
          }
        }
      });
      return arr;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card {
  margin: 0px 0px;
}
.card .el-card__header {
  padding: 0px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: rgb(198, 226, 255);
}
.card-header {
  text-align: center;
  background: rgb(198, 226, 255);
}
.card .el-card__body {
  padding: 0px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  font-family: 20px Extra large;
  background: rgb(236, 245, 255);
}
</style>
