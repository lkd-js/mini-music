<template>
  <!-- 图标模块（待开发） -->
  <div class="iconlist-container">
    <div class="iconlist">
      <span class="icon icon-dailymotion"></span>
      <span class="text">每日推荐</span>
    </div>
    <div class="iconlist">
      <span class="icon icon-octopusdeploy"></span>
      <span class="text">私人FM</span>
    </div>
    <div class="iconlist">
      <span class="icon icon-applemusic" id="music"></span>
      <span class="text">歌单</span>
    </div>
    <div class="iconlist">
      <span class="icon icon-codeforces"></span>
      <span class="text">排行榜</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.iconlist-container {
  width: 100%;
  height: 1.8rem;
  padding: 0.3rem 0;
  display: flex;
  justify-content: space-around;
  .iconlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 0.8rem;
      height: 0.8rem;
      font-size: 0.6rem;
      background-image: -webkit-linear-gradient(left bottom, #fb2c61, #fac362);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .text {
      font-size: 0.28rem;
    }
  }
}
</style>
