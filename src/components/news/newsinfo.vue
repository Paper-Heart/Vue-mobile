<template>
  <div class="newsinfo-container">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间: {{newsinfo.add_time | dateFormat}}</span>
      <span>点击:{{newsinfo.click}}次</span>
    </p>
    <hr />
    <div class="content" v-html="newsinfo.content"></div>

    <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue"
export default {
  data() {
    return {
      id: this.$route.params.id, //将url地址传递的id值挂载到data上
      newsinfo:{}  //空的新闻对象
    };
  },
  created(){
      this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$axios({
        url: "http://www.liulongbin.top:3005/api/getnew/"+this.id,
        method: "GET"
      }).then(res => {
        if (res.data.status === 0) {
          this.newsinfo = res.data.message[0];
        } else {
          Toast("获取新闻列表失败");
        }
      });
    }
  },
  components:{
      //注册子组件
      "comment-box":comment
  }
};
</script>
<style>
.newsinfo-container {
  padding: 0px 4px;
}
.newsinfo-container .title {
  font-size: 16px;
  text-align: center;
  margin: 15px 0;
  color: tomato;
}
.newsinfo-container .subtitle {
  font-size: 13px;
  color: blue;
  display: flex;
  justify-content: space-between;
}
.content img{
    width: 100%;
}
</style>
