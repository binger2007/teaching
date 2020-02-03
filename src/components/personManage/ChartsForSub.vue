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
  name: "chartsForSub",
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
          },
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
          }
        ]
      }
    };
  },
  methods: {
    //绘制图形
    initChart(data, rootId) {
      //初始化
      this.chartOption.xAxis.data = [];
      this.chartOption.xAxis.department_id = [];
      this.chartOption.xAxis.subDepartPersonNum = [];

      //太复杂，分2次循环
      //第一次循环，取出坐标轴
      data.forEach(ele => {
        if (
          ele.p_id == rootId &&
          this.chartOption.xAxis.data.indexOf(ele.label) == -1
        ) {
          //初始化横坐标轴
          this.chartOption.xAxis.data.push(ele.label);
          //初始化横坐标对应的部门id
          this.chartOption.xAxis.department_id.push(ele.department_id);
          //初始化每个子单位的人数为0
          this.chartOption.xAxis.subDepartPersonNum.push(0);
        }
      });

      //填充原始数据
      var xlen = this.chartOption.xAxis.data.length;
      this.chartOption.series[0].data = Array(xlen).fill(30);
      this.chartOption.series[1].data = Array(xlen).fill(40);
      this.chartOption.series[2].data = Array(xlen).fill(30);
      this.chartOption.series[3].data = Array(xlen).fill(0);
      var ids = this.chartOption.xAxis.department_id;
      //第二次循环，计算分数
      data.forEach(ele => {
        //内层循环每个部门id
        ids.forEach((item, index) => {
          if (
            ele.department_id == item ||
            ("," + ele.p_ids).indexOf("," + item + ",") != -1
          ) {
            this.chartOption.xAxis.subDepartPersonNum[index]++;
            this.chartOption.series[0].data[index] += +(ele.s1 - 30).toFixed(2);
            this.chartOption.series[1].data[index] += +(ele.s2 - 40).toFixed(2);
            this.chartOption.series[2].data[index] += +(ele.s3 - 30).toFixed(2);
          }
        });
      });
      //根据单位人数做平均,有没有必要？
      //思想教育
      this.chartOption.series[0].data.forEach((ele, index) => {
        this.chartOption.series[0].data[index] = (
          30 +
          (ele - 30) / this.chartOption.xAxis.subDepartPersonNum[index]
        ).toFixed(2);
      });
      //训练
      this.chartOption.series[1].data.forEach((ele, index) => {
        this.chartOption.series[1].data[index] = (
          40 +
          (ele - 40) / this.chartOption.xAxis.subDepartPersonNum[index]
        ).toFixed(2);
      });
      //日常管理
      this.chartOption.series[2].data.forEach((ele, index) => {
        this.chartOption.series[2].data[index] = (
          30 +
          (ele - 30) / this.chartOption.xAxis.subDepartPersonNum[index]
        ).toFixed(2);
      });

      //计算总分数
      this.chartOption.series[3].data.forEach((ele, index) => {
        this.chartOption.series[3].data[index] = (
          +this.chartOption.series[0].data[index] +
          +this.chartOption.series[1].data[index] +
          +this.chartOption.series[2].data[index]
        ).toFixed(1);
      });

      // 绘制图表
      var myChart = this.$echarts.init(document.getElementById("main2"));
      myChart.setOption(this.chartOption);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
