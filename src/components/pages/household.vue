<template>
  <div class="index">
    <div class="rightpage">
      <mt-header title="找家政">
        <mt-button icon="back" slot="left" @touchstart.native="goback"></mt-button>
        <mt-button class="iconfont icon-ren" slot="right"></mt-button>
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
      <ul class="clearfix householdlist">
        <li v-for="item in symbols" :key="item.type">
          <router-link :to="item.to">
            <img :src="item.img" alt />
          </router-link>
          <h2>{{item.type}}</h2>
        </li>
      </ul>
      <div class="hourwork">
        <div class="leftwork">
          <p class="toptext">临时小时工预约</p>
          <p class="bottomtext">点击这里</p>
          <img src="../../../static/images/hourwork.jpg" alt="">
        </div>
        <div class="rightwork">
          <p class="toptext">临时小时工预约</p>
          <p class="bottomtext">点击这里</p>
          <img src="../../../static/images/hourwork.jpg" alt="">
        </div>
      </div>
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
        {
          img: "../../../static/images/household1.jpg",
          type: "钟点工",
          to: "#"
        },
        {
          img: "../../../static/images/household2.jpg",
          type: "保姆",
          to: "#"
        },
        {
          img: "../../../static/images/household3.jpg",
          type: "月嫂",
          to: "/householdlist"
        },
        {
          img: "../../../static/images/household4.jpg",
          type: "专业保洁",
          to: "#"
        },
        {
          img: "../../../static/images/household5.jpg",
          type: "家电清洗",
          to: "#"
        },
        {
          img: "../../../static/images/household6.jpg",
          type: "家居保养",
          to: "#"
        },
        {
          img: "../../../static/images/household7.jpg",
          type: "新居开荒",
          to: "#"
        },
        {
          img: "../../../static/images/household8.jpg",
          type: "更多",
          to: "#"
        }
      ],
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
      url: API.homeBanner,
      method: "get",
      params: {}
    }).then(res => {
      this.images = res.data.data;
      // console.log(res)
      // console.log(this.images);
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
}

.index>>>.mint-header {
  width: 100%;
  line-height: 0.88rem;
  font-size: 0.32rem;
  height: 0.88rem;
  margin-bottom: 0.2rem;
  background: #007af5;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.index>>>.van-search {
  width: 80%;
  margin-left: 10%;
  margin-top: 0.88rem;
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
  height: 3.26rem;
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
  // height: 2rem;
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

.householdlist {
  height: 4.5rem;
}

.householdlist img {
  width: 0.98rem;
  height: 0.98rem;
}

.householdlist h2 {
  font-size: 0.24rem;
  // font-weight bold
}

.hourwork {
  width: 6.16rem;
  margin-left: 0.18rem;
  position relative
}

.hourwork div {
  width: 2.96rem;
  height: 0.98rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  float: left;
  margin-right: 0.12rem;
  position relative
}
.toptext{
  margin-top:0.28rem;
  font-size 0.2rem
  line-height 0.2rem
  margin-left 0.2rem
}
.bottomtext{
  margin-top:0.12rem 
  font-size 0.2rem
  line-height 0.2rem
  margin-left 0.2rem
}
.hourwork img{
  position absolute
  width:1.03rem 
  height 0.71rem
  bottom:0
  right 0.2rem
}
</style>