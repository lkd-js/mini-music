<!-- ITEM歌单页面 -->
<template>
  <!-- 头部导航条 -->
  <ItemTopNav class="top" v-show="!isPopShow" />
  <!-- 上半部分 -->
  <ItemTop :playlist="state.playlist" v-if="state.isUpdate" />
  <!-- 歌曲部分 -->
  <ItemList :playlist="state.playlist" v-if="state.isUpdate" />
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";

import ItemTopNav from "@/components/item/ItemTopNav.vue";
import ItemTop from "@/components/item/ItemTop.vue";
import ItemList from "@/components/item/ItemList.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getItemListA } from "@/ultils/request";
export default {
  setup() {
    const store = useStore();
    const state = reactive({
      playlist: {},
      isUpdate: false,
    });
    // 从vuex里面取参数
    const { isPopShow } = toRefs(store.state);

    // 生命周期,获取当前表单res
    onMounted(async () => {
      const { playlist, isUpdate } = await getItemListA(useRoute().query.id);
      state.playlist = playlist;
      state.isUpdate = isUpdate;
    });
    return { state, isPopShow };
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