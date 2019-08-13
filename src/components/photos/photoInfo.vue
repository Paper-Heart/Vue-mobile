<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>
    <hr />

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src"> -->
      <!-- 由于版本更新问题，使用如下语法 -->
       <vue-preview :slides="list" ></vue-preview>
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content">
      <!-- 放置一个现成的评论组件 -->
    </div>
    <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      show: false,
      index: 0,
      list: [] //缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$axios({
        url: "http://www.liulongbin.top:3005/api/getimageInfo/" + this.id,
        method: "GET"
      }).then(res => {
        if (res.data.status === 0) {
          this.photoinfo = res.data.message[0];
        }
      });
    },
    getThumbs() {
      //获取缩略图
      this.$axios({
        url: "http://www.liulongbin.top:3005/api/getthumimages/" + this.id,
        method: "GET"
      }).then(res => {
        if (res.data.status === 0) {
          //循环每个图片数据，补全图片宽和高
          res.data.message.forEach((item, id) => {
            item.w = 600;
            item.h = 400;
            item.msrc=item.src;
          });
          //把完整的数据存入list中
            this.list = res.data.message;
        }
      });
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>
<style scroped>
.photoinfo-container {
  padding: 3px;
}
.photoinfo-container h3 {
  color: royalblue;
  font-size: 15px;
  text-align: center;
  margin: 15px 0;
}
.photoinfo-container .subtitle {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.photoinfo-container .content {
  font-size: 13px;
  line-height: 28px;
}
.thumbs figure{
    padding: 8px;
    margin: 0;
}
.thumbs .my-gallery{
    display: flex;
    flex-wrap:wrap;
    justify-content: flex-start;
}
.thumbs img{
    width: 73px;
    height: 73px;
}
</style>