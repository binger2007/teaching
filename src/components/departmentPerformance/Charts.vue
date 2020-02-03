<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span> 绩效评分 </span>
    </div>
    <div id="main2" style="width:100%;height:250px;"></div>
  </el-card>
</template>

<script>
export default {
  name: "charts",
  data() {
    return {
      chartOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: "50% "
        },
        legend: {
          data: ["思想教育", "军事训练", "日常管理"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "1%",
          containLabel: true
        },
        yAxis: {
          type: "value"
        },
        xAxis: {
          type: "category",
          data: [],
          department_id: [], //横坐标单位对应的部门id
          subDepartPersonNum: [] //记录单位人数
        },
        series: [
          {
            name: "总分数",
            type: "bar",
            barGap: "-100%", // 左移100%，stack不再与上面两个在一列
            label: {
              normal: {
                show: true,
                position: "top", //  位置设为top
                formatter: "{c}",
                textStyle: { color: "#000" }
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(128, 128, 128, 0)" // 仍为透明
              }
            },
            data: []
          },
          {
            name: "思想教育",
            type: "bar",
            stack: "总分",
            label: {
              show: true,
              position: "inside"
            },
            itemStyle: {
              normal: {
                color: "#f45b5b"
              }
            },
            data: []
          },
          {
            name: "军事训练",
            type: "bar",
            stack: "总分",
            label: {
              show: true,
              position: "inside"
            },
            itemStyle: {
              normal: {
                color: "#8085e9"
              }
            },
            data: []
          },
          {
            name: "日常管理",
            type: "bar",
            stack: "总分",
            label: {
              show: true,
              position: "inside"
            },
            itemStyle: {
              normal: {
                color: "#e6a23c"
              }
            },
            data: []
          }
        ]
      }
    };
  },
  methods: {
    //绘制图形
    initChart(data) {
      var arr = [];
      this.chartOption.series.forEach(ele => {
        ele.data = [];
      });
      data.forEach(ele => {
        arr.push(ele.label);
        this.chartOption.series.forEach((item, index) => {
          item.data.push(ele["s" + index]);
        });
      });
      this.chartOption.xAxis.data = arr;
      // 绘制图表
      var myChart = this.$echarts.init(document.getElementById("main2"));
      myChart.setOption(this.chartOption);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
