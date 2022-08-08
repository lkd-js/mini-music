<template>
  <div id="swiper-container">
    <van-swipe :autoplay="3000" lazy-render indicator-color="#fac362">
      <van-swipe-item v-for="image in mystate.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { getBanner } from "@/request/api/home.js";
export default {
  setup() {
    // 自定义属性
    const mystate = reactive({
      images: [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });

    // 自定义生命周期函数
    onMounted(async () => {
      let res;
      if (!sessionStorage.getItem("bannerImg")) {
        res = await getBanner();
        console.log(res);
        mystate.images = res.data.banners;
        sessionStorage.setItem("bannerImg", JSON.stringify(res.data.banners));
      } else {
        console.log("不用重复获取banner啦！");
        mystate.images = JSON.parse(sessionStorage.getItem("bannerImg"));
      }
    });

    return { mystate };
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