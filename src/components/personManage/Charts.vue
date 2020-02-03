<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span> 统计分析 </span>
    </div>
    <div id="main" style="width:100%;height:250px;"></div>
  </el-card>
</template>

<script>
export default {
  name: "charts",
  data() {
    return {
      chartOption: {
        title: {
          subtext: "",
          left: "center",
          top: "218"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["在位", "休假", "学习", "借调", "住院", "其他"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "80%",
            center: ["50%", "50%"],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    //绘制图形
    initChart(data) {
      this.chartOption.title.subtext = "合计:" + data.length + "人,";
      var series = [
        { value: 0, name: "在位" },
        { value: 0, name: "休假" },
        { value: 0, name: "学习" },
        { value: 0, name: "借调" },
        { value: 0, name: "住院" },
        { value: 0, name: "其他" }
      ];
      data.forEach(ele => {
        series.forEach(item => {
          if (ele.status == item.name) {
            item.value++;
          }
        });
      });
      series.forEach(ele => {
        this.chartOption.title.subtext += ele.name + ":" + ele.value + "人,";
      });
      this.chartOption.series[0].data = series;
      // 绘制图表
      var myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption(this.chartOption);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
