<template>
  <TopNav />
  <SwiperTop />
  <IconList />
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
