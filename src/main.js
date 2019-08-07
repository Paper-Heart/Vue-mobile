// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
//按需导入mint-ui的组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//导入mui的样式
import "./lib/mui/css/mui.min.css"
Vue.config.productionTip = false

Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
