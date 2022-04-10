<template>
  <div class="back-nav-bar">
    <div class="left" @click="goBack">
      <slot name="left">
        <div class="left-btn">
          <img src="~assets/img/common/back_white.png" alt="" />
        </div>
      </slot>
    </div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { REMOVE_SINGLE_PURCHASE, RESET_ADDRESS } from "@/store/mutations-types";
export default {
  name: "BackNavBar",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      count: "routeChangeCount",
      isSingle: "handlingSinglePurchase"
    }),
    ...mapGetters({ addresses: "userAddresses" })
  },
  methods: {
    goBack() {
      if (this.isSingle && this.$route.path === "/trade") {
        this.$store.commit(REMOVE_SINGLE_PURCHASE);
        this.$store.commit(RESET_ADDRESS);
      } else if (this.$route.path === "/trade") {
        this.$store.commit(RESET_ADDRESS);
      }
      if (this.count > 1) {
        this.$router.back();
      } else {
        this.$router.replace("/home");
      }
    }
  }
};
</script>

<style scoped>
.back-nav-bar {
  /* 弹性布局，设置了以后就可以在对应的选择器里进行布局分配 */
  display: flex;
  height: 44px;
  line-height: 44px;
  background-color: var(--color-tint);
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  text-align: center;
  color: white;
}
.left,
.right {
  width: 60px;
}
.left-btn {
  width: 12px;
  height: 22px;
}
.left-btn img {
  width: 100%;
  height: 100%;
  margin-left: 20px;
  vertical-align: middle;
  color: white;
}
.center {
  flex: 1;
  font-size: 18px;
}
</style>
