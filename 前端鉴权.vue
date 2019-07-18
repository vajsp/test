<template>
  <div>
    <loading v-if="showLoading"></loading>
    <div class="index">
      <!-- 预加载得四张图片 -->
      <img
        class="imgload"
        src="https://mrstatic.oss-cn-beijing.aliyuncs.com/chinalife/message/assets/index/index.png"
        alt
      >
      <img
        class="imgload"
        src="https://mrstatic.oss-cn-beijing.aliyuncs.com/chinalife/message/assets/loading/bg.jpg"
        alt
      >
      <img
        class="imgload"
        src="https://chinalife.bdideal.com/chinalife/message/assets/img/frame.jpg"
        alt
      >
      <img
        class="imgload"
        src="https://mrstatic.oss-cn-beijing.aliyuncs.com/chinalife/message/assets/img/textarea.png"
        alt
      >
      <div class="bg"></div>
      <div class="index_mian"></div>
      <div class="rule" @click="rule"></div>
      <div class="mian">
        <p class="describe">
          您是第
          <i>{{count}}</i> 位参与送祝福的朋友
        </p>
        <div class="send" @click="towrite"></div>
      </div>
    </div>
    <rule v-show="bool" @closeInput="hideRule"></rule>
  </div>
</template>

<script>
import axios from 'axios'
import share from '../api/share.js'
import cookieApi from '../api/cookie.js'
var Dassesskey = "0bc4931cec68452999c7dd8d7f8e26ab";
import rule from "@/components/rule.vue";
import loading from "@/views/loading.vue";
let baseUrl = 'https://chinalife-h5.bdideal.com'//正式域名
// let baseUrl = 'https://life-comment-api.canskj.cn'//测试域名
export default {
  name: 'index',
  data() {
    return {
      bool: false,
      count: '',
      showLoading: true,
      ziti: false,
      count: 0
    }
  },
  components: {
    rule,
    loading
  },
  beforeRouteEnter(to, from, next) {
    let token = cookieApi.getCookie('token');
    let hasCode = window.location.href.match(/code=(\S*)&?/);
    let code = '';
    if (hasCode) {
      code = window.location.href.match(/code=(\S*)&?/)[1];
    }
    if (code != '' && !token) {//有code无token 执行获取token
      axios.get(baseUrl + '/weixin/callback?code=' + code).then(res => {
        var token1 = res.data.data.accessToken;
        next(vm => {
          cookieApi.setCookie('token', token1, 1);
          //授权完直接运行，window.onload会有问题，所以刷新了一下
          location.replace('https://chinalife.bdideal.com/chinalife/message/index.html');
        })
      })
    } else if (code == '' && !token) {//无code，无token，执行获取code方法  首次进来
      axios.get(baseUrl + '/weixin/info').then(res => {
        let url = res.data.data.url;
        // store.commit('setUrl', url);
        location.replace(url);
        // location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + id + "&redirect_uri=http%3a%2f%2fwxlogin.maxrocky.com%2fweixinCLoLOkpOJw%2fchinalife%2fmessage%2findex.html&response_type=code&scope=snsapi_userinfo#wechat_redirect");
      })
    } else {
      next(vm => {
        vm.getCount();
        vm.getUsrInfo();
        vm.hideLoding();
      })
    }
  },
  created() {
    let _this = this;

  },
  mounted() {
    let _this = this;
    setTimeout(function () {
      if (_this.showLoading) {
        window.location.replace('https://chinalife.bdideal.com/chinalife/message/index.html')
      }
    }, 60000)

  },
  methods: {
    hideLoding() {
      let _this = this;
      window.onload = function () {
        _this.showLoading = false
      }
    },
    //获取用户信息
    getUsrInfo() {
      let _this = this;
      this.$api.get('/message/user/info', {}, res => {
        // console.log(res)
        let tx = res.data.data.avatar;
        let name = res.data.data.nickname;
        let isShowPhoneInput = res.data.data.is_show_mobile == 1 ? true : false;
        // _this.$store.commit('setAvatar', 'https://mrstatic.oss-cn-beijing.aliyuncs.com/h5/wanda_new/e18f25df41e7f0a30d4b5b790e456d10.png');
        _this.$store.commit('setAvatar', tx);
        _this.$store.commit('setName', name);
        _this.$store.commit('setPhone', isShowPhoneInput);
      }, error => {
        // console.log(error)
      })
    },
    // 跳转填写祝福页
    getCount() {
      let _this = this;
      this.$api.get('/message/count', {}, res => {
        console.log(res);
        _this.count = res.data.data.person_count;
      }, err => {

      })
    },
    towrite: function () {
      this.$router.replace({
        path: "/write"
      });
    },
    //规则
    rule: function () {
      this.bool = true;
    },

    //隐藏规则
    hideRule: function () {
      this.bool = false;
    },

    show: function (accesskey, content, Tag) {
      var data = {
        Tags: []
      };
      data.Tags.push({
        AccessKey: accesskey,
        Content: content,
        Tag: Tag
      });
      Dassesskey = accesskey;
      $youzikuClient.getBatchFontFace(data, function (result) {
        var length = result.FontfaceList.length;
        for (var i = 0; i < length; i++) {
          // console.log("Tag：" + result.FontfaceList[i].Tag);
          // console.log("AccessKey：" + result.FontfaceList[i].AccessKey);
          // console.log("FontFamily：" + result.FontfaceList[i].FontFamily);
          // console.log("ErrorMessage：" + result.FontfaceList[i].ErrorMessage);
          console.log("Code：" + result.FontfaceList[i].Code);
        }
      });
    },
    inputchange: function (e) {
      if (!e.target.value) {
        this.num_shu = true;
      } else {
        this.num_shu = false;
      }
      var data = {
        Tags: []
      };
      data.Tags.push({ AccessKey: Dassesskey, Content: e.target.value });

      $youzikuClient.getBatchFontFace(data, function (result) {
        var length = result.FontfaceList.length;
        for (var i = 0; i < length; i++) {
          // console.log("Tag：" + result.FontfaceList[i].Tag);
          // console.log("AccessKey：" + result.FontfaceList[i].AccessKey);
          // console.log("FontFamily：" + result.FontfaceList[i].FontFamily);
          // console.log("ErrorMessage：" + result.FontfaceList[i].ErrorMessage);
          console.log("Code：" + result.FontfaceList[i].Code);
        }
      });
      this.show("0bc4931cec68452999c7dd8d7f8e26ab", e.target.value, "#text_zi");
    },
  }
}
</script>

