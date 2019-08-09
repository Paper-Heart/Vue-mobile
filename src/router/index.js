import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from "../components/Tabbar/HomeContainer.vue"
import MemberContainer from "../components/Tabbar/MemberContainer.vue"
import SearchContainer from "../components/Tabbar/SearchContainer.vue"
import ShopcarContainer from "../components/Tabbar/ShopcarContainer.vue"
import NewsList from "../components/news/newslist.vue"

Vue.use(Router)

export default new Router({
  routes: [
    { path:"/",redirect:"/home"},
    { path:"/home",component:HomeContainer},
    { path:"/member",component:MemberContainer},
    { path:"/shopcar",component:SearchContainer},
    { path:"/search",component:ShopcarContainer},
    { path:"/home/newslist",component:NewsList}
  ],
  linkActiveClass:"mui-active"   //覆盖默认的路由高亮类 routerlinkactive
})
