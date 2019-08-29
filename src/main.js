// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/iconfont.css'
Vue.config.productionTip = false
import "animate.css"
Vue.use(MintUI);
import Vant from 'vant';
import 'vant/lib/index.css';
import VueLazyload from 'vue-lazyload'
Vue.use(Vant);
Vue.use(VueLazyload)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './assets/css/reset.css'
import './assets/js/rem'
import qs from "qs"
Vue.prototype.qs=qs;
import axios from "axios"
// import Vue from 'vue';
Vue.prototype.axios = axios;
import { Dialog } from 'vant';
Vue.use(Dialog);

import filters from "./filter/index"

for(var i in filters){
  Vue.filter(i,filters[i])
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
