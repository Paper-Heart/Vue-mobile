<template>
  <div>
    <mt-swipe :auto="4000" :speed="500">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
        <img :src="item.img" :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  props: ["lunbotuList","isfull"]
};
</script>
<style scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item {
    text-align: center;
}
img {
  /* width: 100%; */
  height: 100%;
}
.full{
    width: 100%;
}
</style>