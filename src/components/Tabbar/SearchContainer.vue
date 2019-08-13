<template>
  <div class="search">
    <van-tag size="large" color="skyblue">该功能尚未完成</van-tag>
    <van-loading type="spinner" color="#1989fa" />
  </div>
</template>
<script>
export default {
  mounted() {
    this.$dialog.alert({
      message: "该功能尚未完成噢"
    });
  }
};
</script>
<style scoped>
.search{
    display: flex;
}
.search .van-tag{
    padding: 10px;
    margin: 200px auto;
}
.search .van-loading__spinner{
    margin: 200px 0px;
    margin-left: -70px;
}
</style>
