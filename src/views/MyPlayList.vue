<template>
  <div class="play-top">
    <span class="icon icon-arrow-left" @click="$router.go(-1)"></span>
    <span class="title">正在播放的歌单</span>
  </div>
  <div class="songslist-container">
    <ul>
      <li v-for="(playing, i) in playMusicList" :key="`pl+${i}`">
        <span class="index">{{ i + 1 }}</span>
        <span :class="{ title: true, active: i == playIndex }">{{
          playing.name
        }}</span>
        <span
          class="icon icon-play-circle"
          @click.stop="playingIndex(i)"
        ></span>
        <span class="icon icon-x-circle" @click.stop="removePlay(i)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { toRefs } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const { playMusicList, playIndex } = toRefs(store.state);
    const {
      updatePlayList: [updatePlayList],
      updatePlayIndex: [updatePlayIndex],
    } = store._mutations;
    const {
      nextGo: [nextGo],
    } = store._actions;

    const removePlay = (i) => {
      let list = playMusicList.value;
      if (list.length == 1) {
        console.log("歌曲列表至少有一首歌曲");
        return;
      }
      if (i == playIndex.value) {
        console.log("正在播放器中，不能删除");
        return;
      } else if (i < playIndex.value) {
        updatePlayIndex(playIndex.value - 1);
        console.log("删除了前面的歌曲");
      }
      list.splice(i, 1);
      updatePlayList(list);
    };

    const playingIndex = (i) => {
      let index = playIndex.value;
      let c = i - index;
      nextGo(c);
    };

    return {
      playIndex,
      playMusicList,
      playingIndex,
      removePlay,
    };
  },
};
</script>

<style lang="less" scoped>
.play-top {
  width: 100%;
  height: 1.2rem;
  background-color: rgba(4, 4, 4, 0.851);
  padding: 0.2rem 0.4rem;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  .icon {
    font-size: 0.6rem;
    color: #fff;
  }
  .title {
    flex: 1;
    text-align: center;
    color: rgba(255, 255, 255, 0.926);
  }
}
.songslist-container {
  width: 100%;
  padding: 1.3rem 0.4rem 1.5rem;
  //   background-color: #ccc;
  ul {
    li {
      height: 1rem;
      background-color: rgba(220, 13, 13, 0.277);
      border-radius: 0.2rem;
      border-bottom: 1px solid #ccc;
      margin-bottom: 0.2rem;
      display: flex;
      align-items: center;
      .index {
        width: 0.8rem;
        text-align: center;
        font-size: 0.48rem;
        color: #fff;
      }
      .title {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .title.active {
        color: #fff;
        font-size: 0.48rem;
      }
      .icon {
        width: 0.8rem;
        font-size: 0.6rem;
        color: #fff;
      }
    }
  }
}
</style>