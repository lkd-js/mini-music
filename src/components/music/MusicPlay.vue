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
      <span class="notice">滑动切换</span>
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
      <span class="icon icon-indent"></span>
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
      <MusicPop :musicMsg="playMusicList[playIndex]" :play="play" />
    </van-popup>
  </div>
</template>

<script>
import MusicPop from "./MusicPop.vue";
import { ref, watch, toRefs, toRef, onUpdated, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    // 获取store 中的states 并添加ref
    // 获取需要用到的state
    const { playMusicList, playIndex, isBtnShow, isPopShow, curTime } = toRefs(
      store.state
    );
    const getTimeRow = toRef(store.getters, "getTimeRow");

    // 获取需要用到的mutation
    const {
      updateBtnShow: [updateBtnShow],
      updatePopShow: [updatePopShow],
      updateTime: [updateTime],
      updateMusicRow: [updateMusicRow],
      updateMusicRow2: [updateMusicRow2],
    } = store._mutations;

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
      let arr = getTimeRow.value.time1.filter((v) => v < curTime.value);
      let num = arr.length - 1;
      updateMusicRow(num);
    };
    const retNum2 = () => {
      let arr = getTimeRow.value.time2.filter((v) => v < curTime.value);
      let num2 = arr.length - 1;
      updateMusicRow2(num2);
    };

    const timeUp = () => {
      let timeNow = audio.value.currentTime * 1000;
      updateTime(timeNow);
      retNum();
      retNum2();
    };

    // 生命周期，获取歌词
    onUpdated(() => {
      console.log("===更新歌词===");
      getMusicTxt(playMusicList.value[playIndex.value].id);
    });
    onMounted(() => {
      console.log("===获取默认歌词===");
      // let listObj = getTimeRow.value;
      // console.log("listObj=====");
      // console.log(listObj);
      getMusicTxt(playMusicList.value[playIndex.value].id);
    });
    //  添加监听器，控制播放状态
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
      curTime,
      play,
      updateBtnShow,
      updatePopShow,
      updateTime,
      timeUp,
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