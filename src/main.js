// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
//按需导入mint-ui的组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//导入mui的样式
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"
//导入axios
import axios from "axios"
//导入moment
import moment from "moment"
// 引入vant
import Vant from 'vant'
import "../node_modules/vant/lib/index.css"
import VuePreview from "vue-preview"

Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

Vue.use(MintUI)
Vue.use(VuePreview)
/* eslint-disable no-new */

Vue.filter("dateFormat", function(dateStr,patten="YYYY-MM-DD HH:mm:ss"){
  return moment(dateStr).format(patten)
})

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
