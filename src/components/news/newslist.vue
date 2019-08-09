<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <a href="javascript:;">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          />
          <div class="mui-media-body">
            <h2>{{item.title}}</h2>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
        newslist:[]
    };
  },
  created(){
      this.getNewsList();
  },
  methods: {
    getNewsList() {
      //获取新闻列表
      this.$axios({
        url: "http://www.liulongbin.top:3005/api/getnewslist",
        method: "GET"
      }).then(res => {
        if(res.data.status===0){
            this.newslist=res.data.message;
        }else{
            Toast("获取新闻列表失败");
        }
        
      });
    }
  }
};
</script>
<style scoped>
.mui-table-view h2 {
  font-size: 14px;
}
.mui-table-view .mui-ellipsis {
  font-size: 12px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}
</style>
