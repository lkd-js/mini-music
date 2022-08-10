<template>
  <!-- 顶部搜索框 -->
  <div class="search-top">
    <span class="icon icon-arrow-left" @click="$router.go(-1)"></span>
    <input
      type="text"
      placeholder="请输入搜索内容"
      @keyup.enter="search(state.searchStr)"
      v-model="state.searchStr"
    />
    <span class="icon icon-search1" @click="search(state.searchStr)"></span>
  </div>
  <!-- 搜索历史，可删改，存在local中 -->
  <div class="search-history">
    <span class="iconxx icon-close" @click.stop="clearLi()"></span>
    <ul>
      <li
        v-for="(searchhis, i) in state.historylist"
        :key="`ss+${i}`"
        @click="search(searchhis)"
      >
        {{ searchhis }}
        <span class="iconx icon-close" @click.stop="removeLi(i)"></span>
      </li>
    </ul>
  </div>
  <!-- 热门搜索，没有搜索记录时默认出现 -->
  <div class="hot-content content" v-if="state.songsList.length <= 0">
    <div class="title">
      <span class="icon icon-applemusic"></span>
      <span class="text">热门榜</span>
    </div>
    <ul class="hot list">
      <li v-for="(hot, i) in state.hotlist" :key="hot" @click="search(hot)">
        <span class="index">{{ i + 1 }}</span>
        <span class="con">{{ hot }}</span>
      </li>
    </ul>
  </div>
  <!-- 搜索结果，点击可添加到播放列表中 -->
  <div class="search-content content">
    <div class="title">
      <span class="icon icon-applemusic"></span>
      <span class="text">搜索结果</span>
    </div>
    <ul class="search list">
      <li
        v-for="(song, i) in state.songsList"
        :key="song.id"
        @click="addMusicList(song)"
      >
        <span class="index">{{ i + 1 }}</span>
        <span class="con">{{ song.name }}</span>
        <span class="author">{{ nameAll(song.ar) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, onMounted, onUpdated, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const state = reactive({
      hotlist: [],
      searchStr: "",
      songsList: [],
      historylist: [],
    });

    const store = useStore();
    // 获取state
    const { playMusicList, playIndex } = toRefs(store.state);
    // 获取mutations,actions
    const {
      updatePlayList: [updatePlayList],
    } = store._mutations;
    const {
      getHotListA: [getHotListA],
      getSearchA: [getSearchA],
      nextGo: [nextGo],
    } = store._actions;

    // 自定义方法
    const search = async (str) => {
      let songsList = await getSearchA(str);
      // console.log(songsList);
      state.songsList = songsList;
      state.historylist.unshift(str);
      state.historylist = [...new Set(state.historylist)];
      state.searchStr = "";
    };
    const nameAll = (arr) => {
      const r = [];
      arr.forEach((v) => {
        r.push(v.name);
      });
      return r.join(" & ");
    };
    const removeLi = (i) => {
      state.historylist.splice(i, 1);
    };
    const clearLi = () => {
      state.historylist = [];
    };
    const addMusicList = (song) => {
      const list = playMusicList.value;
      const index = playIndex.value;
      list.splice(index, 0, song);
      updatePlayList(list);
      nextGo(0);
    };

    onMounted(async () => {
      let hotlist = await getHotListA();
      state.hotlist = hotlist.splice(0, 8);
      state.historylist = JSON.parse(localStorage.getItem("search")) || [];
    });
    onUpdated(() => {
      // console.log(state.historylist);
      localStorage.setItem("search", JSON.stringify(state.historylist));
    });

    return {
      state,
      search,
      nameAll,
      removeLi,
      clearLi,
      addMusicList,
    };
  },
};
</script>

<style lang="less" scoped>
.search-top {
  width: 100%;
  padding: 0.4rem 0.5rem 0;
  display: flex;
  justify-content: space-between;
  .icon {
    font-size: 0.4rem;
    background-color: #473f52;
    color: #fff;
    padding: 0.25rem;
    border-radius: 0.1rem;
  }
  input {
    outline: none;
    height: 100%;
    width: 80%;
    border: none;
    text-indent: 0.2rem;
    border-bottom: 1px solid #000;
    padding-bottom: 0.08rem;
  }
}
.search-history {
  width: 100%;
  height: 2rem;
  padding: 0.1rem 0.6rem;
  position: relative;
  .iconxx {
    position: absolute;
    top: 0;
    right: 0.1rem;
  }
  ul {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    li {
      width: 30%;
      height: 0.7rem;
      border-radius: 0.16rem;
      background-color: #ccc;
      margin: 0.1rem 0.1rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 0.1rem;
      color: #000;
      line-height: 0.7rem;
      position: relative;
      .iconx {
        position: absolute;
        top: 0;
        right: 0.04rem;
        color: #fff;
      }
    }
  }
}
.content {
  .title {
    width: 100%;
    padding: 0.3rem 0.6rem;
    font-size: 0.36rem;
    background-image: -webkit-linear-gradient(left bottom, #fb2c61, #fac362);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    .icon {
      font-size: 0.6rem;
      margin-right: 0.2rem;
    }
  }
  .list {
    padding-left: 0.7rem;
    li {
      display: flex;
      height: 0.5rem;
      margin-bottom: 0.5rem;
      .index {
        width: 0.6rem;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        background-color: #ccc;
        color: #fff;
        border-radius: 0.1rem;
      }
      .con {
        width: 60%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 0.2rem;
        border-bottom: 1px solid #ccc;
      }
      .author {
        width: 20%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 0.4rem;
        color: #ccc;
        font-size: 0.28rem;
      }
    }
    li:nth-child(-n + 3) {
      .index {
        background-image: -webkit-linear-gradient(
          left bottom,
          #fac362,
          #fb2c61
        );
      }
      .con {
        color: #fb2c61;
      }
    }
  }
}
</style>