<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item,index) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price red">￥{{item.sell_price}}</span>
                <!--问题:如何从购物车中获取商品的数量呢-->
                <!-- 1.我们可以先创建一个空对象,然后循环购物车中所有商品的数据，把当前循
                            环这条商品的Id,作为对象的属性名,count值作为对象的属性值,这样,当把
                所有的商品循环一遍,就会得到一个对象: { 88: 2,89:1,90:4}-->
                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
              </p>
              <van-stepper
                input-width="53px"
                button-size="25px"
                v-model="$store.getters.getGoodsCount[item.id]"
                :goodsid="item.id"
                @change="changed(item,item.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cal">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>
              已勾选商品
              <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件,
              总价 ￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span>
            </p>
          </div>
          <mt-button type="danger" @click="todo">去结算</mt-button>
        </div>
      </div>
    </div>
    <!-- {{$store.getters.getGoodsSelected}} -->
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      goodslist: [], //购物车商品数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取store中所有商品id，拼接为一个用逗号隔开的字符串
      let idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        //如果购物车没有商品，则直接返回，否则会报错
        return;
      }
      //获取购物车商品列表
      this.$axios({
        url:
          "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
          idArr.join(","),
        method: "GET"
      }).then(res => {
        if (res.data.status === 0) {
          this.goodslist = res.data.message;
        }
      });
    },
    changed(item,id) {
      this.$store.commit("updateGoodsInfo",{
          id:item.id,
          count:this.$store.getters.getGoodsCount[item.id]
      })
    },
    remove(id,index){
        this.goodslist.splice(index,1)
        this.$store.commit("removeFormCar",id)
    },
    selectedChanged(id,val){
        //同步开关
        this.$store.commit("updateGoodsSelected",{id,selected:val})
    },
    todo(){
      Toast("尚未开发");
    }
  }
};
</script>
<style>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
}
.shopcar-container .mui-card {
  display: flex;
}
.shopcar-container .goods-list .mui-card-content-inner {
  display: flex;
  align-items: center;
}
.shopcar-container h1 {
  font-size: 13px;
}
.shopcar-container .goods-list img {
  width: 65px;
  height: 60px;
  padding-right: 5px;
}
.shopcar-container .goods-list .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.shopcar-container .goods-list .info a {
  margin-left: 110px;
}
.shopcar-container .mint-switch {
  padding-right: 5px;
}
.cal {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.red {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
.van-stepper .van-stepper__input{
  margin-bottom: 0px;
}
.shopcar-container .mint-button--danger {
  margin-left: 30px;
}
</style>
