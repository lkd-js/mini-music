<template>
  <!-- 歌单集展示 -->
  <div class="music-list">
    <!-- 头部 -->
    <div class="list-top">
      <h4>发现好歌单</h4>
      <button>查看更多</button>
    </div>
    <!-- 复数的歌单图片和链接展示，点击前往item组件 -->
    <div class="list-container">
      <!-- 以轮播图（固定）形式进行展示 -->
      <van-swipe :loop="false" :width="150" :show-indicators="false">
        <!-- 单个歌单元素 -->
        <van-swipe-item v-for="list in state.list" :key="list.name">
          <!-- 点击a标签前往/itemmusic?id=xxx -->
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
import { useStore } from "vuex";
export default {
  setup() {
    // 自定义属性
    const state = reactive({
      list: [],
    });
    const store = useStore();
    const {
      getMusicListHomeA: [getMusicListHomeA],
    } = store._actions;
    // 自定义函数
    // 将播放数据进行缩短处理
    const getNum = (num) => {
      return num > 100000000
        ? (num / 100000000).toFixed(2) + "亿"
        : num > 10000
        ? (num / 10000).toFixed(2) + "万"
        : num;
    };

    // 自定义生命周期函数,获取复数的歌单res
    onMounted(async () => {
      state.list = await getMusicListHomeA();
    });

    return { state, getNum };
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