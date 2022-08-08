<template>
  <div class="pop-container">
    <img :src="musicMsg.al.picUrl" alt="" class="bgc-img" />
    <div class="header-container">
      <span class="icon icon-chevron-down" @click="updatePopShow(false)"></span>
      <div class="center-com">
        <van-notice-bar class="nbar music-name" :text="musicMsg.name" />
        <van-notice-bar class="nbar names" :text="authorNames()" />
      </div>
      <span class="icon icon-share-2"></span>
    </div>
    <div class="contents-container">
      <img
        :class="{ bar: true, active: isBtnShow }"
        src="@/assets/bar.png"
        alt=""
      />
      <img class="loop" src="@/assets/loop.png" alt="" />
      <img
        class="play"
        src="@/assets/play.png"
        alt=""
        v-show="isBtnShow"
        @click="play()"
      />
      <img
        :src="musicMsg.al.picUrl"
        alt=""
        :class="{ img: true, active: !isBtnShow }"
      />
    </div>
    <div class="footer-container">
      <div class="nav-com">
        <van-icon class="iconv" name="like-o" />
        <van-icon class="iconv" name="down" />
        <van-icon class="iconv" name="comment-o" badge="99+" />
        <van-icon class="iconv" name="ellipsis" dot />
      </div>
      <div class="player">
        <span class="icon icon-history"></span>
        <span class="icon icon-step-backward"></span>
        <span
          v-show="isBtnShow"
          class="icon iconp icon-play-circle"
          @click="play()"
        ></span>
        <span
          v-show="!isBtnShow"
          class="icon iconp icon-pause-circle"
          @click="play()"
        ></span>
        <span class="icon icon-step-forward"></span>
        <span class="icon icon-indent"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();

    // 获取需要的state
    const { isBtnShow } = toRefs(store.state);

    // 获取需要用到的mutation
    const {
      updateBtnShow: [updateBtnShow],
      updatePopShow: [updatePopShow],
    } = store._mutations;

    // 自定义函数
    function authorNames() {
      let arr = [];
      props.musicMsg.ar.forEach((v) => {
        arr.push(v.name);
      });
      return arr.join(" & ");
    }
    return {
      authorNames,
      isBtnShow,
      updateBtnShow,
      updatePopShow,
    };
  },
  props: ["musicMsg", "play"],
};
</script>

<style lang="less">
.pop-container {
  width: 100%;
  height: 100%;
  position: relative;
  .bgc-img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    filter: blur(20px);
  }
  .header-container {
    height: 1.2rem;
    width: 100%;
    padding: 0 0.4rem;
    background-color: rgba(34, 33, 33, 0.555);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      font-size: 0.6rem;
    }
    .center-com {
      width: 4rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .nbar {
        width: 100%;
        height: 50%;
        line-height: 0.6rem;
        text-align: center;
        background-color: rgba(255, 255, 255, 0);
        color: #fff;
      }
      .van-notice-bar__wrap {
        justify-content: center !important;
      }
      .music-name {
        font-size: 0.36rem !important;
      }
    }
  }
  .contents-container {
    width: 100%;
    height: 9rem;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bar {
      height: 2.6rem;
      position: fixed;
      margin-left: 1rem;
      z-index: 2;
      transition: all 2s ease;
      transform-origin: 5% 5%;
    }
    .bar.active {
      transform: rotate(-30deg);
    }
    .loop {
      height: 6.5rem;
      margin-top: 1.1rem;
      z-index: 1;
    }
    .play {
      height: 2rem;
      position: absolute;
      top: 38%;
      z-index: 5;
    }
    .img {
      height: 4.3rem;
      width: 4.3rem;
      border-radius: 50%;
      margin-top: -5.4rem;
      z-index: 3;
      animation: playRotate 10s linear infinite paused;
    }
    .img.active {
      animation: playRotate 10s linear infinite running;
    }
  }
  .footer-container {
    .nav-com {
      width: 100%;
      height: 1.6rem;
      position: fixed;
      bottom: 1.6rem;
      left: 0;
      background-color: rgba(34, 33, 33, 0.555);
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 99;
      .iconv {
        font-size: 0.6rem;
      }
    }
    .player {
      width: 100%;
      height: 1.6rem;
      background-color: rgba(34, 33, 33, 0.555);
      border-top: 1px solid #ccc;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 9;
      .icon {
        font-size: 0.5rem;
      }
      .icon.iconp {
        font-size: 1rem;
      }
    }
  }
}
</style>