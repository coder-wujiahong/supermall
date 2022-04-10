<template>
	<div class="bottom-bar">
		<div class="bar-item bar-left">
			<div>
				<i class="icon service"></i>
				<span class="text">客服</span>
			</div>
			<div>
				<i class="icon shop"></i>
				<span class="text">店铺</span>
			</div>
			<div>
				<i class="icon select"></i>
				<span class="text">收藏</span>
			</div>
		</div>
		<div class="bar-item bar-right">
			<div class="cart" @click="isChoosing = !isChoosing">加入购物车</div>
			<div class="buy" @click="buyClick">购买</div>
		</div>
		<div class="add-num" v-if="isChoosing">
		  <button @click="choosingCount > 1 ? --choosingCount : choosingCount">－</button>
		  {{ choosingCount }}
		  <button @click="choosingCount++">＋</button>
		  <button @click="addToCart">确定</button>
		  <button @click="isChoosing = false">取消</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DetailBottomBar",
		data() {
		  return {
		    isChoosing: false,
		    choosingCount: 1
		  };
		},
		methods: {
			chooseCount() {
			  this.isChoosing = true;
			},
			addToCart() {
				this.isChoosing = false;
				this.$emit('addToCart', this.choosingCount);
			},
			buyClick() {
				this.$emit('buyClick');
			}
		}
	}
</script>

<style scoped>
	.bottom-bar {
		height: 49px;
		background: #fff;	
		position: relative;
		/* bottom: 49px; */
		display: flex;
		text-align: center;
		/* 另一种方案 */
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
	
	.bar-item {
		flex: 1;
		display: flex;
	}
	
	.bar-item>div {
		flex: 1;
	}
	
	.bar-left .test {
		font-size: 13px;
	}
	
	.bar-left .icon {
		display: block;
		width: 22px;
		height: 22px;
		margin: 6px auto 3px;
		background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
	}
	
	.bar-left .service {
		background-position: 0 -54px;
	}
	
	.bar-left .shop {
		background-position: 0 -98px;
	}
	
	.bar-right {
		font-size: 15px;
		color: #fff;
		line-height: 58px;
	}
	
	.bar-right .cart {
		background-color: #ffe817;
		color: #333;
	}
	
	.bar-right .buy {
		background-color: #f69;
	}
	
	.sport-ball {
		position: absolute;
		left: 225px;
		bottom: 20px;
	}
	
	.add-num {
	  box-sizing: border-box;
	  position: absolute;
	  left: 25%;
	  top: -40px;
	  width: 65%;
	  height: 40px;
	  background-color: rgb(248, 249, 249);
	  border: 3px solid rgb(255, 232, 23);
	  text-align: center;
	  line-height: 40px;
	  font-size: 20px;
	}
	
	.add-num button {
	  width: 20%;
	  background-color: transparent;
	  border: 0;
	  outline: 0;
	  font-size: 20px;
	}
</style>
