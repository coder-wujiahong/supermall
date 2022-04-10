<template>
  <div class="page">
    <nav-bar class="nav-bar">
			<template v-slot:center>
				<div>支付成功</div>
			</template>
		</nav-bar>

    <!-- 支付成功信息框 -->
    <div class="success-info">
      <img src="~assets/img/trade/pay_success.png" alt="" />
      <div class="success-msg">恭喜您，支付成功！</div>
      <div class="trade-money">￥{{ tradeMoney }}</div>
      <div class="trade-time">交易时间：{{ tradeTime }}</div>
    </div>

    <!-- 操作按钮框 -->
    <div class="next-choices">
      <button class="shopping" @click="toHome">继续逛逛</button>
      <button class="listing" @click="toHistoryList">我的订单</button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { formatDate } from "common/utils";

export default {
  name: "TradeSuccess",
  components: {
    NavBar
  },
  props: ["tradeMoney"],
  data() {
    return {};
  },
  computed: {
    tradeTime() {
      return formatDate(new Date(), "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    toHome() {
      this.$router.replace("/home");
    },
    toHistoryList() {
      this.$router.replace("/historyList");
    }
  }
};
</script>

<style scoped>
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 10;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 500;
}

/* 支付成功信息框 */
.success-info {
  padding-top: 7vh;
  text-align: center;
}
.success-info :nth-child(n) {
  margin-bottom: 2vh;
}
.success-info img {
  width: 20vw;
}
.success-info .success-msg {
  font-size: 22px;
  font-weight: 600;
}
.success-info .trade-money {
  font-size: 44px;
  font-weight: 500;
}
.success-info .trade-time {
  font-size: 18px;
}

/* 操作按钮框 */
.next-choices {
  margin-top: 10vh;
  text-align: center;
}
.next-choices button {
  margin-bottom: 3vh;
  width: 95vw;
  height: 7vh;
  border: 0;
  outline: 0;
  color: #fff;
  font-size: 18px;
}
.next-choices .shopping {
  background-color: var(--color-tint);
}
.next-choices .listing {
  background-color: rgb(246, 56, 56);
}
</style>
