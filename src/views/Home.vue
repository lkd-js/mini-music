  <!-- HOME页面 -->
<template>
  <!-- 头部导航条 -->
  <TopNav :select="1" />
  <!-- 轮播图 -->
  <SwiperTop />
  <!-- 图标导航条 -->
  <IconList />
  <!-- 推荐歌单 -->
  <MusicList />
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/home/TopNav.vue";
import SwiperTop from "@/components/home/SwiperTop.vue";
import IconList from "@/components/home/IconList.vue";
import MusicList from "@/components/home/MusicList.vue";

export default {
  name: "HomeView",
  components: {
    TopNav,
    SwiperTop,
    IconList,
    MusicList,
  },
};
</script>