<style scoped>
.imgload {
  position: fixed;
  top: -999999px;
}
.describe {
  font-family: "cl";
}
.index_mian {
  position: absolute;
  top: -0.5rem;
  left: 0;
  height: 13.65rem;
  width: 7.5rem;
  background: url(https://mrstatic.oss-cn-beijing.aliyuncs.com/chinalife/message/assets/index/index.png)
    no-repeat;
  background-size: 100% 100%;
}
.rule {
  width: 0.61rem;
  height: 1.35rem;
  position: absolute;
  top: 3.55rem;
  right: 0.47rem;
  background: url(https://mrstatic.oss-cn-beijing.aliyuncs.com/chinalife/message/assets/index/rule.png)
    no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  -webkit-animation: shake 0.7s ease-in 0s infinite;
}
.mian {
  position: absolute;
  bottom: 0rem;
  left: 0.27rem;
  width: 6.96rem;
  height: 2.5rem;
  background: url(https://mrstatic.oss-cn-beijing.aliyuncs.com/chinalife/message/assets/index/btnBg.png)
    no-repeat;
  background-size: 6.23rem 1.45rem;
  background-position: 0.4rem 0.8rem;
}
.send {
  width: 6.96rem;
  height: 1.91rem;
  background: url(https://mrstatic.oss-cn-beijing.aliyuncs.com/chinalife/message/assets/index/sendOut.png)
    no-repeat;
  background-size: 100% 100%;
  animation: skake 0.7s ease-in 0s infinite;
  -webkit-animation: shake 0.7s ease-in 0s infinite;
}
.describe {
  position: absolute;
  top: 1.6rem;
  left: 0.7rem;
  font-size: 0.3rem;
  color: #7a030d;
  width: 5.45rem;
  height: 0.34rem;
  font-weight: 600;
  text-align: center;
}
.describe i {
  color: #d7111d;
  font-size: 0.28rem;
  font-style: normal;
  font-family: " ", sans-serif;
}
@keyframes shake {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
