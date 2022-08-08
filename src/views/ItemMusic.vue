<template>
  <ItemTopNav class="top" />
  <ItemTop :playlist="state.playlist" v-if="state.isUpdate" />
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
    onMounted(async () => {
      const id = useRoute().query.id;
      if (!sessionStorage.getItem("list" + id)) {
        let res = await getItemList(id);
        console.log("正在获取表单" + res);
        state.playlist = res.data.playlist;
        state.isUpdate = true;
        sessionStorage.setItem("list" + id, JSON.stringify(res.data.playlist));
      } else {
        console.log("已有表单");
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