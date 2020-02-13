<template>
  <div id="app">
    <!-- 路由加载 -->
    <router-view />
  </div>
</template>
<script>
import { getCookie } from "./assets/js/cookie.js";
export default {
  name: "App",
  mounted() {
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if (
      (this.$route.path == "/admin" && !sessionStorage.getItem("uName")) ||
      this.$route.path == "/"
    ) {
      this.$router.push("/login");
    }
    if (this.$route.path == "/member" && !sessionStorage.getItem("mName")) {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  text-decoration: none;
}
a {
  color: #1f2f3d;
}
.clear {
  clear: both;
}
.wrap90 {
  width: 90%;
  margin: 30px auto;
}

/* 滚动条 */
::-webkit-scrollbar-thumb:horizontal {
  /*水平滚动条的样式*/
  width: 4px;
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
::-webkit-scrollbar-track-piece {
  background-color: #fff; /*滚动条的背景颜色*/
  -webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
::-webkit-scrollbar {
  width: 10px; /*滚动条的宽度*/
  height: 8px; /*滚动条的高度*/
}
::-webkit-scrollbar-thumb:vertical {
  /*垂直滚动条的样式*/
  height: 50px;
  background-color: #999;
  -webkit-border-radius: 4px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
}
::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 50px;
  background-color: #9f9f9f;
  -webkit-border-radius: 4px;
}
</style>
