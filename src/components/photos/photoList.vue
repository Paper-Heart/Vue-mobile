<template>
  <div>
    <van-tabs>
      <van-tab v-for="item in cates" :key="item.id">
        <!-- :title="item.title" @click.native="getPhotoListByCateId(item.id+3)" -->
        <div
          class="tab-title"
          slot="title"
          @click="getPhotoListByCateId(item.id+3)"
        >{{ item.title }}</div>
      </van-tab>
    </van-tabs>
    <u class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </u>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [] //图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(17);
  },
  methods: {
    getAllCategory() {
      //获取所有图片分类
      this.$axios({
        url: "http://www.liulongbin.top:3005/api/getimgcategory",
        method: "Get"
      }).then(res => {
        if (res.data.status === 0) {
          res.data.message.unshift = { title: "全部", id: 0 };
          this.cates = res.data.message;
        //   console.log(this.cates);
        }
      });
    },
    getPhotoListByCateId(cateid) {
      this.$axios({
        url: "http://www.liulongbin.top:3005/api/getimages/" + cateid,
        method: "GET"
      }).then(res => {
        if (res.data.status === 0) {
          this.list = res.data.message;
        }
      });
    }
  }
};
</script>
<style>
.van-tabs__line {
  background-color: dodgerblue;
  z-index: 100;
}
.van-tab--active {
  color: cornflowerblue;
  z-index: 100;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}
.photo-list li {
  background-color: #ccc;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 0 9px #999;
  position: relative;
}
.photo-list img {
  width: 100%;
  vertical-align: middle;
}
.info {
  color: #ffffff;
  text-align: left;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  max-height: 84px;
  text-decoration: none;
}
.info .info-title {
  font-size: 14px;
  text-decoration: none;
}
.info .info-body {
  font-size: 13px;
}
</style>
