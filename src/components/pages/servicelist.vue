<template>
  <div class="deliverservice">
    <mt-header title="商家列表">
      <mt-button icon="back" slot="left" @touchstart.native="goback"></mt-button>
      <mt-button class="iconfont icon-suosou" slot="right"></mt-button>
    </mt-header>

    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" disabled :options="option" />
      <van-dropdown-item v-model="value2" disabled :options="option" />
      <van-dropdown-item v-model="value3" disabled :options="option" />
    </van-dropdown-menu>
    <ul class="servicelist" @touchstart="start" @touchmove="move" @touchend="end">
      <li v-for="item in serviceinfo" :key="item.id">
        <div class="myli" :myid="item.id">
          <div class="serviceband" @touchend.native="todetail(item.id)">
            <div class="name_score">
              <h2 class="servicename">{{item.name}}</h2>
              <van-rate
                v-model="item.score"
                size="12px"
                void-icon="star"
                void-color="#eee"
                class="score"
                readonly
              />
            </div>
            <div class="des">{{item.type}}</div>
            <p class="address">
              <span class="iconfont icon-location"></span>
              {{item.address}}
            </p>
          </div>
        </div>
        <div class="connect">
          <a :href="'tel:'+item.tel">
            <span class="iconfont icon-weibiaoti-"></span>
          </a>
          <span class="distance">{{item.len}}</span>
        </div>
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
        { text: "手机维修", value: 1 },
        { text: "区域", value: 2 },
        { text: "智能排序", value: 3 }
        // {text: "智能排序", value: 4}
      ],
      serviceinfo: [],
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
      this.$router.push("/servicedetail?id=" + id);
    },
    start(e) {
      this.startY = e.touches[0].clientY;
      this.endY = 0;
    },
    move(e) {
      this.endY = e.touches[0].clientY;
    },
    end(e) {
      if (this.endY == 0) {
        var target = e.target;

        while (target.className != "myli" && target.className != "connect") {
          target = target.parentNode;
        }
        if (target.className == "myli") {
          // console.log(target.getAttribute("myid"))
          this.$router.push("/servicedetail?id=" + target.getAttribute("myid"));
        }
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.axios({
      url: API.findRepair,
      method: "get",
      params: {}
    }).then(res => {
      // console.log(res);
      this.serviceinfo = res.data.data;
      for (var i = 0; i < this.serviceinfo.length; i++) {
        this.serviceinfo[i].score = Number(this.serviceinfo[i].score);
      }
    });
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.deliverservice>>>.mint-header {
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

.servicelist {
  width: 6.2rem;
  margin-left: 0.1rem;
}

.servicelist li {
  border-bottom: 1px solid #ccc;
  margin-top: 0.17rem;
  height: 1.42rem;
}

.servicelist img {
  width: 1.72rem;
  height: 1.27rem;
  float: left;
}

.serviceband {
  width: 5rem;
  float: left;
  margin-left: 0.25rem;
  margin-top: 0.1rem;
}

.name_score {
  box-sizing: border-box;
  padding: 0.1rem 0;
  widows: 2.9rem;
  height: 0.42rem;
}

.servicename {
  font-size: 0.28rem;
  float: left;
}

.score {
  float: left;
  margin-top: -0.6rem;
  margin-left: 0.1rem;
}

.des, .address {
  font-size: 0.26rem;
  line-height: 0.32rem;
  color: #9a9a9a;
  margin-top: 0.1rem;
}

.connect {
  width: 0.67rem;
  float: right;
//   height 0.8rem
  margin-right 0.2rem
}

.connect a {
  display: block;
  width: 0.67rem;
  height: 0.67rem;
  box-sizing: border-box;
  border: 1px solid #f5f5f5;
  background: #fbfbfb;
  border-radius: 50%;
  margin-top: 0.1rem;
  text-align: center;
  position: relative;
}

.connect a span {
  line-height: 0.65rem;
  font-size: 0.36rem;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #ff6600;
}

.distance {
  font-size: 0.24rem;
  display block
  text-align center
  margin-top 0.2rem
//   margin-top:-0.1rem
//   line-height: 0.48rem;
}
</style>