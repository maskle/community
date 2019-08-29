<template>
  <div class="loginpage">
    <mt-header title="社区注册">
      <mt-button icon="back" slot="left" @touchstart="goback"></mt-button>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="user.name"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="user.pass"></mt-field>
    <mt-field label="电话" placeholder="联系电话" type="text" v-model="user.tel" class="phonefield"></mt-field>
    <mt-button plain type="primary" @touchstart.native="register">注册</mt-button>
  </div>
</template>
<script>
import API from "../../common/js/api";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      user: {
        // type: "2",
        name: "",
        pass: "",
        tel: ""
      }
    };
  },
  components: {},
  methods: {
    register() {
      this.axios({
        url: API.addUser,
        method: "post",
        data: this.qs.stringify(this.user)
      }).then(res => {
        if (res.data.isok) {
          MessageBox("注册成功", "点击确认前往登录");
          this.$router.replace("/login");
        } else {
          MessageBox("注册失败", res.data.info);
        }
      });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  watch: {},
  computed: {},
  mounted() {}
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.loginpage {
  width: 100vw;
  height: 100vh;
  // background: url('../../assets/images/loginbg.jpg') center center no-repeat;
  // background-size: cover;
}

.loginpage>>>.mint-header {
  line-height: 0.88rem;
  font-size: 0.32rem;
  height: 0.88rem;
  margin-bottom: 1.6rem;
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
  // margin-top: 0.3rem;
  width: 80%;
  margin-left: 10%;
}

.loginpage>>>.mint-button {
  width: 80% !important;
  margin-left: 10%;
}

.phonefield {
  border-bottom: 1px solid #ccc !important;
}
</style>