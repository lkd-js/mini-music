<template>
  <!-- 歌曲列表模块 -->
  <div class="songs-container">
    <!-- 列表头部 -->
    <div class="songs-top">
      <div class="left-container">
        <span class="icon icon-play-circle"></span>
        <span class="play">播放全部</span>
        <span class="all">(共{{ state.musiclist.length }}首)</span>
      </div>
      <span class="add"
        >+&nbsp;{{ getNum(playlist.subscribedCount) }}&nbsp;收藏</span
      >
    </div>
    <!-- 歌曲 -->
    <div
      class="song-container"
      v-for="(song, index) in state.musiclist"
      :key="song.name"
    >
      <!-- 索引 -->
      <span class="index">{{ index + 1 }}</span>
      <!-- 歌曲名字 -->
      <div class="song-name" @click="addList(index)">
        <span class="name">{{ song.name }}</span>
        <span class="author">{{ song.ar[0].name }}</span>
      </div>
      <!-- 歌曲控制模块,mv -->
      <div class="tool-btn">
        <span class="icon icon-bars"></span>
        <span class="icon icon-film" v-show="song.mv != 0"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getMusicListA } from "@/ultils/request";
export default {
  setup() {
    const state = reactive({
      musiclist: [],
    });

    // 获取需要用到的mutation
    const store = useStore();
    const {
      updatePlayList: [updatePlayList],
      updatePlayIndex: [updatePlayIndex],
    } = store._mutations;
    // 自定义属性

    // 自定义函数
    // 更新歌曲到当前播放
    const addList = (index) => {
      updatePlayList(state.musiclist);
      updatePlayIndex(index);
    };
    // 收藏数处理
    const getNum = (num) => {
      return num > 10000 ? (num / 10000).toFixed(2) + "万" : num;
    };

    // 定义生命周期函数,获取歌单列表
    onMounted(async () => {
      state.musiclist = await getMusicListA(useRoute().query.id);
    });

    return { state, getNum, addList, updatePlayList, updatePlayIndex };
  },
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.songs-container {
  width: 100%;
  margin-top: 0.2rem;
  padding-bottom: 1.2rem;
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .songs-top {
    width: 100%;
    height: 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-container {
      width: 3.6rem;
      margin-left: 0.3rem;
      font-size: 0.36rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        font-size: 0.6rem;
      }
      .play {
        margin-left: 0.2rem;
      }
    }
    .add {
      padding: 0.2rem;
      color: #fff;
      border-radius: 0.2rem;
      background-image: -webkit-linear-gradient(left bottom, #fb2c61, #fac362);
      margin-right: 0.3rem;
    }
  }
  .song-container {
    width: 100%;
    height: 1.4rem;
    border-top: 0.02rem solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .index {
      margin-left: 0.4rem;
    }
    .song-name {
      width: 4rem;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: space-around;
      .name {
        width: 100%;
        font-weight: 700;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .author {
        width: 100%;
        color: #ccc;
        font-size: 0.28rem;
        margin-top: 0.1rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .tool-btn {
      width: 1.4rem;
      margin-right: 0.28rem;
      font-size: 0.44rem;
      color: #ccc;
      .icon {
        float: right;
        margin-left: 0.3rem;
      }
    }
  }
}
</style>