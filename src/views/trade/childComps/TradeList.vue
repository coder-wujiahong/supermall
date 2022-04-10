<template>
  <div class="list">
    <cart-list-item v-if="isSingle" :product="product"></cart-list-item>
    <div class="cart-list" v-else>
      <cart-list-item
        class="item"
        v-for="(item, index) in cartChecked"
        :key="index"
        :product="item">
        <template v-slot:left></template>
			</cart-list-item>
    </div>
  </div>
</template>

<script>
import CartListItem from "views/cart/cartComps/CartListItem";

import { mapGetters, mapState } from "vuex";
export default {
  name: "TradeList",
  data() {
    return {};
  },
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(["cartChecked"]),
    ...mapState({
      isSingle: "handlingSinglePurchase",
      product: "singlePurchase"
    })
  }
};
</script>

<style scoped></style>
