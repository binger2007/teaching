<template>
  <el-dialog :visible.sync="dialogVisible" width="80%">
    <div class="school">
      <!-- 头部区域 -->
      <div class="header">
        <h1>
          {{ departmentArr[departmentArr.length - 5] }}市{{
            departmentArr[departmentArr.length - 4]
          }}
          <br />新冠肺炎疫情防控工作{{
            info.classify == 0 ? "教职工" : info.classify == 1 ? "学生" : ""
          }}健康动态监测卡
        </h1>
        <div class="school_title">
          <el-row :gutter="20">
            <el-col :span="8">
              <span
                >学校：{{ departmentArr[departmentArr.length - 3] }}</span
              ></el-col
            >
            <el-col :span="8">
              <span
                >班级：{{ departmentArr[departmentArr.length - 2]
                }}{{ departmentArr[departmentArr.length - 1] }}</span
              ></el-col
            >
            <el-col :span="8">
              <span>检测人：{{ info.jianceren }}</span></el-col
            >
          </el-row>
        </div>
      </div>
      <!-- 中间表格区域 -->
      <div class="middle">
        <table>
          <tbody>
            <!-- 第1行 -->
            <tr class="tr1">
              <td colspan="2">姓名</td>
              <td>{{ info.name }}</td>
              <td>性别</td>
              <td colspan="3">
                <el-checkbox :checked="info.sex == '男'">男</el-checkbox>
                <el-checkbox :checked="info.sex == '女'">女</el-checkbox>
              </td>
              <td>班级</td>
              <td colspan="2">{{ info.label }}</td>
            </tr>
            <!-- 第2行 -->
            <tr>
              <td colspan="2">家庭住址</td>
              <td colspan="2">{{ info.address }}</td>
              <td colspan="2">家庭成员数</td>
              <td>{{ info.members }}</td>
              <td>联系电话</td>
              <td colspan="2">{{ info.tel }}</td>
            </tr>
            <!-- 第3行 -->
            <tr class="tr3">
              <td colspan="2">本人是否“四类人员”</td>
              <td colspan="8">
                <el-checkbox :checked="info.selfQuezhen == 1">确诊</el-checkbox>
                <el-checkbox :checked="info.selfYisi == 1">疑似</el-checkbox>
                <el-checkbox :checked="info.selfMiqie == 1"
                  >密切接触者</el-checkbox
                >
                <el-checkbox :checked="info.selfFare == 1"
                  >发热人员</el-checkbox
                >
                <el-checkbox
                  :checked="
                    !info.selfQuezhen &&
                      !info.selfYisi &&
                      !info.selfMiqie &&
                      !info.selfFare
                  "
                  >否</el-checkbox
                >
              </td>
            </tr>
            <!-- 第4行 -->
            <tr class="tr4">
              <td colspan="2">家庭成员是否“四类人员”</td>
              <td colspan="8">
                <el-checkbox :checked="info.homeQuezhen == 1">确诊</el-checkbox>
                <el-checkbox :checked="info.homeYisi == 1">疑似</el-checkbox>
                <el-checkbox :checked="info.homeMiqie == 1"
                  >密切接触者</el-checkbox
                >
                <el-checkbox :checked="info.homeFare == 1"
                  >发热人员</el-checkbox
                >
                <el-checkbox
                  :checked="
                    !info.homeQuezhen &&
                      !info.homeYisi &&
                      !info.homeMiqie &&
                      !info.homeFare
                  "
                  >否</el-checkbox
                >
              </td>
            </tr>
            <!-- 第5行 -->
            <tr class="tr5">
              <td rowspan="20" colspan="2">
                体温检测
                <br />情况记录
              </td>
              <td rowspan="2" colspan="2">日期</td>
              <td>体温</td>
              <td>体温</td>
              <td rowspan="2" colspan="2">日期</td>
              <td>体温</td>
              <td>体温</td>
            </tr>
            <!-- 第6行 -->
            <tr class="tr6">
              <td>晨</td>
              <td>午</td>
              <td>晨</td>
              <td>午</td>
            </tr>
            <!-- 第7行 -->
            <tr v-for="(item, index) in performance" :key="index">
              <td colspan="2">{{ item[0].pubdate }}</td>
              <td :class="item[0].temp_am > 37.5 ? 'red' : ''">
                {{ item[0].temp_am ? +item[0].temp_am + "℃" : "" }}
              </td>
              <td :class="item[0].temp_noon > 37.5 ? 'red' : ''">
                {{ item[0].temp_noon ? +item[0].temp_noon + "℃" : "" }}
              </td>
              <td colspan="2">{{ item.length > 1 ? item[1].pubdate : "" }}</td>
              <td
                :class="item.length > 1 && item[1].temp_am > 37.5 ? 'red' : ''"
              >
                {{
                  item.length > 1 && item[1].temp_am
                    ? item[1].temp_am + "℃"
                    : ""
                }}
              </td>
              <td
                :class="
                  item.length > 1 && item[1].temp_noon > 37.5 ? 'red' : ''
                "
              >
                {{
                  item.length > 1 && item[1].temp_noon
                    ? item[1].temp_noon + "℃"
                    : ""
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 底部区域 -->
      <div class="footer">
        <div class="left">
          <p>填表说明：</p>
        </div>
        <div class="right">
          <ol style="margin-left:50px;margin-top:10px;">
            <li>家庭成员是指共同居住生活的人员；</li>
            <li>
              是否“四类人员”：如是确诊、疑似、密切接触者、发热人员在相
              应口打√，并在表后附详细说明；
            </li>
            <li>体温检测人是指本人或监护人。</li>
          </ol>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { generateOptions } from "../../assets/js/public";
export default {
  name: "editPerson",
  data() {
    return {
      dialogVisible: false,
      info: {},
      checked: false,
      departmentArr: [],
      performance: []
    };
  },
  mounted() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.school {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 40px;
  box-sizing: border-box;
  font-size: 18px;
}
.header h1 {
  height: 90px;
  text-align: center;
  font-size: 30px;
  line-height: 45px;
}
.school_title {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
table {
  width: 100%;
  text-align: center;
  font-size: 16px;
  table-layout: fixed;
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  box-sizing: border-box;
  height: 45px;
}
.footer {
  margin-top: 20px;
}
.red {
  color: red;
}
</style>
