import { createStore } from 'vuex'
import { getMusicLyr } from "@/request/api/item";//
import { getLoginRes } from "@/request/api/login";//

import { layout, } from '@/ultils/numlays'

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
    curTime: 0,       //歌曲当前播放时间----ms
    musicWord: "",    //歌詞
    musicWordPro: "", //翻译歌词
    musicRow: -1,    //原歌词行数
    musicRow2: -1,   //中文翻译行数
    musicRow3: -1,   //混合翻译行数
    fulTime: 1000,    //歌曲总时间----s
    isLogin: false,    //登录状态
    isFooterMusic: true     //底部播放器
  },
  getters: {

    getTimeRow(state) {
      // 把时间，歌词整合到一起
      const { msTimeArr: time1, conArr: con1 } = layout(state.musicWord);
      const { msTimeArr: time2, conArr: con2 } = layout(state.musicWordPro);
      const listObj = { time1, time2, con1, con2 }
      return listObj;
    },
    getTimeRowMix(state) {
      // 把时间，歌词整合到一起
      const { msTimeArr: time1, conArr: con1 } = layout(state.musicWord);
      const { msTimeArr: time2, conArr: con2 } = layout(state.musicWordPro);
      let time3 = []
      const con3 = []
      // 先确定哪个歌词在前
      let timeStartIndex;
      if (time1[0] <= time2[0]) {
        // time1歌词更长时，查找time1中的配合index
        timeStartIndex = time1.indexOf(time2[0])
        // 以更长时间为指定时间容器
        time3 = time1;
        // 给短歌词容器加空，便于整合
        while (timeStartIndex > 0) {
          con2.unshift(null)
          timeStartIndex--
        }
      } else {
        timeStartIndex = time2.indexOf(time1[0])
        time3 = time2;
        while (timeStartIndex > 0) {
          con1.unshift(null)
          timeStartIndex--
        }
      }
      // 整合歌词到con3中
      con1.forEach((v, i) => {
        con3.push([v, con2[i]])
      })
      const listObjM = { time3, con3 }
      return listObjM
    }
  },
  mutations: {
    updatePlayList(state, playMusicList) {
      console.log('播放list更新');
      // console.log(playMusicList);
      state.playMusicList = playMusicList;
    },

    updateBtnShow(state, isBtnShow) {
      console.log('播放按钮更新');
      state.isBtnShow = isBtnShow;
    },

    updatePlayIndex(state, playIndex) {
      console.log('播放歌曲更新');
      state.playIndex = playIndex;
    },

    updatePopShow(state, isPopShow) {
      console.log('pop弹出更新');
      state.isPopShow = isPopShow;
    },

    updateTime(state, curTime) {
      // console.log('时间更新,值如下');
      // console.log(curTime);
      state.curTime = curTime;
    },

    updateWord(state, musicWord) {
      console.log('歌词更新');
      // console.log(musicWord);
      state.musicWord = musicWord;
    },

    updateWordPro(state, musicWordPro) {
      console.log('翻译歌词更新');
      // console.log(musicWordPro);
      state.musicWordPro = musicWordPro;
    },
    updateMusicRow(state, musicRow) {
      // console.log('行更新');
      // console.log(musicRow);
      state.musicRow = musicRow;
    },
    updateMusicRow2(state, musicRow2) {
      // console.log('中文行更新');
      // console.log(musicRow2);
      state.musicRow2 = musicRow2;
    },
    updateMusicRow3(state, musicRow3) {
      // console.log('中文行更新');
      // console.log(musicRow2);
      state.musicRow3 = musicRow3;
    },
    updateFulTime(state, fulTime) {
      // console.log('歌曲总时间更新');
      // console.log(fulTime);
      state.fulTime = fulTime;
    },
    updateIsLogin(state, isLogin) {
      console.log('登录状态更新');
      console.log(isLogin);
      state.isLogin = isLogin;
    },
  },
  actions: {
    async getMusicTxt(context, id) {
      // console.log('获取歌词请求id---↓');
      // console.log(id);
      let res = await getMusicLyr(id)
      console.log('获取歌词如下---↓');
      console.log(res);
      //更新原文何中文翻译    
      context.commit('updateWord', res.data.lrc && res.data.lrc.lyric || '')
      context.commit('updateWordPro', res.data.tlyric && res.data.tlyric.lyric || '')

    },
    nextGo(context, num) {
      let index = context.state.playIndex + num;
      const len = context.state.playMusicList.length;
      if (index > len - 1) {
        index = index - len;
      } else if (index < 0) {
        index = len + index;
      }
      context.commit('updatePlayIndex', index)
    },
    async login(context, { phone, cap }) {
      let res = await getLoginRes(phone, cap);
      console.log('全局请求');
      console.log(res);
      return res
    }
  },
  modules: {
  }
})