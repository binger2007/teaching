<template>
  <div>
    <!-- 搜索表单 -->
    <Search ref="search" @onSearch="search" :personData="personData"></Search>
    <PersonList ref="PersonList" @changPage="loadPerson"></PersonList>
  </div>
</template>
<script>
import {
  timestampToTime,
  generateOptions,
  computedDepartmentPath, //计算单位数
  getCurrentDate
} from "../../assets/js/public";
import Search from "./Search";
import PersonList from "./PersonList";

export default {
  name: "index",
  data() {
    return {
      rootId: sessionStorage.getItem("departmentId"), //根单位
      departmentData: [], //单位的级联菜单数据
      personData: [], //人员列表数据
      total: "", //人员总数
      loadPersonForm: {
        departmentId: sessionStorage.getItem("departmentId"),
        authed: 2,
        date: getCurrentDate(1)
      }
    };
  },
  components: {
    Search,
    PersonList
  },
  mounted() {
    this.loadDepartment();
  },
  methods: {
    //初始化组件人员信息
    initComponentPersonData() {
      this.$refs.PersonList.personData = this.personData;
      this.$refs.PersonList.total = +this.total;
    },
    //加载单位信息
    loadDepartment() {
      this.$Axios
        .post("handle_department/loadDepartment", {
          departmentId: this.rootId
        })
        .then(res => {
          // 用在列表上，所以需要的是非树状结构
          this.departmentData = generateOptions(res.data);
          this.$refs.search.departmentData = this.departmentData[0];
          this.$refs.search.departmentList = this.departmentData[1];
          this.$refs.PersonList.departmentData = this.departmentData[0];
          this.loadPerson({
            cpage: 1,
            ppage: 10
          });
        });
    },
    //加载人员
    loadPerson(obj) {
      // console.log(obj);
      this.loadPersonForm.cpage = obj.cpage;
      this.loadPersonForm.ppage = obj.ppage;
      this.loadPersonForm.total = obj.total;
      this.$refs.PersonList.currpage = obj.cpage;
      this.$Axios
        .post("handle_person/loadPerson", this.loadPersonForm)
        .then(res => {
          this.personData = res.data.list;
          this.total = res.data.total;
          this.personData.forEach((ele, index) => {
            // console.log(ele);
            ele.date = this.loadPersonForm.date;
            ele.index = index + 1;
            ele.datePerformance = "";
            ele.departmentPath = computedDepartmentPath(
              this.departmentData[1],
              ele.department_id
            );
            // 从performance里取出当天的数据

            ele.performance.forEach(inner => {
              if (inner.pubdate == ele.date) {
                ele.datePerformance = inner;
              }
            });

            if (ele.datePerformance) {
              //导出excel表时，不支持数组，所有需要处理一下数据
              ele.temp_am = ele.datePerformance.temp_am;
              ele.temp_noon = ele.datePerformance.temp_noon;
              ele.temp_pm = ele.datePerformance.temp_pm;
              ele.cough_am = ele.datePerformance.cough_am;
              ele.cough_noon = ele.datePerformance.cough_noon;
              ele.cough_pm = ele.datePerformance.cough_pm;
              ele.qicu_am = ele.datePerformance.qicu_am;
              ele.qicu_noon = ele.datePerformance.qicu_noon;
              ele.qicu_pm = ele.datePerformance.qicu_pm;
              //低烧
              if (
                (ele.datePerformance.temp_pm > 37.5 &&
                  ele.datePerformance.temp_pm <= 39) ||
                (!ele.datePerformance.temp_pm &&
                  ele.datePerformance.temp_noon > 37.5 &&
                  ele.datePerformance.temp_noon <= 39) ||
                (!ele.datePerformance.temp_pm &&
                  !ele.datePerformance.temp_noon &&
                  ele.datePerformance.temp_am > 37.5 &&
                  ele.datePerformance.temp_am <= 39)
              ) {
                ele.dishao = "低烧";
              }
              // 高烧
              if (
                ele.datePerformance.temp_pm > 39 ||
                (!ele.datePerformance.temp_pm &&
                  ele.datePerformance.temp_noon > 39) ||
                (!ele.datePerformance.temp_pm &&
                  !ele.datePerformance.temp_noon &&
                  ele.datePerformance.temp_am > 39)
              ) {
                ele.gaoshao = "高烧";
              }
              //咳嗽
              if (
                ele.datePerformance.cough_pm == "是" ||
                (!ele.datePerformance.cough_pm &&
                  ele.datePerformance.cough_noon == "是") ||
                (!ele.datePerformance.cough_pm &&
                  !ele.datePerformance.cough_noon &&
                  ele.datePerformance.cough_am == "是")
              ) {
                ele.cough = "咳嗽";
              }
              //气促
              if (
                ele.datePerformance.qicu_pm == "是" ||
                (!ele.datePerformance.qicu_pm &&
                  ele.datePerformance.qicu_noon == "是") ||
                (!ele.datePerformance.qicu_pm &&
                  !ele.datePerformance.qicu_noon &&
                  ele.datePerformance.qicu_am == "是")
              ) {
                ele.qicu = "气促";
              }
            } else {
              ele.temp_am = "";
              ele.temp_pm = "";
              ele.cough_am = "";
              ele.cough_pm = "";
              ele.qicu_am = "";
              ele.qicu_pm = "";
            }
          });
          //过滤发烧
          if (this.loadPersonForm.fashao) {
            var arr = [];
            this.personData.forEach(ele => {
              if (ele.gaoshao || ele.dishao) {
                arr.push(ele);
              }
            });
            this.personData = arr;
          }
          //过滤咳嗽
          if (this.loadPersonForm.cough) {
            var arr = [];
            this.personData.forEach(ele => {
              if (ele.cough) {
                arr.push(ele);
              }
            });
            this.personData = arr;
          }
          //过滤气促
          if (this.loadPersonForm.qicu) {
            var arr = [];
            this.personData.forEach(ele => {
              if (ele.qicu) {
                arr.push(ele);
              }
            });
            this.personData = arr;
          }
          this.initComponentPersonData();
        });
    },
    //处理搜索事件
    search(obj) {
      Object.assign(this.loadPersonForm, obj);
      this.loadPersonForm = obj;
      this.loadPerson({
        cpage: 1,
        ppage: 10
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
