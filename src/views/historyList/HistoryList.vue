<template>
  <div class="page">
    <back-nav-bar class="nav-bar">
			<template v-slot:center>
				<div class="title">历史订单</div>
			</template>    
    </back-nav-bar>

    <scroll class="scroll" ref="scrollClick">
      <!-- 每笔交易作为一个item -->
      <history-list-item
        v-for="(item, index) in historyList"
        :key="index"
        :itemList="item"
        class="item">
			</history-list-item>
    </scroll>
  </div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
import Scroll from "components/common/scroll/Scroll";

import { mapState } from "vuex";
import HistoryListItem from "./childComps/HistoryListItem";
export default {
  name: "HistoryList",
  components: {
    BackNavBar,
    Scroll,
    HistoryListItem
  },
  computed: {
    ...mapState({ historyList: "tradedList" })
  },
  activated() {
    this.$refs.scrollClick.refresh();
    this.$refs.scrollClick.scrollTO();
  }
};
</script>

<style scoped>
.page .nav-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
}
.page .scroll {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(245, 245, 245);
  padding: 10px 0;
}
.page .item {
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
}
</style>
