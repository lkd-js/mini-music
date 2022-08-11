<!-- 全局页面vm -->
<template>
  <!-- 页面显示 -->
  <router-view />
  <!-- 底部播放器 -->
  <MusicPlay class="music" v-show="$store.state.isFooterMusic" />
</template>

<script>
import MusicPlay from "@/components/music/MusicPlay.vue";
export default {
  name: "App",
  components: {
    MusicPlay,
  },
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.4rem;
  height: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.music {
  width: 100%;
  height: 1.2rem;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
