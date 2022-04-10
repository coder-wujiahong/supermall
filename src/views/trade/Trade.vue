<!--确认订单页-->
<template>
  <div class="trade-content">
    <back-nav-bar class="nav-bar">
      <!-- <div slot="center">确认订单</div> -->
      <template v-slot:center>
        <div>确认订单</div>
      </template>
    </back-nav-bar>

    <!-- 地址栏 -->
    <div class="addr" @click="enterChoosing">
      <address-item :tradeAddr="nowAddress">
        <template v-slot:right>
          <div class="iconfont icon-youjiantou"></div>
        </template>
      </address-item>
      <div class="bottom-line">
        <div class="line" v-for="i in 30" :key="i"></div>
      </div>
    </div>

    <scroll ref="scrollClick" class="scroll">
      <!-- 商品清单 -->
      <trade-list class="list"></trade-list>
    </scroll>

    <!-- 底部结算栏 -->
    <cart-bottom-bar v-show="isCompShow" class="bottom-bar">
      <!-- <div slot="left" class="left">共{{ tradeInfo.count }}件</div> -->
      <template v-slot:left>
        <div class="left">共{{ tradeInfo.count }}件</div>
      </template>
      <!-- <div slot="center" class="center"> -->
      <template v-slot:center>
        <div class="center">
          <div class="dolor">￥</div>
          <div class="price">
            {{
              tradeInfo.totalPrice.substring(0, tradeInfo.totalPrice.length - 3)
            }}
          </div>
          <div class="int">
            {{ tradeInfo.totalPrice.substr(tradeInfo.totalPrice.length - 3) }}
          </div>
        </div>
      </template>
      <template v-slot:right>
        <div
          class="right"
          @click="isConfirmShow = true"
          :disabled="!tradingCondition"
        >
          提交订单
        </div>
      </template>
    </cart-bottom-bar>

    <!-- 确认支付框 -->
    <trade-confirm
      v-show="isConfirmShow"
      @shadowClick="isConfirmShow = false"
      @confirmClick="handleConfirmTrading"
      :totalPrice="tradeInfo.totalPrice"
    ></trade-confirm>

    <!-- 支付成功页面 -->
    <trade-success
      v-if="isSuccessPaid"
      :tradeMoney="cacheInfo.totalPrice"
    ></trade-success>
  </div>
</template>

<script>
import BackNavBar from "components/common/navbar/BackNavBar";
import Scroll from "components/common/scroll/Scroll";

import AddressItem from "../address/childComps/AddressItem.vue";
import CartBottomBar from "views/cart/cartComps/CartBottomBar";

import TradeList from "./childComps/TradeList.vue";
import TradeConfirm from "./childComps/TradeConfirm.vue";
import TradeSuccess from "./childComps/TradeSuccess.vue";

import { mapGetters, mapState } from "vuex";
import { COMFIRM_TRADE } from "@/store/mutations-types";

import { resetResizeMixin, deepCopyMixin } from "common/mixin";

import { setItem } from "common/utils";

