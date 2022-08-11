<template>
  <!-- home轮播图 -->
  <div id="swiper-container">
    <van-swipe :autoplay="3000" lazy-render indicator-color="#fac362">
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { getBannerA } from "@/ultils/request";
export default {
  setup() {
    // 自定义属性
    const state = reactive({
      images: [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });
    // 自定义生命周期函数，获取轮播图res并存入session
    onMounted(async () => {
      state.images = await getBannerA();
    });

    return { state };
  },
};
</script>

<style lang="less" scoped>
#swiper-container {
  .van-swipe {
    width: 100%;
    height: 3rem;

    .van-swipe__track {
      .van-swipe-item {
        padding: 0.2rem;
        img {
          width: 100%;
          border-radius: 0.2rem;
        }
      }
    }
  }
}
</style>