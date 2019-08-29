<template>
  <div class="household">
    <mt-header :title="householdinfo.name">
      <mt-button icon="back" slot="left" @touchstart.native="goback"></mt-button>
      <mt-button class="iconfont icon-ren" slot="right"></mt-button>
    </mt-header>
    <div class="holdinfo">
      <img class="pic" :src="householdinfo.img" alt />
      <div class="textinfo">
        <h2 class="title">
          <span class="name">{{householdinfo.name}}</span>
          <span class="vnum">{{householdinfo.vNum}}</span>
          <p class="price">
            <span>{{'￥'+householdinfo.price}}</span>/小时
          </p>
        </h2>
        <p class="prinfo">
          <span>{{householdinfo.city}}</span>|
          <span>{{householdinfo.age+'岁'}}</span>|
          <span>{{householdinfo.edu}}</span>|
          <span>{{householdinfo.experience+"工作经验"}}</span>
        </p>
        <p class="info">{{householdinfo.info}}</p>
        <p class="visiter">
          <span class="iconfont icon-guanzhu">{{householdinfo.likeNum}}</span>
          <span class="iconfont icon-haoping">浏览数：{{householdinfo.readNum}}</span>
        </p>
      </div>
      <div class="distance">距你{{householdinfo.len}}</div>
    </div>
    <div class="store">
      <h2 class="store_title">简介</h2>
      <div class="store_info">
        <p class="qualification">
          <i>资格认证:</i>
          <span v-for="item in householdinfo.qualification" :key="item">
            <img src="../../../static/images/shield.jpg" alt />
            {{item}}
          </span>
        </p>
        <p class="type">
          <i>服务项目:</i>
          {{householdinfo.type}}
        </p>
        <p class="think">
          <i>自我评价:</i>
          {{householdinfo.info}}
        </p>
      </div>
    </div>
    <div class="comment">
      <div class="comment_head clearfix">
        <h2 class="comment_title">TA们都在说</h2>
        <img src="../../../static/images/comment.jpg" alt />
        <p class="cominfo">写评论</p>
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
      householdinfo: {},
      comment:[{
          id:"1111111",
          name:"12321312",
          time:1505111111111,
          content:"哈哈哈哈"
      },{
          id:"22222222",
          name:"12312312",
          time:1545111111111,
          content:"嘿嘿嘿嘿"
      }]
    };
  },
  components: {},
  methods: {
      goback(){
          this.$router.go(-1)
      }
  },
  watch: {},
  computed: {},
  mounted() {
    var id = this.$route.query.id;
    // console.log(id);
    this.axios({
      url: API.findHomeWorker,
      method: "get",
      params: { id }
    }).then(res => {
    //   console.log(res);
      this.householdinfo = res.data.data[0];
      this.householdinfo.price = this.householdinfo.price.slice(0, -3);
      this.householdinfo.qualification = this.householdinfo.qualification.split(
        ","
      );
    //   console.log(this.householdinfo.qualification);
    });
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.household {
  background: #f5f5f5;
  width: 100vw;
  height: 100vh;
  overflow: auto;
}

.household>>>.mint-header {
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

.holdinfo {
  width: 100%;
  height: 2.04rem;
  margin-bottom: 0.12rem;
  margin-top: 1rem;
  background: #fff;
  box-sizing: border-box;
  padding-top: 0.17rem;
  padding-left: 0.15rem;
}

.holdinfo .pic {
  width: 1.19rem;
  height: 1.24rem;
  float: left;
}

.holdinfo .textinfo {
  width: 4.73rem;
  height: 1.44rem;
  float: left;
  margin-left: 0.2rem;
}

.title {
  height: 0.28rem;
}

.name {
  font-size: 0.18rem;
  line-height: 0.28rem;
  float: left;
}

.vnum {
  font-size: 0.16rem;
  display: block;
  width: 0.5rem;
  height: 0.24rem;
  box-sizing: border-box;
  border-radius: 0.12rem;
  border: 1px solid #c6eca0;
  float: left;
  line-height: 0.22rem;
  color: #90d649;
  text-align: center;
  margin-left: 0.12rem;
}

.price {
  float: right;
  font-size: 0.16rem;
  color: #9a9a9a;
}

.price span {
  font-size: 0.24rem;
  color: #ff6600;
}

.prinfo {
  font-size: 0.16rem;
  color: #9a9a9a;
  margin-top: 0.1rem;
}

.prinfo span {
  margin: 0 0.1rem;
}

.info {
  font-size: 0.18rem;
  line-height: 0.24rem;
  color: #9a9a9a;
  margin-top: 0.16rem;
}

.visiter {
  margin-top: -0.55rem;
  float: right;
  color: #9a9a9a;
  margin-right: 0.1rem;
}

.icon-guanzhu {
  font-size: 0.28rem;
}

.icon-haoping {
  font-size: 0.28rem;
}

.visitnum {
  font-size: 0.24rem;
}

.distance {
  float: right;
  line-height: 0.4rem;
  font-size: 0.24rem;
  margin-right: 0.12rem;
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
  font-size: 0.36rem;
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
  font-size: 0.24rem;
  color: #919191;
  line-height: 0.3rem;
}

.store_info p {
  line-height: 0.3rem;
  margin-bottom: 0.1rem;
}

.store_info i {
  color: black;
}

.qualification span {
  color: #7ec2e6;
  font-size: 0.24rem;
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
</style>