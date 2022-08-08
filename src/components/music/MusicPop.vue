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
      <div class="default-view" v-show="mystates.isPlayView">
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
      <div class="music-view" v-show="!mystates.isPlayView" ref="spans">
        <!-- 返回按钮，点击切回CD模式 -->
        <span class="checkLang icon-circle" @click="checkView()"></span>
        <!-- 翻译按钮，点击切换歌词 -->
        <span class="checkLang icon-language" @click="checkText()"></span>
        <!-- 原歌词（英文，日文，中文...） -->
        <div class="txt-container">
          <!-- 标题作者 -->
          <span>歌名：{{ musicMsg.name }}</span>
          <span>作者：{{ authorNames() }}</span>
          <!-- 歌词内容 -->
          <div
            v-for="(conv1, i1) in getTimeRow.con1"
            :key="`${i1}xx`"
            v-show="mystates.isLangDef"
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
            v-show="!mystates.isLangDef"
            :class="{
              span: true,
              active: i2 == musicRow2,
            }"
          >
            {{ conv2 }}
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
      <!-- 播放模块 -->
      <div class="player">
        <span class="icon icon-history"></span>
        <span
          class="icon icon-step-backward"
          @click="
            updatePlayIndex(
              playIndex - 1 >= 0 ? playIndex - 1 : playMusicList.length - 1
            )
          "
        ></span>
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
        <span
          class="icon icon-step-forward"
          @click="
            updatePlayIndex(
              playIndex + 1 < playMusicList.length ? playIndex + 1 : 0
            )
          "
        ></span>
        <span class="icon icon-indent"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, toRef, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup(props) {
    console.log(props.musicMsg);
    const store = useStore();

    // 获取歌词spanDOM
    const spans = ref(null);

    // 获取需要的state和getters
    const {
      isBtnShow,
      curTime,
      musicRow,
      musicRow2,
      playIndex,
      playMusicList,
    } = toRefs(store.state);

    const getTimeRow = toRef(store.getters, "getTimeRow");

    // 获取需要用到的mutation
    const {
      updatePopShow: [updatePopShow],
      updatePlayIndex: [updatePlayIndex],
    } = store._mutations;

    // 自定义属性
    const mystates = reactive({
      isPlayView: true,
      isLangDef: true,
    });

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
      mystates.isPlayView = !mystates.isPlayView;
    };

    // 翻译歌词
    const checkText = () => {
      console.log("---切换歌词---");
      mystates.isLangDef = !mystates.isLangDef;
    };
    // 歌詞滾動
    watch(curTime, () => {
      const acEl = document.querySelectorAll(".txt-container .active");
      // console.log(acEl);
      let hight;
      if (mystates.isLangDef) {
        acEl[0] == null ? (hight = 0) : (hight = acEl[0].offsetTop);
        spans.value.scrollTop = hight - 250;
      } else {
        acEl[1] == null ? (hight = 0) : (hight = acEl[1].offsetTop);
        spans.value.scrollTop = hight - 250;
      }
    });

    return {
      mystates,
      spans,
      authorNames,
      checkView,
      checkText,
      isBtnShow,
      musicRow,
      musicRow2,
      updatePopShow,
      getTimeRow,
      updatePlayIndex,
      playIndex,
      playMusicList,
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
        border: 1px solid #ccc;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.5rem;
        z-index: 99;
        position: fixed;
        top: 1.5rem;
      }
      .icon-language {
        right: 0.6rem;
      }
      .icon-arrow-left {
        left: 0.6rem;
      }
      .txt-container {
        width: 100%;
        transition: all 1s ease;
        .span,
        span {
          width: 100%;
          height: 0.6rem;
          font-size: 0.28rem;
          line-height: 0.6rem;
          text-align: center;
          margin-top: 0.2rem;
        }
        .span.active {
          font-size: 0.36rem;
          font-weight: bolder;
          color: rgba(0, 30, 255, 0.903);
        }
      }
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