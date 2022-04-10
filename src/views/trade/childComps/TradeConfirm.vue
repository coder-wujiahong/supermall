<!--支付方式页-->
<template>
  <div class="confirm">
    <!-- 阴影部分 -->
    <div class="shadow" @click="handleShadowClick"></div>

    <!-- 底部确认框 -->
    <div class="confirm-box">
      <!-- 价格框 -->
      <div class="price-box">
        <div class="price">
          ￥
          <div class="int">
            {{ totalPrice.substring(0, totalPrice.length - 3) }}
          </div>
          {{ totalPrice.substr(totalPrice.length - 3) }}
        </div>
      </div>

      <!-- 支付框 -->
      <div class="payway-box" @click="choosePayway">
        <!-- 支付宝支付栏 -->
        <div class="payway" data-index="0">
          <div class="payway-left" data-index="0">
            <svg class="icon" aria-hidden="true" data-index="0">
              <use xlink:href="#icon-zhifubao"></use>
            </svg>
            支付宝支付
          </div>
          <div class="payway-right" data-index="0">
            <svg class="icon" aria-hidden="true" data-index="0">
              <use v-show="paywayIndex !== 0" xlink:href="#icon-weixuan"></use>
              <use v-show="paywayIndex == 0" xlink:href="#icon-xuanzhong"></use>
            </svg>
          </div>
        </div>

        <!-- 微信支付栏 -->
        <div class="payway" data-index="1">
          <div class="payway-left" data-index="1">
            <svg class="icon" aria-hidden="true" data-index="1">
              <use xlink:href="#icon-weixinzhifu"></use></svg>
							微信支付
          </div>
          <div class="payway-right" data-index="1">
            <svg class="icon" aria-hidden="true" data-index="1">
              <use v-show="paywayIndex !== 1" xlink:href="#icon-weixuan"></use>
              <use v-show="paywayIndex == 1" xlink:href="#icon-xuanzhong"></use>
            </svg>
          </div>
        </div>

        <!-- 云闪付支付栏 -->
        <div class="payway" data-index="2">
          <div class="payway-left" data-index="2">
            <svg class="icon" aria-hidden="true" data-index="2">
              <use xlink:href="#icon-yunshanfu"></use></svg>
							云闪付支付
          </div>
          <div class="payway-right" data-index="2">
            <svg class="icon" aria-hidden="true" data-index="2">
              <use v-show="paywayIndex !== 2" xlink:href="#icon-weixuan"></use>
              <use v-show="paywayIndex == 2" xlink:href="#icon-xuanzhong"></use>
            </svg>
          </div>
        </div>
      </div>

      <!-- 底部按钮 -->
      <div class="bottom-btn-box" @click="confirmToPay">
        <div class="pay-btn">
          {{ payways[paywayIndex] }}支付￥{{ totalPrice }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TradeConfirm",
  props: ["totalPrice"],
  data() {
    return {
      payways: ["支付宝", "微信", "云闪付"],
      paywayIndex: 0
    };
  },
  methods: {
    handleShadowClick() {
      this.$emit("shadowClick");
    },
    choosePayway(e) {
      const currentIndex = e.target.dataset.index;
      if (currentIndex !== undefined) {
        this.paywayIndex = currentIndex;
      }
    },
    confirmToPay() {
      this.$emit("confirmClick");
    }
  }
};
</script>

<style scoped>
.confirm {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.shadow {
  height: 45%;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
}

/* 底部确认框样式 */
.confirm-box {
  position: fixed;
  height: 48%;
  width: 100vw;
  background-color: rgb(245, 245, 245);
}

/* 价格栏 */
.confirm-box .price-box {
  height: 18%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
	padding-top: 10px;
}
.price-box div {
  display: inline-block;
}
.price-box .price {
  color: red;
  font-weight: 700;
}
.price-box .price .int {
  margin-top: -7px;
  font-weight: 550;
  font-size: 30px;
}

/* 支付框样式 */
.confirm-box .payway-box {
  height: 54%;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
}
/* 支付栏 */
.payway-box .payway {
  flex: 1;
  border-bottom: 1px solid burlywood;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  line-height: 16px;
}
.payway-box .payway:last-child {
  border-bottom: 0;
}
/* 支付栏左侧样式 */
.payway-left {
  display: flex;
  align-items: center;
}
/* 右侧样式 */
.payway-box .payway-right .icon {
  width: 1.3em;
  height: 1.3em;
  vertical-align: middle;
}
.payway .icon {
  width: 2.5em;
  height: 2.5em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 10px;
}

/* 底部按钮框 */
.confirm-box .bottom-btn-box {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 16%;
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-btn-box .pay-btn {
  width: 90%;
  height: 70%;
  border-radius: 25px;
  background-color: #ff4d55;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: #fff;
}
</style>
