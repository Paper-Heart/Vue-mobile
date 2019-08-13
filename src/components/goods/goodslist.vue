<template>
    <div class="goods-list">

        <!-- 在网页中，有两种跳转方式
        方式1、使用a标签===标签跳转
        方式2、使用window.location.href的形式，叫做编程式导航 -->
        <router-link class="goods-item" :to="'/home/goodsinfo/'+item.id" v-for="item in goodslist" :key="item.id" tag="div">
            <img :src="item.img_url">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
        <!-- <div class="goods-item" v-for="item in goodslist" :key="item.sell_price" tag="div" @click="goDetail">
            <img :src="item.img_url">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div> -->
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data(){
        return{
            pageindex:1, //分页的页数
            goodslist:[]
        }
    },
    created(){
        this.getGoodList();
    },
    methods:{
        getGoodList(){
            this.$axios({
                url:"http://www.liulongbin.top:3005/api/getgoods?pageindex="+this.pageindex,
                method:"GET"
            }).then(res=>{
                if(res.data.status===0){
                    // this.goodslist=res.data.message;
                    this.goodslist=this.goodslist.concat(res.data.message);
                }
            });
        },
        getMore(){
            this.pageindex++;
            this.getGoodList();
            if(this.pageindex>2){
                Toast("没有更多了");
            }
        },
        // goDetail(id){
        //     this.$router.push("/home/goodsinfo/"+id);
            
        // }
    }
}
</script>
<style scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 7px;
}
.goods-list .goods-item{
    width: 49%;
    height: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0px;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
}
.goods-list .goods-item img{
    width: 100%;
    height: 100%;
}
.goods-list .goods-item .title{
    font-size: 14px;
}
.goods-item .info{
    background-color: #eee;
}
.goods-item .info p{
    margin: 0;
    padding: 5px;
}
.goods-item .info .now{
    font-size: 16px;
    color: red;
    font-weight: bold;
}
.goods-item .info .old{
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
}
.goods-item .info .sell{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
</style>