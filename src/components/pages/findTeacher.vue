<template>
  <div class="index">
    <div class="rightpage">
      <mt-header title="找家教">
        <mt-button icon="back" slot="left" @touchstart.native="goback"></mt-button>
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
      <div class="round_teacher">
        <span class="iconfont icon-location"></span>
        <div class="round_teacherbox">
          <p class="topround_teacher">周边老师</p>
          <p class="bottomround_teacher">发现身边好老师</p>
        </div>
        <div class="questionbox">
          <img class="question_logo" src="../../../static/images/question.jpg" alt />
          <div class="question_box">
            <p class="topquestion">我要提问</p>
            <p class="bottomquestion">难题名师帮你解</p>
          </div>
        </div>
      </div>
      <ul class="clearfix teacherlist">
        <li v-for="item in symbols" :key="item.text">
          <a href="#">
            <img :src="item.img" alt />
          </a>
          <h2>{{item.type}}</h2>
        </li>
      </ul>
      <div class="teacherrank">
        <span class="ranktext">top 排行榜</span>
      </div>
      <ul class="rankinfo">
        <li v-for="item in rank" :key="item.id">
          <img :src="item.img" alt />
          <h2>已报名{{item.num}}人</h2>
          <div class="logo">
            <img class="logopic" :src="item.teacherImg" alt />
          </div>
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
      symbols: [],
      curdate: new Date(),
      isappear: false,
      name: "",
      rank: []
    };
  },
  components: {},
  methods: {
    onSearch() {},
    touchstartlist() {
      this.isappear = !this.isappear;
    },
    goback() {
      this.$router.go(-1);
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.axios({
      url: API.teacherBanner,
      method: "get",
      params: {}
    }).then(res => {
      this.images = res.data.data;
      // console.log(this.images);
    });
    this.axios({
      url: API.teacherType,
      method: "get",
      params: {}
    }).then(res => {
      this.symbols = res.data.data;
      //   console.log(this.symbols);
    });
    this.axios({
      url: API.teacherTop,
      method: "get",
      params: {}
    }).then(res => {
      this.rank = res.data.data;
      console.log(res);
    });
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.index {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  // background: url('./static/images/loginbg.jpg') center center no-repeat;
  // background-size: cover;
}

// .rightpage {
// width: 100%;
// float: left;
// transition: all 1s;
// }
.index>>>.mint-header {
  width: 100%;
  line-height: 0.88rem;
  font-size: 0.32rem;
  height: 0.88rem;
  margin-bottom: 0.2rem;
  background: #007af5;
  position: fixed;
  top: 0;
  z-index 1000
}

.index>>>.van-search {
  width: 80%;
  margin-left: 10%;
  margin-top:0.88rem
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
  height: 3.26rem
}

.round_teacher {
  height: 1.6rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0.48rem 0;
  background: #f5f5f5;
  margin-top: -0.2rem;
}

.round_teacher .icon-location {
  font-size: 0.64rem;
  float: left;
  color: blue;
  margin-left: 0.24rem;
}

.round_teacherbox {
  height: 0.64rem;
  float: left;
  margin-left: 0.32rem;
  color: #808080;
}

.topround_teacher {
  line-height: 0.4rem;
  font-size: 0.32rem;
}

.bottomround_teacher {
  line-height: 0.32rem;
  font-size: 0.24rem;
}

.questionbox {
  height: 0.64rem;
  float: right;
  margin-right: 0.32rem;
  color: #808080;
}

.question_logo {
  width: 0.68rem;
  height: 0.61rem;
  float: left;
}

.question_box {
  float: left;
  margin-left: 0.2rem;
}

.topquestion {
  line-height: 0.4rem;
  font-size: 0.3rem;
}

.bottomquestion {
  line-height: 0.32rem;
  font-size: 0.24rem;
}

.rightpage ul {
  width: 100%;
  height: 2rem;
}

.rightpage li {
  width: 25%;
  box-sizing: border-box;
  float: left;
  text-align: center;
  height: 2rem;
  position: relative;
}

.rightpage li:nth-child(1) h2 {
  margin-top: 0.04rem;
}

li img {
  width: 1.6rem;
  margin-top: 0.15rem;
}

li h2 {
  font-size: 20px;
  text-align: center;
}

.teacherrank {
  width: 80%;
  margin-left: 10%;
  border-bottom: 1px #ccc solid;
  margin-top: 0.4rem;
  position: relative;
}

.ranktext {
  display: block;
  position: absolute;
  font-size: 0.32rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 0 0.15rem;
}

.rankinfo {
  width: 6.2rem;
  margin-left: 0.2rem;
  margin-top: 0.3rem;
}

.rankinfo li {
  width: 2.9rem;
  margin-right: 0.2rem;
  height: 2.5rem;
  position: relative;
}

.rankinfo img {
  width: 2.9rem;
}

.rankinfo h2 {
  // margin-top:0.24rem
  font-size: 0.24rem;
  text-align: left;
  padding-left: 0.2rem;
}

.rankinfo .logo {
  position: absolute;
  right: 0.22rem;
  width: 0.74rem;
  height: 0.74rem;
  border-radius: 50%;
  overflow: hidden;
  bottom: 0rem;
}

.rankinfo .logopic {
  width: 0.74rem;
  height: 0.74rem;
}
.teacherlist img{
  width:1.6rem;
  height 1.12rem
}
</style>