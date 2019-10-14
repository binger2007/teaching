<template>
  <el-container class="frontPage" id="top">
    <el-header class="header">
      <el-row class="wrap1200">
        <el-col :span="8">
          <router-link to="#top" class="logo">
            <img src="../../assets/img/hd_logo.png" />
          </router-link>
        </el-col>
        <el-col :span="16">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <router-link to="#about">关于我们</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="#fwys">服务优势</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="#cgal">成功案例</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link to="#ywfw">业务范围</router-link>
            </el-menu-item>
            <el-menu-item index="5">
              <router-link to="#top">首页</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>

    <el-carousel style=" height: 460px;margin-top:90px;" class="banner">
      <el-carousel-item class="carousel_wrap">
        <img src="/static/img/05.jpg" />
        <div class="word word1">
          <div class="word_title font-44">好缔网络科技</div>
          <p class="word_cont font-20">轻松为企事业单位创建自己的网站</p>
          <div class="word_num font-14">详情咨询 17732596468</div>
        </div>
      </el-carousel-item>
      <el-carousel-item class="carousel_wrap">
        <img src="/static/img/03.png" />
        <div class="word word2">
          <div class="word_title font-44" style="  text-align: center">以用户为中心的大数据分析产品</div>
          <p
            class="word_cont font-20"
            style="  text-align: center"
          >从采集、建模、存储、分析到智能应用的全流程数据驱动解决方案，帮助企业驱动业务决策和产品智能。</p>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <img src="/static/img/07.png" />
        <div class="word word3">
          <div class="word_title font-44" style="width:20%;">下一代企业级物联网解决方案</div>
          <p
            class="word_cont font-20"
            style="width:24%;"
          >针对不同场景，好缔推出开放式的物联网平台；一个平台，多种应用，让不同场景的用户都能轻松便携的体验物联网应用。</p>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="wrap1200" id="ywfw">
      <h2 class="title">业务范围</h2>
      <div class="sub_title">为企事业单位定制系统化的运营解决方案</div>
      <el-row style="margin-top:50px;">
        <el-col :span="6">
          <div class="fw-item">
            <img src="/static/img/fw-icon1.png" alt class="fw1" />
            <div class="fw-title">网站建设</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="fw-item">
            <img src="/static/img/fw-icon1.png" alt class="fw1" />
            <div class="fw-title">大数据产品</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="fw-item">
            <img src="/static/img/fw-icon1.png" alt class="fw1" />
            <div class="fw-title">物联网建设</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="fw-item">
            <img src="/static/img/fw-icon1.png" alt class="fw1" />
            <div class="fw-title">微信公众号/小程序</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="fw-item">
            <img src="/static/img/fw-icon1.png" alt class="fw1" />
            <div class="fw-title">软件开发</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="fw-item">
            <img src="/static/img/fw-icon1.png" alt class="fw1" />
            <div class="fw-title">IT运维</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="fw-item">
            <img src="/static/img/fw-icon1.png" alt class="fw1" />
            <div class="fw-title">网络建设</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="fw-item">
            <img src="/static/img/fw-icon1.png" alt class="fw1" />
            <div class="fw-title">平面设计</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 成功案例 -->
    <div class="cgal" id="cgal">
      <h2 class="title" style="color:#fff;">成功案例</h2>
      <div class="sub_title" style="color:#fff;">好缔网络为多个行业提供解决方案</div>
      <el-carousel height="500px" style="margin-top:30px;">
        <el-carousel-item v-for="(val,key) in successItems" :key="key">
          <el-row class="wrap1200">
            <el-col :span="12" v-for="(item,key2) in val" :key="key2">
              <el-card :body-style="{ padding: '0px' }" class="box_card">
                <img :src="'http://localhost'+item.image" class="image" />
                <div class="tit">
                  <span>{{item.title}}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 服务优势 -->
    <div class="fwys" id="fwys">
      <h2 class="title">服务优势</h2>
      <div class="sub_title">资深团队、专业服务，让您没有后顾之忧</div>
      <div class="content wrap1200">
        <div>
          <div class="line">
            <img src="/static/img/ys-icon1.png" class="icon" />
            <div class="line-right">
              <span class="tl">资深团队</span>
              <span>
                好缔团队为您答疑解惑，
                <br />提供全方位的运营服务
              </span>
            </div>
          </div>
          <div class="line">
            <img src="/static/img/ys-icon2.png" class="icon" />
            <div class="line-right">
              <span class="tl">专业服务</span>
              <span>
                服务经理一对一服务，
                <br />第一时间响应您的咨询，为您出谋划策
              </span>
            </div>
          </div>
          <div class="line">
            <img src="/static/img/ys-icon3.png" class="icon" />
            <div class="line-right">
              <span class="tl">专注实战</span>
              <span>
                专注于实战，
                <br />众多行业的成功运营经验和案例
              </span>
            </div>
          </div>
        </div>
        <img src="/static/img/fwys.png" />
      </div>
    </div>

    <!-- 关于我们 -->
    <div class="about" id="about">
      <h2 class="title" style="margin-bottom:50px;">关于我们</h2>
      <div class="aaa wrap1200">
        <div class="lt">
          <div class="info">
            <b>唐山市好缔网络科技有限公司，</b> 是国内领先的一站式互联网解决方案服务平台，服务于政府、部队、教育行业、知识付费行业和自媒体行业，帮助知识服务商一站式、全方位的解决用户增长、留存、活跃和变现难题。
          </div>
          <div class="dx"></div>
          <div class="tel">
            <div class="icon">
              <img src="/static/img/phone.png" />
            </div>
            <span>17732596468</span>
          </div>
          <div class="addr">
            <div class="icon">
              <img src="/static/img/addr.png" />
            </div>
            <span>河北省唐山市滦州市新城小商品批发市场174号</span>
          </div>
        </div>
        <div class="rt">
          <div class="qrcode">
            <img src="/static/img/code.jpg" />
          </div>
          <span>扫码添加官方微信公众号</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>
        网站ICP备案：
        <a href="http://www.beian.miit.gov.cn" target="_blank">湘ICP备18013654号</a> &nbsp;&nbsp;版权所有：唐山市好缔网络科技有限公司&nbsp;&nbsp;
        <router-link to="/admin">后台管理</router-link>
      </span>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "frontPageIndex",
  data() {
    return {
      activeIndex: "5",
      successItems: [],
      formInline: {
        keyword: "",
        department: "",
        category: "",
        type: "list",
        pageNo: 1,
        pageSize: 1000,
        sortBy: "weight",
        sortOrder: "DESC"
      }
    };
  },
  mounted() {
    // 加载成功案例
    this.loadSuccessItems("86B1D0D6-3DCF-40CC-B724-EB1EB6A6FBB2");
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 加载成功案例
    loadSuccessItems(cateId) {
      this.formInline.category = cateId;
      this.$Axios
        .post("/handleArticle.php", this.$qs.stringify(this.formInline))
        .then(res => {
          var arr = res.data[1];
          var len = arr.length;
          var n = 2; //假设每行显示2个
          var lineNum = len % 2 === 0 ? len / 2 : Math.floor(len / 2 + 1);
          var result = [];
          for (var i = 0; i < lineNum; i++) {
            var temp = arr.slice(i * n, i * n + n);
            result.push(JSON.parse(JSON.stringify(temp)));
          }
          this.successItems = result;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.frontPage .header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  height: 90px !important;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 19px 1px rgba(243, 243, 243, 1);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.frontPage .el-header {
  padding: 0px;
  /* height: 70px; */
}
.frontPage .wrap1200 {
  width: 1200px;

  margin: 0px auto;
  /* background: red; */
}
.frontPage .logo img {
  margin-top: 16px;
}
.frontPage .el-menu.el-menu--horizontal {
  border-bottom: none;
}
.frontPage .el-menu-demo li {
  float: right;
}
.frontPage .el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.frontPage .el-carousel__container {
  height: 460px;
}
.frontPage .main_wrap {
  padding: 0px;
}
.frontPage .banner {
  margin-top: 10px;

  /* padding: 0px; */
}
.frontPage .banner img {
  height: 460px;
  width: 100%;
}

.frontPage .word {
  position: absolute;
  z-index: 1000;
}
.frontPage .word1 {
  top: 150px;
  left: 20vw;
}
.frontPage .word2 {
  top: 150px;
  left: 0px;
  width: 100%;
  color: white;
}
.frontPage .word3 {
  top: 100px;
  left: 20vw;
  width: 100%;
  color: white;
}
.frontPage .word_title {
  text-align: left;

  margin-bottom: 30px;
}
.font-44 {
  font-size: 44px;
  letter-spacing: 4px;
}
.font-20 {
  font-size: 20px;
  letter-spacing: 4px;
  margin-bottom: 20px;
}
.font-14 {
  font-size: 14px;
}

.frontPage h2.title {
  text-align: center;
  letter-spacing: 4px;
  margin-top: 35px;
}
.frontPage .sub_title {
  text-align: center;
  margin-top: 20px;
  font-size: 21px;
  color: #3b426b;
}

.frontPage .fw {
  margin: 103px 362px 0 365px;
  display: flex;
  flex-wrap: wrap;
}
.frontPage .fw img {
  vertical-align: bottom;
}
.frontPage .fw-item {
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: rgba(133, 142, 180, 1);
  line-height: 24px;
  margin-bottom: 78px;
}
.frontPage .fw-title {
  font-size: 20px;
  font-weight: 500;
  color: rgba(59, 66, 107, 1);
  line-height: 34px;
  margin-top: 24px;
}
.frontPage .fw-underline {
  margin: 11px auto;
  width: 40%;
  height: 3px;
  background: #ffb806;
  border-radius: 1px;
}
.frontPage .fw1 {
  height: 99px;
}
.frontPage .fw-txt {
  text-indent: 2em;
  text-align: justify;
  padding: 0px 20px;
}
.frontPage .cgal {
  background: url("/static/img/sersol.png") no-repeat center 0;
  height: 680px;
  /* margin-top: 75px; */
}

.frontPage .image {
  width: 100%;
  display: block;
  height: 350px;
}
.frontPage .box_card {
  margin: 20px 30px;
}
.frontPage .box_card .tit {
  padding: 14px;
  text-align: center;
  font-size: 16px;
}

.fwys {
  background-color: #eee;
  padding-bottom: 40px;
}

.content {
  margin: 36px 0 152px 0;
  display: flex;
  flex-direction: row;
  justify-items: center;
}
.content img {
  width: 594px;
  height: 390px;
  margin-top: 95px;
}
.line {
  margin-top: 66px;
  display: flex;
  flex-direction: row;
  justify-items: center;
}
.line-right {
  margin-right: 83px;
}
.line-right span {
  display: block;
  font-size: 18px;
  color: #666;
  line-height: 28px;
}
.line-right .tl {
  font-weight: 500;
  font-size: 24px;
  color: #000;
  margin-bottom: 12px;
}
.line .icon {
  width: 91px;
  height: 91px;
  margin: 0 43px 0 71px;
}

/* 关于我们 */
.about {
  background-color: rgba(248, 251, 255, 1);
  padding-bottom: 50px;
}
.aaa {
  margin-top: 85px;
  display: flex;
  justify-content: space-between;
}
.aaa .info {
  width: 593px;
  font-size: 24px;
  color: rgba(29, 38, 84, 1);
  line-height: 45px;
}
.aaa .dx {
  margin: 27px 0 85px 0;
  width: 47px;
  height: 4px;
  background: rgba(255, 121, 109, 1);
  border-radius: 2px;
}
.lt img {
  vertical-align: middle;
}
.tel {
  margin-bottom: 32px;
  line-height: 45px;
}
.tel span {
  font-size: 35px;
  font-weight: bold;
  color: rgba(40, 73, 203, 1);
  vertical-align: middle;
}
.addr span {
  font-size: 20px;
  font-weight: 400;
  color: rgba(29, 38, 84, 1);
  vertical-align: middle;
}
.tel {
  margin-bottom: 32px;
  line-height: 45px;
}
.phone {
  font-size: 20px;
  line-height: 32px;
  color: #1d2654;
  text-align: center;
}
.qrcode {
  margin-bottom: 29px;
  width: 311px;
  height: 314px;
  background: #4590f3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rt {
  margin-left: 153px;
}
.rt span {
  display: block;
  color: rgba(29, 38, 84, 1);
  line-height: 39px;
  font-size: 29px;
  font-weight: 500;
  text-align: center;
}
.qrcode img {
  width: 284px;
  height: 284px;
}
.icon {
  display: inline-block;
  width: 45px;
  height: 45px;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  text-align: center;
  background: #373d44;
  width: 100%;
  font-size: 14px;
  color: #fff;
}
.footer a {
  font-size: 14px;
  color: #fff;
}
</style>
