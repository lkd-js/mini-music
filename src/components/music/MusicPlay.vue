<template>
  <div class="footer-music">
    <img
      ref="img"
      :src="playMusicList[playIndex].al.picUrl"
      alt=""
      :class="{
        'play-img': true,
        active: !isBtnShow,
      }"
    />

    <div class="song-name" @click="updatePopShow(true)">
      <van-notice-bar :text="playMusicList[playIndex].name" class="name" />
      <span class="notice">横划切换歌曲</span>
    </div>
    <div class="tool-btn">
      <span
        v-show="isBtnShow"
        class="icon icon-play-circle"
        @click="play()"
      ></span>
      <span
        v-show="!isBtnShow"
        class="icon icon-pause-circle"
        @click="play()"
      ></span>
      <span class="icon icon-indent"></span>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playMusicList[playIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="isPopShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicPop :musicMsg="playMusicList[playIndex]" :play="play" />
    </van-popup>
  </div>
</template>

<script>
import MusicPop from "./MusicPop.vue";
import { ref, watch, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    // 获取store 中的states 并添加ref
    // 获取需要用到的state
    const { playMusicList, playIndex, isBtnShow, isPopShow } = toRefs(
      store.state
    );

    // 获取需要用到的mutation
    const {
      updateBtnShow: [updateBtnShow],
      updatePopShow: [updatePopShow],
    } = store._mutations;

    // 定义并用ref获取DOM元素，需要导出
    const audio = ref(null);

    // 自定义函数
    const play = function () {
      if (audio.value.paused) {
        audio.value.play();
        updateBtnShow(false);
      } else {
        audio.value.pause();
        updateBtnShow(true);
      }
    };

    //  添加监听器
    watch(playIndex, () => {
      audio.value.autoplay = true;
      if (audio.value.paused) {
        updateBtnShow(false);
      }
    });
    watch(playMusicList, () => {
      if (isBtnShow) {
        audio.value.autoplay = true;
        updateBtnShow(false);
      }
    });

    // 导出数据
    return {
      audio,
      playMusicList,
      playIndex,
      isBtnShow,
      isPopShow,
      play,
      updateBtnShow,
      updatePopShow,
    };
  },
  components: { MusicPop },
};
</script>

<style lang="less">
@keyframes playRotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.footer-music {
  width: 100%;
  height: 1.4rem;
  background-color: rgb(41, 34, 34);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .play-img {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 0.4rem 0 0.3rem;
    animation: playRotate 10s linear infinite paused;
  }
  .play-img.active {
    animation: playRotate 10s linear infinite running;
  }
  .song-name {
    width: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .name {
      width: 100%;
      color: #fff;
      font-weight: 700;
      font-size: 0.4rem;
      background-color: rgba(255, 255, 255, 0);
    }
    .van-notice-bar__wrap {
      justify-content: center;
    }
    .notice {
      font-size: 0.2rem;
      text-align: center;
    }
  }
  .tool-btn {
    width: 2rem;
    margin-right: 0.28rem;
    font-size: 0.6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      margin-left: 0.2rem;
    }
  }
}
</style>