<template>
  <!-- 底部播放模块，全局组件 -->
  <div class="footer-music">
    <!-- 专辑图片（可旋转） -->
    <img
      ref="img"
      :src="playMusicList[playIndex].al.picUrl"
      alt=""
      :class="{
        'play-img': true,
        active: !isBtnShow,
      }"
    />
    <!-- 歌曲名字部分，跑马灯，点击弹出歌曲详情 -->
    <div class="song-name" @click="updatePopShow(true)">
      <van-notice-bar :text="playMusicList[playIndex].name" class="name" />
      <span class="notice"></span>
    </div>
    <!-- 播放模块 -->
    <div class="tool-btn">
      <span
        v-show="isBtnShow"
        class="icon icon-play-circle"
        @click="play(playMusicList[playIndex].id)"
      ></span>
      <span
        v-show="!isBtnShow"
        class="icon icon-pause-circle"
        @click="play()"
      ></span>
      <span class="icon icon-indent" @click="$router.push('/list')"></span>
    </div>
    <!-- 播放器 -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playMusicList[playIndex].id}.mp3`"
      @timeupdate="timeUp()"
    ></audio>
    <!-- 底部弹出，歌曲详情模块MusicPop -->
    <van-popup
      v-model:show="isPopShow"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicPop
        :musicMsg="playMusicList[playIndex]"
        :play="play"
        :timeChange="timeChange"
      />
    </van-popup>
  </div>
</template>

<script>
import MusicPop from "./MusicPop.vue";
import { ref, watch, toRefs, toRef, onUpdated, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    // 获取store 中的state 并添加ref
    // 获取需要用到的state和 getters
    const store = useStore();
    const { playMusicList, playIndex, isBtnShow, isPopShow, curTime, fulTime } =
      toRefs(store.state);
    const getTimeRow = toRef(store.getters, "getTimeRow");
    const getTimeRowMix = toRef(store.getters, "getTimeRowMix");

    // 获取需要用到的mutations和actions
    const {
      updateBtnShow: [updateBtnShow],
      updatePopShow: [updatePopShow],
      updateTime: [updateTime],
      updateMusicRow: [updateMusicRow],
      updateMusicRow2: [updateMusicRow2],
      updateMusicRow3: [updateMusicRow3],
      updateFulTime: [updateFulTime],
    } = store._mutations;
    const {
      nextGo: [nextGo],
    } = store._actions;

    // 获取需要用到的actions;
    const {
      getMusicTxt: [getMusicTxt],
    } = store._actions;

    // 定义并用ref获取DOM元素，需要导出
    const audio = ref(null);

    // 自定义函数
    const play = () => {
      if (audio.value.paused) {
        audio.value.play();
        updateBtnShow(false);
      } else {
        audio.value.pause();
        updateBtnShow(true);
      }
    };

    // 更新当前歌词行数
    const retNum = () => {
      const arr = getTimeRow.value.time1.filter((v) => v < curTime.value);
      const num = arr.length - 1;
      updateMusicRow(num);
    };
    const retNum2 = () => {
      const arr = getTimeRow.value.time2.filter((v) => v < curTime.value);
      const num2 = arr.length - 1;
      updateMusicRow2(num2);
    };
    const retNum3 = () => {
      const arr = getTimeRowMix.value.time3.filter((v) => v < curTime.value);
      const num3 = arr.length - 1;
      updateMusicRow3(num3);
    };

    // 改变时间
    const timeChange = (range) => {
      if (audio.value.currentTime)
        audio.value.currentTime = fulTime.value * (range / 100);
    };
    // 更新时间
    const timeUp = () => {
      retNum();
      retNum2();
      retNum3();
      let timeNow =
        (audio.value.currentTime && audio.value.currentTime * 1000) || 0;
      updateTime(timeNow);
      updateFulTime(
        (audio.value.duration && audio.value.duration) || fulTime.value
      );
    };

    // 生命周期，获取歌词
    onUpdated(() => {
      console.log("===更新歌词和时间===");
      updateFulTime(
        (audio.value.duration && audio.value.duration) || fulTime.value
      );
      getMusicTxt(playMusicList.value[playIndex.value].id);
    });
    onMounted(() => {
      console.log("===获取默认歌词和时间===");
      updateFulTime(
        (audio.value.duration && audio.value.duration) || fulTime.value
      );
      getMusicTxt(playMusicList.value[playIndex.value].id);
    });
    //  添加监听器，控制播放状态
    watch(playIndex, () => {
      // 更新播放器
      audio.value.autoplay = true;
      // 更新时间
      updateFulTime(
        (audio.value.duration && audio.value.duration) || fulTime.value
      );
      // 更新按钮显示
      if (audio.value.paused) {
        updateBtnShow(false);
      }
    });
    watch(playMusicList, () => {
      // 切歌单自动播放
      if (isBtnShow) {
        audio.value.autoplay = true;
        updateBtnShow(false);
      }
    });
    watch(curTime, () => {
      // 播放完毕自动切歌
      if (curTime.value / 1000 >= fulTime.value) {
        nextGo(1);
        updateTime(0);
      }
    });

    return {
      audio,
      playMusicList,
      playIndex,
      isBtnShow,
      isPopShow,
      curTime,
      play,
      updateBtnShow,
      updatePopShow,
      updateTime,
      timeUp,
      timeChange,
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