export default {
  name: "Trade",
  data() {
    return {
      nowAddress: {},
      isConfirmShow: false,
      isSuccessPaid: false,
      cacheInfo: {},
    };
  },
  components: {
    // 组件复用
    BackNavBar,
    Scroll,
    AddressItem,
    CartBottomBar,

    // 子组件
    TradeList,
    TradeConfirm,
    TradeSuccess,
  },
  mixins: [resetResizeMixin, deepCopyMixin],
  computed: {
    ...mapGetters({
      addresses: "userAddresses",
      price: "cartPrice",
      cartCount: "cartCount",
      singleData: "singleBottomData",
    }),
    ...mapState({
      isSingle: "handlingSinglePurchase",
      user: "loggedInUser",
      info: "userInfo",
    }),

    // 底部栏商品件数及总价
    tradeInfo() {
      if (this.isSingle) {
        return {
          count: this.singleData.count,
          totalPrice: this.singleData.totalPrice,
        };
      } else {
        return {
          count: this.cartCount,
          totalPrice: this.price,
        };
      }
    },

    // 提交订单按钮可用条件
    tradingCondition() {
      return this.nowAddress.addr !== "请选择收货地址" && this.tradeInfo.count;
    },
  },
  methods: {
    // 初始化页面
    initialPage() {
      this.isConfirmShow = false;
      this.isSuccessPaid = false;
      this.resetResize("trade");
      // 每次进入页面，刷新展示地址
      this.resetShowingAddress();
      this.$refs.scrollClick.refresh();
    },
    // 选择地址
    enterChoosing() {
      this.$router.push({
        path: "/address",
        query: {
          type: "choose",
        },
      });
    },
    // 优先级：选中的=》默认的（第一个）=》空的
    resetShowingAddress() {
      // 根据 Github 用户名获取用户信息
      const chosenAddress = this.addresses.filter((addr) => addr.chosen);
      if (chosenAddress.length) {
        this.nowAddress = chosenAddress[0];
      } else if (this.addresses.length) {
        this.nowAddress = this.addresses[0];
      } else {
        this.nowAddress = {
          addr: "请选择收货地址",
        };
      }
    },

    // 确认支付操作
    handleConfirmTrading() {
      this.isConfirmShow = false;
      this.isSuccessPaid = true;
      // 保存支付成功页面所需要的结算金额数据
      this.deepCopy(this.cacheInfo, this.tradeInfo);
      this.$store.commit(COMFIRM_TRADE, this.isSingle);
      setItem(this.user, this.info[this.user]);
    },
  },
  activated() {
    this.initialPage();
  },
};
</script>

<style scoped>
	.trade-content {
		width: 100%;
		height: 100vh;
		background-color: rgb(243, 241, 244);
	}
	/* 顶部导航 */
	.nav-bar {
		position: fixed;
		width: 100%;
		z-index: 999;
	}
	/* 收货地址 */
	.addr {
		width: 100%;
		position: absolute;
		top: 44px;
		overflow: hidden;
		padding: 0;
		border-radius: 0 0 20px 20px;
		background-color: #fff;
		z-index: 10;
	}
	/* 地址栏底部线条 */
		.bottom-line {
		margin-top: -1.5vh;
		margin-left: 1.5vw;
		white-space: nowrap;
		transform: translateY(0.5vh);
	}

	.bottom-line .line {
		display: inline-block;
		margin-right: 3.2vw;
		width: 6vw;
		border-bottom: 5px solid var(--color-tint);
	}

	.bottom-line .line:nth-child(2n) {
		border-bottom: 5px solid rgb(119, 170, 251);
	}
	/* 第三方滚动 */
	.scroll {
		position: absolute;
		width: 100%;
		height: 65%;
		top: 160px;
    margin: 15px 0;
	}
	/* 商品列表 */
	.list {
		background-color: #fff;
		border-radius: 20px;
		overflow: hidden;
	}
	/* 底部栏 */
	.bottom-bar {
		width: 100%;
		height: 8%;
		line-height: 100%;
		border-top: 1px solid #ccc;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fff;
		padding: 0 10px;
		z-index: 10;
	}
	/* 左边件数 */
	.left {
		float: left;
		font-size: 16px;
	}
	/* 中间整体价格 */
	.center {
		width: 50%;
		display: flex;
		color: red;
	}
	/* 人民币符号 */
	.dolor {
		padding-top: 13%;
	}
	/* 主要价格 */
	.price {
		padding-top: 10%;
		font-size: 30px;
		font-weight: 700;
	}
	/* 小数点后价格 */
	.int {
		padding-top: 13%;
	}
	/* 右边按钮 */
	.bottom-bar .right {
		/* outline: 0; */
		width: 30%;
		height: 6vh;
		border-radius: 6vh;
		text-align: center;
		line-height: 6vh;
		margin-top: 5px;
		background-color: #ff4d55;
		color: #fff;
	}
	/* 右边按钮被禁用时的颜色 */
	.bottom-bar .right:disabled {
		background: #ccc;
	}
</style>
