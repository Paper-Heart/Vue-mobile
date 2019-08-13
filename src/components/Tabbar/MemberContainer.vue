<template>
  <div>
    <div class="mui-card">
      <div class="mui-card-header">项目介绍</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          基于vue.js开发的小项目
          <br />
          不同点:①使用axios实现和后端的交互
          <br />
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             ②使用了vue脚手架搭建项目
             <br />
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             ③未能实现babel消除严格模式，使用了vant组件库
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">联系方式</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          邮箱：szx43@vip.qq.com
          <br />QQ：799404275
        </div>
      </div>
      <div class="mui-card-footer">
        <van-icon name="phone-o" size="24px" />&nbsp;&nbsp;Please contact me
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.mui-card-footer {
  font-size: 17px;
}
</style>
