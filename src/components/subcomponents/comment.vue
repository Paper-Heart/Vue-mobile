<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要评论的内容" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="item.i">
        <div class="cmt-title">第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}</div>
        <div class="cmt-body">{{item.content==="undefined" ? "该用户8会打字嗷" : item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large"  @click="getMore" plain>加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
        pageIndex:1, //默认展示第一页
        comments:[],  //空的评论数据
        msg:""  //评论功能输入的内容
    };
  },
  created(){
      this.getComments();
  },
  methods: {
    getComments() {
      this.$axios({
        url: "http://www.liulongbin.top:3005/api/getcomments/"+this.id+"?pageindex="+this.pageIndex,
        method: "GET"
      }).then(res => {
        if (res.data.status === 0) {
        //   this.comments = res.data.message;
        //需要使用拼接，否则会将老数据清空
        this.comments=this.comments.concat(res.data.message);
        } else {
          Toast("获取评论失败");
        }
      });
    },
    getMore(){
        this.pageIndex++;
        this.getComments();
    },
    postComment(){
      //发表评论
      // if(this.msg.trim().length===0){
      //   return Toast("评论内容不能为空")
      // }
      // this.$axios({
      //   url:"http://www.liulongbin.top:3005/api/postcomment/"+this.$route.params.id,
      //   data:{
			// 			msg:this.msg.trim()
			// 		},
      //   method:"POST"
      // }).then(res=>{
      //   if(res.data.status===0){
      //     var cmt={user_name:"匿名用户",add_time:Date.now(),content:this.msg.trim()}
      //     // cmt=this.$qs.parse(cmt)
      //     this.comments.unshift(cmt)
      //     this.msg=""
      //   }
      // })
       this.$axios.post("http://www.liulongbin.top:3005/api/postcomment/"+this.$route.params.id, {content: this.msg}).then(res => {
        var cmt = {user_name: '匿名用户', add_time: new Date(), content: this.msg}
        this.comments.unshift(cmt)
        this.msg = ''
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  props:["id"]
};
</script>
<style scoped>
.cmt-container h3 {
  font-size: 18px;
}
.cmt-container textarea {
  font-size: 14px;
  height: 85px;
  margin: 0px;
}
.cmt-container .cmt-title {
  background-color: #ccc;
  line-height: 30px;
}
.cmt-list {
  font-size: 14px;
  margin: 5px 0;
}
.cmt-container .cmt-body {
  line-height: 35px;
  text-indent: 2em;
}
</style>
