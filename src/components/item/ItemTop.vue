<template>
  <!-- 歌单详情页的上半部分 -->
  <div class="container">
    <!-- 背景图片（模糊） -->
    <img :src="playlist.coverImgUrl" alt="" class="cover" />
    <!-- 内容部分 -->
    <div class="item-content">
      <!-- 左侧专辑图片 -->
      <img :src="playlist.coverImgUrl" alt="" class="pic" />
      <!-- 右侧详情部分 -->
      <div class="text-container">
        <!-- 歌单标题 -->
        <span class="title">{{ playlist.name }}</span>
        <!-- 作者头像和名字 -->
        <div class="author">
          <img :src="playlist.creator.backgroundUrl" alt="" class="author" />
          <span>{{ playlist.creator.nickname }}</span>
        </div>
        <!-- 歌单介绍 -->
        <div class="msg">{{ playlist.description }}</div>
      </div>
    </div>
    <!-- 扩展按钮（待开发） -->
    <div class="more-nav">
      <!-- 评论 -->
      <div class="nav-container">
        <span class="icon icon-message-square"></span>
        <span class="txt">{{ playlist.commentCount }}</span>
      </div>
      <!-- 分享 -->
      <div class="nav-container">
        <span class="icon icon-share-2"></span>
        <span class="txt">{{ playlist.shareCount }}</span>
      </div>
      <!-- 下载 -->
      <div class="nav-container">
        <span class="icon icon-download"></span>
        <span class="txt">下载</span>
      </div>
      <!-- 多选 -->
      <div class="nav-container">
        <span class="icon icon-check-square"></span>
        <span class="txt">多选</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  position: relative;
  .cover {
    position: absolute;
    width: 100%;
    top: -1rem;
    height: 7rem;
    z-index: -1;
    filter: blur(20px);
  }
  .item-content {
    width: 100%;
    height: 3.6rem;
    display: flex;
    align-items: center;
    .pic {
      height: 2.6rem;
      margin-left: 0.2rem;
      border-radius: 0.2rem;
    }
    .text-container {
      margin-left: 0.2rem;
      display: flex;
      flex-direction: column;
      color: #fff;
      .title {
        font-size: 0.36rem;
      }
      .author {
        height: 0.6rem;
        font-size: 0.28rem;
        margin: 0.1rem 0;
        display: flex;
        align-items: center;
        img {
          height: 0.6rem;
          width: 0.6rem;
          border-radius: 50%;
          margin-right: 0.2rem;
        }
      }
      .msg {
        font-size: 0.28rem;
        display: -webkit-box !important;
        overflow: hidden;

        word-break: break-all;
        text-overflow: ellipsis;

        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
  .more-nav {
    width: 100%;
    display: flex;
    justify-content: center;
    color: white;
    .nav-container {
      width: 25%;
      display: flex;
      align-items: center;
      flex-direction: column;
      .icon {
        font-size: 0.5rem;
        margin-bottom: 0.2rem;
      }
      .txt {
        font-size: 0.28rem;
      }
    }
  }
}
</style>