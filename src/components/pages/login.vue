<template>
  <div class="loginpage">
    <mt-header title="社区登录">
      <mt-button icon="back" slot="left"></mt-button>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <mt-field label="用户名" placeholder="邮箱/手机号" v-model="user.name"></mt-field>
    <mt-field label="密码" placeholder="密码" type="password" v-model="user.pass" class="passfield"></mt-field>
    <mt-button plain type="primary" @touchstart.native="login">登录</mt-button>
    <div class="abox">
      <router-link to="/changepsw" class="changepass">忘记密码</router-link>
      <router-link to="/register" class="register">立即注册</router-link>
    </div>
    <div class="crossinfo">
      <span class="crosstext">或者</span>
    </div>
    <p class="othermethod">社交账号快速登录</p>
    <div class="methodslist">
      <span class="iconfont icon-weixin"></span>
      <span class="iconfont icon-weibo"></span>
      <span class="iconfont icon-qq"></span>
    </div>
  </div>
</template>
<script>
import API from "../../common/js/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      user: {
        type: "2",
        name: "",
        pass: ""
      }
    };
  },
  components: {},
  methods: {
    login() {
      this.axios({
        url: API.login,
        method: "post",
        data: this.qs.stringify(this.user)
      }).then(res => {
        if (res.data.isok) {
          MessageBox("登陆成功", "点击确认前往社区");
          sessionStorage.setItem("name",this.user.name)
          this.$router.replace("/index");
        } else {
          MessageBox("登录失败", res.data.info);
        }
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {}
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

// body {
//   background: #f0eff5 !important;
// }

.loginpage {
  width: 100vw;
  height: 100vh;
  background: #f0eff5 !important;
  // background: url('../../assets/images/loginbg.jpg') center center no-repeat;
  // background-size: cover;
}

.loginpage>>>.mint-header {
  line-height: 0.88rem;
  font-size: 0.32rem;
  height: 0.88rem;
  margin-bottom: 1rem;
}

.loginpage >>>.mintui-back {
  line-height: 0.88rem;
  font-size: 0.32rem;
  height: 0.88rem;
}

.loginpage>>>.mint-header-button {
  line-height: 0.88rem;
  font-size: 0.32rem;
  height: 0.88rem;
}

.loginpage>>>.mint-field {
  width: 80%;
  margin-left: 10%;
}

.passfield {
  border-bottom: 1px solid #ccc !important;
}

.loginpage>>>.mint-button {
  width: 80% !important;
  margin-left: 10%;
}

.abox {
  width: 80%;
  margin-left: 10%;
  height: 0.3rem;
  padding: 0.3rem 0;
}

.changepass, .register {
  display: block;
  width: 50%;
  font-size: 0.3rem;
}

.changepass {
  float: left;
}

.register {
  float: right;
  text-align: right;
}
.crossinfo {
  width: 80%;
  margin-left: 10%;
  border-bottom: 1px #ccc solid;
  margin-top: 0.3rem;
  position: relative;
}

.crosstext {
  display: block;
  position: absolute;
  font-size: 0.32rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #f0eff5;
  padding: 0 0.15rem;
}

.othermethod {
  width: 80%;
  margin-left: 10%;
  font-size: 0.24rem;
  text-align: center;
  margin-top: 0.48rem;
}

.methodslist {
  width: 80%;
  height: 90px;
  margin-top: 0.4rem;
  margin-left: 10%;
}

.methodslist span {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background: #fff;
  display: block;
  font-size: 0.6rem;
  float: left;
  text-align: center;
  line-height: 1.2rem;
  margin-left: 0.5rem;
}

.icon-weixin {
  color: #62b900;
}

.icon-weibo {
  color: #E76264;
}

.icon-qq {
  color: #01c3ff;
}
</style>
