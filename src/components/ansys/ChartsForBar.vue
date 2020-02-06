<template>
  <div id="chartForBar" style="width:100%;height:400px;"></div>
</template>

<script>
export default {
  name: "chartsForBar",
  data() {
    return {
      total: 0,
      option: {
        title: {
          text: sessionStorage.getItem("departmentName") + "各状态人数分析"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        yAxis: {
          type: "value"
        },
        xAxis: {
          type: "category",
          data: [
            "确诊",
            "疑似",
            "咳嗽",
            "发烧",
            "气促",
            "隔离",
            "休假",
            "旅居史",
            "接触史"
          ]
        },
        series: [
          {
            name: "人数（例）",
            type: "bar",
            stack: "总量",
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
                  ele.value +
                  "例(" +
                  ((ele.value * 100) / this.total).toFixed(1) +
                  "%)"
                );
              },
              show: true,
              position: "top"
            },
            data: []
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
      var myChart = this.$echarts.init(document.getElementById("chartForBar"));
      myChart.setOption(this.option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
