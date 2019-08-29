<template>
  <div class="index" @touchstart="start($event)" @touchmove="move($event)" @touchend="end()">
    <!-- <van-sidebar v-model="activeKey">
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
    </van-sidebar>-->
    <transition
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft"
    >
      <div class="leftpage" v-show="isappear">
        <div class="userinfo">
          <div class="headpic">
            <img class="headphoto" src="../../../static/images/headpic.jpg" alt />
          </div>
          <h2 class="username">{{name}}</h2>
        </div>
        <div class="leftlist">
          <router-link to="/findTeacher">
            <span class="iconfont icon--teacher"></span>找家教
          </router-link>
          <router-link to="/deliverwater">
            <span class="iconfont icon-shui"></span>送水到家
          </router-link>
          <router-link to="/servicelist">
            <span class="iconfont icon-weixiu1"></span>维修服务
          </router-link>
          <router-link to="/household">
            <span class="iconfont icon-jiazheng"></span>家政服务
          </router-link>
          <router-link to="#">
            <span class="iconfont icon-shequ"></span>社区互动
          </router-link>
          <router-link to="#">
            <span class="iconfont icon-xiaoxi"></span>消息中心
          </router-link>
          <router-link to="#">
            <span class="iconfont icon-shoucang"></span>我的收藏
          </router-link>
          <router-link to="#">
            <span class="iconfont icon-fabu"></span>我的发布
          </router-link>
          <router-link to="#">
            <span class="iconfont icon-zhanghao"></span>账号设置
          </router-link>
          <router-link to="#">
            <span class="iconfont icon-qiehuanzuhu"></span>退出登录
          </router-link>
        </div>
      </div>
    </transition>
    <div class="rightpage" :class="{'toright':isappear}">
      <mt-header title="龙山家园">
        <mt-button class="iconfont icon-xialacaidan" slot="left" @touchend.native="touchstartlist"></mt-button>
        <mt-button class="iconfont icon-location" slot="right">北京</mt-button>
      </mt-header>
      <van-search
        v-model="searchinfo"
        placeholder="Search"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @touchstart="onSearch">我要发布</div>
      </van-search>
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img class="swipeimg" v-lazy="image.img" />
        </van-swipe-item>
      </van-swipe>
      <div class="weather">
        <span class="iconfont icon-tianqi2"></span>
        <div class="weatherbox">
          <p class="topweather">多云/小雨 27/30C</p>
          <p class="bottomweather">3-4级/4-5级风</p>
        </div>
        <div class="timebox">
          <p class="toptime">星期{{curdate.getDay()}}</p>
          <p class="bottomtime">{{(curdate.toLocaleTimeString())}}</p>
        </div>
      </div>
      <ul>
        <li v-for="item in symbols" :key="item.text">
          <router-link :to="item.to">
            <img :src="item.imgs" alt />
          </router-link>
          <h2>{{item.text}}</h2>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
