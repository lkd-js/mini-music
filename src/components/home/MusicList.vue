<template>
  <div class="music-list">
    <div class="list-top">
      <h4>发现好歌单</h4>
      <button>查看更多</button>
    </div>
    <div class="list-container">
      <van-swipe :loop="false" :width="150" :show-indicators="false">
        <van-swipe-item v-for="list in mystate.list" :key="list.name">
          <router-link :to="{ path: '/itemmusic', query: { id: list.id } }">
            <img :src="list.picUrl" />
            <span class="num">
              <span class="icon icon-play-circle"></span>
              {{ getNum(list.playCount) }}
            </span>
            <span class="content">{{ list.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { getMusicList } from "@/request/api/home.js";
export default {
  setup() {
    // 自定义属性
    const mystate = reactive({
      list: [],
    });

    // 自定义函数
    const getNum = (num) => {
      return num > 100000000
        ? (num / 100000000).toFixed(2) + "亿"
        : num > 10000
        ? (num / 10000).toFixed(2) + "万"
        : num;
    };

    // 自定义生命周期函数
    onMounted(async () => {
      let res;
      if (!sessionStorage.getItem("musicListData")) {
        res = await getMusicList();
        console.log(res);
        mystate.list = res.data.result;
        sessionStorage.setItem(
          "musicListData",
          JSON.stringify(res.data.result)
        );
      } else {
        console.log("不用重复获取pic啦！");
        mystate.list = JSON.parse(sessionStorage.getItem("musicListData"));
      }
    });

    return { mystate, getNum };
  },
};
</script>

<style lang="less" scoped>
.music-list {
  width: 100%;
  padding: 0 0.2rem;
  .list-top {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    button {
      width: 1.6rem;
      font-size: 0.28rem;
      color: #fff;
      background-image: -webkit-linear-gradient(left bottom, #fb2c61, #fac362);
      border-radius: 0.1rem;
      border: none;
    }
  }
  .list-container {
    width: 100%;
    height: 4rem;
    margin-top: 0.1rem;
    .van-swipe {
      width: 100%;
      .van-swipe__track {
        .van-swipe-item {
          width: 40%;
          padding-right: 0.2rem;
          position: relative;
          img {
            width: 100%;
            border-radius: 0.2rem;
          }
          .num {
            position: absolute;
            top: 0.1rem;
            right: 0.3rem;
            color: #fff;
            border-radius: 0.1rem;
            padding: 0 0.2rem;
            background-color: rgba(204, 204, 204, 0.593);
            .icon {
              width: 0.4rem;
              height: 0.4rem;
              position: absolute;
              top: 0.04rem;
              left: -0.42rem;
              color: #fff;
            }
          }
          .content {
            display: block;
            width: 100%;
            height: 1.2rem;
            color: #000;
            font-size: 0.28rem;
            line-height: 0.4rem;

            display: -webkit-box !important;
            overflow: hidden;

            word-break: break-all;
            text-overflow: ellipsis;

            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        }
      }
    }
  }
}
</style>