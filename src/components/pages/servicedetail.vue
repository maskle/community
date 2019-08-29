<template>
  <div class="servicedetail">
    <mt-header title="商家详情">
      <mt-button icon="back" slot="left" @touchstart.native="goback"></mt-button>
      <mt-button class="iconfont icon-ren" slot="right"></mt-button>
    </mt-header>
    <div class="shop_info">
      <div class="shop_title">
        <h2 class="title">{{detail.name}}</h2>
        <van-rate
          v-model="detail.score"
          size="12px"
          void-icon="star"
          void-color="#eee"
          class="score"
          readonly
        />
      </div>
      <div class="address">
        <p class="location">
          <span class="iconfont icon-location"></span>
          距你{{detail.len}}
        </p>
        <p class="serviceaddress">{{detail.address}}</p>
      </div>
      <p class="time">营业时间 : 09:00-18:00</p>
      <van-button type="primary">关注</van-button>
      <van-button type="info">向Ta提问</van-button>
      <p class="visiter">
        <span class="iconfont icon-guanzhu">{{detail.likeNum}}</span>
        <span class="iconfont icon-haoping">浏览数：{{detail.readNum}}</span>
      </p>
    </div>
    <div class="store">
      <h2 class="store_title">商家信息</h2>
      <p class="store_info">{{detail.info}}</p>
    </div>
    <div class="comment">
      <div class="comment_head clearfix">
        <h2 class="comment_title">TA们都在说</h2>
        <img src="../../../static/images/comment.jpg" alt />
        <p class="cominfo" @touchstart="makecomment(detail.id)">写评论</p>
      </div>
      <ul class="comment_list">
        <li v-if="comment.length==0" class="noone">暂无数据</li>
        <li v-for="item in comment" :key="item.id">
          <div class="userphoto">
            <img src="../../../static/images/headpic.jpg" alt />
          </div>
          <div class="comright">
            <h2 class="username">
              {{item.name}}
              <span>{{item.time | tonow}}</span>
            </h2>
            <p class="content">{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <van-button round type="primary" plain>分享</van-button>
      <van-button class="van-button--warning" round color="#ff6600">与我联系</van-button>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
export default {
  data() {
    return {
      detail: {},
      comment: []
    };
  },
  components: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    makecomment(id) {
      this.$router.push("/servicecomment?id=" + id);
    }
  },
  watch: {},
  computed: {},
  mounted() {
    var id = this.$route.query.id;
    // console.log(id);
    this.axios({
      url: API.findRepair,
      method: "get",
      params: { id }
    }).then(res => {
      this.detail = res.data.data[0];
      this.detail.score = Number(this.detail.score);
      //   this.detail.price = this.detail.price.slice(0, -2);
      // console.log(this.detail);
    });
    this.axios({
      url: API.findRepairComment,
      method: "get",
      params: { repairId: id }
    }).then(res => {
      this.comment = res.data.data;
      // console.log(this.comment);
    });
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.servicedetail {
  background: #f5f5f5;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

.servicedetail>>>.mint-header {
  width: 100%;
  line-height: 0.88rem;
  font-size: 0.32rem;
  height: 0.88rem;
  // margin-bottom: 0.6rem;
  background: #007af5;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.shop_info {
  width: 6.2rem;
  margin-left: 0.1rem;
  margin-top: 1rem;
  height: 3.03rem;
  background: #fff;
}

.shop_title {
  width: 6.1rem;
  margin-left: 0.05rem;
  border-bottom: 1px solid #ccc;
  height: 0.8rem;
  box-sizing: border-box;
  padding-top: 0.1rem;
}

.title {
  line-height: 0.7rem;
  // margin-top:0.1rem
  margin-left: 0.28rem;
  font-size: 0.36rem;
  float: left;
}

.score {
  float: right;
  margin-top: -0.44rem;
  margin-right: 0.2rem;
}

.address {
  margin-top: 0.27rem;
  color: #9a9a9a;
  margin-left: 0.24rem;
  line-height: 0.36rem;
}

.location {
  font-size: 0.24rem;
}

.serviceaddress {
  margin-left: 0.3rem;
  font-size: 0.24rem;
}

.time {
  font-size: 0.24rem;
  line-height: 0.4rem;
  color: #9a9a9a;
  margin-left: 0.51rem;
}

.shop_info>>>.van-button {
  width: 1.5rem;
  height: 0.4rem;
  float: left;
  font-size: 0.2rem;
  line-height: 0.4rem;
}

.shop_info>>>.van-button--primary {
  margin-left: 0.57rem;
}

.shop_info>>>.van-button--info {
  margin-left: 0.1rem;
}

.visiter {
  margin-top: -0.55rem;
  float: right;
  margin-right: 0.1rem;
}

.icon-guanzhu {
  font-size: 0.28rem;
//   background red
}

.icon-haoping {
  font-size: 0.28rem;
}

.visitnum {
  font-size: 0.24rem;
}

.store {
  width: 6.2rem;
  height: 2.53rem;
  margin-left: 0.1rem;
  background: #fff;
  margin-top: 0.17rem;
}

.store_title {
  line-height: 0.54rem;
  font-size: 0.3rem;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  width: 5.9rem;
  margin-left: 0.15rem;
}

.store_info {
  width: 100%;
  box-sizing: border-box;
  padding-top: 0.32rem;
  padding-left: 0.4rem;
  font-size: 0.28rem;
  color: #919191;
  line-height: 0.3rem;
}

.comment {
  width: 6.2rem;
  // height: 3.08rem;
  margin-left: 0.1rem;
  margin-top: 0.15rem;
  background: #fff;
}

.comment_head {
  width: 6rem;
  height: 0.54rem;
  margin-left: 0.1rem;
  border-bottom: 1px solid #ccc;
}

.comment_title {
  float: left;
  font-size: 0.26rem;
  line-height: 0.54rem;
}

.comment_head img {
  float: left;
  width: 0.3rem;
  height: 0.28rem;
  margin-left: 3.6rem;
  margin-top: 0.1rem;
}

.cominfo {
  float: right;
  font-size: 0.24rem;
  line-height: 0.54rem;
}

.comment_list {
  width: 100%;
}

.comment_list li {
  width: 100%;
  height: 1.3rem;
  box-sizing: border-box;
  padding-top: 0.16rem;
  // background: skyblue;
}

.userphoto {
  width: 0.76rem;
  height: 0.76rem;
  border-radius: 50%;
  overflow: hidden;
  // margin-top:0.16rem;
  margin-left: 0.14rem;
  float: left;
}

.userphoto img {
  width: 0.76rem;
  height: 0.76rem;
  vertical-align: top;
}

.comright {
  width: 5.06rem;
  float: right;
  height: 1.08rem;
  border-bottom: 1px solid #ccc;
}

li:last-child .comright {
  border-bottom: none;
}

.username {
  font-size: 0.28rem;
  line-height: 0.44rem;
  margin-top: 0.18rem;
  font-weight: bold;
}

.content {
  font-size: 0.24rem;
  line-height: 0.24rem;
}

.username span {
  // margin-left: 3.22rem;
  float: right;
  margin-right: 0.2rem;
}

.footer {
  width: 6.2rem;
  margin-left: 0.1rem;
  height: 0.66rem;
  margin-top: 0.4rem;
  background: #fff;
  position: relative;
  box-sizing: border-box;
  padding-top: 0.08rem;
}

.footer .van-button--primary {
  height: 0.5rem;
  width: 1.92rem;
  border-radius: 0.1rem;
  line-height: 0.5rem;
  position: absolute;
  top: 50%;
  margin-top: -0.25rem;
}

.footer .van-button--warning {
  height: 0.5rem;
  width: 4.18rem;
  line-height: 0.5rem;
  position: absolute;
  top: 50%;
  right: 0;
  border-radius: 0.1rem;
  margin-top: -0.25rem;
}

.noone {
  font-size: 0.32rem;
  text-align: center;
  line-height: 1rem;
}
</style>