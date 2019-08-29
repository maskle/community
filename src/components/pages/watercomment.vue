<template>
  <div class="commentpage">
    <mt-header title="发表评论">
      <mt-button icon="back" slot="left" @touchstart.native="goback"></mt-button>
      <!-- <mt-button class="iconfont icon-ren" slot="right"></mt-button> -->
    </mt-header>
    <van-cell-group>
      <van-field
        v-model="comment.content"
        label="评论"
        type="textarea"
        placeholder="请输入评论"
        rows="4"
        autosize
      />
    </van-cell-group>
    <van-button type="info" @click="submitcomment">提交评论</van-button>
  </div>
</template>
<script>
import API from "../../common/js/api";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      comment: {
        waterId: "",
        username: "",
        content: "",
        time: ""
      }
    };
  },
  components: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    submitcomment() {
      var curdate = new Date();
      this.comment.time = curdate.getTime();
      console.log(this.comment);
      this.axios({
        url: API.addComment,
        method: "get",
        params: this.comment
      }).then(res => {
        if (res.data.isok) {
          Dialog.alert({
            message: "评论发表成功"
          }).then(() => {
            this.$router.push("/waterdetail?id=" + this.comment.waterId);
          });
        } else {
          Dialog.alert({
            message: "评论发表失败"
          });
        }
      });
    }
  },
  watch: {},
  computed: {},
  mounted() {
    this.comment.waterId = this.$route.query.id;
    this.comment.username = sessionStorage.getItem("name");
    // console.log(this.comment.id);
  }
};
</script>
<style  lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.commentpage>>>.mint-header {
  width: 100%;
  line-height: 0.88rem;
  font-size: 0.32rem;
  height: 0.88rem;
  // margin-bottom: 0.6rem;
  background: #007af5;
}

.commentpage>>>.van-cell__title {
  font-size: 0.32rem !important;
  text-align: center;
  line-height: 1.96rem;
}

.commentpage>>>.van-cell__title {
  border-right: 1px solid #ccc;
}

.commentpage>>>.van-cell__value {
  padding-left: 0.2rem;
}

.commentpage>>>.van-button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.commentpage>>>.van-cell-group {
    margin-top:2.6rem
}
</style>