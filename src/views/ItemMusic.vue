<!-- ITEM歌单页面 -->
<template>
  <!-- 头部导航条 -->
  <ItemTopNav class="top" />
  <!-- 上半部分 -->
  <ItemTop :playlist="state.playlist" v-if="state.isUpdate" />
  <!-- 歌曲部分 -->
  <ItemList :playlist="state.playlist" v-if="state.isUpdate" />
</template>

<script>
import { useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import { getItemList } from "@/request/api/item.js";

import ItemTopNav from "@/components/item/ItemTopNav.vue";
import ItemTop from "@/components/item/ItemTop.vue";
import ItemList from "@/components/item/ItemList.vue";
export default {
  setup() {
    const state = reactive({
      playlist: {},
      isUpdate: false,
    });
    // 生命周期,获取当前表单res
    onMounted(async () => {
      const id = useRoute().query.id;
      if (!sessionStorage.getItem("list" + id)) {
        let res = await getItemList(id);
        console.log("获取表单res如下---↓");
        console.log(res);
        state.playlist = res.data.playlist;
        state.isUpdate = true;
        sessionStorage.setItem("list" + id, JSON.stringify(res.data.playlist));
      } else {
        console.log("从session获取表单中");
        state.playlist = JSON.parse(sessionStorage.getItem("list" + id));
        state.isUpdate = true;
      }
    });
    return { state };
  },
  components: { ItemTop, ItemList, ItemTopNav },
};
</script>

<style lang="less" scoped>
.top {
  position: sticky;
  top: 0;
  left: 0;
  background-color: rgba(34, 31, 31, 0.758);
}
</style>