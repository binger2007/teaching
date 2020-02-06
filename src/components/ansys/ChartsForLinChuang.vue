<template>
  <div
    id="chartsForLinChuang"
    style="width:100%;height:calc(100vh - 650px);"
  ></div>
</template>

<script>
export default {
  name: "chartsForLinChuang",
  data() {
    return {
      option: {
        title: {
          text: "临床记录"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "样本分析",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              position: "inner"
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 0, name: "气促", selected: true },
              { value: 0, name: "正常" }
            ]
          },
          {
            name: "样本分析",
            type: "pie",
            selectedMode: "single",
            radius: ["40%", "55%"],

            label: {
              position: "inner"
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 0, name: "咳嗽", selected: true },
              { value: 0, name: "正常" }
            ]
          },
          {
            name: "样本分析",
            type: "pie",
            radius: ["65%", "85%"],

            label: {
              position: "inner"
            },
            data: [
              { value: 0, name: "发烧" },
              { value: 0, name: "正常" }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    // this.initChart();
  },
  methods: {
    initChart(data) {
      // 绘制图表
      var myChart = this.$echarts.init(
        document.getElementById("chartsForLinChuang")
      );
      myChart.setOption(this.option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
