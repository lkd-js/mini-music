import { createStore } from 'vuex'
import { getMusicLyr } from "@/request/api/item.js";

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
    }],     //当前播放歌曲信息
    isBtnShow: true,  //播放按键展示
    playIndex: 0,     //播放歌单索引
    isPopShow: false, //歌曲详情弹出展示
    curTime: 0,       //歌曲当前播放时间
    musicWord: '',    //歌词
    musicWordPro: ''  //翻译歌词
  },
  getters: {
  },
  mutations: {
    updatePlayList(state, value) {
      console.log('播放list更新');
      // console.log(value);
      state.playMusicList = value;
    },

    updateBtnShow(state, value) {
      console.log('播放按钮更新');
      state.isBtnShow = value;
    },

    updatePlayIndex(state, value) {
      console.log('播放歌曲更新');
      state.playIndex = value;
    },

    updatePopShow(state, value) {
      console.log('pop弹出更新');
      state.isPopShow = value;
    },

    updateTime(state, value) {
      // console.log('时间更新,值如下');
      // console.log(value);
      state.curTime = value;
    },

    updateWord(state, value) {
      console.log('歌词更新');
      state.musicWord = value;
    },

    updateWordPro(state, value) {
      console.log('翻译歌词更新');
      state.musicWordPro = value;
    },
  },
  actions: {
    async getMusicTxt(context, value) {
      // console.log('获取歌词请求id---↓');
      // console.log(value);
      let res = await getMusicLyr(value)
      console.log('获取歌词如下---↓');
      console.log(res);
      context.commit('updateWord', res.data.lrc.lyric)
      context.commit('updateWordPro', res.data.tlyric.lyric || '')
    }
  },
  modules: {
  }
})


// async () => {
//   const id = playMusicList[playIndex].id;
//   let defL, chL;
//   if (
//     sessionStorage.getItem("musicword" + id) ||
//     sessionStorage.getItem("musicwordzw" + id)
//   ) {
//     console.log("从session获取歌词中");
//     const resdata =
//       JSON.parse(sessionStorage.getItem("musicword" + id)) || [];
//     const resdatazw =
//       JSON.parse(sessionStorage.getItem("musicwordzw" + id)) || [];
//     defL = resdata.lyric;
//     chL = resdatazw.lyric;
//   } else {
//     const res = await getMusicLyr(id);
//     console.log("获取歌词res如下----");
//     console.log(res);
//     defL = res.data.lrc.lyric;
//     chL = res.data.tlyric.lyric;
//     sessionStorage.setItem("musicword" + id, JSON.stringify(res.data.lrc));
//     sessionStorage.setItem(
//       "musicwordzw" + id,
//       JSON.stringify(res.data.tlyric)
//     );
//   }


// }