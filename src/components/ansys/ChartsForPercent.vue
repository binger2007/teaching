<template>
  <div
    id="chartsForPercent"
    style="width:100%;height:calc(100vh - 650px);"
  ></div>
</template>
<script>
export default {
  name: "chartsForPercent",
  data() {
    return {
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
                    "#27727B",
                    "#F3A43B",
                    "#C1232B",
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
              { value: 0, name: "正常" },
              { value: 0, name: "疑似" },
              { value: 0, name: "确诊" }
            ]
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    initChart(data) {
      // 绘制图表
      var myChart = this.$echarts.init(
        document.getElementById("chartsForPercent")
      );
      myChart.setOption(this.option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
