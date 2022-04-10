<template>
  <div class="item-list">
    <!-- 订单头部 -->
    <div class="list-head">
      <div class="head-left">SUPERMALL官方旗舰店</div>
      <div class="head-right">交易成功</div>
    </div>

    <!-- 订单主体 -->
    <cart-list-item
      class="item"
      v-for="(item, index) in itemList"
      :key="index"
      :product="item">
      <!-- <div slot="left"></div> -->
      <!-- <div slot="right" class="item-right">x{{ item.count }}</div> -->
			<template v-slot:left></template>
			<template v-slot:right>
				<div class="item-right">{{ item.count }}</div>
			</template>
		</cart-list-item>

    <!-- 订单底部 -->
    <div class="list-footer">
      <div class="footer-count">共{{ tradeInfo.count }}件</div>
      <div class="footer-pay">
				实付款
        <span class="pay-price">￥{{ tradeInfo.totalPrice.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CartListItem from "views/cart/cartComps/CartListItem";
export default {
  name: "HistoryListItem",
  components: {
    CartListItem
  },
  props: {
    itemList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    // 订单底部数据
    tradeInfo() {
      let count = 0;
      let totalPrice = 0;
      this.itemList.forEach(item => {
        count += item.count;
        totalPrice += item.price * item.count;
      });
      return { count, totalPrice };
    }
  }
};
</script>

<style scoped>
/* 每个订单头部 */
.list-head {
  margin: 10px;
  display: flex;
  justify-content: space-between;
}
.list-head .head-left {
  font-size: 18px;
  font-weight: 600;
}
.list-head .head-right {
  color: var(--color-tint);
}

.item-right,
.footer-count {
  color: rgb(165, 165, 165);
}
.item {
  border: 0 !important;
}

/* 订单顶部 */
.list-footer {
  margin: 10px;
  display: flex;
  justify-content: end;
}
.footer-pay {
  margin-left: 10px;
}
.pay-price {
  color: rgb(255, 80, 15);
}
</style>
