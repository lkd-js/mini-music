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
    musicWord: "",    //歌詞
    musicWordPro: "",  //翻译歌词
    musicRow: -1,
    musicRow2: -1,
  },
  getters: {
    getTimeRow(state) {
      // 传入[time],转化为毫秒数
      const checkTime = (arrStr) => {
        let str1 = arrStr.replace("[", "");
        let str2 = str1.replace("]", "");
        const times = str2.split(":");
        const time = Number(times[0]) * 60 * 1000 + Number(times[1] * 1000);
        return time;
      };
      // 传入字符串，转化为时间和歌词两个数组 msTimeArr, conArr
      const layout = (str) => {
        // 根据换行符分句
        const spanArr = str.split(/[(\r\n)\r\n]+/);
        //   console.log(spanArr);
        //定义时间数组 和 歌词数组
        const timeArr = [];
        const conArr = [];
        spanArr.forEach((v) => {
          const time = v.match(/\[[\s\S]+\]/);
          if (time && time[0]) {
            timeArr.push(time[0]);
            let vt = v.replace(time[0], "");
            conArr.push(vt);
          }
        });
        // 定义毫秒时间数组
        const msTimeArr = [];
        timeArr.forEach((v, i) => {
          let mstime = checkTime(v);
          if (isNaN(mstime)) {
            conArr.splice(i, 1);
          } else {
            msTimeArr.push(mstime);
          }
        });
        return { msTimeArr, conArr };
      };
      // 把时间，歌词整合到一起
      const { msTimeArr: time1, conArr: con1 } = layout(state.musicWord);
      const { msTimeArr: time2, conArr: con2 } = layout(state.musicWordPro);
      const listObj = { time1, time2, con1, con2 }
      return listObj;
    }
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
      // console.log(value);
      state.musicWord = value;
    },

    updateWordPro(state, value) {
      console.log('翻译歌词更新');
      // console.log(value);
      state.musicWordPro = value;
    },
    updateMusicRow(state, value) {
      // console.log('行更新');
      // console.log(value);
      state.musicRow = value;
    },
    updateMusicRow2(state, value) {
      // console.log('中文行更新');
      // console.log(value);
      state.musicRow2 = value;
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
      context.commit('updateWordPro', res.data.tlyric.lyric)
    }
  },
  modules: {
  }
})