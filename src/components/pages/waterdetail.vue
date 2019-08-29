<template>
  <div class="waterdetail">
    <mt-header title="详细">
      <mt-button icon="back" slot="left" @touchstart.native="goback"></mt-button>
      <mt-button class="iconfont icon-ren" slot="right"></mt-button>
    </mt-header>
    <div class="waterinfo">
      <img :src="detail.img" alt />
      <div class="detail_info">
        <h2 class="water_name">{{detail.name}}</h2>
        <van-rate
          v-model="detail.score"
          size="12px"
          void-icon="star"
          void-color="#eee"
          class="score"
          readonly
        />
        <p class="salenum">月售{{detail.count}}桶</p>
        <p class="price">
          ￥{{detail.price}}
          <span>/桶</span>
        </p>
        <p class="visiter">
          <span class="iconfont icon-dianzan_leave">{{detail.likeNum}}</span>
          <span class="visitnum">浏览数：{{detail.readNum}}</span>
        </p>
      </div>
    </div>
    <div class="connect">
      <div class="address">
        <p class="location">
          <span class="iconfont icon-location"></span>
          {{detail.len}}
        </p>
        <p class="wateraddress">{{detail.address}}</p>
      </div>
      <a class="phone" :href="'tel:'+detail.tel">
        <span class="iconfont icon-weibiaoti-"></span>
      </a>
    </div>
    <div class="store">
      <h2 class="store_title">商家信息</h2>
      <p class="store_info">{{detail.des}}</p>
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
      this.$router.push("/watercomment?id=" + id);
    }
  },
  watch: {},
  computed: {},
  mounted() {
    var id = this.$route.query.id;
    console.log(id);
    this.axios({
      url: API.findWater,
      method: "get",
      params: { id }
    }).then(res => {
      this.detail = res.data.data[0];
      this.detail.score = Number(this.detail.score);
      this.detail.price = this.detail.price.slice(0, -2);
      // console.log(this.detail);
    });
    this.axios({
      url: API.findComment,
      method: "get",
      params: { waterId: id }
    }).then(res => {
      this.comment = res.data.data;
      console.log(this.comment);
    });
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.waterdetail {
  background: #f5f5f5;
  width: 100vw;
  // height: 100vh;
  overflow: auto;
}

.waterdetail>>>.mint-header {
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

.waterinfo {
  width: 6.2rem;
  height: 1.9rem;
  margin-left: 0.1rem;
  background: #fff;
  margin-top: 0.98rem;
}

.waterinfo img {
  width: 1.96rem;
  height: 1.78rem;
  margin-left: 0.03rem;
  margin-top: 0.03rem;
}

.detail_info {
  width: 4.21rem;
  float: right;
  height: 1.9rem;
  // background skyblue
  box-sizing: border-box;
  padding-top: 0.13rem;
  padding-left: 0.17rem;
}

.detail_info .water_name {
  color: #333333;
  font-size: 0.28rem;
}

.score {
  float: left;
  margin-top: -0.54rem;
}

.salenum {
  font-size: 0.24rem;
  color: #333333;
  line-height: 0.46rem;
  margin-left: 1.72rem;
}

.price {
  font-size: 0.28rem;
  color: #ff6600;
  clear: both;
}

.price span {
  color: #9a9a9a;
  font-size: 0.2rem;
}

.visiter {
  margin-top: -0.2rem;
  float: right;
  margin-right: 0.1rem;
}

.icon-dianzan_leave {
  font-size: 0.28rem;
}

.visitnum {
  font-size: 0.24rem;
}

.connect {
  width: 6.2rem;
  height: 1rem;
  margin-top: 0.12rem;
  margin-left: 0.1rem;
  margin-bottom: 0.14rem;
  background: #fff;
  box-sizing: border-box;
  padding: 0.1rem 0 0.1rem 0.12rem;
  color: #919191;
}

.address {
  float: left;
}

.location {
  font-size: 0.24rem;
}

.wateraddress {
  font-size: 0.24rem;
  margin-top: 0.26rem;
}

.phone {
  display: block;
  width: 0.96rem;
  height: 0.8rem;
  float: right;
  box-sizing: border-box;
  border-left: 1px solid #f5f5f5;
  text-align: center;
  position: relative;
}

.phone span {
  line-height: 0.65rem;
  font-size: 0.4rem;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #ff6600;
}

.store {
  width: 6.2rem;
  height: 2.53rem;
  margin-left: 0.1rem;
  background: #fff;
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

.van-button--primary {
  height: 0.5rem;
  width: 1.92rem;
  line-height: 0.5rem;
  position: absolute;
  top: 50%;
  border-radius: 0.1rem;
  margin-top: -0.25rem;
}

.van-button--warning {
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