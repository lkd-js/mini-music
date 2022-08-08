<template>
  <!-- 顶部导航 -->
  <div class="topbar-container">
    <span class="icon icon-bars"></span>
    <div class="span-nav">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <span class="icon icon-search"></span>
  </div>
</template>


<style lang="less" scoped>
.topbar-container {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .span-nav {
    width: 70%;
    display: flex;
    justify-content: space-around;
    .active {
      font-weight: 900;
    }
  }
}
</style>