import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from "../components/Tabbar/HomeContainer.vue"
import MemberContainer from "../components/Tabbar/MemberContainer.vue"
import SearchContainer from "../components/Tabbar/SearchContainer.vue"
import ShopcarContainer from "../components/Tabbar/ShopcarContainer.vue"
import NewsList from "../components/news/newslist.vue"
import NewsInfo from "../components/news/newsinfo.vue"
import PhotoList from "../components/photos/photoList.vue"
import PhotoInfo from "../components/photos/photoInfo.vue"
import GoodsList from "../components/goods/goodslist.vue"
import GoodsInfo from "../components/goods/goodsinfo.vue"
import GoodsDesc from "../components/goods/goodsdesc.vue"
import GoodsComment from "../components/goods/goodscomment.vue"

Vue.use(Router)

export default new Router({
  routes: [
    { path:"/",redirect:"/home"},
    { path:"/home",component:HomeContainer},
    { path:"/member",component:MemberContainer},
    { path:"/shopcar",component:SearchContainer},
    { path:"/search",component:ShopcarContainer},
    { path:"/home/newslist",component:NewsList},
    { path:"/home/newsinfo/:id",component:NewsInfo},
    { path:"/home/photolist",component:PhotoList},
    { path:"/home/photoinfo/:id",component:PhotoInfo},
    { path:"/home/goodslist",component:GoodsList},
    { path:"/home/goodsinfo/:id",component:GoodsInfo},
    { path:"/home/goodsdesc/:id",component:GoodsDesc,name:"goodsinfo"},
    { path:"/home/goodscomment/:id",component:GoodsComment,name:"goodscomment"},
  ],
  linkActiveClass:"mui-active"   //覆盖默认的路由高亮类 routerlinkactive
})
