<template>
  <div
    id="chartsForStatus"
    style="width:100%;height:calc(100vh - 650px);"
  ></div>
</template>

<script>
export default {
  name: "chartsForStatus",
  data() {
    return {
      status: [
        "在位",
        "隔离",
        "疑似",
        "确诊",
        "休假",
        "学习",
        "借调",
        "住院",
        "其他"
      ],
      option: {
        title: {
          text: "样本分析"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "病例分析",
            type: "pie",
            radius: [0, "65%"],
            center: ["50%", "60%"],
            itemStyle: {
              normal: {
                color: function(params) {
                  // 给出颜色组
                  var colorList = [
                    "#C1232B",
                    "#B5C334",
                    "#FCCE10",
                    "#E87C25",
                    "#27727B",
                    "#FE8463",
                    "#9BCA63",
                    "#FAD860",
                    "#F3A43B",
                    "#60C0DD",
                    "#D7504B",
                    "#C6E579",
                    "#F4E001",
                    "#F0805A",
                    "#26C0C0"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            label: {
              formatter: ele => {
                return (
                  ele.name + "\n\n" + ele.value + "例(" + ele.percent + "%)"
                );
              },
              show: true
            },
            data: [
              { value: 0, name: "在位" },
              { value: 0, name: "隔离" },
              { value: 0, name: "疑似" },
              { value: 0, name: "确诊" },
              { value: 0, name: "休假" },
              { value: 0, name: "学习" },
              { value: 0, name: "借调" },
              { value: 0, name: "住院" },
              { value: 0, name: "其他" }
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
        document.getElementById("chartsForStatus")
      );
      myChart.setOption(this.option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
