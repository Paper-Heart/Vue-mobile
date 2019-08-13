<template>
    <div class="goodsdesc-container">
        <h3>{{info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            info:{},   //图文数据
        }
    },
    created(){
        this.getGoodsDesc();
    },
    methods:{
        getGoodsDesc(){
            this.$axios({
                url:"http://www.liulongbin.top:3005/api/goods/getdesc/"+this.$route.params.id,
                method:"GET"
            }).then(res=>{
                if(res.data.status===0){
                    this.info=res.data.message[0];
                }
            })
        }
    }
}
</script>
<style>
.goodsdesc-container{
    padding: 4px;
}
    .goodsdesc-container h3{
        font-size: 16px;
        color: blue;
        text-align: center;
        margin: 15px 0;
    }
    .goodsdesc-container .content img{
        width: 100%;
    }
</style>