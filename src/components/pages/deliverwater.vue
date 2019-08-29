<template>
  <div class="deliverwater">
    <mt-header title="送水到家">
      <mt-button icon="back" slot="left" @touchstart.native="goback"></mt-button>
    </mt-header>

    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" disabled :options="option" />
      <van-dropdown-item v-model="value2" disabled :options="option" />
      <van-dropdown-item v-model="value3" disabled :options="option" />
    </van-dropdown-menu>
    <ul class="waterlist" @touchstart="start" @touchmove="move" @touchend="end">
      <li v-for="item in waterinfo" :key="item.id">
        <div class="myli" :myid="item.id">
          <img :src="item.img" @touchend.native="todetail(item.id)" alt />
          <div class="waterband" @touchend.native="todetail(item.id)">
            <div class="name_score">
              <h2 class="watername">{{item.name}}</h2>
              <van-rate
                v-model="item.score"
                size="12px"
                void-icon="star"
                void-color="#eee"
                class="score"
                readonly
              />
            </div>
            <div class="des">{{item.des}}</div>
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
        </div>
        <p class="distance">{{item.len}}</p>
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
        { text: "水站", value: 1 },
        { text: "区域", value: 2 },
        { text: "智能排序", value: 3 }
        // {text: "智能排序", value: 4}
      ],
      waterinfo: [],
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
      this.$router.push("/waterdetail?id=" + id);
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
          this.$router.push("/waterdetail?id=" + target.getAttribute("myid"));
        }
      }
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.axios({
      url: API.findWater,
      method: "get",
      params: {}
    }).then(res => {
      console.log(res);
      this.waterinfo = res.data.data;
      for (var i = 0; i < this.waterinfo.length; i++) {
        this.waterinfo[i].score = Number(this.waterinfo[i].score);
      }
    });
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.deliverwater>>>.mint-header {
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

.waterlist {
  width: 6.2rem;
  margin-left: 0.1rem;
}

.waterlist li {
  border-bottom: 1px solid #ccc;
  margin-top: 0.17rem;
  height: 1.42rem;
}

.waterlist img {
  width: 1.72rem;
  height: 1.27rem;
  float: left;
}

.waterband {
  width: 2.9rem;
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

.watername {
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
  width: 0.94rem;
  float: right;
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
  font-size: 0.28rem;
  line-height: 0.48rem;
  color: #929292;
  text-align: center;
}
</style>