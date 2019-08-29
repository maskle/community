<template>
  <div class="household">
    <mt-header title="月嫂">
      <mt-button icon="back" slot="left" @touchstart.native="goback"></mt-button>
      <mt-button class="iconfont icon-ren" slot="right"></mt-button>
    </mt-header>

    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" disabled :options="option" />
      <van-dropdown-item v-model="value2" disabled :options="option" />
      <van-dropdown-item v-model="value3" disabled :options="option" />
    </van-dropdown-menu>
    <ul class="householdlist">
      <li v-for="item in householdinfo" :key="item.id" @touchstart="start" @touchmove="move" @touchend="end(item.id)">
        <img class="pic" :src="item.img" alt />
        <div class="textinfo">
          <h2 class="title">
            <span class="name">{{item.name}}</span>
            <span class="vnum">{{item.vNum}}</span>
            <p class="price">
              <span>{{'￥'+item.price}}</span>/小时
            </p>
          </h2>
          <p class="prinfo">
            <span>{{item.city}}</span>|
            <span>{{item.age+'岁'}}</span>|
            <span>{{item.edu}}</span>|
            <span>{{item.experience+"工作经验"}}</span>
          </p>
          <p class="info">{{item.info}}</p>
          <p class="visiter">
            <span class="iconfont icon-guanzhu">{{item.likeNum}}</span>
            <span class="iconfont icon-haoping">浏览数：{{item.readNum}}</span>
          </p>
        </div>
        <div class="distance">距你{{item.len}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import API from "../../common/js/api";
export default {
  data() {
    return {
      value1: 1,
      value2: 2,
      value3: 3,
      //   value4:4,
      option: [
        { text: "籍贯", value: 1 },
        { text: "工资", value: 2 },
        { text: "年龄", value: 3 }
        // {text: "智能排序", value: 4}
      ],
      householdinfo: [],
      score: 4,
      startY: 0,
      endY: 0
    };
  },
  components: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    todetail(id) {
      this.$router.push("/householddetail?id=" + id);
    },
    start(e) {
      this.startY = e.touches[0].clientY;
      this.endY = 0;
    },
    move(e) {
      this.endY = e.touches[0].clientY;
    },
    end(id) {
      if (this.endY == 0) {
          this.$router.push("/householddetail?id="+id)
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.axios({
      url: API.findHomeWorker,
      method: "get",
      params: {}
    }).then(res => {
    //   console.log(res);
      this.householdinfo = res.data.data;
      for (var i = 0; i < this.householdinfo.length; i++) {
        this.householdinfo[i].price = this.householdinfo[i].price.slice(0, -3);
      }
    });
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.household {
  background: #f5f5f5;
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

.van-dropdown-menu {
  margin-top: 0.88rem !important;
}

.householdlist {
  width: 6.4rem;
}

.householdlist li {
  width: 100%;
  height: 2.04rem;
  margin-bottom: 0.12rem;
  box-shadow: 0 0.05rem 0.06rem black;
  background: #fff;
  box-sizing: border-box;
  padding-top: 0.17rem;
  padding-left: 0.15rem;
}

.householdlist .pic {
  width: 1.19rem;
  height: 1.24rem;
  float: left;
}

.householdlist .textinfo {
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
  line-height 0.4rem
  font-size 0.24rem
  margin-right 0.12rem
}
</style>