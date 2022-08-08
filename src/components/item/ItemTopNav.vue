<template>
  <div class="top-container">
    <div class="left-container">
      <span class="icon icon-arrow-left" @click="$router.go(-1)"></span>
      <span>歌单</span>
    </div>
    <div class="right-container">
      <span class="icon icon-search1"></span>
      <span class="icon icon-menu"></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.top-container {
  width: 100%;
  height: 0.8rem;
  background-color: rgba(34, 33, 33, 0.055);
  display: flex;
  justify-content: space-between;

  .left-container,
  .right-container {
    height: 0.8rem;
    width: 2rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      font-size: 0.48rem;
    }
  }
}
</style>