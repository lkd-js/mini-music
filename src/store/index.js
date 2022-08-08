import { createStore } from 'vuex'

export default createStore({
  state: {
    playMusicList: [{
      name: "Something Just Like This (No Riddim Remix)",
      al: {
        picUrl: "https://p1.music.126.net/GUhGpKIUlQhOqkI3ynux2Q==/18690598162553434.jpg"
      },
      ar: [
        { id: 12131091, name: "No Riddim" },
        { id: 893484, name: "The Chainsmokers" },
        { id: 89365, name: "Coldplay" }
      ],
      id: 493646305
    }],
    isBtnShow: true,
    playIndex: 0,
    isPopShow: false
  },
  getters: {
  },
  mutations: {
    updateBtnShow: function (state, value) {
      console.log('播放按钮更新');
      state.isBtnShow = value;
    },
    updatePlayList: function (state, value) {
      console.log('播放list更新如下');
      console.log(state.playMusicList);
      state.playMusicList = value;
    },
    updatePlayIndex: function (state, value) {
      console.log('播放歌曲更新');
      state.playIndex = value;
    },
    updatePopShow: function (state, value) {
      console.log('pop更新');
      state.isPopShow = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