export default {
  data() {
    return {
      searchinfo: "",
      images: [],
      symbols: [
        { imgs: "./static/images/1.jpg", text: "找家教", to: "/findTeacher" },
        {
          imgs: "./static/images/2.jpg",
          text: "送水到家",
          to: "/deliverwater"
        },
        { imgs: "./static/images/3.jpg", text: "维修服务", to: "/servicelist" },
        { imgs: "./static/images/4.jpg", text: "家政", to: "/household" },
        { imgs: "./static/images/5.jpg", text: "社区互动", to: "#" },
        { imgs: "./static/images/6.jpg", text: "更多服务", to: "#" }
      ],
      curdate: new Date(),
      isappear: false,
      name: "",
      startX: 0,
      endX: 0
    };
  },
  components: {},
  methods: {
    onSearch() {},
    touchstartlist() {
      console.log(1);
      this.isappear = !this.isappear;
      console.log(this.isappear);
    },
    start(e) {
      this.startX = e.touches[0].clientX;
      this.endX = 0;
    },
    move(e) {
      this.endX = e.touches[0].clientX;
    },
    end() {
      if (this.endX != 0 && this.startX + 30 < this.endX) {
        this.isappear = true;
        return;
      }
      if (this.endX != 0 && this.endX + 30 < this.startX) {
        this.isappear = false;
        return;
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.axios({
      url: API.banner,
      method: "get",
      params: {}
    }).then(res => {
      this.images = res.data.data;
      // console.log(this.images);
    });
    this.name = sessionStorage.getItem("name");
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.index {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  // background: url('./static/images/loginbg.jpg') center center no-repeat;
  // background-size: cover;
}

.leftpage {
  width: 4.2rem;
  background: #007af5;
  height: 100vh;
  float: left;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 2s;
  z-index: 100;
  // display: none;
}

.rightpage {
  width: 100%;
  float: left;
  transition: all 1s;
}

.toright {
  margin-left: 4.2rem;
}

.index>>>.mint-header {
  line-height: 0.88rem;
  font-size: 0.32rem;
  height: 0.88rem;
  margin-bottom: 0.2rem;
  background: #007af5;
}

.index>>>.van-search {
  width: 80%;
  margin-left: 10%;
  box-sizing: content-box;
  background: rgba(0, 0, 0, 0) !important;
}

.index>>>.van-search__content {
  border-radius: 0.1rem !important;
}

.index>>>.van-search__action {
  background: #007af5;
  color: #fff;
  border-radius: 10px !important;
  margin-left: 0.1rem;
}

.index>>>.van-swipe {
  width: 100%;
  // margin-left:10%;
}

.index>>>.swipeimg {
  width: 100%;
  height: 2.38rem;
}

.weather {
  height: 1.6rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0.48rem 0;
  background: #f5f5f5;
  margin-top: -0.2rem;
}

.icon-tianqi2 {
  font-size: 0.64rem;
  float: left;
  color: blue;
  margin-left: 0.24rem;
}

.weatherbox {
  height: 0.64rem;
  float: left;
  margin-left: 0.32rem;
  color: #808080;
}

.topweather {
  line-height: 0.4rem;
  font-size: 0.32rem;
}

.bottomweather {
  line-height: 0.32rem;
  font-size: 0.24rem;
}

.timebox {
  height: 0.64rem;
  float: right;
  margin-right: 0.32rem;
  color: #808080;
}

.toptime {
  line-height: 0.4rem;
  font-size: 0.32rem;
}

.bottomtime {
  line-height: 0.32rem;
  font-size: 0.24rem;
}

.rightpage ul {
  width: 100%;
}

.rightpage li {
  width: 33%;
  box-sizing: border-box;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  float: left;
  text-align: center;
  height: 2.4rem;
}

.rightpage li:nth-child(3n) {
  border-right: none;
}

li img {
  width: 1 .. 4rem;
  height: 1.04rem;
  margin-top: 0.45rem;
}

li h2 {
  font-size: 16px;
  text-align: center;
}

.userinfo {
  width: 100%;
  height: 1.6rem;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem;
}

.userinfo .headpic {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  overflow: hidden;
  float: left;
}

.userinfo .headphoto {
  width: 1rem;
  height: 1rem;
}

.userinfo .username {
  float: left;
  line-height: 1rem;
  font-size: 0.6rem;
  color: #fff;
  margin-left: 0.5rem;
}

.leftlist {
  width: 80%;
  margin-left: 10%;
}

.leftlist a {
  width: 100%;
  display: block;
  height: 0.48rem;
  border-radius: 0.24rem;
  line-height: 0.48rem;
  font-size: 0.36rem;
  color: #fff;
  background: #1e4ba0;
  margin-bottom: 0.36rem;
}

.leftlist .iconfont {
  margin-left: 0.3rem;
  margin-right: 0.6rem;
}
</style>