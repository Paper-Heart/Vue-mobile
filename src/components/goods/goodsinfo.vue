<template>
  <div class="goodsinfo-container">
    <!-- 小球动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{goodsinfo.market_price}}</del> &nbsp;&nbsp; 销售价:
            <span class="now-price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p class="goods-num">
            购买数量:
            <van-stepper v-model="value" input-width="51px" button-size="32px" :max="goodsinfo.stock_quantity"/>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsinfo.goods_no}}</p>
          <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      value: 1,
      id: this.$route.params.id, //路由参数中的id传递
      lunbotu: [],
      goodsinfo: {},
      ballFlag: false, //控制小球显示隐藏
    };
  },
  created() {
    this.getLunbo();
    this.getGoodsInfo();
  },
  methods: {
    getLunbo() {
      this.$axios({
        url: "http://www.liulongbin.top:3005/api/getthumimages/" + this.id,
        methods: "GET"
      }).then(res => {
        res.data.message.forEach(item => {
          item.img = item.src;
        });
        this.lunbotu = res.data.message;
      });
    },
    getGoodsInfo() {
      this.$axios({
        url: "http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id,
        method: "GET"
      }).then(res => {
        if (res.data.status === 0) {
          this.goodsinfo = res.data.message[0];
        }
      });
    },
    goDesc(id) {
      //点击使用编程式导航跳转到介绍界面
      this.$router.push({ name: "goodsinfo", params: { id } });
    },
    goComment(id) {
      //点击跳转到评论界面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      //添加到购物车
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      //获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect(); //小球在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect(); //徽标在页面中的位置
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s ease";
      el.addEventListener("transitionend", done);
      // done();       //使用done()并不能完成动画 原因未知
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    }
  },
  components: {
    swiper
  }
};
</script>
<style>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
}
.now-price {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
.van-stepper input {
  margin-bottom: 0;
}
.mui-card-footer {
  display: block;
}
.mui-card-footer button {
  margin: 15px 0;
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  top: 400px;
  left: 146px;
  z-index: 100;
}
</style>