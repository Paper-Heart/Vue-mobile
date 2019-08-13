// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App.vue"
import router from "./router/index.js"
//按需导入mint-ui的组件
import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
//导入mui的样式
import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css"
//导入axios
import axios from "axios"
//导入moment
import moment from "moment"
// 引入vant
import Vant from "vant"
import "../node_modules/vant/lib/index.css"
import VuePreview from "vue-preview"
import Vuex from "vuex"


Vue.use(Vant)
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

Vue.use(MintUI)
Vue.use(VuePreview)
/* eslint-disable no-new */

//每次调用时，从本地存储中获取数据
var car = JSON.parse(localStorage.getItem('car') || '[]')
const store=new Vuex.Store({
  state:{   //this.$store.state.xxx 
    //相当于data
    car:car   //将购物车中商品数据，用一个数组存储起来
  },
  mutations:{   //this.$store.commit.('方法名','参数')
    //相当于methods
    addToCar(state,goodsinfo){
      //点击加入购物车，把商品信息保存到store中的car上
      var flag=false;
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count+=parseInt(goodsinfo.count);
          flag=true;
          return true;
        }
      })
      if(!flag){
        state.car.push(goodsinfo);
      }
      localStorage.setItem("car",JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
      //修改购物车中商品的数量
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count=parseInt(goodsinfo.count)
          return true;
        }
      })
      //当修改过时，保存到本地
      localStorage.setItem("car",JSON.stringify(state.car))
    },
    removeFormCar(state,id){
      //根据id删除本地数据
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1)
          return true;
        }
      })
      localStorage.setItem("car",JSON.stringify(state.car))
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id==info.id){
          item.selected=info.selected
        }
      })
      localStorage.setItem("car",JSON.stringify(state.car))
    }
  },
  getters:{   //this.$store.getters.xxx
    //相当于计算属性，过滤器
    getAllCount(state){
      var amount=0;
      state.car.forEach(item=>{
        amount+=item.count;
      })
      return amount;
    },
    getGoodsCount(state){
      var otto={}
      state.car.forEach(item=>{
        otto[item.id]=item.count
      })
      return otto
    },
    getGoodsSelected(state){
      var otto={}
      state.car.forEach(item=>{
        otto[item.id]=item.selected
      })
      return otto
    },
    getGoodsCountAndAmount(state){
      var otto={
        count:0,  //数量
        amount:0  //总价
      }
      state.car.forEach(item=>{
        if(item.selected){
          otto.count+=item.count
          otto.amount+=item.price*item.count
        }
      })
      return otto
    }
  }
})

Vue.filter("dateFormat", function(dateStr,patten="YYYY-MM-DD HH:mm:ss"){
  return moment(dateStr).format(patten)
})

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
