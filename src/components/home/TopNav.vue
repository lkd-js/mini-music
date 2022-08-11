<template>
  <!-- 顶部导航 -->
  <div class="topbar-container">
    <span class="icon icon-bars" @click="checkLeftShow()"></span>
    <van-popup
      v-model:show="state.isLeftShow"
      position="left"
      :style="{ width: '30%' }"
    >
      <a href="https://github.com/lkd-js/mini_music">
        <span class="icon-github"></span>
        点击前往我的GitHub主页
      </a>
    </van-popup>
    <div class="span-nav">
      <span :class="{ active: select == 0 }" @click="$router.push('/user')"
        >我的</span
      >
      <span :class="{ active: select == 1 }" @click="$router.push('/')"
        >发现</span
      >
      <span :class="{ active: select == 2 }" @click="$router.push('/cun')"
        >云村</span
      >
      <span :class="{ active: select == 3 }" @click="$router.push('/video')"
        >视频</span
      >
    </div>
    <span class="icon icon-search" @click="$router.push('/search')"></span>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
export default {
  setup() {
    const state = reactive({
      isLeftShow: false,
    });

    const checkLeftShow = () => {
      state.isLeftShow = !state.isLeftShow;
    };
    return {
      state,
      checkLeftShow,
    };
  },
  props: ["select"],
};
</script>


<style lang="less" scoped>
.topbar-container {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    font-size: 0.4rem;
    background-color: #473f52;
    color: #fff;
    padding: 0.25rem;
    border-radius: 0.1rem;
  }
  .span-nav {
    width: 70%;
    display: flex;
    justify-content: space-around;
    .active {
      font-weight: 900;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>