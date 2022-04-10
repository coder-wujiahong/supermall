<template>
	<div class="list-view">
		<ul>
			<li><van-icon name="credit-pay" size="30"/><p>待付款</p></li>
			<li><van-icon name="send-gift-o" size="30"/><p>待收货</p></li>
			<li><van-icon name="comment-circle-o" size="30"/><p>待评价</p></li>
			<li @click="history"><van-icon name="todo-list-o" size="30" /><p>我的订单</p></li>
		</ul>
		<ul>
			<li><van-icon name="shop-collect-o" size="30"/><p>店铺关注</p></li>
			<li><van-icon name="star-o" size="30"/><p>商品收藏</p></li>
			<li><van-icon name="cart-circle-o" size="30"/><p>退款/售后</p></li>
			<li><van-icon name="paid" size="30"/><p>我的钱包</p></li>
		</ul>
		<ul>
			<li><van-icon name="service" size="30"/><p>客户服务</p></li>
			<li><van-icon name="chat" size="30"/><p>信息</p></li>
			<li><van-icon name="bill" size="30"/><p>充值中心</p></li>
			<li><van-icon name="add-square" size="30"/><p>更多工具</p></li>
		</ul>
		<ul>
			<li><van-icon name="map-marked" size="30"/><p>收货地址</p></li>
			<li><van-icon name="card" size="30"/><p>红包卡券</p></li>
			<li><van-icon name="friends" size="30"/><p>切换用户</p></li>
			<li @click="setting"><van-icon name="setting" size="30" /><p>设置</p></li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'ListView',
		methods: {
			history() {
				this.$router.push("/historyList");
			},
			setting() {
				this.$router.push("/setting");
			}
		}
	}
</script>

<style scoped>
	.list-view {
		width: 100%;
		margin: 10px 0;
	}
	.list-view ul {
		display: flex;
		/* 水平居中 */
		justify-content: space-around;
		padding: 15px;
		margin: 10px 0;
		text-align: center;
		background: #FFFFFF;
	}
	.list-view ul li {
		width: 20%;
		font-size: 14px;
	}
	.van-icon {
		padding-bottom: 10px;
	}
</style>
