<template>
  <!-- 歌曲详情弹出容器 -->
  <div class="pop-container">
    <!-- 背景图片（模糊） -->
    <img :src="musicMsg.al.picUrl" alt="" class="bgc-img" />
    <!-- 头部容器 -->
    <div class="header-container">
      <span class="icon icon-chevron-down" @click="updatePopShow(false)"></span>
      <div class="center-com">
        <!-- 作者名跑马灯 -->
        <van-notice-bar class="nbar music-name" :text="musicMsg.name" />
        <van-notice-bar class="nbar names" :text="authorNames()" />
      </div>
      <span class="icon icon-share-2"></span>
    </div>
    <!-- 中间部分 -->
    <div class="contents-container">
      <!-- 默认CD模式 -->
      <div class="default-view" v-show="state.isPlayView">
        <!-- 杆 -->
        <img
          :class="{ bar: true, active: isBtnShow }"
          src="@/assets/bar.png"
          alt=""
        />
        <!-- 盘 -->
        <img class="loop" src="@/assets/loop.png" alt="" />
        <!-- 播放按键（播放时隐藏） -->
        <img
          class="play"
          src="@/assets/play.png"
          alt=""
          v-show="isBtnShow"
          @click="play()"
        />
        <!-- 专辑图片（旋转），点击切换到歌词模式 -->
        <img
          :src="musicMsg.al.picUrl"
          alt=""
          :class="{ img: true, active: !isBtnShow }"
          @click="checkView()"
        />
      </div>
      <!-- 歌词模式 -->
      <div
        class="music-view"
        v-show="!state.isPlayView"
        ref="spans"
        @click="checkView()"
      >
        <!-- 翻译按钮，点击切换歌词 -->
        <span
          class="checkLang icon-circle"
          @click.stop="checkText()"
          v-if="state.isLangDef == 0"
          >翻译</span
        >
        <span
          class="checkLang icon-c"
          @click.stop="checkText()"
          v-if="state.isLangDef == 1"
          >翻译</span
        >
        <span
          class="checkLang icon-language"
          @click.stop="checkText()"
          v-if="state.isLangDef == 2"
          >翻译</span
        >
        <!-- 原歌词（英文，日文，中文...） -->
        <div class="txt-container">
          <!-- 歌词内容 -->
          <div
            v-for="(conv1, i1) in getTimeRow.con1"
            :key="`${i1}xx`"
            v-show="state.isLangDef == 0"
            :class="{
              span: true,
              active: i1 == musicRow,
            }"
          >
            {{ conv1 }}
          </div>
        </div>
        <!-- 翻译歌词，中文 -->
        <div class="txt-container">
          <div
            v-for="(conv2, i2) in getTimeRow.con2"
            :key="`${i2}yy`"
            v-show="state.isLangDef == 1"
            :class="{
              span: true,
              active: i2 == musicRow2,
            }"
          >
            {{ conv2 }}
          </div>
        </div>
        <!-- 混合歌词 -->
        <div class="txt-container">
          <div
            v-for="(conv3, i3) in getTimeRowMix.con3"
            :key="`${i3}zz`"
            v-show="state.isLangDef == 2"
            :class="{
              span: true,
              active: i3 == musicRow3,
            }"
          >
            {{ conv3[0] }}<br />
            {{ conv3[1] }}
          </div>
        </div>
      </div>
    </div>
    <!-- 底部部分 -->
    <div class="footer-container">
      <!-- 扩展按钮模块（待开发） -->
      <div class="nav-com">
        <van-icon class="iconv" name="like-o" />
        <van-icon class="iconv" name="down" />
        <van-icon class="iconv" name="comment-o" badge="99+" />
        <van-icon class="iconv" name="ellipsis" dot />
      </div>
      <!-- 进度条模块 -->
      <div class="ranges">
        <div class="cur-time">{{ state.timeStr }}</div>
        <input
          type="range"
          name="timeIng"
          class="progress"
          id="timing"
          min="0"
          max="100"
          @change="updateTiming()"
          v-model="state.pers"
        />
        <div class="ful-time">{{ state.timeStrM }}</div>
      </div>

      <!-- 播放模块 -->
      <div class="player">
        <span class="icon icon-history"></span>
        <span class="icon icon-step-backward" @click="nextGo(-1)"></span>
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
        <span class="icon icon-step-forward" @click="nextGo(1)"></span>
        <span class="icon icon-indent" @click="clickList"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, toRef, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup(props) {
    // 自定义属性
    const state = reactive({
      isPlayView: true,
      isLangDef: 0,
      timeStr: "00:00",
      timeStrM: "99:99",
      pers: 0,
    });
    // 获取歌词spanDOM
    const spans = ref(null);

    const store = useStore();
    const router = useRouter();
    // 获取需要的state和getters
    const {
      isBtnShow,
      curTime,
      musicRow,
      musicRow2,
      musicRow3,
      playIndex,
      fulTime,
    } = toRefs(store.state);

    const getTimeRow = toRef(store.getters, "getTimeRow");
    const getTimeRowMix = toRef(store.getters, "getTimeRowMix");

    // 获取需要用到的mutation,actions
    const {
      updatePopShow: [updatePopShow],
    } = store._mutations;
    const {
      nextGo: [nextGo],
    } = store._actions;

    // 获取全部作者名并进行拼接
    const authorNames = () => {
      let arr = [];
      props.musicMsg.ar.forEach((v) => {
        arr.push(v.name);
      });
      return arr.join(" & ");
    };

    // 切换CD和歌词
    const checkView = () => {
      console.log("---切换view---");
      state.isPlayView = !state.isPlayView;
    };

    // 翻译歌词
    const checkText = () => {
      console.log("---切换歌词---");
      state.isLangDef++;
      state.isLangDef = state.isLangDef % 3;
    };

    // 进度条
    const perTime = () => {
      const time = parseInt(curTime.value / 1000);
      const pers = (time / fulTime.value) * 100;
      state.pers = pers;
    };
    // 进度条时间控制
    const updateTiming = () => {
      // console.log(state.pers);
      props.timeChange(state.pers);
    };
    // 时间显示换算
    const testTime = (time) => {
      const min = parseInt(time / 60);
      const sec = time % 60;
      const timeStr =
        String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
      return timeStr;
    };
    const clickList = () => {
      updatePopShow(false);
      router.push("/list");
    };

    // 监听当前播放时间
    watch(curTime, () => {
      // 进度条更新
      perTime();
      // 歌词滚动
      const acEl = document.querySelectorAll(".txt-container .active");
      let hight;
      if (state.isLangDef == 0) {
        acEl[0] == null ? (hight = 0) : (hight = acEl[0].offsetTop);
        spans.value.scrollTop = hight - 250;
      } else if (state.isLangDef == 1) {
        acEl[1] == null ? (hight = 0) : (hight = acEl[1].offsetTop);
        spans.value.scrollTop = hight - 250;
      } else {
        acEl[2] == null ? (hight = 0) : (hight = acEl[2].offsetTop);
        spans.value.scrollTop = hight - 250;
      }
      // 获取并显示总时间
      const timeM = parseInt(fulTime.value);
      state.timeStrM = testTime(timeM);

      // 获取并显示当前时间
      const time = parseInt(curTime.value / 1000);
      state.timeStr = testTime(time);
    });
    watch(playIndex, () => {
      // 切歌更新进度条
      perTime();
    });

    return {
      state,
      spans,
      authorNames,
      checkView,
      checkText,
      isBtnShow,
      musicRow,
      musicRow2,
      musicRow3,
      updatePopShow,
      getTimeRow,
      getTimeRowMix,
      nextGo,
      updateTiming,
      clickList,
    };
  },
  props: ["musicMsg", "play", "timeChange"],
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

    .default-view {
      width: 100%;
      height: 100%;
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
    .music-view {
      height: 100%;
      width: 100%;
      padding: 50% 0.4rem;
      transition: all 1s ease;
      overflow: scroll;
      //   翻译按钮
      .checkLang {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: #ccc;
        border: 1px solid #ccc;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.5rem;
        z-index: 99;
        position: fixed;
        top: 2.2rem;
        right: 1rem;
      }
      .txt-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .span {
          width: 100%;
          height: 0.8rem;
          color: #ccc;
          font-size: 0.28rem;
          line-height: 0.4rem;
          text-align: center;
          margin-top: 0.2rem;
          white-space: pre-line;
        }
        .span.active {
          font-size: 0.36rem;
          font-weight: bolder;
          color: rgb(0, 115, 255);
        }
      }
    }
  }

  .footer-container {
    .nav-com {
      width: 100%;
      height: 1.6rem;
      position: fixed;
      bottom: 1.4rem;
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
    .ranges {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      position: fixed;
      bottom: 2.9rem;
      z-index: 999;
      .cur-time,
      .ful-time {
        text-align: center;
        z-index: 999;
        padding: 0.1rem 0.2rem;
        border-radius: 0.06rem;
        background-color: rgba(30, 27, 27, 0.575);
      }
      .progress {
        width: 60%;
        z-index: 9999;
        margin-bottom: 0.05rem;
      }
    }

    .player {
      width: 100%;
      height: 1.4rem;
      background-color: rgba(34, 33, 33, 0.555);
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 999;
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